"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { galleryTeaser } from "@/lib/content/gallery";
import { Button } from "@/components/ui/button";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";
import { cn } from "@/lib/utils";

/**
 * Rooms, not products. A mosaic on desktop; a snap-scroller on phones,
 * where a cramped grid would show nothing well.
 */
export default function GalleryStrip() {
  const { lang } = useTranslation();
  const t = marketing[lang];
  const isAr = lang === "ar";

  return (
    <section className="bg-[#F3F3ED] py-[var(--section-y)]">
      <div className="mx-auto w-full max-w-6xl px-[var(--gutter)]">
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          lede={t.gallery.lede}
        />
      </div>

      {/* Phone: horizontal snap-scroll, breaking the gutter deliberately */}
      <div className="edge-fade mt-12 md:hidden">
        <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {galleryTeaser.map((g) => (
            <li
              key={g.src}
              className="relative aspect-[3/4] w-[68vw] shrink-0 snap-center overflow-hidden rounded-[0.25rem]"
            >
              <Image
                src={g.src}
                alt={isAr ? g.ar : g.en}
                fill
                sizes="68vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop mosaic */}
      <div className="mx-auto mt-14 hidden w-full max-w-6xl px-[var(--gutter)] md:block">
        <ul className="grid auto-rows-[13rem] grid-cols-4 gap-4">
          {galleryTeaser.map((g, i) => (
            <Reveal
              as="li"
              key={g.src}
              delay={Math.min(i, 4) * 0.05}
              className={cn(
                "relative overflow-hidden rounded-[0.25rem]",
                g.span === "tall" && "row-span-2",
                g.span === "wide" && "col-span-2",
              )}
            >
              <Image
                src={g.src}
                alt={isAr ? g.ar : g.en}
                fill
                sizes="(max-width: 1200px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] hover:scale-[1.04]"
              />
            </Reveal>
          ))}
        </ul>
      </div>

      <Reveal className="mx-auto mt-12 w-full max-w-6xl px-[var(--gutter)]">
        <Button asChild variant="outline" size="lg" className="rounded-full">
          <Link href="/gallery">{t.gallery.cta}</Link>
        </Button>
      </Reveal>
    </section>
  );
}
