/**
 * Copy for the public brand site.
 *
 * Sourced verbatim from princes.sa (Arabic and official English pages).
 */

import type { Lang } from "./translations";

export interface MarketingCopy {
  nav: {
    home: string;
    about: string;
    menu: string;
    stores: string;
    gallery: string;
    blog: string;
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
  trust: {
    branches: string;
    cities: string;
    craft: string;
    strip: string;
  };
  heritage: {
    eyebrow: string;
    title: string;
    quote: string;
    body1: string;
    body2: string;
    cta: string;
  };
  craft: {
    eyebrow: string;
    title: string;
    lede: string;
  };
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
    storyLead: string;
    story1: string;
    story2: string;
    tagline: string[];
    mission: {
      title: string;
      lead: string;
      body: string;
    };
    vision: {
      title: string;
      lead: string;
      body: string;
    };
    ceo: {
      title: string;
      lead: string;
      body1: string;
      body2: string;
    };
    valuesTitle: string;
    valuesLede: string;
  };
  blog: {
    eyebrow: string;
    title: string;
    lede: string;
    readMore: string;
    backToBlog: string;
    availableInArabic: string;
    allArticles: string;
    latestArticles: string;
  };
  caffeine: {
    note: string;
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
    blog: "المدونة",
    contact: "اتصل بنا",
    rewards: "المكافآت",
    join: "انضم إلينا",
    myRewards: "مكافآتي",
    order: "اطلب",
    scan: "مسح",
    language: "اللغة",
  },
  hero: {
    eyebrow: "منذ ١٩٩٣ · جدة",
    title: "قهوة الأمراء",
    tagline: "رشفة من الفخامة واللذة.",
    lede: "لكل كوبٍ قصة، ولكل رشفةٍ رحلة.",
    primary: "تصفح القائمة",
    secondary: "انضم لبرنامج الولاء",
    scroll: "اكتشف",
  },
  trust: {
    branches: "٣٧ فرعاً",
    cities: "جدة · مكة · الطائف",
    craft: "حبٌّ مُنتقى بعناية",
    strip: "منذ ١٩٩٣ · ٣٧ فرعاً · جدة · مكة · الطائف",
  },
  heritage: {
    eyebrow: "من نحن",
    title: "لكل كوبٍ قصة، ولكل رشفةٍ رحلة",
    quote: "لكل كوبٍ قصة، ولكل رشفةٍ رحلة.",
    body1:
      "كل مشروب في قهوة الأمراء له رحلة ومغامرة تبدأ بعبق حبوب القهوة المحمصة التي تثير سمفونية من النكهات، فتأخذك في تجربةٍ استثنائية وفريدة.",
    body2:
      "نحن لا نقدّم القهوة وحدها، بل نقدّم تجربةً كاملة: مكانٌ هادئ، واستقبالٌ كريم، ورشفةٌ تستحق الانتظار.",
    cta: "اقرأ قصتنا",
  },
  craft: {
    eyebrow: "قهوة الأمراء",
    title: "لماذا نحن",
    lede: "أقوى المعايير لمزاج قهوةٍ لا يُقاوم.",
  },
  menu: {
    eyebrow: "القائمة",
    title: "مشروباتنا ومخبوزاتنا",
    lede: "مذاقٌ لا مثيل له مع كل رشفة.",
    signature: "اختياراتنا المميزة",
    cta: "القائمة كاملة",
    currency: "ريال",
    regular: "وسط",
    large: "كبير",
    addToOrder: "أضف للطلب",
    added: "أُضيف",
    all: "الكل",
  },
  loyalty: {
    eyebrow: "برنامج الولاء",
    title: "بطاقة الأختام الملكية",
    lede: "اجمع أختامك مع كل رشفة واحصل على مشروبك المجاني.",
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
    title: "قريبون منك في كل مكان",
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
    lede: "للاستفسارات والطلب، تواصل معنا مباشرة.",
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
    storyLead: "من كوب قهوةٍ، إلى قصةٍ تُروى",
    story1:
      "نشأت شركة قهوة الأمراء في عام 1993 كعضو في مجموعة بن بنيان التجارية، ومن البداية كان حب القهوة هو شغفنا والتميّز هدفنا. تحدينا العقبات واحتضنا التغيير وزاد شغفنا بالقهوة، فالتزمنا بالجودة في كل مشروب وكل فرع. واليوم تملك قهوة الأمراء أكثر من 35 مقهى، كل فرع منها هو شاهدٌ على تاريخنا الغني وتفانينا في مهمة تحضير أفضل قهوة في العالم.",
    story2:
      "انغمِس في عبق القهوة ورائحتها المخملية مع قهوة الأمراء واستمتع بمذاقٍ لا مثيل له! دع كل رشفة تنقلك إلى عالم من النكهات والتجارب. وسواء كنت تفضل أن تقضي وقتك في أحد مقاهينا أو تحب شرب كوب قهوتك براحة في منزلك فإن مجموعتنا من المشروبات هي قصةٌ تستحق أن تُروى وذكرى تستحق أن تُعاش.",
    tagline: ["تاريخٌ عريقٌ،", "لمستقبلٍ مشرق."],
    mission: {
      title: "رسالتنا",
      lead: "نصنع تجربة قهوة استثنائية",
      body: "بالعمل الدؤوب والابتكار والتطور باستمرار نعمل لنبقى في طليعة المجال، ونسعى للحفاظ على وعدنا بجلب قهوة استثنائية وتجربة فريدة لعملائنا، فنهتم بالتخطيط الدقيق والمتفاني لنحقق تطلعاتنا بخلق مقهى يلبي احتياج رواد عالم القهوة ويكون صديق للبيئة.",
    },
    vision: {
      title: "رؤيتنا",
      lead: "أن نكون رواد القهوة المختصة",
      body: "نطمح أن نصبح شركة عالمية رائدة في مجال القهوة المتخصصة، وبناء مقاهي تساهم برفع جودة حياة المجتمع وتدعم الاستدامة",
    },
    ceo: {
      title: "رسالة الرئيس التنفيذي",
      lead: "مزيجٌ من الشغف والأهداف في كوب قهوة.",
      body1:
        "منذ نشأتنا كرسنا جهودنا للتأكد من أن قهوتنا تحافظ على الجودة على مدى أجيال. ومن منطلق الالتزام بجذورنا حافظنا على أصالتنا، كما نحرص على استدامة القهوة لنمنح الأجيال القادمة فرصة للاستمتاع بحبوب البن كما حظينا.",
      body2:
        "شغفنا يتجاوز تحضير قهوة استثنائية، إذ نؤمن بالسعي الجاد لتحقيق الاستدامة، والتحول من البلاستيك إلى الورق لمصلحة كوكبنا. ونطمح أن نجعل العالم مكانًا أفضل مع كل كوب قهوة مثالي في كل مرة.",
    },
    valuesTitle: "قيمنا",
    valuesLede: "أقوى المعايير لمزاج قهوةٍ لا يُقاوم.",
  },
  blog: {
    eyebrow: "قهوة الأمراء",
    title: "المدونة",
    lede: "مقالات وقصص عن ثقافة القهوة، تاريخها وفوائدها الصحية.",
    readMore: "اقرأ المقال",
    backToBlog: "العودة للمدونة",
    availableInArabic: "متوفر بالعربية",
    allArticles: "جميع المقالات",
    latestArticles: "أحدث المقالات",
  },
  caffeine: {
    note: "قد تكون القهوة حبة سحرية، لكنها ليست مثالية يمكن أن يسبب الإفراط في تناول الكافيين الجفاف التوتر والقلق، كما أن الإفراط في تناول الكافيين يمكن أن يتعارض مع النوم الجيد ليلاً، خاصةً إذا كنت تشربه في وقت متأخر من النهار.",
  },
  footer: {
    tagline: "رشفة من الفخامة واللذة.",
    explore: "تصفح",
    company: "الشركة",
    contact: "تواصل",
    rights: "جميع الحقوق محفوظة لقهوة الأمراء",
  },
};

