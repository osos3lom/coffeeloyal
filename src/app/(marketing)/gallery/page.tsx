"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { galleryImages } from "@/lib/content/gallery";
import PageHeader from "@/components/marketing/PageHeader";
import Reveal from "@/components/marketing/Reveal";
import { cn } from "@/lib/utils";

export default function GalleryPage() {
  const { lang } = useTranslation();
  const t = marketing[lang];
  const isAr = lang === "ar";

  return (
    <>
      <PageHeader
        eyebrow={t.gallery.eyebrow}
        title={t.gallery.title}
        lede={t.gallery.lede}
      />

      <div className="mx-auto w-full max-w-6xl px-[var(--gutter)] pb-20 pt-6 md:pb-28">
        {/* Two columns on phones keeps the mosaic legible without forcing a
            single enormous column; four at desktop for the editorial rhythm. */}
        <ul className="grid auto-rows-[10rem] grid-cols-2 gap-3 md:auto-rows-[13rem] md:grid-cols-4 md:gap-4">
          {galleryImages.map((g, i) => (
            <Reveal
              as="li"
              key={g.src}
              delay={Math.min(i % 6, 5) * 0.04}
              className={cn(
                "relative overflow-hidden rounded-[0.25rem] bg-[#F3F3ED]",
                g.span === "tall" && "row-span-2",
                g.span === "wide" && "col-span-2",
              )}
            >
              <Image
                src={g.src}
                alt={isAr ? g.ar : g.en}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] hover:scale-[1.04]"
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </>
  );
}
