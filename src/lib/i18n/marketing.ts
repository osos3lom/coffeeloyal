/**
 * Copy for the public brand site.
 *
 * Kept separate from translations.ts, which covers the authenticated app.
 * Branch and menu records live in src/lib/content — those are data with
 * ar/en fields, not translation keys.
 */

import type { Lang } from "./translations";

export interface MarketingCopy {
  nav: {
    home: string;
    about: string;
    menu: string;
    stores: string;
    gallery: string;
    contact: string;
    rewards: string;
    join: string;
    myRewards: string;
    order: string;
    scan: string;
    language: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    tagline: string;
    lede: string;
    primary: string;
    secondary: string;
    scroll: string;
  };
  trust: { branches: string; cities: string; craft: string };
  heritage: {
    eyebrow: string;
    title: string;
    quote: string;
    body1: string;
    body2: string;
    cta: string;
  };
  craft: { eyebrow: string; title: string; lede: string };
  menu: {
    eyebrow: string;
    title: string;
    lede: string;
    signature: string;
    cta: string;
    currency: string;
    regular: string;
    large: string;
    addToOrder: string;
    added: string;
    all: string;
  };
  loyalty: {
    eyebrow: string;
    title: string;
    lede: string;
    step1Title: string;
    step1Body: string;
    step2Title: string;
    step2Body: string;
    step3Title: string;
    step3Body: string;
    cta: string;
    ctaSignedIn: string;
    cardLabel: string;
    cardProgress: string;
  };
  gallery: { eyebrow: string; title: string; lede: string; cta: string };
  stores: {
    eyebrow: string;
    title: string;
    lede: string;
    cta: string;
    search: string;
    noResults: string;
    directions: string;
    orderHere: string;
    branchCount: string;
    useLocation: string;
    locating: string;
    nearest: string;
    nearestTo: string;
    away: string;
    you: string;
    approximate: string;
    locationDenied: string;
    locationUnavailable: string;
    showOnMap: string;
    mapNote: string;
  };
  order: {
    eyebrow: string;
    title: string;
    lede: string;
    chooseBranch: string;
    changeBranch: string;
    pickupFrom: string;
    cart: string;
    empty: string;
    emptyHint: string;
    subtotal: string;
    total: string;
    notes: string;
    notesPlaceholder: string;
    place: string;
    placing: string;
    signInToOrder: string;
    payAtCounter: string;
    switchBranchTitle: string;
    switchBranchBody: string;
    switchBranchConfirm: string;
    cancel: string;
    placed: string;
    placedBody: string;
    viewOrders: string;
    remove: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lede: string;
    callUs: string;
    emailUs: string;
    whatsapp: string;
    headOffice: string;
    follow: string;
  };
  about: {
    eyebrow: string;
    title: string;
    storyTitle: string;
    story1: string;
    story2: string;
    valuesTitle: string;
    valuesLede: string;
  };
  footer: {
    tagline: string;
    explore: string;
    company: string;
    contact: string;
    rights: string;
  };
}

