/**
 * Store and product photography for the hospitality gallery.
 * `span` drives the asymmetric mosaic — "tall" items occupy two rows.
 */

export interface GalleryImage {
  src: string;
  ar: string;
  en: string;
  span?: "tall" | "wide";
}

export const galleryImages: GalleryImage[] = [
  { src: "/brand/hero/interior-01.jpg", ar: "من داخل الفرع", en: "Inside the branch", span: "tall" },
  { src: "/brand/gallery/scene-01.jpg", ar: "تحضير القهوة", en: "Brewing" },
  { src: "/brand/hero/interior-02.jpg", ar: "ركن الجلوس", en: "The seating corner" },
  { src: "/brand/gallery/interior-04.jpg", ar: "تفاصيل المكان", en: "Details", span: "wide" },
  { src: "/brand/gallery/scene-02.jpg", ar: "رشفة الصباح", en: "Morning sip" },
  { src: "/brand/hero/interior-03.jpg", ar: "الطاولة الطويلة", en: "The long table", span: "tall" },
  { src: "/brand/gallery/interior-05.jpg", ar: "الضوء والخشب", en: "Light and wood" },
  { src: "/brand/gallery/scene-03.jpg", ar: "على المنضدة", en: "On the counter" },
  { src: "/brand/gallery/interior-06.jpg", ar: "مساحة الضيافة", en: "The hosting space" },
  { src: "/brand/gallery/scene-05.jpg", ar: "قهوة باردة", en: "Cold brew" },
  { src: "/brand/gallery/interior-07.jpg", ar: "الواجهة", en: "The frontage", span: "wide" },
  { src: "/brand/gallery/scene-06.jpg", ar: "حلا مع القهوة", en: "Something sweet" },
  { src: "/brand/gallery/interior-08.jpg", ar: "زاوية هادئة", en: "A quiet corner" },
  { src: "/brand/gallery/scene-07.jpg", ar: "الفنجان", en: "The cup" },
  { src: "/brand/gallery/interior-09.jpg", ar: "نهاية اليوم", en: "End of day", span: "tall" },
  { src: "/brand/gallery/scene-08.jpg", ar: "فرابيه", en: "Frappé" },
  { src: "/brand/gallery/scene-09.jpg", ar: "حبّ محمّص", en: "Roasted beans" },
  { src: "/brand/gallery/scene-10.jpg", ar: "التقديم", en: "Service" },
  { src: "/brand/gallery/scene-11.jpg", ar: "تفاصيل", en: "Detail" },
  { src: "/brand/gallery/scene-04.jpg", ar: "مشروب اليوم", en: "Drink of the day" },
];

/** The mosaic used on the landing page — a curated subset. */
export const galleryTeaser = galleryImages.slice(0, 7);
