"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { Button } from "@/components/ui/button";

/**
 * An editorial split rather than type-over-photograph.
 *
 * The brand's photography is bright, close-up lifestyle work. Laying white
 * type over it would mean darkening a good picture into mud and landing on
 * the generic luxury look. Setting the words on crema beside the image keeps
 * the photograph at full strength and reads like a magazine opener, which is
 * the quieter and more expensive answer.
 *
 * The entrance is CSS, not JS: the hero must paint even if hydration is slow
 * or never happens.
 */
export default function Hero() {
  const { lang } = useTranslation();
  const t = marketing[lang];

  return (
    <section className="relative overflow-hidden bg-[#F8F7F3]">
      {/* Crema radial — depth from light, not ornament. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#FFFFFF_0%,#F8F7F3_60%)]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-[var(--gutter)] pb-20 pt-28 md:min-h-screen md:grid-cols-12 md:gap-14 md:py-32">
        {/* Words */}
        <div className="md:col-span-6 lg:col-span-5">
          <p
            className="rise-in text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[#A18548]"
            style={{ animationDelay: "60ms" }}
          >
            {t.hero.eyebrow}
          </p>

          <h1
            className="rise-in font-brand-serif mt-5 text-balance text-[#181512]"
            style={{
              fontSize: "var(--step-display)",
              lineHeight: 1.04,
              animationDelay: "130ms",
            }}
          >
            {t.hero.title}
          </h1>

          <hr
            className="hairline-gold rise-in mt-6 max-w-[7rem]"
            style={{ animationDelay: "190ms" }}
          />

          <p
            className="rise-in font-brand-serif mt-6 text-[#53634B]"
            style={{ fontSize: "var(--step-h3)", animationDelay: "250ms" }}
          >
            {t.hero.tagline}
          </p>

          <p
            className="rise-in mt-5 max-w-md text-pretty leading-relaxed text-[#675E54]"
            style={{ fontSize: "var(--step-body)", animationDelay: "310ms" }}
          >
            {t.hero.lede}
          </p>

          <div
            className="rise-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "380ms" }}
          >
            {/* The single gold action above the fold. */}
            <Button asChild variant="gold" size="xl" className="w-full sm:w-auto">
              <Link href="/register">{t.hero.primary}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="w-full rounded-full border-[#DDD9CC] bg-transparent sm:w-auto"
            >
              <Link href="/menu">{t.hero.secondary}</Link>
            </Button>
          </div>
        </div>

        {/* Photograph */}
        <div
          className="rise-in relative md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7"
          style={{ animationDelay: "160ms", animationDuration: "0.9s" }}
        >
          {/* Offset gold hairline frame — the one ornamental gesture. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-3 -end-3 start-6 top-6 rounded-[0.25rem] border border-[#C5A869]/35 md:-bottom-5 md:-end-5 md:start-8 md:top-8"
          />
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[0.25rem] shadow-[0_30px_70px_-30px_rgba(24,21,18,0.38)]">
            <Image
              src="/brand/gallery/interior-07.jpg"
              alt={
                lang === "ar"
                  ? "كوب قهوة الأمراء بين اليدين"
                  : "A Princes' Coffee cup held in both hands"
              }
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
