"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { ScanLine, Stamp, Gift } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/marketing/PageHeader";
import Reveal from "@/components/marketing/Reveal";
import LoyaltyBand from "@/components/marketing/sections/LoyaltyBand";

export default function RewardsPage() {
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
    <>
      <PageHeader
        eyebrow={t.loyalty.eyebrow}
        title={t.loyalty.title}
        lede={t.loyalty.lede}
      >
        <div className="rise-in mt-8" style={{ animationDelay: "280ms" }}>
          <Button asChild variant="gold" size="xl">
            <Link href={signedIn ? "/dashboard" : "/register"}>
              {signedIn ? t.loyalty.ctaSignedIn : t.loyalty.cta}
            </Link>
          </Button>
        </div>
      </PageHeader>

      <section className="bg-[#F3F3ED] py-[var(--section-y)]">
        <ol className="mx-auto grid w-full max-w-6xl gap-12 px-[var(--gutter)] md:grid-cols-3 md:gap-10">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.07}>
              <span className="flex size-12 items-center justify-center rounded-full border border-[#C5A869]/35 bg-white">
                <s.Icon className="size-5 text-[#53634B]" strokeWidth={1.25} aria-hidden />
              </span>
              <p
                className="mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#A18548]"
                dir="ltr"
              >
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="font-brand-serif mt-2 text-[1.375rem] text-[#181512]">
                {s.title}
              </h2>
              <p className="mt-2.5 text-pretty text-[0.9375rem] leading-relaxed text-[#675E54]">
                {s.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      <LoyaltyBand />
    </>
  );
}
