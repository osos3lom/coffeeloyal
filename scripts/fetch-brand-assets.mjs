/**
 * Downloads Princes' Coffee brand photography from princes.sa into
 * public/brand/. Source filenames are URL-encoded Arabic, which git and
 * Windows both handle badly, so every file is re-slugified on the way in.
 *
 * next/image converts to WebP/AVIF and resizes at serve time, so the
 * originals are stored as-is — no build step, no extra dependency.
 *
 *   node scripts/fetch-brand-assets.mjs
 *
 * Re-running skips files that already exist. Pass --force to re-download.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "brand");
const FORCE = process.argv.includes("--force");
const BASE = "https://princes.sa/wp-content/uploads";

/** [sourcePath, destination] */
const MANIFEST = [
  // --- Interiors & hospitality (the editorial backbone) ---
  ["2024/01/DSC00554-1-1024x1024.jpg", "hero/interior-01.jpg"],
  ["2024/01/DSC00500-1-1024x1024.jpg", "hero/interior-02.jpg"],
  ["2024/01/DSC00643-2-1024x1024.jpg", "hero/interior-03.jpg"],
  ["2024/01/DSC00881-1024x1024.jpg", "gallery/interior-04.jpg"],
  ["2024/01/DSC00452-1-1024x1024.jpg", "gallery/interior-05.jpg"],
  ["2024/01/DSC00840-1024x1024.jpg", "gallery/interior-06.jpg"],
  ["2024/01/DSC00762-1024x1024.jpg", "gallery/interior-07.jpg"],
  ["2024/01/DSC00806-1024x1024.jpg", "gallery/interior-08.jpg"],
  ["2024/01/DSC00904-1024x1024.jpg", "gallery/interior-09.jpg"],

  // --- Categories ---
  ["2023/04/58-scaled.jpg", "category/pastries.jpg"],
  ["2023/04/124-1-scaled.jpg", "category/saudi-coffee.jpg"],
  ["2023/04/27-scaled.jpg", "category/beverages.jpg"],
  ["2023/04/42.jpg", "category/beans.jpg"],

  // --- Gallery extras ---
  ["2023/06/70-1024x1024.jpg", "gallery/scene-01.jpg"],
  ["2023/06/76-1024x1024.jpg", "gallery/scene-02.jpg"],
  ["2023/06/77-1-1024x1024.jpg", "gallery/scene-03.jpg"],
  ["2023/06/78-1-1024x1024.jpg", "gallery/scene-04.jpg"],
  ["2023/06/103-3-1024x1024.jpg", "gallery/scene-05.jpg"],
  ["2023/06/100-2-1024x1024.jpg", "gallery/scene-06.jpg"],
  ["2023/06/79-3-1024x1024.jpg", "gallery/scene-07.jpg"],
  ["2023/04/44-1024x1024.jpg", "gallery/scene-08.jpg"],
  ["2023/04/18-1024x1024.jpg", "gallery/scene-09.jpg"],
  ["2023/04/19-1024x1024.jpg", "gallery/scene-10.jpg"],
  ["2023/04/30-1024x1024.jpg", "gallery/scene-11.jpg"],

  // --- Coffee & espresso ---
  ["2023/04/اسبريسو-1-1-e1681803578634-scaled.jpg", "menu/espresso.jpg"],
  ["2023/04/آيس-أمريكانو-1-1-e1681803603355-scaled.jpg", "menu/iced-americano.jpg"],
  ["2023/04/آيس-بستاشيو-لاتيه-1-1-e1681803679165-scaled.jpg", "menu/iced-pistachio-latte.jpg"],
  ["2023/04/آيس-تي-خوخ-1-1-e1681803713418-scaled.jpg", "menu/iced-peach-tea.jpg"],
  ["2023/04/آيس-سبانيش-لاتيه-1-1-e1681803783568-scaled.jpg", "menu/iced-spanish-latte.jpg"],
  ["2023/04/آيس-شوكليت-سلاش-1-e1681803945633-scaled.jpg", "menu/iced-chocolate-slush.jpg"],
  ["2023/04/آيس-شيكن-1-1-e1681804184946-scaled.jpg", "menu/iced-shaken.jpg"],
  ["2023/04/آيس-لاتيه-1-1-e1681804236481-scaled.jpg", "menu/iced-latte.jpg"],
  ["2023/04/ايس-موكا-1-1-e1681804275837-scaled.jpg", "menu/iced-mocha.jpg"],
  ["2023/04/آيس-موكا-سلاش-1-1-e1681804322432-scaled.jpg", "menu/iced-mocha-slush.jpg"],
  ["2023/04/ايس-وايت-موكا-1-1-e1681804599895-scaled.jpg", "menu/iced-white-mocha.jpg"],
  ["2023/04/فلات-وايت-1-1-e1681805976544-scaled.jpg", "menu/flat-white.jpg"],
  ["2023/04/قهوة-أمريكية-1-e1681806040161-scaled.jpg", "menu/americano.jpg"],
  ["2023/04/قهوة-تركية-1-e1681806093493-scaled.jpg", "menu/turkish-coffee.jpg"],
  ["2023/04/قهوة-سعودية-1-1-e1681806145691-scaled.jpg", "menu/saudi-coffee.jpg"],
  ["2023/04/قهوة-سعودية-باردة-1-1-e1681806233242.png", "menu/iced-saudi-coffee.png"],
  ["2023/04/قهوة-فرنسية-1-e1681806276646-scaled.jpg", "menu/french-coffee.jpg"],
  ["2023/04/كابتشينو-1-1-e1681806358717-scaled.jpg", "menu/cappuccino.jpg"],
  ["2023/04/كورتادو-1-1-e1681806570489-scaled.jpg", "menu/cortado.jpg"],
  ["2023/04/مكياتو-1-1-e1681807178401.jpg", "menu/macchiato.jpg"],
  ["2023/04/موكاتشينو-1-1-e1681807275846-scaled.jpg", "menu/mochaccino.jpg"],
  ["2023/04/نسكافية-1-1-e1681807459484.jpg", "menu/nescafe.jpg"],
  ["2023/04/سقنتشر-الأمراء-1-e1681805104626-scaled.jpg", "menu/princes-signature.jpg"],

  // --- Tea & hot ---
  ["2023/04/شاي-أحمر-1-e1681805145575-scaled.jpg", "menu/red-tea.jpg"],
  ["2023/04/شاي-أخضر-1-1-e1681805189607-scaled.jpg", "menu/green-tea.jpg"],
  ["2023/04/شاي-عدني-1-1-e1681805291605-scaled.jpg", "menu/adeni-tea.jpg"],
  ["2023/04/شاي-كرك-1-1-e1681805333434-scaled.jpg", "menu/karak-tea.jpg"],
  ["2023/04/شاي-مغربي-1-1-e1681805823258-scaled.jpg", "menu/moroccan-tea.jpg"],
  ["2023/04/شوكولاتة-ساخنة-1-e1681805913655-scaled.jpg", "menu/hot-chocolate.jpg"],
  ["2023/04/سحلب-1-e1681805058733-scaled.jpg", "menu/sahlab.jpg"],

  // --- Cold & mojitos ---
  ["2023/04/باشن-فروت-موهيتو-1-1-e1681804746383-scaled.jpg", "menu/passion-fruit-mojito.jpg"],
  ["2023/04/بلو-موهيتو-1-1-e1681804789310-scaled.jpg", "menu/blue-mojito.jpg"],
  ["2023/04/حبحب-موهيتو-1-1-e1681804861580-scaled.jpg", "menu/watermelon-mojito.jpg"],
  ["2023/04/كلاسيك-موهيتو-1-1-e1681806399741-scaled.jpg", "menu/classic-mojito.jpg"],
  ["2023/04/كلاود-ليمونيد-1-1-e1681806484110-scaled.jpg", "menu/cloud-lemonade.jpg"],
  ["2023/04/لوتس-فرابيه-1-1-e1681806702401-scaled.jpg", "menu/lotus-frappe.jpg"],
  ["2023/04/مانجو-فرابية-1-1-e1681806830449-scaled.jpg", "menu/mango-frappe.jpg"],
  ["2023/04/مكس-بيري-فرابيه-1-1-e1681807058302-scaled.jpg", "menu/mixed-berry-frappe.jpg"],

  // --- Food ---
  ["2023/04/ساندوتش-تونة-scaled.jpg", "menu/tuna-sandwich.jpg"],
  ["2023/04/ساندوتش-جبنة-حلومي--scaled.jpg", "menu/halloumi-sandwich.jpg"],
  ["2023/04/ساندوتش-دجاج--scaled.jpg", "menu/chicken-sandwich.jpg"],
  ["2023/04/كرسون-جبنة--scaled.jpeg", "menu/cheese-croissant.jpeg"],
  ["2023/04/كوكيز-شوكولاتة-scaled.jpeg", "menu/chocolate-cookies.jpeg"],
  ["2023/04/كوكيز-فانيلا--scaled.jpeg", "menu/vanilla-cookies.jpeg"],
  ["2023/04/كيك-انجليزي--scaled.jpeg", "menu/english-cake.jpeg"],
  ["2023/04/مافن-كيك-الشوكولاتة--scaled.jpg", "menu/chocolate-muffin.jpg"],
  ["2023/04/مافن-كيك-بالفانيلا-.jpg", "menu/vanilla-muffin.jpg"],
  ["2023/04/دونات-1-scaled.jpg", "menu/donut.jpg"],

  // --- Blog ---
  ["2023/06/اسبريسو--scaled.jpg", "blog/espresso.jpg"],
  ["2023/04/124-1-scaled.jpg", "blog/saudi-coffee.jpg"],
  ["2023/04/22-scaled.jpg", "blog/sweetening.jpg"],
  ["2023/06/53-1-scaled.jpg", "blog/history.jpg"],
  ["2023/06/54-scaled.jpg", "blog/benefits.jpg"],
  ["2023/06/36.jpg", "blog/culture.jpg"],
];

