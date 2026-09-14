/**
 * Princes' Coffee menu — sourced from princes.sa.
 *
 * This is reference/display data for the brand site. The ordering flow
 * reads prices from the `menu_items` table (see sql/002_menu_and_orders.sql),
 * which is seeded from this same list, so prices can never be trusted from
 * the client.
 *
 * Prices are in SAR. Where the source listed a range (e.g. "12-15"), the
 * lower value is the regular size and the upper is the large.
 */

export type MenuCategoryId = "coffee" | "cold" | "tea" | "food";

export interface MenuCategory {
  id: MenuCategoryId;
  slug: string;
  ar: string;
  en: string;
  image: string;
}

export interface MenuItem {
  slug: string;
  category: MenuCategoryId;
  ar: string;
  en: string;
  /** Regular size, SAR */
  price: number;
  /** Large size, SAR — absent when the item has one size only */
  priceLarge?: number;
  image: string;
  /** Surfaced on the landing page menu preview */
  signature?: boolean;
}

export const menuCategories: MenuCategory[] = [
  { id: "coffee", slug: "coffee", ar: "القهوة", en: "Coffee", image: "/brand/category/saudi-coffee.jpg" },
  { id: "cold", slug: "cold", ar: "المشروبات الباردة", en: "Cold Drinks", image: "/brand/category/beverages.jpg" },
  { id: "tea", slug: "tea", ar: "الشاي والمشروبات الساخنة", en: "Tea & Hot Drinks", image: "/brand/menu/karak-tea.jpg" },
  { id: "food", slug: "food", ar: "المخبوزات والساندويتشات", en: "Bakery & Sandwiches", image: "/brand/category/pastries.jpg" },
];

/** The four editorial tiles on the landing page — brand story, not ordering. */
export const showcaseCategories = [
  { slug: "food", ar: "المخبوزات", en: "Pastries", image: "/brand/category/pastries.jpg" },
  { slug: "coffee", ar: "القهوة السعودية", en: "Saudi Coffee", image: "/brand/category/saudi-coffee.jpg" },
  { slug: "cold", ar: "المشروبات المتنوعة", en: "Beverages", image: "/brand/category/beverages.jpg" },
  { slug: "coffee", ar: "محاصيل البن", en: "Coffee Crops", image: "/brand/category/beans.jpg" },
];

