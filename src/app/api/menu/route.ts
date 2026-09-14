import { NextResponse } from "next/server";
import pool from "@/lib/db";

/** Public menu. Cached briefly — it changes rarely. */
export async function GET() {
  try {
    const { rows: categories } = await pool.query(
      `SELECT id, slug, name_ar, name_en, image_url, sort
         FROM menu_categories
        ORDER BY sort, id`,
    );

    const { rows: items } = await pool.query(
      `SELECT i.id, i.slug, i.name_ar, i.name_en,
              i.price::float8      AS price,
              i.price_large::float8 AS price_large,
              i.image_url, i.is_available, c.slug AS category
         FROM menu_items i
         JOIN menu_categories c ON c.id = i.category_id
        WHERE i.is_available
        ORDER BY i.sort, i.id`,
    );

    return NextResponse.json(
      { categories, items },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
    );
  } catch (err) {
    console.error("Menu fetch error:", err);
    return NextResponse.json({ error: "Failed to load menu" }, { status: 500 });
  }
}
