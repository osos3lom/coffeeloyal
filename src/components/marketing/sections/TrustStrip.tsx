"use client";

import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import Reveal from "../Reveal";

/**
 * Establishes scale in one quiet line. No icons, no cards — the restraint
 * is what makes it read as confidence rather than marketing.
 */
export default function TrustStrip() {
  const { lang } = useTranslation();
  const t = marketing[lang];
  const items = [t.trust.branches, t.trust.cities, t.trust.craft];

  return (
    <section className="border-b border-[#E5E3D8] bg-[#F3F3ED]">
      <Reveal className="mx-auto w-full max-w-6xl px-[var(--gutter)]">
        <ul className="flex flex-col divide-y divide-[#C5A869]/25 sm:flex-row sm:divide-x sm:divide-y-0 sm:rtl:divide-x-reverse">
          {items.map((item) => (
            <li
              key={item}
              className="flex-1 py-5 text-center text-[0.8125rem] font-medium tracking-wide text-[#53634B] sm:py-7"
            >
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