export const menuItems: MenuItem[] = [
  // ---------- Coffee ----------
  { slug: "saudi-coffee", category: "coffee", ar: "قهوة سعودية", en: "Saudi Coffee", price: 6, image: "/brand/menu/saudi-coffee.jpg", signature: true },
  { slug: "princes-signature", category: "coffee", ar: "سقنتشر الأمراء", en: "Princes Signature", price: 12, image: "/brand/menu/princes-signature.jpg", signature: true },
  { slug: "espresso", category: "coffee", ar: "إسبريسو", en: "Espresso", price: 10, image: "/brand/menu/espresso.jpg" },
  { slug: "macchiato", category: "coffee", ar: "مكياتو", en: "Macchiato", price: 10, image: "/brand/menu/macchiato.jpg" },
  { slug: "turkish-coffee", category: "coffee", ar: "قهوة تركية", en: "Turkish Coffee", price: 10, image: "/brand/menu/turkish-coffee.jpg" },
  { slug: "french-coffee", category: "coffee", ar: "قهوة فرنسية", en: "French Coffee", price: 12, image: "/brand/menu/french-coffee.jpg" },
  { slug: "cortado", category: "coffee", ar: "كورتادو", en: "Cortado", price: 14, image: "/brand/menu/cortado.jpg" },
  { slug: "flat-white", category: "coffee", ar: "فلات وايت", en: "Flat White", price: 14, image: "/brand/menu/flat-white.jpg", signature: true },
  { slug: "americano", category: "coffee", ar: "قهوة أمريكية", en: "American Coffee", price: 8, priceLarge: 11, image: "/brand/menu/americano.jpg" },
  { slug: "cappuccino", category: "coffee", ar: "كابتشينو", en: "Cappuccino", price: 11, priceLarge: 14, image: "/brand/menu/cappuccino.jpg", signature: true },
  { slug: "mochaccino", category: "coffee", ar: "موكاتشينو", en: "Mochaccino", price: 13, priceLarge: 16, image: "/brand/menu/mochaccino.jpg" },
  { slug: "nescafe", category: "coffee", ar: "نسكافيه", en: "Nescafé", price: 9, priceLarge: 12, image: "/brand/menu/nescafe.jpg" },

  // ---------- Cold ----------
  { slug: "iced-saudi-coffee", category: "cold", ar: "قهوة سعودية باردة", en: "Iced Saudi Coffee", price: 15, priceLarge: 18, image: "/brand/menu/iced-saudi-coffee.png", signature: true },
  { slug: "iced-americano", category: "cold", ar: "آيس أمريكانو", en: "Iced Americano", price: 12, priceLarge: 15, image: "/brand/menu/iced-americano.jpg" },
  { slug: "iced-latte", category: "cold", ar: "آيس لاتيه", en: "Iced Latte", price: 12, priceLarge: 15, image: "/brand/menu/iced-latte.jpg" },
  { slug: "iced-spanish-latte", category: "cold", ar: "آيس سبانيش لاتيه", en: "Iced Spanish Latte", price: 15, priceLarge: 18, image: "/brand/menu/iced-spanish-latte.jpg", signature: true },
  { slug: "iced-pistachio-latte", category: "cold", ar: "آيس بستاشيو لاتيه", en: "Iced Pistachio Latte", price: 15, priceLarge: 18, image: "/brand/menu/iced-pistachio-latte.jpg" },
  { slug: "iced-mocha", category: "cold", ar: "آيس موكا", en: "Iced Mocha", price: 15, priceLarge: 18, image: "/brand/menu/iced-mocha.jpg" },
  { slug: "iced-white-mocha", category: "cold", ar: "آيس وايت موكا", en: "Iced White Mocha", price: 15, priceLarge: 18, image: "/brand/menu/iced-white-mocha.jpg" },
  { slug: "iced-shaken", category: "cold", ar: "آيس شيكن", en: "Iced Shaken", price: 15, priceLarge: 18, image: "/brand/menu/iced-shaken.jpg" },
  { slug: "iced-mocha-slush", category: "cold", ar: "آيس موكا سلاش", en: "Iced Mocha Slush", price: 14, priceLarge: 17, image: "/brand/menu/iced-mocha-slush.jpg" },
  { slug: "iced-chocolate-slush", category: "cold", ar: "آيس شوكليت سلاش", en: "Iced Chocolate Slush", price: 14, priceLarge: 17, image: "/brand/menu/iced-chocolate-slush.jpg" },
  { slug: "iced-peach-tea", category: "cold", ar: "آيس تي خوخ", en: "Iced Peach Tea", price: 15, priceLarge: 18, image: "/brand/menu/iced-peach-tea.jpg" },
  { slug: "lotus-frappe", category: "cold", ar: "لوتس فرابيه", en: "Lotus Frappé", price: 19, image: "/brand/menu/lotus-frappe.jpg", signature: true },
  { slug: "mango-frappe", category: "cold", ar: "مانجو فرابيه", en: "Mango Frappé", price: 17, image: "/brand/menu/mango-frappe.jpg" },
  { slug: "mixed-berry-frappe", category: "cold", ar: "مكس بيري فرابيه", en: "Mixed Berry Frappé", price: 17, image: "/brand/menu/mixed-berry-frappe.jpg" },
  { slug: "classic-mojito", category: "cold", ar: "كلاسيك موهيتو", en: "Classic Mojito", price: 14, priceLarge: 17, image: "/brand/menu/classic-mojito.jpg" },
  { slug: "passion-fruit-mojito", category: "cold", ar: "باشن فروت موهيتو", en: "Passion Fruit Mojito", price: 16, priceLarge: 19, image: "/brand/menu/passion-fruit-mojito.jpg" },
  { slug: "blue-mojito", category: "cold", ar: "بلو موهيتو", en: "Blue Mojito", price: 16, priceLarge: 19, image: "/brand/menu/blue-mojito.jpg" },
  { slug: "watermelon-mojito", category: "cold", ar: "حبحب موهيتو", en: "Watermelon Mojito", price: 16, priceLarge: 19, image: "/brand/menu/watermelon-mojito.jpg" },
  { slug: "cloud-lemonade", category: "cold", ar: "كلاود ليمونيد", en: "Cloud Lemonade", price: 15, priceLarge: 18, image: "/brand/menu/cloud-lemonade.jpg" },

  // ---------- Tea & hot ----------
  { slug: "red-tea", category: "tea", ar: "شاي أحمر", en: "Red Tea", price: 5, image: "/brand/menu/red-tea.jpg" },
  { slug: "green-tea", category: "tea", ar: "شاي أخضر", en: "Green Tea", price: 7, image: "/brand/menu/green-tea.jpg" },
  { slug: "adeni-tea", category: "tea", ar: "شاي عدني", en: "Adeni Tea", price: 7, image: "/brand/menu/adeni-tea.jpg" },
  { slug: "karak-tea", category: "tea", ar: "شاي كرك", en: "Karak Tea", price: 7, image: "/brand/menu/karak-tea.jpg", signature: true },
  { slug: "moroccan-tea", category: "tea", ar: "شاي مغربي", en: "Moroccan Tea", price: 7, image: "/brand/menu/moroccan-tea.jpg" },
  { slug: "sahlab", category: "tea", ar: "سحلب", en: "Sahlab", price: 9, image: "/brand/menu/sahlab.jpg" },
  { slug: "hot-chocolate", category: "tea", ar: "شوكولاتة ساخنة", en: "Hot Chocolate", price: 12, priceLarge: 15, image: "/brand/menu/hot-chocolate.jpg" },

  // ---------- Food ----------
  { slug: "cheese-croissant", category: "food", ar: "كرواسون جبنة", en: "Cheese Croissant", price: 7, image: "/brand/menu/cheese-croissant.jpeg", signature: true },
  { slug: "donut", category: "food", ar: "دونات", en: "Donut", price: 7, image: "/brand/menu/donut.jpg" },
  { slug: "chocolate-cookies", category: "food", ar: "كوكيز شوكولاتة", en: "Chocolate Cookies", price: 9, image: "/brand/menu/chocolate-cookies.jpeg" },
  { slug: "vanilla-cookies", category: "food", ar: "كوكيز فانيلا", en: "Vanilla Cookies", price: 9, image: "/brand/menu/vanilla-cookies.jpeg" },
  { slug: "english-cake", category: "food", ar: "كيك إنجليزي", en: "English Cake", price: 9, image: "/brand/menu/english-cake.jpeg" },
  { slug: "chocolate-muffin", category: "food", ar: "مافن شوكولاتة", en: "Chocolate Muffin", price: 9, image: "/brand/menu/chocolate-muffin.jpg" },
  { slug: "vanilla-muffin", category: "food", ar: "مافن فانيلا", en: "Vanilla Muffin", price: 9, image: "/brand/menu/vanilla-muffin.jpg" },
  { slug: "tuna-sandwich", category: "food", ar: "ساندويتش تونة", en: "Tuna Sandwich", price: 13, image: "/brand/menu/tuna-sandwich.jpg" },
  { slug: "halloumi-sandwich", category: "food", ar: "ساندويتش جبنة حلومي", en: "Halloumi Sandwich", price: 13, image: "/brand/menu/halloumi-sandwich.jpg" },
  { slug: "chicken-sandwich", category: "food", ar: "ساندويتش دجاج", en: "Chicken Sandwich", price: 13, image: "/brand/menu/chicken-sandwich.jpg" },
];

export const signatureItems = menuItems.filter((i) => i.signature);

export function itemsByCategory(id: MenuCategoryId) {
  return menuItems.filter((i) => i.category === id);
}
