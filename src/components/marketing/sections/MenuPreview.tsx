"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { showcaseCategories, signatureItems } from "@/lib/content/menu";
import { Button } from "@/components/ui/button";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";

export default function MenuPreview() {
  const { lang } = useTranslation();
  const t = marketing[lang];
  const isAr = lang === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-[#F8F7F3] py-[var(--section-y)]">
      <div className="mx-auto w-full max-w-6xl px-[var(--gutter)]">
        <SectionHeading
          eyebrow={t.menu.eyebrow}
          title={t.menu.title}
          lede={t.menu.lede}
        />

        {/* Editorial category tiles */}
        <ul className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {showcaseCategories.map((c, i) => (
            <Reveal as="li" key={`${c.slug}-${c.en}`} delay={Math.min(i, 3) * 0.06}>
              <Link
                href={`/menu?c=${c.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-[0.25rem]"
              >
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgba(24,21,18,0.78)_0%,rgba(24,21,18,0.15)_52%,transparent_100%)]"
                />
                <h3 className="font-brand-serif absolute inset-x-0 bottom-0 p-4 text-[1.0625rem] text-white md:p-5 md:text-[1.25rem]">
                  {isAr ? c.ar : c.en}
                </h3>
              </Link>
            </Reveal>
          ))}
        </ul>

        {/* Signatures */}
        <Reveal className="mt-20">
          <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#8A8175]">
            {t.menu.signature}
          </h3>
        </Reveal>

        <ul className="mt-7 grid gap-x-10 gap-y-1 sm:grid-cols-2">
          {signatureItems.slice(0, 8).map((item, i) => (
            <Reveal as="li" key={item.slug} delay={Math.min(i, 4) * 0.04}>
              <Link
                href={`/menu?c=${item.category}`}
                className="group flex items-center gap-4 border-b border-[#E5E3D8] py-4 transition-colors hover:border-[#C5A869]/50"
              >
                <span className="relative size-14 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.9375rem] font-medium text-[#181512]">
                    {isAr ? item.ar : item.en}
                  </span>
                  <span className="mt-0.5 block truncate text-[0.75rem] text-[#968D82]">
                    {isAr ? item.en : item.ar}
                  </span>
                </span>
                <span
                  className="shrink-0 text-[0.8125rem] font-semibold text-[#53634B]"
                  dir="ltr"
                >
                  {item.price}
                  <span className="ms-1 text-[0.6875rem] font-normal text-[#968D82]">
                    {t.menu.currency}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12">
          <Button asChild variant="royal" size="xl" className="rounded-full">
            <Link href="/menu">
              {t.menu.cta}
              <Arrow className="size-4" strokeWidth={1.75} />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
