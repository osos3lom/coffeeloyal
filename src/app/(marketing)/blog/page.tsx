"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { articles } from "@/lib/content/articles";
import PageHeader from "@/components/marketing/PageHeader";
import Reveal from "@/components/marketing/Reveal";

export default function BlogPage() {
  const { lang } = useTranslation();
  const t = marketing[lang];
  const isAr = lang === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <>
      <PageHeader
        eyebrow={t.blog.eyebrow}
        title={t.blog.title}
        lede={t.blog.lede}
      />

      <section className="bg-[#F8F7F3] pb-24 pt-8">
        <div className="mx-auto w-full max-w-6xl px-[var(--gutter)]">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => {
              const hasEn = article.partsEn && article.partsEn.length > 0;
              const title = isAr ? article.title : (hasEn ? article.titleEn : article.title);
              const kicker = isAr ? article.kicker : (hasEn ? article.kickerEn : article.kicker);
              const excerpt = isAr
                ? article.parts.find((p) => !p.startsWith("##") && !p.startsWith("-") && !p.startsWith("@")) || ""
                : (hasEn
                    ? article.partsEn.find((p) => !p.startsWith("##") && !p.startsWith("-") && !p.startsWith("@")) || ""
                    : article.parts.find((p) => !p.startsWith("##") && !p.startsWith("-") && !p.startsWith("@")) || "");

              return (
                <Reveal as="article" key={article.slug} delay={i * 0.06} className="flex flex-col">
                  <Link
                    href={`/blog/${article.slug}`}
                    className="group flex flex-col h-full overflow-hidden rounded-[0.5rem] border border-[#E5E3D8] bg-white transition-all duration-300 hover:border-[#C5A869]/60 hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F3F3ED]">
                      <Image
                        src={article.img}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {!isAr && !hasEn && (
                        <span className="absolute top-3 end-3 rounded-full bg-[#181512]/80 px-2.5 py-1 text-[0.6875rem] font-medium text-[#F3F3ED] backdrop-blur-sm">
                          {t.blog.availableInArabic}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[#A18548]">
                        {kicker}
                      </span>
                      <h2 className="font-brand-serif mt-2.5 line-clamp-2 text-[1.25rem] font-medium text-[#181512] group-hover:text-[#53634B]">
                        {title}
                      </h2>
                      <p className="mt-3 line-clamp-3 text-[0.875rem] leading-relaxed text-[#675E54]">
                        {excerpt}
                      </p>
                      <div className="mt-auto pt-6 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-[#53634B] group-hover:text-[#A18548]">
                        <span>{t.blog.readMore}</span>
                        <Arrow className="size-3.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