const en: MarketingCopy = {
  nav: {
    home: "Home",
    about: "About Us",
    menu: "Menu",
    stores: "Our Branches",
    gallery: "Photo Gallery",
    blog: "Blog",
    contact: "Contact Us",
    rewards: "Rewards",
    join: "Join",
    myRewards: "My Rewards",
    order: "Order",
    scan: "Scan",
    language: "Language",
  },
  hero: {
    eyebrow: "Since 1993 · Jeddah",
    title: "Princes' Coffee",
    tagline: "A sip of bliss, a gulp of luxury.",
    lede: "Every cup has a story, every sip a journey.",
    primary: "Browse the Menu",
    secondary: "Join Loyalty Program",
    scroll: "Discover",
  },
  trust: {
    branches: "37 Branches",
    cities: "Jeddah · Makkah · Taif",
    craft: "Carefully selected beans",
    strip: "Since 1993 · 37 Branches · Jeddah · Makkah · Taif",
  },
  heritage: {
    eyebrow: "About Us",
    title: "Every cup has a story, every sip a journey",
    quote: "Every cup has a story, every sip a journey.",
    body1:
      "At Princes’ Coffee, each sip is a perfectly brewed adventure. The scent of our coffee prepares your tastebuds for a symphony of flavors, teleporting you into a world of happiness, comfort, and exquisite taste.",
    body2:
      "We do not serve coffee alone. We serve the whole experience: a quiet room, a generous welcome, and a sip worth waiting for.",
    cta: "Read our story",
  },
  craft: {
    eyebrow: "Princes' Coffee",
    title: "Why Us",
    lede: "The strongest criteria for an irresistible coffee mood.",
  },
  menu: {
    eyebrow: "Our Menu",
    title: "What We Serve",
    lede: "Unparalleled flavor with every sip.",
    signature: "Our Signatures",
    cta: "Full Menu",
    currency: "SAR",
    regular: "Regular",
    large: "Large",
    addToOrder: "Add to order",
    added: "Added",
    all: "All",
  },
  loyalty: {
    eyebrow: "Loyalty Program",
    title: "The Royal Stamp Card",
    lede: "Collect stamps with every sip and earn your free drink.",
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
    title: "A space that invites you to stay",
    lede: "From the details of the space to the details of the cup.",
    cta: "View the gallery",
  },
  stores: {
    eyebrow: "Our Branches",
    title: "Close to you everywhere",
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
    eyebrow: "Contact Us",
    title: "We'd be glad to help",
    lede: "For enquiries and partnerships, reach us directly.",
    callUs: "Call us",
    emailUs: "Email us",
    whatsapp: "WhatsApp",
    headOffice: "Head office",
    follow: "Follow us",
  },
  about: {
    eyebrow: "About Us",
    title: "The Princes' Coffee Story",
    storyTitle: "Our story",
    storyLead: "From a cup of coffee to a story to tell",
    story1:
      "Princes coffee company was established in 1993 as a member of Ben Bunyan trading group, and from the very beginning the love of coffee was our passion and excellence was our goal. We have defied obstacles, embraced change and increased our passion for coffee, committing to quality in every drink and every branch. Today, Princes coffee owns more than 35 cafes, each branch of which is a testament to our rich history and dedication to the task of preparing the best coffee in the world.",
    story2:
      "Immerse yourself in the fragrant and velvety aroma of coffee with Princes ' coffee and enjoy an unparalleled taste! Let every sip take you into a world of flavors and experiments. Whether you prefer to spend your time in one of our cafes or like to drink your cup of coffee from the comfort of your own home, our range of drinks is a story worth telling and a memory worth living.",
    tagline: ["Ancient history,", "For a bright future."],
    mission: {
      title: "Our mission",
      lead: "We craft an exceptional coffee experience",
      body: "We strive to keep our promise to bring exceptional coffee and a unique experience to our customers, we are interested in careful and dedicated planning to achieve our aspirations by creating a cafe that meets the needs of the pioneers of the coffee world and is environmentally friendly.",
    },
    vision: {
      title: "Our vision",
      lead: "To be the pioneers of specialty coffee",
      body: "we aspire to become a leading global company in the field of specialty coffee, and to build cafes that contribute to raising the quality of life of society and support sustainability",
    },
    ceo: {
      title: "Message from the CEO",
      lead: "A combination of passion and goals in a cup of coffee.",
      body1:
        "Since our inception we have dedicated our efforts to ensure that our coffee maintains quality over generations. Out of commitment to our roots, we have preserved our authenticity, and we are also keen on the sustainability of coffee to give future generations the opportunity to enjoy coffee beans as we had.",
      body2:
        "Our passion goes beyond making exceptional coffee, as we believe in striving for sustainability, and switching from plastic to paper for the benefit of our planet. We aspire to make the world a better place with every perfect cup of coffee every time.",
    },
    valuesTitle: "Our values",
    valuesLede: "The strongest criteria for an irresistible coffee mood.",
  },
  blog: {
    eyebrow: "Princes' Coffee",
    title: "Blog",
    lede: "Stories and insights on coffee culture, history, and health benefits.",
    readMore: "Read article",
    backToBlog: "Back to blog",
    availableInArabic: "Available in Arabic",
    allArticles: "All Articles",
    latestArticles: "Latest Articles",
  },
  caffeine: {
    note: "Coffee may be a magic bean, but it is not perfect. Excessive caffeine consumption can cause dehydration, tension, and anxiety. Excessive caffeine intake can also interfere with a good night's sleep, especially if you drink it late in the day.",
  },
  footer: {
    tagline: "A sip of bliss, a gulp of luxury.",
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
