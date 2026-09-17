import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import {
  Geist,
  Geist_Mono,
  Cormorant_Garamond,
  Amiri,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import SessionProvider from "@/components/SessionProvider";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import DemoGuide from "@/components/demo/DemoGuide";
import { Toaster } from "@/components/ui/sonner";
import type { Lang } from "@/lib/i18n/translations";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Latin display voice */
const cormorant = Cormorant_Garamond({
  variable: "--font-display-latin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/* Arabic display voice — heritage. Headlines only; at body sizes it is
   hard to read on a phone, which is what --font-ui-arabic is for. */
const amiri = Amiri({
  variable: "--font-display-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

/* Arabic UI/body voice — modern and legible at 15-17px. */
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-ui-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_NAME = "Princes' Coffee — قهوة الأمراء";
const SITE_DESC =
  "رشفة من الفخامة واللذة — قهوة سعودية مختصة، ٣٧ فرعاً في جدة ومكة والطائف.";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  metadataBase: new URL("https://princes.sa"),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESC,
  icons: { icon: `${basePath}/logo.png`, apple: `${basePath}/logo.png` },
  manifest: `${basePath}/manifest.json`,
  appleWebApp: {
    capable: true,
    title: "Princes' Coffee",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    siteName: "Princes' Coffee",
    title: SITE_NAME,
    description: SITE_DESC,
    locale: "ar_SA",
    alternateLocale: ["en_US", "tr_TR"],
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESC,
  },
};

export const viewport: Viewport = {
  themeColor: "#2C3627",
  // Let the page paint into the safe areas so the floating tab bar can
  // sit over the home indicator correctly.
  viewportFit: "cover",
};

const LOCALE: Record<Lang, string> = {
  en: "en",
  ar: "ar",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Resolve language on the server so <html lang/dir> is correct in the
  // very first byte. In static export mode, avoid dynamic server cookies
  // access (the client LanguageProvider manages state via localStorage).
  let lang: Lang = "ar";
  if (process.env.NEXT_PUBLIC_STATIC_EXPORT !== "true") {
    try {
      const cookieStore = await cookies();
      const stored = cookieStore.get("lang")?.value;
      if (stored === "en" || stored === "ar") {
        lang = stored;
      }
    } catch {
      // Fallback for static rendering
    }
  }

  return (
    <html
      lang={LOCALE[lang]}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${amiri.variable} ${plexArabic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F7F3] text-[#181512]">
        <LanguageProvider initialLang={lang}>
          <SessionProvider>{children}</SessionProvider>
          <DemoGuide />
          <Toaster position="top-center" />
        </LanguageProvider>
      </body>
    </html>
  );
}
