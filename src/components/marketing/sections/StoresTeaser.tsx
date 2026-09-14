"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { cityCounts } from "@/lib/content/branches";
import { Button } from "@/components/ui/button";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";

export default function StoresTeaser() {
  const { lang } = useTranslation();
  const t = marketing[lang];
  const isAr = lang === "ar";

  return (
    <section className="relative overflow-hidden bg-[#2C3627] py-[var(--section-y)]">
      {/* A faint contour field — depth from light, not decoration. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 22% 28%, #E8D399 0 1px, transparent 1px), radial-gradient(circle at 74% 66%, #E8D399 0 1px, transparent 1px)",
          backgroundSize: "44px 44px, 62px 62px",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-[var(--gutter)]">
        <SectionHeading
          eyebrow={t.stores.eyebrow}
          title={t.stores.title}
          lede={t.stores.lede}
          tone="dark"
        />

        <ul className="mt-16 grid gap-px overflow-hidden rounded-[0.5rem] border border-[#E8D399]/15 bg-[#E8D399]/15 sm:grid-cols-3">
          {cityCounts.map((c, i) => (
            <Reveal as="li" key={c.id} delay={i * 0.07}>
              <Link
                href={`/stores#${c.id}`}
                className="flex h-full flex-col items-center gap-2 bg-[#2C3627] px-6 py-10 text-center transition-colors hover:bg-[#354130]"
              >
                <MapPin
                  className="size-5 text-[#C5A869]"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <span
                  className="font-brand-serif mt-2 text-[2.5rem] leading-none text-[#F3F3ED]"
                  dir="ltr"
                >
                  {c.count}
                </span>
                <span className="text-[0.9375rem] font-medium text-[#C9D0C4]">
                  {isAr ? c.ar : c.en}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12">
          {/* Deliberately not gold: the hero and the loyalty band already
              spend that, and gold stops meaning anything if every section
              gets one. */}
          <Button asChild variant="ghostGold" size="xl" className="rounded-full">
            <Link href="/stores">{t.stores.cta}</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
