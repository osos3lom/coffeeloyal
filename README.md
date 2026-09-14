<div align="center" dir="rtl">

<img src="public/logo.svg" alt="CoffeeLoyal Logo" width="100" />

# كوفي لويال | CoffeeLoyal ☕
### منصة رقمية متكاملة لبرامج الولاء ومكافآت المقاهي (Multi-Tenant)

**ارتشف. اختم. اكسب.** — حل سحابي متكامل يتيح للمقاهي والمتاجر إدارة بطاقات الولاء الرقمية واستبدال المكافآت عبر رموز QR ديناميكية وفورية دون الحاجة لتطبيقات معقدة.

<p align="center">
  <a href="#-english-version">English Version 🇬🇧</a> •
  <a href="#-المميزات-الرئيسية">المميزات ✨</a> •
  <a href="#-معاينة-النظام">لقطات الشاشة 📱</a> •
  <a href="#-التقنيات-المستخدمة">التقنيات 🛠️</a> •
  <a href="#-التشغيل-والتثبيت">التثبيت والتشغيل 🚀</a> •
  <a href="#-مخطط-قاعدة-البيانات">قاعدة البيانات 🗄️</a>
</p>

[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Ready-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

<div dir="rtl">

## 📖 نبذة عن المشروع

**كوفي لويال (CoffeeLoyal)** هو نظام ولاء رقمي حديث ومفتوح المصدر مصمم خصيصاً لسوق المقاهي والمطاعم الحديثة. يحل النظام محل بطاقات الأختام الورقية التقليدية (Stamp Cards) بنظام رقمي آمن بنسبة 100٪، معتمداً على رموز QR لحظية تتغير باستمرار لمنع التلاعب وضمان حضور العميل الفعلي في الفرع.

يدعم النظام معمارية **تعدد المتاجر والفروع (Multi-Tenancy)** بحيث يمكن تشغيل منصة مركزية تخدم مئات المقاهي بشكل مستقل ومنفصل، مع واجهة مستخدم عربية بالكامل تدعم الاتجاه من اليمين إلى اليسار (RTL) بالإضافة إلى اللغة الإنجليزية.

---

## ✨ المميزات الرئيسية

* 🏢 **تعدد المستأجرين (Multi-Tenant Architecture)**: تشغيل منصة موحدة تخدم عشرات أو مئات المقاهي، لكل مقهى إعداداته المستقلة، فريقه، عملاؤه، ورصيد نقاطه.
* ⏱️ **رموز QR مؤقتة وديناميكية (Dynamic Time-Limited QR)**: يولد الموظف عند الكاشير رمز QR مشفر بصلاحية زمنية قصيرة، مما يمنع تصوير الرمز أو مشاركته خارج الفرع.
* 🎁 **نظام استرداد موثوق ومحمي (Verified Redemptions)**: عند تجميع النقاط المطلوبة، يُنشئ العميل رمز طلب استبدال مكافأة، ويقوم موظف الفرع بمسحه للتحقق من الصلاحية وصرف المشروب.
* 👥 **3 مستويات وصول وصلاحيات (Role-Based Access Control)**:
  * **العميل (Customer)**: لوحة تحكم لمتابعة رصيد الأختام في كل فرع، مسح الرموز، واستعراض واستبدال المكافآت.
  * **الموظف (Staff)**: لوحة سريعة ومحسنة للأجهزة اللوحية والمحمولة لإصدار الأختام ومسح قسائم المكافآت وعرض السجل اللحظي.
  * **المدير العام (Admin)**: مراجعة طلبات انضمام المقاهي، اعتماد الفروع، إدارة المستخدمين، ومراقبة إحصائيات المنصة.
* 🔐 **أمان عالي ومصادقة مستقلة (Self-Contained Auth)**: مصادقة بواسطة **Auth.js v5** عبر بيانات الاعتماد مع تشفير كلمات المرور باستخدام **bcrypt** وجلسات **JWT** مشفرة، مع تحديد معدل الطلبات (Rate Limiting) لكل IP دون الاعتماد على خدمات خارجية طرف ثالث.
* 🌐 **ثنائي اللغة مع دعم أصيل لـ RTL (Bilingual Arabic/English)**: واجهة عربية متقنة تتبع معايير التصميم العربي واتجاه اليمين-إلى-يسار بالكامل، مع إمكانية التبديل للإنجليزية بضغطة زر.
* 📱 **تطبيق ويب تقدمي (Installable PWA)**: تصميم يركز على شاشات الجوال أولاً (Mobile-First UI)، يدعم التثبيت المباشر على الشاشة الرئيسية (Add to Home Screen) وكاميرا مسح سريعة.
* 🗺️ **استكشاف الفروع والخرائط (Interactive Stores & Menus)**: خرائط تفاعلية للفروع (Leaflet) وقائمة منتجات مدمجة واستعراض للعلامة التجارية.

---

## 📱 معاينة النظام ولقطات الشاشة (Screenshots Showcase)

### 1️⃣ رحلة العميل — كسب الأختام ومسح الرمز (Customer Experience)
> تجربة سلسة وتفاعلية تمكّن العميل من متابعة أختامه في كل مقهى، فتح الكاميرا، ومسح الرمز من شاشة الكاشير في أجزاء من الثانية.

<div align="center">
<table>
  <tr>
    <td align="center" width="20%"><img src="docs/screenshots/06.jpg" alt="لوحة نقاط العميل" width="180"><br><b>١. رصيد الفروع</b><br><sub>عرض بطاقات المقاهي والأختام</sub></td>
    <td align="center" width="20%"><img src="docs/screenshots/07.jpg" alt="بطاقة الأختام الرقمية" width="180"><br><b>٢. بطاقة الختم</b><br><sub>سجل الأختام والنقاط (0/9)</sub></td>
    <td align="center" width="20%"><img src="docs/screenshots/08.jpg" alt="بدء الماسح الضوئي" width="180"><br><b>٣. فتح الماسح</b><br><sub>تشغيل كاميرا الـ QR المباشرة</sub></td>
    <td align="center" width="20%"><img src="docs/screenshots/09.jpg" alt="مسح الرمز المباشر" width="180"><br><b>٤. المسح الميداني</b><br><sub>مسح الشاشة عند الكاشير</sub></td>
    <td align="center" width="20%"><img src="docs/screenshots/10.jpg" alt="تأكيد كسب النقطة" width="180"><br><b>٥. تأكيد فوري</b><br><sub>إضافة النقطة بنجاح لرصيد العميل</sub></td>
  </tr>
</table>
</div>

### 2️⃣ تجربة الموظف والكاشير — إصدار الأختام (Staff & Counter Experience)
> واجهة مخصصة لموظفي الكاشير وسريعة الاستجابة لإنشاء رموز QR مؤقتة تنتهي صلاحيتها خلال 30 ثانية لمنع الاحتيال.

<div align="center">
<table>
  <tr>
    <td align="center" width="33%"><img src="docs/screenshots/03.jpg" alt="لوحة تحكم الموظف" width="200"><br><b>لوحة تحكم الموظف</b><br><sub>إحصائيات العملاء، النقاط، والمشروبات المجانية</sub></td>
    <td align="center" width="33%"><img src="docs/screenshots/04.jpg" alt="تحديد عدد النقاط" width="200"><br><b>تحديد النقاط</b><br><sub>اختيار عدد الأختام الممنوحة لكل طلب</sub></td>
    <td align="center" width="33%"><img src="docs/screenshots/05.jpg" alt="رمز QR مؤقت بعد تنازلي" width="200"><br><b>رمز QR ديناميكي مؤقت</b><br><sub>صلاحية 30 ثانية مع عد تنازلي مباشر</sub></td>
  </tr>
</table>
</div>

### 3️⃣ المصادقة وإدارة الحسابات (Authentication & Onboarding)
> نظام تسجيل دخول وإنشاء حسابات مستقل، مع دعم تحديد نوع الحساب (عميل أو مالك فرع) وأسئلة أمان للاستعادة.

<div align="center">
<table>
  <tr>
    <td align="center" width="50%"><img src="docs/screenshots/01.jpg" alt="تسجيل الدخول" width="200"><br><b>تسجيل الدخول السريع</b><br><sub>دخول آمن بالبريد وكلمة المرور المشفرة</sub></td>
    <td align="center" width="50%"><img src="docs/screenshots/02.jpg" alt="إنشاء حساب جديد" width="200"><br><b>إنشاء الحساب وتحديد الدور</b><br><sub>اختيار الدور (عميل / صاحب مقهى) مع سؤال استعادة الحساب</sub></td>
  </tr>
</table>
</div>

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

| الطبقة | التقنية المستخدمة | الوصف والدور |
| :--- | :--- | :--- |
| **إطار العمل الأساسي** | **Next.js 16 (App Router)** | معمارية Server Components وأحدث قدرات Next.js لتوفير سرعة فائقة وأداء عالي |
| **واجهة المستخدم** | **React 19** & **TypeScript** | بناء المكونات التفاعلية بأمان ونمط كودي صارم |
| **التنسيق والتصميم** | **Tailwind CSS v4** & **Radix UI** | تصميم عصري متجاوب مع السمات الحديثة ودعم كامل للـ RTL |
| **قاعدة البيانات** | **PostgreSQL** (`pg` Driver) | استعلامات SQL مكتوبة ومحسنة يدوياً بدون ORM لضمان أقصى سرعة واستقرار |
| **المصادقة والأمان** | **Auth.js v5** & **bcryptjs** | جلسات JWT مشفرة، تجزئة كلمات المرور، ونظام استعادة آمن عبر أسئلة أمان مشفرة |
| **مسح الرموز والخرائط** | **html5-qrcode** & **Leaflet** | مسح ضوئي سريع من كاميرا المتصفح مع خرائط تفاعلية للفروع |

---

## 🔄 كيف يعمل النظام؟

```mermaid
sequenceDiagram
    autonumber
    actor C as العميل (Customer)
    actor S as الكاشير / الموظف (Staff)
    participant App as منصة كوفي لويال
    participant DB as قاعدة البيانات (PostgreSQL)

    Note over S,App: عملية جمع الختم (Earning Stamp)
    S->>App: طلب توليد رمز ختم QR
    App->>DB: حفظ رمز مؤقت بصلاحية محددة
    App-->>S: عرض رمز الـ QR على شاشة الكاشير
    C->>App: فتح الكاميرا ومسح الرمز من شاشته
    App->>DB: التحقق من صلاحية الرمز وتسجيل الختم للعميل
    App-->>C: إضافة الختم لرصيد العميل فوراً

    Note over C,S: عملية استرداد المشروب المجاني (Redeeming Reward)
    C->>App: طلب استبدال النقاط بمشروب مجاني
    App-->>C: إصدار رمز QR للاستبدال
    S->>App: مسح رمز الاستبدال الخاص بالعميل
    App->>DB: تعليم المكافأة كـ "مستبدلة" وخصم النقاط
    App-->>S: تأكيد صحة الاسترداد لتسليم المشروب
```

---

## 🗄️ مخطط قاعدة البيانات (Database Schema)

يعتمد النظام على 5 جداول رئيسية مرتبطة بمعمارية الـ Multi-Tenant عبر مفتاح `shop_id`:

1. **`shops`**: بيانات المقاهي المسجلة، الرابط الفريد (Slug)، العنوان، أرقام التواصل، والحد الأدنى لنقاط المكافأة مع حالة الاعتماد (`pending` / `active`).
2. **`users`**: المستخدمون بجميع أدوارهم (`customer`, `staff`, `admin`) مع بيانات الاعتماد وأسئلة استعادة الحساب المشفرة.
3. **`qr_codes`**: رموز أختام الـ QR المؤقتة، وقت انتهائها، وقيمتها مع حالة الاستخدام لمنع إعادة استخدامها.
4. **`points`**: سجل رصيد العمليات (Ledger) لكل عميل داخل كل متجر سواء كانت اكتساب (`earn`) أو استبدال (`redeem`).
5. **`rewards`**: قسائم المكافآت المكتسبة والمستبدلة ورموز التحقق الرقمية واسم الموظف الذي قام بالصرف.

---

## 🚀 التشغيل والتثبيت (Quick Start)

### المتطلبات الأساسية
* [Node.js](https://nodejs.org) الإصدار 20.9 أو أحدث
* [PostgreSQL](https://www.postgresql.org/) (محلي أو خدمة سحابية مثل Supabase / Neon / RDS)

### خطوات التثبيت:

1. **استنساخ المستودع (Clone the repository):**
   ```bash
   git clone https://github.com/osos3lom/coffeeloyal.git
   cd coffeeloyal
   ```

2. **إعداد المتغيرات البيئية (Environment Setup):**
   ```bash
   cp .env.sample .env
   ```
   قم بفتح ملف `.env` وضبط رابط الاتصال بقاعدة البيانات ومفتاح المصادقة:
   ```env
   DATABASE_URL=postgresql://quickstamp:YOUR_PASSWORD@localhost:5432/quickstamp
   AUTH_SECRET=your_super_secret_64_char_key_here
   AUTH_URL=http://localhost:3000
   ```

3. **تهيئة قاعدة البيانات (Database Initialization):**
   قم بتنفيذ ملف السكربت `sql/init.sql` على قاعدة بيانات PostgreSQL الخاصة بك:
   ```bash
   psql -U quickstamp -d quickstamp -f sql/init.sql
   ```

4. **تثبيت الاعتماديات (Install Dependencies):**
   ```bash
   npm install
   ```

5. **تشغيل الخادم في بيئة التطوير (Run Development Server):**
   ```bash
   npm run dev
   ```
   افتح المتصفح وتوجه إلى: `http://localhost:3000`

> 🔑 **حساب المشرف الافتراضي (Default Admin):**
> * البريد الإلكتروني: `admin@quickstamp.local`
> * كلمة المرور: `admin123`
> *(يُرجى تغيير كلمة المرور فور الدخول إلى النظام في بيئة الإنتاج).*

> ⚠️ **ملاحظة تشغيل الكاميرا على الجوال:**
> تتطلب متصفحات الجوال تفعيل بروتوكول HTTPS للوصول إلى الكاميرا. يمكنك توليد شهادة محلية باستخدام [mkcert](https://github.com/FiloSottile/mkcert) داخل مجلد `certs/` والتشغيل عبر:
> ```bash
> npm run dev:https
> ```

---

## 📁 هيكلية المشروع (Project Structure)

```text
coffeeloyal/
├── sql/
│   └── init.sql            # مخطط قاعدة البيانات والبيانات الأولية
├── public/                 # الأيقونات والشعارات والأصول الثابتة
├── src/
│   ├── app/
│   │   ├── (marketing)/    # صفحات التعريف بالعلامة التجارية، الخرائط، والقوائم
│   │   ├── admin/          # لوحة تحكم الإدارة واعتماد الفروع
│   │   ├── staff/          # لوحة الموظف (إصدار ومسح رموز QR)
│   │   ├── dashboard/      # لوحة العميل وبطاقات الأختام
│   │   └── api/            # نقاط اتصال REST API الخلفية
│   ├── components/         # المكونات المشتركة وعناصر التصميم
│   ├── lib/
│   │   ├── db.ts           # موفر الاتصال بقاعدة بيانات PostgreSQL
│   │   ├── auth.ts         # إعدادات جلسات Auth.js v5 وتشفير كلمات المرور
│   │   └── i18n/           # إدارة اللغات والترجمات ودعم RTL
│   └── middleware.ts       # حماية المسارات حسب أدوار المستخدمين
└── README.md
```

---

## 🔒 معايير الأمان (Security & Hardening)

* **تشفير كلمات المرور**: استخدام خوارزمية `bcrypt` بـ Salt قوي لتشفير بيانات الاعتماد وإجابات أسئلة الأمان.
* **رموز QR لحظية**: تفعيل مدة صلاحية دقيقة لكل رمز QR لمنع النسخ أو الاحتفاظ بصور للرموز.
* **مكافحة الهجمات (Rate Limiting)**: تطبيق حماية من محاولات تسجيل الدخول المتكررة (5 محاولات لكل 15 دقيقة لكل عنوان IP).
* **حماية المسارات (Role Protection)**: نظام وسيط (Middleware) يمنع الوصول غير المصرح به للوحات الإدارة أو الموظفين.

</div>

---

<div id="-english-version"></div>

## 🇬🇧 English Version

<div align="center">

### CoffeeLoyal — Multi-Tenant Coffee Shop Loyalty Platform

**Drink. Stamp. Earn.** — A self-hosted, multi-tenant digital loyalty platform designed for coffee houses and retail brands.

</div>

### Key Highlights

* ☕ **Multi-Tenant Architecture**: Power multiple coffee shops and branches from a single deployment with segregated point balances and staff members.
* ⏱️ **Short-Lived Dynamic QR Codes**: Counter staff generate time-sensitive QR tokens that expire quickly, ensuring points can only be acquired in-store.
* 🎁 **Verified Redemptions**: Customers redeem accumulated points for rewards, generating a verification code that staff scan to issue the item.
* 👥 **Three-Tier RBAC**: Dedicated portals for **Customers** (stamp cards & rewards), **Staff** (stamp issuing & redemption validation), and **Admins** (shop approvals & system governance).
* 🔐 **Self-Contained Authentication**: Auth.js v5 with JWT session management, bcrypt hashing, and IP-level brute force protection without third-party dependencies.
* 🌐 **Bilingual with Native RTL**: Full support for Arabic (with right-to-left layout) and English out of the box.
* 📱 **Progressive Web App (PWA)**: Mobile-optimized experience with home screen install capability and fluid camera barcode scanner.
* 🗺️ **Branch Discovery & Digital Menu**: Interactive Leaflet maps for store locations and integrated beverage showcase.

### Visual Overview (Screenshots)

<div align="center">
<table>
  <tr>
    <td align="center"><img src="docs/screenshots/06.jpg" alt="Customer Dashboard" width="160"><br><sub>1. Points Ledger</sub></td>
    <td align="center"><img src="docs/screenshots/07.jpg" alt="Punch Card" width="160"><br><sub>2. Punch Card</sub></td>
    <td align="center"><img src="docs/screenshots/09.jpg" alt="Camera Scanner" width="160"><br><sub>3. Live Scan</sub></td>
    <td align="center"><img src="docs/screenshots/05.jpg" alt="Timed QR Code" width="160"><br><sub>4. Counter QR</sub></td>
    <td align="center"><img src="docs/screenshots/03.jpg" alt="Staff Dashboard" width="160"><br><sub>5. Staff Metrics</sub></td>
  </tr>
</table>
</div>

### Quick Setup

```bash
# 1. Clone repository
git clone https://github.com/osos3lom/coffeeloyal.git
cd coffeeloyal

# 2. Configure environment variables
cp .env.sample .env

# 3. Seed PostgreSQL database schema
psql -U quickstamp -d quickstamp -f sql/init.sql

# 4. Install dependencies
npm install

# 5. Launch development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Default administrator: `admin@quickstamp.local` / `admin123`.

---

## 📄 الترخيص (License)

هذا المشروع مرخص تحت رخصة [MIT](LICENSE).

This project is licensed under the [MIT License](LICENSE).
