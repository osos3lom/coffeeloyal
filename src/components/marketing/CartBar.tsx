"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";

/**
 * Appears only once something is in the order. Floats above the tab bar on
 * phones so the running total is always one thumb-reach away, and links to
 * /order rather than opening a sheet — the tab bar already owns that
 * destination, and two routes to the same place is clutter.
 */
export default function CartBar() {
  const { count, total, ready } = useCart();
  const { lang } = useTranslation();
  const t = marketing[lang];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  if (!ready || count === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 md:bottom-6"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 5.5rem)" }}
    >
      <Link
        href="/order"
        className="glass-tabbar pointer-events-auto mx-auto flex min-h-[56px] w-full max-w-md items-center gap-3 rounded-full ps-5 pe-2 md:max-w-lg"
      >
        <span className="relative shrink-0">
          <ShoppingBag className="size-5 text-[#53634B]" strokeWidth={1.5} />
          <span className="absolute -end-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C5A869] px-1 text-[0.5625rem] font-bold text-[#181512]">
            {count > 9 ? "9+" : count}
          </span>
        </span>

        <span className="flex-1 text-[0.8125rem] font-semibold text-[#2C3627]">
          {t.order.cart}
        </span>

        <span className="text-[0.9375rem] font-semibold text-[#53634B]" dir="ltr">
          {total}
          <span className="ms-1 text-[0.6875rem] font-normal text-[#8A8175]">
            {t.menu.currency}
          </span>
        </span>

        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#53634B] text-[#F8F7F3]">
          <Arrow className="size-4" strokeWidth={1.75} />
        </span>
      </Link>
    </div>
  );
}
