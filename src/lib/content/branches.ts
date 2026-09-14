/**
 * Princes' Coffee branches — 37 locations across Jeddah, Makkah and Taif.
 * Sourced from princes.sa/فروعنا.
 *
 * Seeded into the `shops` table by sql/002_menu_and_orders.sql so that
 * loyalty, the stores page and pickup ordering all share one source of truth.
 */

export type City = "jeddah" | "makkah" | "taif";

export interface Branch {
  slug: string;
  city: City;
  ar: string;
  en: string;
  addressAr: string;
  addressEn: string;
}

export const cities: { id: City; ar: string; en: string }[] = [
  { id: "jeddah", ar: "جدة", en: "Jeddah" },
  { id: "makkah", ar: "مكة المكرمة", en: "Makkah" },
  { id: "taif", ar: "الطائف", en: "Taif" },
];

export const branches: Branch[] = [
  // ---------- Jeddah (14) ----------
  { slug: "sulaimaniyah", city: "jeddah", ar: "السليمانية", en: "Al-Sulaimaniyah", addressAr: "أبرق الرغامة، جدة ٢٢٢٦١", addressEn: "Abraq Al Raghamah, Jeddah 22261" },
  { slug: "rahili-makkah-road", city: "jeddah", ar: "الراحيلي - طريق مكة", en: "Al-Rahili Makkah Road", addressAr: "٤٠٩٣ طريق مكة جدة السريع، الأجواد، جدة ٢٢٤٤١", addressEn: "4093 Makkah-Jeddah Hwy, Alajaweed, Jeddah 22441" },
  { slug: "jamiaa", city: "jeddah", ar: "الجامعة", en: "Al-Jamiaa", addressAr: "٢٠٧٤ المرتضى الشيزري، السليمانية، جدة ٢٢٢٥٣", addressEn: "2074 Al Murtadi Ash Shayzari, Al-Sulaimaniyah, Jeddah 22253" },
  { slug: "rabwah", city: "jeddah", ar: "الربوة", en: "Al-Rabwah", addressAr: "شارع حراء، الربوة، جدة ٢٣٥٣٦", addressEn: "Hira St, Ar Rabwah, Jeddah 23536" },
  { slug: "quraish", city: "jeddah", ar: "قريش", en: "Quraish", addressAr: "السلامة، جدة ٢٣٤٣٧", addressEn: "As Salamah, Jeddah 23437" },
  { slug: "hamdaniyah", city: "jeddah", ar: "الحمدانية", en: "Al-Hamdaniyah", addressAr: "٢٨٧٧ أبو فراس الحمداني، الفلاح، جدة ٢٣٧٦٢", addressEn: "2877 Abu Firas Al-Hamdani, Al-Felah, Jeddah 23762" },
  { slug: "halqa", city: "jeddah", ar: "الحلقة", en: "Al-Halqa", addressAr: "أم القرى، الصفا، جدة ٢٣٤٥٥", addressEn: "Um Al-Qura, As-Safa, Jeddah 23455" },
  { slug: "dhahban", city: "jeddah", ar: "ذهبان", en: "Dhahban", addressAr: "ذهبان، جدة ٢٣٨٧٢", addressEn: "V4XF+4J, Jeddah 23872" },
  { slug: "kabri-al-muraba", city: "jeddah", ar: "كبري المربع", en: "Kabri Al-Muraba", addressAr: "٧٠٧١ سعود الفيصل، الفيصلية، جدة ٢٣٤٤١", addressEn: "7071 Saud Al-Faisal, Al-Faysaliyah, Jeddah 23441" },
  { slug: "tahlia-mall", city: "jeddah", ar: "التحلية مول", en: "Al-Tahlia Mall", addressAr: "التحلية مول، الروضة، جدة ٢٣٤٣١", addressEn: "Al-Tahlia Mall, Al-Rawdah, Jeddah 23431" },
  { slug: "corniche", city: "jeddah", ar: "الكورنيش - الواجهة البحرية", en: "Corniche Waterfront", addressAr: "طريق الكورنيش الفرعي، الشاطئ، جدة ٢٣٥١٠", addressEn: "Corniche Secondary Road, Beach, Jeddah 23510" },
  { slug: "abhor", city: "jeddah", ar: "أبحر", en: "Abhor", addressAr: "شارع الأمير عبد المجيد الفرعي، الصواري، جدة ٢٣٨٢٦", addressEn: "Prince Abdul Majeed Secondary St, As-Sawari, Jeddah 23826" },
  { slug: "rayan", city: "jeddah", ar: "الريان", en: "Al-Rayan", addressAr: "شارع الوليد بن هشام بن معاوية، الريان، جدة ٢٣٦٤٣", addressEn: "Walid bin Hisham bin Muawiyah St, Al-Rayan, Jeddah 23643" },
  { slug: "taysir", city: "jeddah", ar: "التيسير", en: "Al-Taysir", addressAr: "٣٣٥٩ شارع فلسطين، المريخ، جدة ٢٣٢٥٢", addressEn: "3359 Palestine St, Marikh, Jeddah 23252" },

  // ---------- Makkah (20) ----------
  { slug: "zaidi", city: "makkah", ar: "الزايدي", en: "Al-Zaidi", addressAr: "الحمراء وأم الجود، مكة المكرمة ٢٤٣٣١", addressEn: "Al-Hamra and Um Al-Jood, Mecca 24331" },
  { slug: "kokayyah", city: "makkah", ar: "الكعكية", en: "Al-Kokayyah", addressAr: "الشوقية، مكة المكرمة ٢٤٣٥١", addressEn: "Al Shoqiyah, Mecca 24351" },
  { slug: "shawqiyyah", city: "makkah", ar: "الشوقية", en: "Al-Shawqiyyah", addressAr: "الشوقية، مكة المكرمة ٢٤٣٥١", addressEn: "9QMQ+X2J, Mecca 24351" },
  { slug: "juranah", city: "makkah", ar: "الجعرانة", en: "Al-Ju'ranah", addressAr: "الشرائع الشمالية، مكة المكرمة", addressEn: "Al Sharai' Ash Shamaliyyah, Mecca" },
  { slug: "jumum", city: "makkah", ar: "الجموم", en: "Al-Jumum", addressAr: "الخالدية، الجموم ٢٥٣٤١", addressEn: "Alkhaldiyah, Al Jumum 25341" },
  { slug: "bahrah-1", city: "makkah", ar: "بحرة ١", en: "Bahrah 1", addressAr: "بحرة، مكة المكرمة", addressEn: "9CXQ+J5C Bahrah" },
  { slug: "sharai", city: "makkah", ar: "الشرائع", en: "Al-Sharai", addressAr: "٨٧٣٨ نهاوند، الرشيدية، مكة المكرمة ٢٤٢٦٩", addressEn: "8738-8720 Nahavand, Ar Rashidiyyah, Mecca 24269" },
  { slug: "khadra", city: "makkah", ar: "الخضراء", en: "Al-Khadra", addressAr: "محمد صالح إبراهيم خوزامي، الخضراء، مكة المكرمة ٢٤٢٦٧", addressEn: "Muhammad Saleh Ibrahim Khouzami, Al Khadra, Mecca 24267" },
  { slug: "nawaria", city: "makkah", ar: "النوارية", en: "Al-Nawaria", addressAr: "طريق مكة المدينة، مكة المكرمة ٢٤٤١٩", addressEn: "Mecca-Medina Road, Mecca 24419" },
  { slug: "areeshi", city: "makkah", ar: "العريشي", en: "Al-Areeshi", addressAr: "العوالي، مكة المكرمة ٢٤٣٨٨", addressEn: "Al-Awali, Mecca 24388" },
  { slug: "nuzha", city: "makkah", ar: "النزهة", en: "Al-Nuzha", addressAr: "٧٠٦١ الزهراء، مكة المكرمة ٢٤٢٢١", addressEn: "7061 13, 2918, Az-Zahra, Mecca 24221" },
  { slug: "bohairat", city: "makkah", ar: "البحيرات", en: "Al-Bohairat", addressAr: "البحيرات، مكة المكرمة ٢٤٢٢٧", addressEn: "Al-Bohairat, Mecca 24227" },
  { slug: "umrah", city: "makkah", ar: "العمرة", en: "Al-Umrah", addressAr: "العمرة الجديدة، مكة المكرمة ٢٤٤١٤", addressEn: "Al Umrah Al Jadidah, Mecca 24414" },
  { slug: "bahrah-2", city: "makkah", ar: "بحرة ٢", en: "Bahrah 2", addressAr: "بحرة ٢٢٨٤٣", addressEn: "Bahrah 22843" },
  { slug: "husainiyyah", city: "makkah", ar: "الحسينية", en: "Al-Husainiyyah", addressAr: "طريق الحسينية، مكة المكرمة ٢٤٣٧٥", addressEn: "Husainiyyah Road, Mecca 24375" },
  { slug: "sharai-rashidiyyah", city: "makkah", ar: "الشرائع - الرشيدية", en: "Al-Sharai Al-Rashidiyyah", addressAr: "عمرو بن الطفيل بن عمرو، حي الكوثر، مكة المكرمة", addressEn: "Amr bin At-Tufail bin Amr, Al-Kawthar District, Mecca" },
  { slug: "hara", city: "makkah", ar: "حراء", en: "Hara", addressAr: "المدينة الصناعية، البحيرات، مكة المكرمة", addressEn: "Al-Bohairat Industrial City, Mecca" },
  { slug: "hada", city: "makkah", ar: "الهدا", en: "Hada", addressAr: "طريق مكة جدة القديم، مكة المكرمة", addressEn: "Old Mecca-Jeddah Road, Mecca" },
  { slug: "um-al-jood", city: "makkah", ar: "أم الجود", en: "Um Al-Jood", addressAr: "الحمراء وأم الجود، مكة المكرمة", addressEn: "Al-Hamra and Um Al-Jood, Mecca" },
  { slug: "muzdalifah", city: "makkah", ar: "مزدلفة", en: "Muzdalifah", addressAr: "طريق المشاة، المشاعر المقدسة، مكة المكرمة", addressEn: "Pedestrian Road, Sacred Sites, Mecca" },

  // ---------- Taif (3) ----------
  { slug: "wessam-1", city: "taif", ar: "الوسام ١", en: "Al-Wessam 1", addressAr: "شارع عمر بن الخطاب، حي الأخباب، الطائف", addressEn: "Omar bin Al-Khattab St, Al-Akhabab District, Taif" },
  { slug: "jadiyyah", city: "taif", ar: "الجادية", en: "Al-Jadiyyah", addressAr: "طريق الباحة الجنوبي، الطائف", addressEn: "J40, South Bahah Road, Taif" },
  { slug: "sil", city: "taif", ar: "السيل", en: "Al-Sil", addressAr: "محطة ساسكو، طريق السيل، الطائف", addressEn: "Sasco Station, Al-Sil Road, Taif" },
];

export const CONTACT = {
  phone: "+966539998999",
  phoneDisplay: "٩٩٩٨٩٩٩ ٥٣ ٩٦٦+",
  email: "info@princes.sa",
  addressAr: "مبنى روفان، الدور التاسع، مكتب ٩٠٣، شارع الأمير سعود الفيصل، جدة",
  addressEn:
    "Roofan Building, 9th Floor, Office 903, Prince Saud Al-Faisal Street, Jeddah",
  social: {
    instagram: "https://www.instagram.com/princescoffeesa",
    twitter: "https://twitter.com/princescoffeesa",
    facebook: "https://www.facebook.com/theprincescoffee",
  },
};

export function branchesByCity(city: City) {
  return branches.filter((b) => b.city === city);
}

export function mapsUrl(b: Branch) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Princes Coffee ${b.en} ${b.addressEn}`,
  )}`;
}

export const cityCounts = cities.map((c) => ({
  ...c,
  count: branchesByCity(c.id).length,
}));
