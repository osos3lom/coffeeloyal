"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Desktop navigation: a floating glass object held clear of every edge.
 *
 * Single state by design. Every page opens on a crema ground, so the nav has
 * one appearance everywhere — an earlier light-over-photograph variant went
 * with the full-bleed hero that the editorial split replaced.
 */
export default function FloatingNav() {
  const { lang, setLang } = useTranslation();
  const t = marketing[lang];
  const pathname = usePathname();
  const { status } = useSession();

  const links = [
    { href: "/about", label: t.nav.about },
    { href: "/menu", label: t.nav.menu },
    { href: "/stores", label: t.nav.stores },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/blog", label: t.nav.blog },
    { href: "/contact", label: t.nav.contact },
  ];

  const signedIn = status === "authenticated";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-6 z-50 hidden justify-center px-6 md:flex">
      <nav className="glass-nav glass-nav--scrolled pointer-events-auto flex w-full max-w-5xl items-center gap-2 rounded-full py-2 ps-5 pe-2">
        <Link
          href="/"
          className="flex shrink-0 items-center transition-opacity hover:opacity-80"
          aria-label={t.nav.home}
        >
          <Image
            src="/logo.png"
            alt="Princes' Coffee"
            width={132}
            height={34}
            priority
            className="h-8 w-auto object-contain"
          />
        </Link>

        <ul className="mx-auto flex items-center gap-1">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href} className="relative">
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-full px-3.5 py-2 text-[0.8125rem] font-medium transition-colors",
                    active
                      ? "text-[#2C3627]"
                      : "text-[#5A5248] hover:text-[#181512]",
                  )}
                >
                  {l.label}
                </Link>
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 mx-auto block size-1 rounded-full bg-[#C5A869]"
                  />
                )}
              </li>
            );
          })}
        </ul>

        <button
          onClick={() => setLang(lang === "ar" ? "en" : "ar")}
          className="shrink-0 rounded-full px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-wider text-[#5A5248] transition-colors hover:bg-[#EFECE4] hover:text-[#181512]"
          aria-label={t.nav.language}
        >
          {lang === "ar" ? "EN" : "ع"}
        </button>

        <Button
          asChild
          variant="royal"
          size="sm"
          className="shrink-0 rounded-full px-5"
        >
          <Link href={signedIn ? "/dashboard" : "/register"}>
            {signedIn ? t.nav.myRewards : t.nav.join}
          </Link>
        </Button>
      </nav>
    </header>
  );
}
