"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import PageHeader from "@/components/marketing/PageHeader";
import Reveal from "@/components/marketing/Reveal";
import CraftPillars from "@/components/marketing/sections/CraftPillars";
import TrustStrip from "@/components/marketing/sections/TrustStrip";

export default function AboutPage() {
  const { lang } = useTranslation();
  const t = marketing[lang];

  return (
    <>
      <PageHeader
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        lede={t.heritage.quote}
      />

      <TrustStrip />

      <section className="bg-[#F8F7F3] py-[var(--section-y)]">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-[var(--gutter)] md:grid-cols-12 md:gap-16">
          {/* The dallah still-life is the strongest heritage image the brand
              has — gold, ochre linen, desert stone. It carries this section. */}
          <Reveal className="md:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[0.25rem]">
              <Image
                src="/brand/category/saudi-coffee.jpg"
                alt={
                  lang === "ar"
                    ? "دلة ذهبية وفنجان قهوة الأمراء"
                    : "A gold dallah beside a Princes' Coffee cup"
                }
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="md:col-span-6">
            <Reveal delay={0.08}>
              <h2 className="font-brand-serif text-[#181512]" style={{ fontSize: "var(--step-h2)" }}>
                {t.about.storyTitle}
              </h2>
              <hr className="hairline-gold my-7 max-w-[7rem]" />
              <div
                className="space-y-5 text-pretty leading-relaxed text-[#675E54]"
                style={{ fontSize: "var(--step-body)" }}
              >
                <p>{t.about.story1}</p>
                <p>{t.about.story2}</p>
                <p>{t.heritage.body1}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CraftPillars />
    </>
  );
}