async function download(srcPath, dest) {
  const target = path.join(OUT, dest);
  if (!FORCE && fs.existsSync(target) && fs.statSync(target).size > 0) {
    return { dest, status: "skip" };
  }
  const url = `${BASE}/${srcPath}`
    .split("/")
    .map((seg, i) => (i < 3 ? seg : encodeURIComponent(seg)))
    .join("/");

  try {
    const res = await fetch(url, {
      headers: { "user-agent": "Mozilla/5.0 (brand-asset-sync)" },
      redirect: "follow",
    });
    if (!res.ok) return { dest, status: "fail", detail: `HTTP ${res.status}` };
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1024) return { dest, status: "fail", detail: "too small" };
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, buf);
    return { dest, status: "ok", bytes: buf.length };
  } catch (err) {
    return { dest, status: "fail", detail: err.message };
  }
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  console.log(`Fetching ${MANIFEST.length} assets into public/brand/ ...\n`);

  const results = [];
  const CONCURRENCY = 6;
  for (let i = 0; i < MANIFEST.length; i += CONCURRENCY) {
    const batch = MANIFEST.slice(i, i + CONCURRENCY);
    results.push(...(await Promise.all(batch.map(([s, d]) => download(s, d)))));
  }

  const ok = results.filter((r) => r.status === "ok");
  const skip = results.filter((r) => r.status === "skip");
  const fail = results.filter((r) => r.status === "fail");

  for (const f of fail) console.log(`  FAIL  ${f.dest}  (${f.detail})`);

  const mb = ok.reduce((a, r) => a + r.bytes, 0) / 1024 / 1024;
  console.log(
    `\ndownloaded ${ok.length}  skipped ${skip.length}  failed ${fail.length}  (${mb.toFixed(1)} MB)`,
  );
  if (fail.length) {
    console.log(
      "\nFailed slots fall back to a CSS gradient placeholder in the UI;\n" +
        "drop a replacement at the same path to fix.",
    );
  }
}

main();
