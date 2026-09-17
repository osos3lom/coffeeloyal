"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { articles } from "@/lib/content/articles";
import { Button } from "@/components/ui/button";

interface ArticleViewProps {
  slug: string;
}

export default function ArticleView({ slug }: ArticleViewProps) {
  const { lang } = useTranslation();
  const t = marketing[lang];
  const isAr = lang === "ar";
  const Arrow = isAr ? ArrowRight : ArrowLeft;

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="mx-auto max-w-4xl px-[var(--gutter)] py-32 text-center">
        <h1 className="text-2xl font-bold text-[#181512]">المقال غير موجود</h1>
        <Button asChild variant="royal" className="mt-6">
          <Link href="/blog">{t.blog.backToBlog}</Link>
        </Button>
      </div>
    );
  }

  const hasEn = article.partsEn && article.partsEn.length > 0;
  const isFallbackAr = !isAr && !hasEn;

  const title = isFallbackAr ? article.title : isAr ? article.title : article.titleEn;
  const kicker = isFallbackAr ? article.kicker : isAr ? article.kicker : article.kickerEn;
  const parts = isFallbackAr ? article.parts : isAr ? article.parts : article.partsEn;

  // Group parts into blocks (e.g. consecutive list items into <ul>)
  type Block =
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "list"; items: string[] }
    | { type: "link"; href: string; label: string }
    | { type: "p"; text: string };

  const blocks: Block[] = [];
  let currentList: string[] | null = null;

  const flushList = () => {
    if (currentList && currentList.length > 0) {
      blocks.push({ type: "list", items: [...currentList] });
      currentList = null;
    }
  };

  for (const part of parts) {
    if (part.startsWith("- ")) {
      if (!currentList) currentList = [];
      currentList.push(part.slice(2).trim());
    } else {
      flushList();
      if (part.startsWith("## ")) {
        blocks.push({ type: "h2", text: part.slice(3).trim() });
      } else if (part.startsWith("### ")) {
        blocks.push({ type: "h3", text: part.slice(4).trim() });
      } else if (part.startsWith("@link ")) {
        const linkContent = part.slice(6).trim();
        const [href, label] = linkContent.split("|");
        blocks.push({ type: "link", href: href?.trim() || "#", label: label?.trim() || href || "" });
      } else {
        blocks.push({ type: "p", text: part.trim() });
      }
    }
  }
  flushList();

  return (
    <article className="min-h-screen bg-[#F8F7F3] pb-24 pt-28 md:pt-36">
      <div className="mx-auto max-w-4xl px-[var(--gutter)]">
        {/* Back navigation */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="gap-2 text-[#53634B] hover:text-[#181512] px-0">
            <Link href="/blog">
              <Arrow className="size-4" />
              <span>{t.blog.backToBlog}</span>
            </Link>
          </Button>
        </div>

        {/* Header */}
        <header className="mb-10">
          <span className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#A18548]">
            {kicker}
          </span>
          <h1 className="font-brand-serif mt-3 text-3xl font-bold tracking-tight text-[#181512] sm:text-4xl md:text-5xl leading-tight">
            {title}
          </h1>
          <hr className="hairline-gold mt-6 max-w-[5rem]" />

          {isFallbackAr && (
            <div className="mt-6 rounded-md border border-[#C5A869]/40 bg-[#FAF7F0] p-3 text-sm text-[#886C37]">
              {t.blog.availableInArabic}
            </div>
          )}
        </header>

        {/* Main hero image */}
        <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-[0.5rem] shadow-sm">
          <Image
            src={article.img}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="prose max-w-none text-[#53634B] leading-relaxed">
          {blocks.map((block, idx) => {
            switch (block.type) {
              case "h2":
                return (
                  <h2
                    key={idx}
                    className="font-brand-serif mt-10 mb-4 text-2xl font-bold text-[#181512] md:text-3xl"
                  >
                    {block.text}
                  </h2>
                );
              case "h3":
                return (
                  <h3
                    key={idx}
                    className="font-brand-serif mt-8 mb-3 text-xl font-bold text-[#181512] md:text-2xl"
                  >
                    {block.text}
                  </h3>
                );
              case "list":
                return (
                  <ul key={idx} className="my-5 list-disc space-y-2 ps-6 text-base md:text-[1.0625rem]">
                    {block.items.map((item, liIdx) => (
                      <li key={liIdx}>{item}</li>
                    ))}
                  </ul>
                );
              case "link":
                return (
                  <div key={idx} className="my-4">
                    <a
                      href={block.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#A18548] underline hover:text-[#886C37]"
                    >
                      {block.label}
                    </a>
                  </div>
                );
              case "p":
              default:
                return (
                  <p key={idx} className="my-5 text-base md:text-[1.0625rem] leading-relaxed">
                    {block.text}
                  </p>
                );
            }
          })}
        </div>

        {/* Footer actions */}
        <div className="mt-16 border-t border-[#E5E3D8] pt-8">
          <Button asChild variant="royal" className="rounded-full">
            <Link href="/blog">
              <Arrow className="size-4 me-2" />
              <span>{t.blog.backToBlog}</span>
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
