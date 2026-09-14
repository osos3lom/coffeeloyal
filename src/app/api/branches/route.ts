import { NextResponse } from "next/server";
import pool from "@/lib/db";

/** Public list of branches that currently accept pickup orders. */
export async function GET() {
  try {
    const { rows } = await pool.query(
      `SELECT id, slug, name AS name_ar, name_en,
              address AS address_ar, address_en, city, maps_url
         FROM shops
        WHERE status = 'active' AND accepts_orders
        ORDER BY city, name_en`,
    );
    return NextResponse.json(
      { branches: rows },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
    );
  } catch (err) {
    console.error("Branches fetch error:", err);
    return NextResponse.json({ error: "Failed to load branches" }, { status: 500 });
  }
}
