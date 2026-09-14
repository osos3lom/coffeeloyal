/**
 * The six brand pillars, from the "لماذا تختارنا" section of princes.sa.
 * Icons are lucide names resolved in the Craft section.
 */

export interface Pillar {
  icon: "gem" | "blend" | "variety" | "hospitality" | "craft" | "people";
  ar: { title: string; body: string };
  en: { title: string; body: string };
}

export const pillars: Pillar[] = [
  {
    icon: "gem",
    ar: {
      title: "جودة عالية",
      body: "حبوب منتقاة من أجود المزارع، تُختار حبة حبة قبل أن تصل إلى فنجانك.",
    },
    en: {
      title: "Exceptional Quality",
      body: "Beans sourced from premium farms, selected one by one before they reach your cup.",
    },
  },
  {
    icon: "blend",
    ar: {
      title: "خلطة خاصة",
      body: "يوصي الباريستا بالمزيج الأنسب لذوقك، فلكل ضيفٍ رشفته الخاصة.",
    },
    en: {
      title: "A Blend of Your Own",
      body: "Our baristas recommend the blend that suits your palate. Every guest has their own sip.",
    },
  },
  {
    icon: "variety",
    ar: {
      title: "تشكيلة متنوعة",
      body: "شاي، شوكولاتة ساخنة، ومشروبات موسمية إلى جانب القهوة المختصة.",
    },
    en: {
      title: "A Wide Selection",
      body: "Tea, hot chocolate and seasonal drinks alongside our specialty coffee.",
    },
  },
  {
    icon: "hospitality",
    ar: {
      title: "كرم الضيافة",
      body: "حفاوة الاستقبال في كل فرع، لأن القهوة تبدأ بالترحيب قبل أن تبدأ بالتحميص.",
    },
    en: {
      title: "Genuine Hospitality",
      body: "A warm welcome at every branch, because coffee begins with greeting, not roasting.",
    },
  },
  {
    icon: "craft",
    ar: {
      title: "أحدث التقنيات",
      body: "انتقاء الحبوب وتحميصها بأساليب تحضير حديثة تُبرز أفضل ما فيها.",
    },
    en: {
      title: "Modern Craft",
      body: "Bean selection and roasting through modern brewing techniques that bring out their best.",
    },
  },
  {
    icon: "people",
    ar: {
      title: "الاهتمام بالفريق",
      body: "نستثمر في تطوير موظفينا وراحتهم، فهم أول من يصنع التجربة.",
    },
    en: {
      title: "Our People",
      body: "We invest in our team's development and comfort. They are the ones who make the experience.",
    },
  },
];
