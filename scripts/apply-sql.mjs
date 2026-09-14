/**
 * Applies a .sql file to DATABASE_URL. Used instead of psql, which is not
 * installed in this environment.
 *
 *   node --env-file=.env scripts/apply-sql.mjs sql/002_menu_and_orders.sql
 */

import fs from "node:fs";
import path from "node:path";
import pg from "pg";

const file = process.argv[2];
if (!file) {
  console.error("usage: node --env-file=.env scripts/apply-sql.mjs <file.sql>");
  process.exit(1);
}

const sql = fs.readFileSync(path.resolve(file), "utf8");

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();

try {
  await client.query(sql);
  console.log(`applied ${file}`);

  const counts = await client.query(`
    SELECT
      (SELECT count(*) FROM shops WHERE status = 'active') AS shops,
      (SELECT count(*) FROM menu_categories)               AS categories,
      (SELECT count(*) FROM menu_items)                    AS items,
      (SELECT count(*) FROM orders)                        AS orders
  `);
  console.log("counts:", counts.rows[0]);
} catch (err) {
  console.error("FAILED:", err.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
