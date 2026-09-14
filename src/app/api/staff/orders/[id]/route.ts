import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { auth } from "@/lib/auth";
import pool from "@/lib/db";

type Status = "pending" | "accepted" | "ready" | "collected" | "cancelled";

/**
 * Only these moves are legal. Anything else — including re-opening a
 * finished order — is rejected rather than silently applied.
 */
const ALLOWED: Record<Status, Status[]> = {
  pending: ["accepted", "cancelled"],
  accepted: ["ready", "cancelled"],
  ready: ["collected", "cancelled"],
  collected: [],
  cancelled: [],
};

/** One loyalty point per collected pickup order. */
const POINTS_PER_ORDER = 1;

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user || session.user.role !== "staff" || !session.user.shopId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { id } = await params;
  const orderId = parseInt(id, 10);
  if (!Number.isInteger(orderId)) {
    return NextResponse.json({ error: "Invalid order id" }, { status: 400 });
  }

  let next: Status;
  try {
    const body = await req.json();
    next = body?.status;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!next || !(next in ALLOWED)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const shopId = parseInt(session.user.shopId, 10);
  const staffId = parseInt(session.user.id, 10);
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Lock the row and scope it to this staff member's shop in the same
    // query, so branch A can never advance branch B's order.
    const { rows } = await client.query(
      `SELECT id, customer_id, shop_id, status
         FROM orders
        WHERE id = $1 AND shop_id = $2
        FOR UPDATE`,
      [orderId, shopId],
    );

    const order = rows[0];
    if (!order) {
      await client.query("ROLLBACK");
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const current = order.status as Status;
    if (!ALLOWED[current].includes(next)) {
      await client.query("ROLLBACK");
      return NextResponse.json(
        { error: `Cannot move an order from ${current} to ${next}` },
        { status: 409 },
      );
    }

    await client.query(
      `UPDATE orders SET status = $1, updated_at = now() WHERE id = $2`,
      [next, orderId],
    );

    let rewardCreated = false;

    // Collecting an order earns loyalty, in the same transaction as the
    // status change. Mirrors the QR claim flow in api/customer/claim.
    if (next === "collected") {
      await client.query(
        `INSERT INTO points (customer_id, shop_id, amount, source)
         VALUES ($1, $2, $3, 'earn')`,
        [order.customer_id, order.shop_id, POINTS_PER_ORDER],
      );

      const { rows: shopRows } = await client.query(
        `SELECT points_to_redeem FROM shops WHERE id = $1`,
        [order.shop_id],
      );
      const pointsToRedeem = shopRows[0]?.points_to_redeem ?? 9;

      const { rows: sum } = await client.query(
        `SELECT
           COALESCE(SUM(CASE WHEN source = 'earn'   THEN amount ELSE 0 END), 0)
         - COALESCE(SUM(CASE WHEN source = 'redeem' THEN amount ELSE 0 END), 0)
           AS balance
         FROM points
        WHERE customer_id = $1 AND shop_id = $2`,
        [order.customer_id, order.shop_id],
      );
      const balance = parseInt(sum[0].balance, 10);

      const { rows: existing } = await client.query(
        `SELECT id FROM rewards
          WHERE customer_id = $1 AND shop_id = $2 AND status = 'available'`,
        [order.customer_id, order.shop_id],
      );

      if (balance >= pointsToRedeem && existing.length === 0) {
        await client.query(
          `INSERT INTO rewards (customer_id, shop_id, redemption_token)
           VALUES ($1, $2, $3)`,
          [order.customer_id, order.shop_id, randomBytes(32).toString("hex")],
        );
        rewardCreated = true;
      }
    }

    await client.query("COMMIT");

    return NextResponse.json({
      id: orderId,
      status: next,
      pointsAwarded: next === "collected" ? POINTS_PER_ORDER : 0,
      rewardCreated,
      staffId,
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Order status error:", err);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  } finally {
    client.release();
  }
}
