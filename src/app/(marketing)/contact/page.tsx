"use client";

import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { CONTACT } from "@/lib/content/branches";
import PageHeader from "@/components/marketing/PageHeader";
import Reveal from "@/components/marketing/Reveal";
import {
  InstagramIcon,
  XIcon,
  FacebookIcon,
} from "@/components/marketing/SocialIcons";

export default function ContactPage() {
  const { lang } = useTranslation();
  const t = marketing[lang];
  const isAr = lang === "ar";

  const waNumber = CONTACT.phone.replace(/[^0-9]/g, "");

  const channels = [
    {
      Icon: Phone,
      label: t.contact.callUs,
      value: CONTACT.phone,
      href: `tel:${CONTACT.phone}`,
      ltr: true,
    },
    {
      Icon: MessageCircle,
      label: t.contact.whatsapp,
      value: CONTACT.phone,
      href: `https://wa.me/${waNumber}`,
      ltr: true,
      external: true,
    },
    {
      Icon: Mail,
      label: t.contact.emailUs,
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      ltr: true,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        lede={t.contact.lede}
      />

      <div className="mx-auto w-full max-w-6xl px-[var(--gutter)] pb-20 pt-4 md:pb-28">
        <ul className="grid gap-3 md:grid-cols-3">
          {channels.map(({ Icon, label, value, href, ltr, external }, i) => (
            <Reveal as="li" key={label} delay={i * 0.06}>
              <a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex h-full min-h-[56px] flex-col rounded-[0.5rem] border border-[#E5E3D8] bg-white p-6 transition-colors hover:border-[#C5A869]/50"
              >
                <Icon className="size-5 text-[#53634B]" strokeWidth={1.25} aria-hidden />
                <span className="mt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[#8A8175]">
                  {label}
                </span>
                <span
                  className="mt-1.5 text-[0.9375rem] font-medium text-[#181512]"
                  dir={ltr ? "ltr" : undefined}
                >
                  {value}
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 rounded-[0.5rem] border border-[#E5E3D8] bg-[#F3F3ED] p-6 md:p-8">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-[#53634B]" strokeWidth={1.25} />
            <div>
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[#8A8175]">
                {t.contact.headOffice}
              </h2>
              <p className="mt-2 max-w-md leading-relaxed text-[#181512]">
                {isAr ? CONTACT.addressAr : CONTACT.addressEn}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[#8A8175]">
            {t.contact.follow}
          </h2>
          <div className="mt-4 flex items-center gap-2.5">
            {[
              { href: CONTACT.social.instagram, Icon: InstagramIcon, label: "Instagram" },
              { href: CONTACT.social.twitter, Icon: XIcon, label: "X" },
              { href: CONTACT.social.facebook, Icon: FacebookIcon, label: "Facebook" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-11 items-center justify-center rounded-full border border-[#E5E3D8] bg-white text-[#53634B] transition-colors hover:border-[#C5A869] hover:bg-[#FAF7F0]"
              >
                <Icon className="size-[1.125rem]" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </>
  );
}
