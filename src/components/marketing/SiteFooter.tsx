"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  InstagramIcon,
  XIcon,
  FacebookIcon,
} from "./SocialIcons";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { CONTACT, cityCounts } from "@/lib/content/branches";

export default function SiteFooter() {
  const { lang } = useTranslation();
  const t = marketing[lang];
  const isAr = lang === "ar";

  const explore = [
    { href: "/menu", label: t.nav.menu },
    { href: "/stores", label: t.nav.stores },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/rewards", label: t.nav.rewards },
  ];

  const company = [
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="relative bg-[#181512] text-[#C9C2B8]">
      <div className="hairline-gold absolute inset-x-0 top-0" />

      <div className="pb-tabbar mx-auto w-full max-w-6xl px-[var(--gutter)] pt-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="Princes' Coffee"
              width={150}
              height={38}
              className="h-10 w-auto object-contain brightness-0 invert"
            />
            <p className="font-brand-serif mt-5 text-lg leading-relaxed text-[#E8E3DA]">
              {t.footer.tagline}
            </p>
            <p className="mt-4 text-[0.8125rem] leading-relaxed text-[#8A8175]">
              {cityCounts.map((c) => (isAr ? c.ar : c.en)).join(" · ")}
            </p>
          </div>

          {/* Explore */}
          <nav aria-label={t.footer.explore}>
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[#8A8175]">
              {t.footer.explore}
            </h2>
            <ul className="mt-5 space-y-3">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#C9C2B8] transition-colors hover:text-[#E8D399]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label={t.footer.company}>
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[#8A8175]">
              {t.footer.company}
            </h2>
            <ul className="mt-5 space-y-3">
              {company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#C9C2B8] transition-colors hover:text-[#E8D399]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[#8A8175]">
              {t.footer.contact}
            </h2>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="flex items-center gap-2.5 text-[#C9C2B8] transition-colors hover:text-[#E8D399]"
                  dir="ltr"
                >
                  <Phone className="size-4 shrink-0" strokeWidth={1.5} />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2.5 text-[#C9C2B8] transition-colors hover:text-[#E8D399]"
                  dir="ltr"
                >
                  <Mail className="size-4 shrink-0" strokeWidth={1.5} />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 leading-relaxed text-[#8A8175]">
                <MapPin className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
                <span>{isAr ? CONTACT.addressAr : CONTACT.addressEn}</span>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-2">
              {[
                { href: CONTACT.social.instagram, Icon: InstagramIcon, label: "Instagram" },
                { href: CONTACT.social.twitter, Icon: XIcon, label: "X" },
                { href: CONTACT.social.facebook, Icon: FacebookIcon, label: "Facebook" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-[#3A332B] text-[#8A8175] transition-colors hover:border-[#C5A869]/50 hover:text-[#E8D399]"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[#2A241E] pt-6 text-[0.75rem] text-[#6F6659] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} — {t.footer.rights}
          </p>
          <p dir="ltr" className="tracking-wide">
            princes.sa
          </p>
        </div>
      </div>
    </footer>
  );
}
