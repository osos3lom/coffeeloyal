"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import Reveal from "../Reveal";

/**
 * The section that has to feel expensive. It earns that with space and an
 * asymmetric split rather than ornament: a tall portrait against a serif
 * pull-quote, and very little else.
 */
export default function Heritage() {
  const { lang } = useTranslation();
  const t = marketing[lang];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-[#F8F7F3] py-[var(--section-y)]">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-[var(--gutter)] md:grid-cols-12 md:gap-16">
        {/* Portrait */}
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[0.25rem]">
            <Image
              src="/brand/category/saudi-coffee.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Words */}
        <div className="md:col-span-7">
          <Reveal delay={0.08}>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#8A8175]">
              {t.heritage.eyebrow}
            </p>

            <blockquote
              className="font-brand-serif mt-6 text-balance text-[#181512]"
              style={{ fontSize: "var(--step-h1)", lineHeight: 1.18 }}
            >
              {t.heritage.quote}
            </blockquote>

            <hr className="hairline-gold my-8 max-w-[9rem]" />

            <div
              className="space-y-5 text-pretty leading-relaxed text-[#675E54]"
              style={{ fontSize: "var(--step-body)" }}
            >
              <p>{t.heritage.body1}</p>
              <p>{t.heritage.body2}</p>
            </div>

            <Link
              href="/about"
              className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#53634B] transition-colors hover:text-[#2C3627]"
            >
              {t.heritage.cta}
              <Arrow
                className="size-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                strokeWidth={1.75}
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
