import { NextResponse } from "next/server";
import { randomInt } from "crypto";
import { auth } from "@/lib/auth";
import pool from "@/lib/db";

const MAX_LINES = 40;
const MAX_QTY = 20;

type Size = "regular" | "large";

interface IncomingLine {
  slug: unknown;
  size: unknown;
  qty: unknown;
}

function shortCode() {
  return `PC-${randomInt(1000, 9999)}`;
}

/** GET /api/orders — the signed-in customer's own orders. */
export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "customer") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { rows } = await pool.query(
      `SELECT o.id, o.code, o.status, o.total::float8 AS total, o.notes, o.created_at,
              s.name AS shop_name_ar, s.name_en AS shop_name_en,
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
         JOIN shops s ON s.id = o.shop_id
         LEFT JOIN order_items oi ON oi.order_id = o.id
        WHERE o.customer_id = $1
        GROUP BY o.id, s.name, s.name_en
        ORDER BY o.created_at DESC
        LIMIT 30`,
      [parseInt(session.user.id, 10)],
    );
    return NextResponse.json({ orders: rows });
  } catch (err) {
    console.error("Order list error:", err);
    return NextResponse.json({ error: "Failed to load orders" }, { status: 500 });
  }
}

/**
 * POST /api/orders — place a pickup order.
 *
 * Every price and the order total are recomputed here from menu_items.
 * Nothing monetary is read from the request body, so a tampered client
 * cart changes only what the attacker sees, never what they are charged.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "customer") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  let body: { branchSlug?: unknown; lines?: unknown; notes?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const branchSlug = typeof body.branchSlug === "string" ? body.branchSlug : "";
  const notes = typeof body.notes === "string" ? body.notes.slice(0, 500) : "";
  const rawLines = Array.isArray(body.lines) ? (body.lines as IncomingLine[]) : [];

  if (!branchSlug) {
    return NextResponse.json({ error: "A branch is required" }, { status: 400 });
  }
  if (rawLines.length === 0) {
    return NextResponse.json({ error: "The order is empty" }, { status: 400 });
  }
  if (rawLines.length > MAX_LINES) {
    return NextResponse.json({ error: "Too many items" }, { status: 400 });
  }

  // Normalise and collapse duplicates before touching the database.
  const wanted = new Map<string, { slug: string; size: Size; qty: number }>();
  for (const l of rawLines) {
    if (typeof l?.slug !== "string") continue;
    const size: Size = l.size === "large" ? "large" : "regular";
    const qty = Math.floor(Number(l.qty));
    if (!Number.isFinite(qty) || qty < 1 || qty > MAX_QTY) continue;
    const key = `${l.slug}:${size}`;
    const prev = wanted.get(key);
    wanted.set(key, {
      slug: l.slug,
      size,
      qty: Math.min(MAX_QTY, (prev?.qty ?? 0) + qty),
    });
  }

  if (wanted.size === 0) {
    return NextResponse.json({ error: "No valid items" }, { status: 400 });
  }

  const customerId = parseInt(session.user.id, 10);
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { rows: shopRows } = await client.query(
      `SELECT id, accepts_orders FROM shops
        WHERE slug = $1 AND status = 'active'`,
      [branchSlug],
    );
    const shop = shopRows[0];
    if (!shop || !shop.accepts_orders) {
      await client.query("ROLLBACK");
      return NextResponse.json(
        { error: "That branch is not accepting orders" },
        { status: 400 },
      );
    }

    const slugs = [...new Set([...wanted.values()].map((w) => w.slug))];
    const { rows: menuRows } = await client.query(
      `SELECT id, slug, name_ar, name_en,
              price::float8 AS price, price_large::float8 AS price_large
         FROM menu_items
        WHERE slug = ANY($1::text[]) AND is_available`,
      [slugs],
    );

    const bySlug = new Map(menuRows.map((m) => [m.slug, m]));

    const priced: {
      id: number;
      nameAr: string;
      nameEn: string;
      size: Size;
      unitPrice: number;
      qty: number;
    }[] = [];

    for (const w of wanted.values()) {
      const m = bySlug.get(w.slug);
      if (!m) continue; // silently drop unavailable items
      // Fall back to the regular price if a large size was requested for an
      // item that does not have one.
      const unitPrice =
        w.size === "large" && m.price_large != null ? m.price_large : m.price;
      priced.push({
        id: m.id,
        nameAr: m.name_ar,
        nameEn: m.name_en,
        size: w.size === "large" && m.price_large == null ? "regular" : w.size,
        unitPrice,
        qty: w.qty,
      });
    }

    if (priced.length === 0) {
      await client.query("ROLLBACK");
      return NextResponse.json(
        { error: "None of those items are available" },
        { status: 400 },
      );
    }

    const total = priced.reduce((a, p) => a + p.unitPrice * p.qty, 0);

    // Retry on the (unlikely) short-code collision.
    let order;
    for (let attempt = 0; attempt < 5 && !order; attempt++) {
      try {
        const { rows } = await client.query(
          `INSERT INTO orders (customer_id, shop_id, code, status, total, notes)
           VALUES ($1, $2, $3, 'pending', $4, $5)
           RETURNING id, code, status, total::float8 AS total, created_at`,
          [customerId, shop.id, shortCode(), total.toFixed(2), notes],
        );
        order = rows[0];
      } catch (e: unknown) {
        const code = (e as { code?: string })?.code;
        if (code !== "23505") throw e;
        await client.query("ROLLBACK");
        await client.query("BEGIN");
      }
    }

    if (!order) {
      await client.query("ROLLBACK");
      return NextResponse.json({ error: "Could not place order" }, { status: 500 });
    }

    for (const p of priced) {
      await client.query(
        `INSERT INTO order_items
           (order_id, menu_item_id, name_ar, name_en, size, unit_price, qty)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [order.id, p.id, p.nameAr, p.nameEn, p.size, p.unitPrice, p.qty],
      );
    }

    await client.query("COMMIT");

    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Order create error:", err);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  } finally {
    client.release();
  }
}
