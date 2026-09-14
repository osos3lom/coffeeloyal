"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { toast } from "sonner";
import type { MenuItem } from "@/lib/content/menu";
import { useCart, type Size } from "@/lib/cart/CartContext";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { cn } from "@/lib/utils";

export default function MenuItemCard({ item }: { item: MenuItem }) {
  const { lang } = useTranslation();
  const t = marketing[lang];
  const isAr = lang === "ar";
  const { add } = useCart();
  const [size, setSize] = useState<Size>("regular");
  const [justAdded, setJustAdded] = useState(false);

  const hasSizes = Boolean(item.priceLarge);
  const price = size === "large" && item.priceLarge ? item.priceLarge : item.price;
  const name = isAr ? item.ar : item.en;

  function handleAdd() {
    add(item.slug, size);
    setJustAdded(true);
    toast.success(`${name} — ${t.menu.added}`);
    window.setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-[0.5rem] border border-[#E5E3D8] bg-white transition-colors hover:border-[#C5A869]/45">
      <div className="relative aspect-square w-full overflow-hidden bg-[#F3F3ED]">
        <Image
          src={item.image}
          alt={name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.05]"
        />
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="text-[0.9375rem] font-semibold leading-snug text-[#181512]">
          {name}
        </h3>
        <p className="mt-0.5 text-[0.75rem] text-[#968D82]">
          {isAr ? item.en : item.ar}
        </p>

        {hasSizes && (
          <div
            role="radiogroup"
            aria-label={name}
            className="mt-3 inline-flex rounded-full border border-[#E5E3D8] p-0.5"
          >
            {(["regular", "large"] as Size[]).map((s) => (
              <button
                key={s}
                role="radio"
                aria-checked={size === s}
                onClick={() => setSize(s)}
                className={cn(
                  "min-h-[32px] flex-1 rounded-full px-3 text-[0.6875rem] font-medium transition-colors",
                  size === s
                    ? "bg-[#53634B] text-[#F8F7F3]"
                    : "text-[#675E54] hover:text-[#181512]",
                )}
              >
                {s === "regular" ? t.menu.regular : t.menu.large}
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="text-[0.9375rem] font-semibold text-[#53634B]" dir="ltr">
            {price}
            <span className="ms-1 text-[0.6875rem] font-normal text-[#968D82]">
              {t.menu.currency}
            </span>
          </span>

          <button
            onClick={handleAdd}
            aria-label={`${t.menu.addToOrder} — ${name}`}
            className={cn(
              "flex size-10 items-center justify-center rounded-full border transition-all",
              justAdded
                ? "border-[#53634B] bg-[#53634B] text-[#F8F7F3]"
                : "border-[#E5E3D8] bg-[#F8F7F3] text-[#53634B] hover:border-[#C5A869] hover:bg-[#FAF7F0]",
            )}
          >
            {justAdded ? (
              <Check className="size-4" strokeWidth={2} />
            ) : (
              <Plus className="size-4" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
