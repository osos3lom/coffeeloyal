/**
 * Emits sql/002_menu_and_orders.sql from the TypeScript content modules,
 * so branches and menu items have exactly one source of truth. Re-run after
 * editing src/lib/content/*.ts:
 *
 *   node scripts/generate-seed.mjs
 *
 * Relies on Node's native TypeScript type-stripping (Node 22.6+/24).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const { branches, cities } = await import("../src/lib/content/branches.ts");
const { menuCategories, menuItems } = await import("../src/lib/content/menu.ts");

const q = (v) =>
  v === null || v === undefined ? "NULL" : `'${String(v).replace(/'/g, "''")}'`;
const n = (v) => (v === null || v === undefined ? "NULL" : String(v));

const cityName = Object.fromEntries(cities.map((c) => [c.id, c.en]));

const header = `-- Princes' Coffee — menu, branches and pickup ordering.
--
-- GENERATED FILE. Edit src/lib/content/*.ts and re-run:
--   node scripts/generate-seed.mjs
--
-- Additive migration: sql/init.sql is not modified. Safe to re-run.

BEGIN;

-- ---------------------------------------------------------------
-- Branches live in the existing multi-tenant \`shops\` table, so
-- loyalty, the stores page and ordering share one source of truth.
-- ---------------------------------------------------------------
ALTER TABLE shops ADD COLUMN IF NOT EXISTS name_en        VARCHAR(255) NOT NULL DEFAULT '';
ALTER TABLE shops ADD COLUMN IF NOT EXISTS address_en     TEXT         NOT NULL DEFAULT '';
ALTER TABLE shops ADD COLUMN IF NOT EXISTS city           VARCHAR(60)  NOT NULL DEFAULT '';
ALTER TABLE shops ADD COLUMN IF NOT EXISTS maps_url       TEXT         NOT NULL DEFAULT '';
ALTER TABLE shops ADD COLUMN IF NOT EXISTS hours          VARCHAR(120) NOT NULL DEFAULT '';
ALTER TABLE shops ADD COLUMN IF NOT EXISTS accepts_orders BOOLEAN      NOT NULL DEFAULT true;

CREATE TABLE IF NOT EXISTS menu_categories (
    id      SERIAL PRIMARY KEY,
    slug    VARCHAR(60) UNIQUE NOT NULL,
    name_ar VARCHAR(160) NOT NULL,
    name_en VARCHAR(160) NOT NULL,
    image_url TEXT NOT NULL DEFAULT '',
    sort    INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS menu_items (
    id          SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
    slug        VARCHAR(80) UNIQUE NOT NULL,
    name_ar     VARCHAR(160) NOT NULL,
    name_en     VARCHAR(160) NOT NULL,
    -- Prices in SAR. price_large is null when the item has one size.
    price       NUMERIC(8,2) NOT NULL CHECK (price >= 0),
    price_large NUMERIC(8,2) CHECK (price_large >= 0),
    image_url   TEXT NOT NULL DEFAULT '',
    is_available BOOLEAN NOT NULL DEFAULT true,
    sort        INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS orders (
    id          SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    shop_id     INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    -- Short human-readable code shown at the counter.
    code        VARCHAR(12) UNIQUE NOT NULL,
    status      VARCHAR(20) NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','accepted','ready','collected','cancelled')),
    -- Always recomputed server-side from menu_items; never trusted from the client.
    total       NUMERIC(10,2) NOT NULL CHECK (total >= 0),
    notes       TEXT NOT NULL DEFAULT '',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
    id           SERIAL PRIMARY KEY,
    order_id     INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE SET NULL,
    -- Name and price are denormalised so order history survives menu edits.
    name_ar      VARCHAR(160) NOT NULL,
    name_en      VARCHAR(160) NOT NULL,
    size         VARCHAR(10) NOT NULL DEFAULT 'regular' CHECK (size IN ('regular','large')),
    unit_price   NUMERIC(8,2) NOT NULL CHECK (unit_price >= 0),
    qty          INTEGER NOT NULL CHECK (qty > 0)
);

CREATE INDEX IF NOT EXISTS idx_orders_shop_status  ON orders(shop_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_customer     ON orders(customer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_order_items_order   ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_shops_city          ON shops(city);
`;

// ---- Branches ----
let sql = header + `\n-- ---------------- Branches (${branches.length}) ----------------\n`;
branches.forEach((b, i) => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Princes Coffee ${b.en} ${b.addressEn}`,
  )}`;
  sql +=
    `INSERT INTO shops (name, slug, address, phone, name_en, address_en, city, maps_url, status)\n` +
    `VALUES (${q(b.ar)}, ${q(b.slug)}, ${q(b.addressAr)}, '+966539998999', ${q(b.en)}, ${q(b.addressEn)}, ${q(cityName[b.city])}, ${q(mapsUrl)}, 'active')\n` +
    `ON CONFLICT (slug) DO UPDATE SET\n` +
    `  name = EXCLUDED.name, address = EXCLUDED.address, name_en = EXCLUDED.name_en,\n` +
    `  address_en = EXCLUDED.address_en, city = EXCLUDED.city, maps_url = EXCLUDED.maps_url;\n`;
  if (i === branches.length - 1) sql += "\n";
});

// ---- Categories ----
sql += `-- ---------------- Categories (${menuCategories.length}) ----------------\n`;
menuCategories.forEach((c, i) => {
  sql +=
    `INSERT INTO menu_categories (slug, name_ar, name_en, image_url, sort)\n` +
    `VALUES (${q(c.slug)}, ${q(c.ar)}, ${q(c.en)}, ${q(c.image)}, ${i})\n` +
    `ON CONFLICT (slug) DO UPDATE SET\n` +
    `  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en,\n` +
    `  image_url = EXCLUDED.image_url, sort = EXCLUDED.sort;\n`;
});
sql += "\n";

// ---- Items ----
sql += `-- ---------------- Menu items (${menuItems.length}) ----------------\n`;
menuItems.forEach((m, i) => {
  sql +=
    `INSERT INTO menu_items (category_id, slug, name_ar, name_en, price, price_large, image_url, sort)\n` +
    `SELECT id, ${q(m.slug)}, ${q(m.ar)}, ${q(m.en)}, ${n(m.price)}, ${n(m.priceLarge)}, ${q(m.image)}, ${i}\n` +
    `  FROM menu_categories WHERE slug = ${q(m.category)}\n` +
    `ON CONFLICT (slug) DO UPDATE SET\n` +
    `  name_ar = EXCLUDED.name_ar, name_en = EXCLUDED.name_en, price = EXCLUDED.price,\n` +
    `  price_large = EXCLUDED.price_large, image_url = EXCLUDED.image_url,\n` +
    `  category_id = EXCLUDED.category_id, sort = EXCLUDED.sort;\n`;
});

sql += "\nCOMMIT;\n";

const out = path.join(ROOT, "sql", "002_menu_and_orders.sql");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, sql, "utf8");

console.log(
  `wrote sql/002_menu_and_orders.sql — ${branches.length} branches, ` +
    `${menuCategories.length} categories, ${menuItems.length} items ` +
    `(${(sql.length / 1024).toFixed(1)} KB)`,
);
