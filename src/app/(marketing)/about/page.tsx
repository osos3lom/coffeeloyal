"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { values, valuesLead } from "@/lib/content/values";
import PageHeader from "@/components/marketing/PageHeader";
import Reveal from "@/components/marketing/Reveal";
import SectionHeading from "@/components/marketing/SectionHeading";
import CraftPillars from "@/components/marketing/sections/CraftPillars";
import TrustStrip from "@/components/marketing/sections/TrustStrip";

export default function AboutPage() {
  const { lang } = useTranslation();
  const t = marketing[lang];
  const isAr = lang === "ar";

  return (
    <>
      {/* 1. Header & Story */}
      <PageHeader
        eyebrow={t.about.eyebrow}
        title={t.about.title}
        lede={t.heritage.quote}
      />

      <section className="bg-[#F8F7F3] pb-16 pt-4">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-[var(--gutter)] md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[0.25rem] shadow-sm">
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
                <p>{t.heritage.body2}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. TrustStrip */}
      <TrustStrip />

      {/* 3. Mission & Vision */}
      <section className="bg-[#F8F7F3] py-[var(--section-y)] border-b border-[#E5E3D8]">
        <div className="mx-auto w-full max-w-6xl px-[var(--gutter)]">
          <div className="grid gap-10 md:grid-cols-2">
            <Reveal delay={0.05} className="rounded-xl border border-[#E5E3D8] bg-white p-8 md:p-10 shadow-sm">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#A18548]">
                {isAr ? "هدفنا" : "Our Purpose"}
              </span>
              <h3 className="font-brand-serif mt-3 text-2xl font-bold text-[#181512]">
                {t.about.mission.title}
              </h3>
              <hr className="hairline-gold my-5 max-w-[4rem]" />
              <p className="leading-relaxed text-[#675E54]">
                {t.about.mission.body}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="rounded-xl border border-[#E5E3D8] bg-white p-8 md:p-10 shadow-sm">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#A18548]">
                {isAr ? "تطلعاتنا" : "Our Aspiration"}
              </span>
              <h3 className="font-brand-serif mt-3 text-2xl font-bold text-[#181512]">
                {t.about.vision.title}
              </h3>
              <hr className="hairline-gold my-5 max-w-[4rem]" />
              <p className="leading-relaxed text-[#675E54]">
                {t.about.vision.body}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. CEO Message */}
      <section className="bg-[#F3F3ED] py-[var(--section-y)] border-b border-[#E5E3D8]">
        <div className="mx-auto max-w-4xl px-[var(--gutter)] text-center">
          <Reveal>
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#A18548]">
              {isAr ? "قيادتنا" : "Our Leadership"}
            </span>
            <h2 className="font-brand-serif mt-3 text-2xl md:text-3xl font-bold text-[#181512]">
              {t.about.ceo.title}
            </h2>
            <hr className="hairline-gold mx-auto my-6 max-w-[5rem]" />
            <blockquote className="font-brand-serif text-lg md:text-xl italic leading-relaxed text-[#181512]">
              “{t.about.ceo.lead}”
            </blockquote>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#675E54] text-start max-w-2xl mx-auto">
              <p>{t.about.ceo.body1}</p>
              <p>{t.about.ceo.body2}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Values */}
      <section className="bg-[#F8F7F3] py-[var(--section-y)]">
        <div className="mx-auto w-full max-w-6xl px-[var(--gutter)]">
          <SectionHeading
            eyebrow={isAr ? "ثقافتنا" : "Our Culture"}
            title={t.about.valuesTitle}
            lede={valuesLead[lang]}
          />

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => {
              const val = isAr ? v.ar : v.en;
              return (
                <Reveal key={v.id} delay={i * 0.08} className="flex flex-col">
                  <div className="flex flex-col h-full overflow-hidden rounded-lg border border-[#E5E3D8] bg-white shadow-sm">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3F3ED]">
                      <Image
                        src={v.image}
                        alt={val.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5 flex flex-1 flex-col">
                      <h3 className="font-brand-serif text-lg font-bold text-[#181512]">
                        {val.title}
                      </h3>
                      <hr className="hairline-gold my-3 max-w-[3rem]" />
                      <p className="text-sm leading-relaxed text-[#675E54]">
                        {val.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CraftPillars */}
      <CraftPillars />
    </>
  );
}
