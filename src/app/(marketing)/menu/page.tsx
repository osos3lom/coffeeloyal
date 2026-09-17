"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import {
  menuCategories,
  menuItems,
  type MenuCategoryId,
} from "@/lib/content/menu";
import PageHeader from "@/components/marketing/PageHeader";
import MenuItemCard from "@/components/marketing/MenuItemCard";
import CartBar from "@/components/marketing/CartBar";
import { cn } from "@/lib/utils";

type Filter = MenuCategoryId | "all";

function MenuContent() {
  const { lang } = useTranslation();
  const t = marketing[lang];
  const isAr = lang === "ar";
  const params = useSearchParams();
  const initial = (params.get("c") as Filter) || "all";
  const [filter, setFilter] = useState<Filter>(
    menuCategories.some((c) => c.id === initial) ? initial : "all",
  );

  const shown =
    filter === "all" ? menuItems : menuItems.filter((i) => i.category === filter);

  const tabs: { id: Filter; label: string }[] = [
    { id: "all", label: t.menu.all },
    ...menuCategories.map((c) => ({
      id: c.id as Filter,
      label: isAr ? c.ar : c.en,
    })),
  ];

  const activeCategory = menuCategories.find((c) => c.id === filter);

  return (
    <>
      <PageHeader
        eyebrow={t.menu.eyebrow}
        title={t.menu.title}
        lede={t.menu.lede}
      />

      {/* Sticky filter rail. Sits below the mobile top bar. */}
      <div className="sticky top-[3.75rem] z-30 border-y border-[#E5E3D8] bg-[#F8F7F3]/92 backdrop-blur-xl md:top-0">
        <div className="edge-fade mx-auto w-full max-w-6xl">
          <div className="flex gap-2 overflow-x-auto px-[var(--gutter)] py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                aria-pressed={filter === tab.id}
                className={cn(
                  "min-h-[38px] shrink-0 whitespace-nowrap rounded-full px-4 text-[0.8125rem] font-medium transition-colors",
                  filter === tab.id
                    ? "bg-[#53634B] text-[#F8F7F3]"
                    : "border border-[#E5E3D8] bg-white text-[#675E54] hover:text-[#181512]",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-[var(--gutter)] py-12 md:py-16">
        {activeCategory && (
          <div className="mb-10 rounded-xl border border-[#E5E3D8] bg-white p-6 md:p-8 shadow-sm">
            <h2 className="font-brand-serif text-2xl font-bold text-[#181512]">
              {isAr ? activeCategory.ar : activeCategory.en}
            </h2>
            <hr className="hairline-gold my-3 max-w-[3rem]" />
            <p className="leading-relaxed text-[#675E54] text-base">
              {isAr ? activeCategory.descAr : activeCategory.descEn}
            </p>
          </div>
        )}

        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
          {shown.map((item) => (
            <li key={item.slug}>
              <MenuItemCard item={item} />
            </li>
          ))}
        </ul>
      </div>

      <CartBar />
    </>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <MenuContent />
    </Suspense>
  );
}
