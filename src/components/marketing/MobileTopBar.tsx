"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { cn } from "@/lib/utils";

/**
 * Phones get the tab bar for navigation, so this carries only identity and
 * language. It stays transparent over the top of the page and thickens into
 * glass once scrolled, so it never competes with the hero.
 */
export default function MobileTopBar() {
  const { lang, setLang } = useTranslation();
  const t = marketing[lang];
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:0;height:48px;width:1px;";
    document.body.appendChild(sentinel);
    const io = new IntersectionObserver(
      ([e]) => setScrolled(!e.isIntersecting),
      { threshold: 0 },
    );
    io.observe(sentinel);
    return () => {
      io.disconnect();
      sentinel.remove();
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-3 transition-colors md:hidden",
        scrolled
          ? "border-b border-[#E5E3D8]/70 bg-[#F8F7F3]/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
      style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
    >
      <Link href="/" aria-label={t.nav.home}>
        <Image
          src="/logo.png"
          alt="Princes' Coffee"
          width={112}
          height={28}
          priority
          className="h-7 w-auto object-contain"
        />
      </Link>

      <button
        onClick={() => setLang(lang === "ar" ? "en" : "ar")}
        aria-label={t.nav.language}
        className="min-h-[38px] rounded-full border border-[#DDD9CC] bg-white/70 px-3.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-[#53634B]"
      >
        {lang === "ar" ? "EN" : "ع"}
      </button>
    </header>
  );
}
