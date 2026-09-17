"use client";

import { Gem, Blend, LayoutGrid, HandHeart, Flame, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { pillars, type Pillar } from "@/lib/content/pillars";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";

const ICONS: Record<Pillar["icon"], LucideIcon> = {
  bean: Gem,
  blend: Blend,
  cup: LayoutGrid,
  dallah: HandHeart,
  gear: Flame,
  people: Users,
};

/**
 * Six principles, separated by space alone — no cards, no borders, no
 * shadows. Boxing these would turn a brand statement into a feature grid.
 */
export default function CraftPillars() {
  const { lang } = useTranslation();
  const t = marketing[lang];

  return (
    <section className="bg-[#F3F3ED] py-[var(--section-y)]">
      <div className="mx-auto w-full max-w-6xl px-[var(--gutter)]">
        <SectionHeading
          eyebrow={t.craft.eyebrow}
          title={t.craft.title}
          lede={t.craft.lede}
        />

        <ul className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = ICONS[p.icon];
            const copy = lang === "ar" ? p.ar : p.en;
            return (
              <Reveal as="li" key={p.icon} delay={Math.min(i, 3) * 0.06}>
                <Icon
                  className="size-6 text-[#53634B]"
                  strokeWidth={1.25}
                  aria-hidden
                />
                <hr className="hairline-gold mt-5 max-w-[3rem]" />
                <h3 className="font-brand-serif mt-5 text-[1.25rem] text-[#181512]">
                  {copy.title}
                </h3>
                <p className="mt-2.5 text-pretty text-[0.9375rem] leading-relaxed text-[#675E54]">
                  {copy.body}
                </p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
