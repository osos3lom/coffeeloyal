/**
 * Princes' Coffee values — sourced verbatim from princes.sa/our-values.
 */

export interface BrandValue {
  id: string;
  ar: { title: string; body: string };
  en: { title: string; body: string };
  image: string;
}

export const valuesLead = {
  ar: "أقوى المعايير لمزاج قهوةٍ لا يُقاوم.",
  en: "The strongest criteria for an irresistible coffee mood.",
};

export const values: BrandValue[] = [
  {
    id: "passion",
    ar: {
      title: "شغف التحضير",
      body: "نعمل بشغفٍ لننشر النكهة. فكل رشفة هي احتفال بشغفنا في تحضير القهوة وتقدير عملائنا.",
    },
    en: {
      title: "Passion for preparation",
      body: "We work hard to spread the flavor. Every sip is a celebration of our passion for brewing coffee and the appreciation of our customers.",
    },
    image: "/brand/gallery/interior-07.jpg",
  },
  {
    id: "quality",
    ar: {
      title: "الحرص على الجودة",
      body: "الجودة هي أساس قهوة الأمراء. نركز على التميز لنرتقي بخدماتنا إلى مستوى الكمال ونضع معيارًا جديدًا لكوب القهوة المثالي.",
    },
    en: {
      title: "Taking care of quality",
      body: "Quality is the basis of Princes' Coffee. We focus on excellence to bring our services to perfection and set a new standard for the perfect cup of coffee.",
    },
    image: "/brand/gallery/interior-08.jpg",
  },
  {
    id: "innovation",
    ar: {
      title: "نهج الابتكار",
      body: "نسعى بكل جهد  لتخطي التوقعات وابتكار نهجٍ مرن ومتجدد، لذا نعمل باستمرار على فتح آفاق جديدة والارتقاء بمنتجاتنا من خلال اتقان فن القهوة.",
    },
    en: {
      title: "Innovation approach",
      body: "We strive with every effort to exceed expectations and create a flexible and renewable approach, so we are constantly working to open new horizons and upgrade our products by mastering the art of coffee.",
    },
    image: "/brand/gallery/scene-09.jpg",
  },
  {
    id: "sustainability",
    ar: {
      title: "استدامة وعدالة",
      body: "لأن البيئة تهمنا نحرص على اختيار مزارع قهوة تهتم باستدامة الأرض، وننشر الوعي بأهمية القهوة العادلة، لنترك أثرنا الإيجابي على البيئة والمجتمع حولنا.",
    },
    en: {
      title: "Sustainability and fairness",
      body: "Because the environment is important to us, we are keen to choose coffee farms that care about the sustainability of the Earth, and we spread awareness of the importance of fair coffee, to leave our positive impact on the environment and society around us.",
    },
    image: "/brand/gallery/interior-09.jpg",
  },
];
