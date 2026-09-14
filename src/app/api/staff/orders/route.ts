import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import pool from "@/lib/db";

/** GET /api/staff/orders — the live queue for the signed-in staff member's shop. */
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "staff" || !session.user.shopId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const url = new URL(req.url);
  const history = url.searchParams.get("history") === "1";

  const statuses = history
    ? ["collected", "cancelled"]
    : ["pending", "accepted", "ready"];

  try {
    const { rows } = await pool.query(
      `SELECT o.id, o.code, o.status, o.total::float8 AS total, o.notes,
              o.created_at, o.updated_at,
              u.name AS customer_name,
              COALESCE(
                json_agg(
                  json_build_object(
                    'nameAr', oi.name_ar, 'nameEn', oi.name_en,
                    'size', oi.size, 'qty', oi.qty,
                    'unitPrice', oi.unit_price::float8
                  ) ORDER BY oi.id
                ) FILTER (WHERE oi.id IS NOT NULL), '[]'
              ) AS items
         FROM orders o
         JOIN users u ON u.id = o.customer_id
         LEFT JOIN order_items oi ON oi.order_id = o.id
        WHERE o.shop_id = $1 AND o.status = ANY($2::text[])
        GROUP BY o.id, u.name
        ORDER BY o.created_at ${history ? "DESC" : "ASC"}
        LIMIT $3`,
      [parseInt(session.user.shopId, 10), statuses, history ? 40 : 100],
    );

    return NextResponse.json({ orders: rows });
  } catch (err) {
    console.error("Staff order queue error:", err);
    return NextResponse.json({ error: "Failed to load orders" }, { status: 500 });
  }
}