const ar: MarketingCopy = {
  nav: {
    home: "الرئيسية",
    about: "من نحن",
    menu: "القائمة",
    stores: "فروعنا",
    gallery: "معرض الصور",
    contact: "اتصل بنا",
    rewards: "المكافآت",
    join: "انضم إلينا",
    myRewards: "مكافآتي",
    order: "اطلب",
    scan: "مسح",
    language: "اللغة",
  },
  hero: {
    eyebrow: "منذ ١٩٩٣ · من جدة",
    title: "قهوة الأمراء",
    tagline: "رشفة من الفخامة واللذة",
    lede: "قهوة سعودية مختصة، تُحمّص بعناية وتُقدّم بكرم الضيافة، في سبعة وثلاثين فرعاً.",
    primary: "انضم لبرنامج الولاء",
    secondary: "تصفح القائمة",
    scroll: "اكتشف",
  },
  trust: {
    branches: "٣٧ فرعاً",
    cities: "جدة · مكة · الطائف",
    craft: "حبٌّ مُنتقى بعناية",
  },
  heritage: {
    eyebrow: "من نحن",
    title: "لكل كوبٍ قصة، ولكل رشفةٍ رحلة",
    quote: "لكل كوبٍ قصة، ولكل رشفةٍ رحلة",
    body1:
      "تبدأ الحكاية من حبّة بنٍّ مُحمّصة، تقطع طريقها من المزرعة إلى المحمصة، ثم إلى فنجانٍ يُقدَّم بين يديك.",
    body2:
      "نحن لا نقدّم القهوة وحدها، بل نقدّم تجربةً كاملة: مكانٌ هادئ، واستقبالٌ كريم، ورشفةٌ تستحق الانتظار.",
    cta: "اقرأ قصتنا",
  },
  craft: {
    eyebrow: "لماذا قهوة الأمراء",
    title: "الحرفة في التفاصيل",
    lede: "ستة مبادئ تحكم كل فنجانٍ نقدّمه.",
  },
  menu: {
    eyebrow: "القائمة",
    title: "ما نقدّمه",
    lede: "قهوة مختصة، مشروبات باردة، شاي، ومخبوزات طازجة كل صباح.",
    signature: "اختياراتنا المميزة",
    cta: "القائمة كاملة",
    currency: "ر.س",
    regular: "وسط",
    large: "كبير",
    addToOrder: "أضف للطلب",
    added: "أُضيف",
    all: "الكل",
  },
  loyalty: {
    eyebrow: "برنامج الولاء",
    title: "بطاقة الأختام الملكية",
    lede: "اجمع أختامك مع كل رشفة، واحصل على مشروبك المجاني.",
    step1Title: "امسح",
    step1Body: "امسح رمز الباريستا عند الطلب.",
    step2Title: "اجمع",
    step2Body: "يُضاف ختمٌ إلى بطاقتك في كل زيارة.",
    step3Title: "استمتع",
    step3Body: "أكمل بطاقتك واستلم مشروبك المجاني.",
    cta: "أنشئ حسابك",
    ctaSignedIn: "بطاقتي",
    cardLabel: "بطاقة الأختام",
    cardProgress: "ختمان يفصلانك عن مشروبك المجاني",
  },
  gallery: {
    eyebrow: "الضيافة",
    title: "مساحةٌ تدعوك للبقاء",
    lede: "من تفاصيل المكان إلى تفاصيل الفنجان.",
    cta: "معرض الصور",
  },
  stores: {
    eyebrow: "فروعنا",
    title: "قريبون منك",
    lede: "سبعة وثلاثون فرعاً في جدة ومكة المكرمة والطائف.",
    cta: "كل الفروع",
    search: "ابحث عن فرع أو حي",
    noResults: "لا توجد فروع مطابقة",
    directions: "الاتجاهات",
    orderHere: "اطلب من هنا",
    branchCount: "فرعاً",
    useLocation: "اعثر على الأقرب إليّ",
    locating: "جارٍ تحديد موقعك...",
    nearest: "الأقرب إليك",
    nearestTo: "أقرب فرع",
    away: "يبعد",
    you: "موقعك",
    approximate: "الموقع تقريبي",
    locationDenied: "لم يتم السماح بالوصول إلى الموقع. يمكنك البحث عن فرعك يدوياً.",
    locationUnavailable: "تعذّر تحديد موقعك. يمكنك البحث عن فرعك يدوياً.",
    showOnMap: "أظهر على الخريطة",
    mapNote: "مواقع الفروع على الخريطة تقريبية. استخدم زر الاتجاهات للوصول الدقيق.",
  },
  order: {
    eyebrow: "استلام من الفرع",
    title: "اطلب واستلم",
    lede: "اختر فرعك، جهّز طلبك، واستلمه من المنضدة.",
    chooseBranch: "اختر الفرع",
    changeBranch: "تغيير الفرع",
    pickupFrom: "الاستلام من",
    cart: "طلبك",
    empty: "طلبك فارغ",
    emptyHint: "أضف شيئاً من القائمة لتبدأ.",
    subtotal: "المجموع",
    total: "الإجمالي",
    notes: "ملاحظات",
    notesPlaceholder: "بدون سكر، حليب إضافي...",
    place: "أرسل الطلب",
    placing: "جارٍ الإرسال...",
    signInToOrder: "سجّل الدخول لإتمام الطلب",
    payAtCounter: "الدفع عند الاستلام",
    switchBranchTitle: "تغيير الفرع؟",
    switchBranchBody: "طلبك الحالي مرتبط بفرعٍ آخر. سيتم إفراغ الطلب عند التغيير.",
    switchBranchConfirm: "غيّر وأفرغ الطلب",
    cancel: "إلغاء",
    placed: "تم استلام طلبك",
    placedBody: "سنجهّزه حالاً. اعرض رقم الطلب عند المنضدة.",
    viewOrders: "طلباتي",
    remove: "إزالة",
  },
  contact: {
    eyebrow: "اتصل بنا",
    title: "نسعد بخدمتك",
    lede: "للاستفسارات والشراكات، تواصل معنا مباشرة.",
    callUs: "اتصل بنا",
    emailUs: "راسلنا",
    whatsapp: "واتساب",
    headOffice: "المكتب الرئيسي",
    follow: "تابعنا",
  },
  about: {
    eyebrow: "من نحن",
    title: "قصة قهوة الأمراء",
    storyTitle: "قصتنا",
    story1:
      "بدأت قهوة الأمراء من إيمانٍ بسيط: أن الفنجان الجيد يستحق وقتاً، وأن الضيف يستحق أفضل ما لدينا.",
    story2:
      "اليوم نخدم ضيوفنا في سبعة وثلاثين فرعاً بين جدة ومكة المكرمة والطائف، بالمبادئ نفسها التي بدأنا بها.",
    valuesTitle: "قيمنا",
    valuesLede: "ما نلتزم به في كل فرعٍ وكل فنجان.",
  },
  footer: {
    tagline: "رشفة من الفخامة واللذة",
    explore: "تصفح",
    company: "الشركة",
    contact: "تواصل",
    rights: "جميع الحقوق محفوظة لقهوة الأمراء",
  },
};

