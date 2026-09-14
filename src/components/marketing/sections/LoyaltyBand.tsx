"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { ScanLine, Stamp, Gift, Coffee } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { Button } from "@/components/ui/button";
import Reveal from "../Reveal";
import { cn } from "@/lib/utils";

const TOTAL_STAMPS = 9;
const EARNED = 7;

/**
 * The conversion centrepiece, and the only truly dark section on the page —
 * which is what lets it earn the contrast. Reuses the dashboard's stamp
 * vocabulary so the promise here matches the product exactly.
 */
export default function LoyaltyBand() {
  const { lang } = useTranslation();
  const t = marketing[lang];
  const { status } = useSession();
  const signedIn = status === "authenticated";

  const steps = [
    { Icon: ScanLine, title: t.loyalty.step1Title, body: t.loyalty.step1Body },
    { Icon: Stamp, title: t.loyalty.step2Title, body: t.loyalty.step2Body },
    { Icon: Gift, title: t.loyalty.step3Title, body: t.loyalty.step3Body },
  ];

  return (
    <section className="bg-[#F8F7F3] px-[var(--gutter)] py-[var(--section-y)]">
      <div className="royal-hero-card mx-auto w-full max-w-6xl rounded-[1.25rem] px-6 py-14 md:px-14 md:py-20">
        <div className="relative grid items-center gap-14 md:grid-cols-2 md:gap-20">
          {/* Words */}
          <div>
            <Reveal>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#E8D399]">
                {t.loyalty.eyebrow}
              </p>
              <h2
                className="font-brand-serif mt-4 text-balance text-[#F8F7F3]"
                style={{ fontSize: "var(--step-h2)", lineHeight: 1.15 }}
              >
                {t.loyalty.title}
              </h2>
              <p className="mt-4 max-w-md text-pretty leading-relaxed text-[#C9D0C4]">
                {t.loyalty.lede}
              </p>
            </Reveal>

            <ol className="mt-10 space-y-6">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={0.06 * i}>
                  <div className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#E8D399]/25 bg-[#E8D399]/10">
                      <s.Icon
                        className="size-[1.125rem] text-[#E8D399]"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </span>
                    <div className="pt-0.5">
                      <h3 className="text-[0.9375rem] font-semibold text-[#F3F3ED]">
                        {s.title}
                      </h3>
                      <p className="mt-1 text-[0.875rem] leading-relaxed text-[#A9B3A3]">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={0.2} className="mt-10">
              <Button asChild variant="gold" size="xl">
                <Link href={signedIn ? "/dashboard" : "/register"}>
                  {signedIn ? t.loyalty.ctaSignedIn : t.loyalty.cta}
                </Link>
              </Button>
            </Reveal>
          </div>

          {/* The card itself */}
          <Reveal delay={0.12}>
            <div className="mx-auto w-full max-w-sm rounded-[1rem] border border-[#E8D399]/18 bg-[#F8F7F3] p-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coffee className="size-4 text-[#53634B]" strokeWidth={1.5} />
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[#8A8175]">
                    {t.loyalty.cardLabel}
                  </span>
                </div>
                <span
                  className="text-[0.8125rem] font-semibold text-[#53634B]"
                  dir="ltr"
                >
                  {EARNED}/{TOTAL_STAMPS}
                </span>
              </div>

              <hr className="hairline-gold my-5" />

              {/* Illustrative card. The grid is decorative; the counter above
                  already states the progress for assistive tech. */}
              <div className="grid grid-cols-3 gap-3" aria-hidden>
                {Array.from({ length: TOTAL_STAMPS }, (_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex aspect-square items-center justify-center rounded-full",
                      i < EARNED ? "stamp-filled" : "stamp-empty",
                    )}
                  >
                    {i < EARNED && (
                      <Coffee className="size-4" strokeWidth={1.5} />
                    )}
                  </div>
                ))}
              </div>

              <p className="mt-6 rounded-lg border border-[#E8D399] bg-[#FAF7F0] px-3.5 py-2.5 text-center text-[0.75rem] font-semibold text-[#886C37]">
                {t.loyalty.cardProgress}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
