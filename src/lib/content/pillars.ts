/**
 * The six brand pillars, from the "لماذا نحن" section of princes.sa.
 * Icons are lucide names resolved in CraftPillars.
 */

export interface Pillar {
  icon: "bean" | "blend" | "cup" | "dallah" | "gear" | "people";
  tagAr: string;
  tagEn: string;
  ar: { title: string; body: string };
  en: { title: string; body: string };
}

export const pillars: Pillar[] = [
  {
    icon: "bean",
    tagAr: "من أفضل مزارع البن",
    tagEn: "From the best coffee farms",
    ar: {
      title: "جودة عالية",
      body: "انتقينا لعشاق القهوة محاصيل القهوة من أفضل مزارع البن، لنمنح عملائنا تجربة مميزة مع كل رشفة.",
    },
    en: {
      title: "High quality",
      body: "For coffee lovers, we selected coffee crops from the best coffee farms, to give our customers a unique experience with every sip.",
    },
  },
  {
    icon: "blend",
    tagAr: "الباريستا يختار مزيجك",
    tagEn: "Barista recommends your blend",
    ar: {
      title: "مزيجٌ خاص من محاصيل القهوة",
      body: "يقدم الباريستا للعملاء توصياتهم بأفضل مزيج يلائم ذائقة كل عميل، ليتلذذ الزائر بكوب قهوته كما يحب.",
    },
    en: {
      title: "A special blend of coffee crops",
      body: "The barista gives customers their recommendations of the best blend that suits each customer's taste, so that the visitor can enjoy his cup of coffee as he likes.",
    },
  },
  {
    icon: "cup",
    tagAr: "لكل ذائقة مشروبها",
    tagEn: "A drink for every taste",
    ar: {
      title: "أصناف متنوعة",
      body: "نلبّي رغبات كل زوارنا بتقديم أصناف متنوعة من الشاي الفاخر، والشوكلاتة الساخنة وغيرها من المشروبات الموسمية؛ لنكون الوجهة الأولى لكل ذائقة!",
    },
    en: {
      title: "Miscellaneous varieties",
      body: "We satisfy the desires of all our visitors by offering a variety of fine teas, hot chocolate and other seasonal drinks; To be the first destination for every taste!",
    },
  },
  {
    icon: "dallah",
    tagAr: "بابتسامة وكرم",
    tagEn: "With a smile and generosity",
    ar: {
      title: "ترحيب وضيافة",
      body: "ندرك أن حسن الاستقبال جزء من تجربة كوب القهوة المثالي، لذا نهتم بالترحيب بكم في كل فروعنا بابتسامة وكرم.",
    },
    en: {
      title: "Welcome and hospitality",
      body: "We know that a warm welcome is part of the perfect cup of coffee experience, so we take care to welcome you in all our branches with a smile and hospitality.",
    },
  },
  {
    icon: "gear",
    tagAr: "تحميص وتخمير متقن",
    tagEn: "Mastered roasting & brewing",
    ar: {
      title: "أحدث التقنيات",
      body: "نسعى لتقديم أفضل قهوة في منطقة مكة المكرمة من خلال الاهتمام بكل خطوة من خطوات رحلة القهوة بداية من اختيار أنواع حبوب القهوة إلى تحميصها بعناية، وإتقان تقنيات التخمير والطحن الحديثة.",
    },
    en: {
      title: "Latest technology",
      body: "We strive to provide the best coffee in the Makkah Al-Mukarramah region by taking care of every step of the coffee journey, from choosing the types of coffee beans to carefully roasting them, and mastering modern brewing and grinding techniques.",
    },
  },
  {
    icon: "people",
    tagAr: "فريق سعيد، خدمة أفضل",
    tagEn: "Happy team, better service",
    ar: {
      title: "نهتم بموظفينا",
      body: "ندرك أن الاهتمام بموظفينا ينعكس على تقديم أفضل تجربة لعملائنا، لذا نستثمر في راحة فريقنا، ونساعدهم على التطوّر وتنمية مهاراتهم.",
    },
    en: {
      title: "We care about our employees",
      body: "We realize that caring for our employees is reflected in providing the best experience for our customers, so we invest in the comfort of our team, and help them develop and develop their skills.",
    },
  },
];