const en: MarketingCopy = {
  nav: {
    home: "Home",
    about: "About",
    menu: "Menu",
    stores: "Stores",
    gallery: "Gallery",
    contact: "Contact",
    rewards: "Rewards",
    join: "Join",
    myRewards: "My Rewards",
    order: "Order",
    scan: "Scan",
    language: "Language",
  },
  hero: {
    eyebrow: "Since 1993 · From Jeddah",
    title: "Princes' Coffee",
    tagline: "A sip of luxury and delight",
    lede: "Saudi specialty coffee, roasted with care and served with genuine hospitality, across thirty-seven branches.",
    primary: "Join the loyalty programme",
    secondary: "Browse the menu",
    scroll: "Discover",
  },
  trust: {
    branches: "37 Branches",
    cities: "Jeddah · Makkah · Taif",
    craft: "Carefully selected beans",
  },
  heritage: {
    eyebrow: "About us",
    title: "Every cup has a story, every sip a journey",
    quote: "Every cup has a story, every sip a journey",
    body1:
      "It begins with a roasted bean making its way from the farm to the roastery, and then to a cup served into your hands.",
    body2:
      "We do not serve coffee alone. We serve the whole experience: a quiet room, a generous welcome, and a sip worth waiting for.",
    cta: "Read our story",
  },
  craft: {
    eyebrow: "Why Princes' Coffee",
    title: "The craft is in the detail",
    lede: "Six principles behind every cup we serve.",
  },
  menu: {
    eyebrow: "The menu",
    title: "What we serve",
    lede: "Specialty coffee, cold drinks, tea, and pastries baked fresh each morning.",
    signature: "Our signatures",
    cta: "See the full menu",
    currency: "SAR",
    regular: "Regular",
    large: "Large",
    addToOrder: "Add to order",
    added: "Added",
    all: "All",
  },
  loyalty: {
    eyebrow: "Loyalty programme",
    title: "The Royal Stamp Card",
    lede: "Collect a stamp with every sip, and earn your drink on us.",
    step1Title: "Scan",
    step1Body: "Scan the barista's code when you order.",
    step2Title: "Collect",
    step2Body: "A stamp is added to your card on every visit.",
    step3Title: "Enjoy",
    step3Body: "Complete your card and claim your free drink.",
    cta: "Create your account",
    ctaSignedIn: "My stamp card",
    cardLabel: "Stamp card",
    cardProgress: "Two stamps from your free drink",
  },
  gallery: {
    eyebrow: "Hospitality",
    title: "A room that invites you to stay",
    lede: "From the details of the space to the details of the cup.",
    cta: "View the gallery",
  },
  stores: {
    eyebrow: "Our branches",
    title: "Close to you",
    lede: "Thirty-seven branches across Jeddah, Makkah and Taif.",
    cta: "All branches",
    search: "Search a branch or district",
    noResults: "No matching branches",
    directions: "Directions",
    orderHere: "Order from here",
    branchCount: "branches",
    useLocation: "Find my nearest branch",
    locating: "Finding your location...",
    nearest: "Nearest to you",
    nearestTo: "Nearest branch",
    away: "away",
    you: "Your location",
    approximate: "Approximate location",
    locationDenied: "Location access was declined. You can search for your branch instead.",
    locationUnavailable: "We could not determine your location. You can search for your branch instead.",
    showOnMap: "Show on map",
    mapNote: "Branch pins are approximate. Use Directions for exact navigation.",
  },
  order: {
    eyebrow: "Branch pickup",
    title: "Order & collect",
    lede: "Pick your branch, build your order, collect it at the counter.",
    chooseBranch: "Choose a branch",
    changeBranch: "Change branch",
    pickupFrom: "Collect from",
    cart: "Your order",
    empty: "Your order is empty",
    emptyHint: "Add something from the menu to begin.",
    subtotal: "Subtotal",
    total: "Total",
    notes: "Notes",
    notesPlaceholder: "No sugar, extra milk...",
    place: "Place order",
    placing: "Placing...",
    signInToOrder: "Sign in to place your order",
    payAtCounter: "Pay at the counter",
    switchBranchTitle: "Change branch?",
    switchBranchBody:
      "Your current order belongs to a different branch. Changing will empty it.",
    switchBranchConfirm: "Change and empty",
    cancel: "Cancel",
    placed: "Order received",
    placedBody: "We're preparing it now. Show your order number at the counter.",
    viewOrders: "My orders",
    remove: "Remove",
  },
  contact: {
    eyebrow: "Contact",
    title: "We'd be glad to help",
    lede: "For enquiries and partnerships, reach us directly.",
    callUs: "Call us",
    emailUs: "Email us",
    whatsapp: "WhatsApp",
    headOffice: "Head office",
    follow: "Follow us",
  },
  about: {
    eyebrow: "About",
    title: "The Princes' Coffee story",
    storyTitle: "Our story",
    story1:
      "Princes' Coffee began with a simple belief: a good cup deserves time, and a guest deserves the best of what we have.",
    story2:
      "Today we serve our guests across thirty-seven branches in Jeddah, Makkah and Taif, on the same principles we started with.",
    valuesTitle: "Our values",
    valuesLede: "What we hold to in every branch and every cup.",
  },
  footer: {
    tagline: "A sip of luxury and delight",
    explore: "Explore",
    company: "Company",
    contact: "Contact",
    rights: "All rights reserved to Princes' Coffee",
  },
};

export const marketing: Record<Lang, MarketingCopy> = { ar, en };

export function useMarketingCopy(lang: Lang): MarketingCopy {
  return marketing[lang] ?? ar;
}
