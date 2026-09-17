"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { articles } from "@/lib/content/articles";
import { Button } from "@/components/ui/button";
import SectionHeading from "../SectionHeading";
import Reveal from "../Reveal";

export default function BlogTeaser() {
  const { lang } = useTranslation();
  const t = marketing[lang];
  const isAr = lang === "ar";
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  // Showcase 3 articles on the homepage
  const teaserArticles = articles.slice(0, 3);

  return (
    <section className="bg-[#F8F7F3] py-[var(--section-y)] border-t border-[#E5E3D8]">
      <div className="mx-auto w-full max-w-6xl px-[var(--gutter)]">
        <SectionHeading
          eyebrow={t.blog.eyebrow}
          title={t.blog.title}
          lede={t.blog.lede}
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {teaserArticles.map((article, i) => {
            const hasEn = article.partsEn && article.partsEn.length > 0;
            const title = isAr ? article.title : (hasEn ? article.titleEn : article.title);
            const kicker = isAr ? article.kicker : (hasEn ? article.kickerEn : article.kicker);
            const excerpt = isAr
              ? article.parts.find((p) => !p.startsWith("##") && !p.startsWith("-") && !p.startsWith("@")) || ""
              : (hasEn
                  ? article.partsEn.find((p) => !p.startsWith("##") && !p.startsWith("-") && !p.startsWith("@")) || ""
                  : article.parts.find((p) => !p.startsWith("##") && !p.startsWith("-") && !p.startsWith("@")) || "");

            return (
              <Reveal as="article" key={article.slug} delay={i * 0.08} className="flex flex-col">
                <Link
                  href={`/blog/${article.slug}`}
                  className="group flex flex-col h-full overflow-hidden rounded-[0.5rem] border border-[#E5E3D8] bg-white transition-all duration-300 hover:border-[#C5A869]/60 hover:shadow-md"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F3F3ED]">
                    <Image
                      src={article.img}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
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
                    <h3 className="font-brand-serif mt-2.5 line-clamp-2 text-[1.1875rem] font-medium text-[#181512] group-hover:text-[#53634B]">
                      {title}
                    </h3>
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

        <Reveal className="mt-12 text-center">
          <Button asChild variant="royal" size="xl" className="rounded-full">
            <Link href="/blog">
              {t.blog.allArticles}
              <Arrow className="size-4 ms-2" strokeWidth={1.75} />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
