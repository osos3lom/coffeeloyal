"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, useReducedMotion } from "framer-motion";
import { Stamp, Coffee, ShoppingBag, ScanLine, MapPin } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { useCart } from "@/lib/cart/CartContext";
import { cn } from "@/lib/utils";

/**
 * The primary navigation on phones: a floating glass bar that clears the
 * home indicator rather than sitting flush against it.
 *
 * Always visible. Hide-on-scroll reads as cheap and costs the user their
 * anchor point, which matters more than the few pixels it reclaims.
 */
export default function MobileTabBar() {
  const pathname = usePathname();
  const { lang } = useTranslation();
  const t = marketing[lang];
  const { status } = useSession();
  const { count } = useCart();
  const reduced = useReducedMotion();

  const signedIn = status === "authenticated";

  const tabs = [
    {
      href: signedIn ? "/dashboard" : "/rewards",
      match: ["/rewards", "/dashboard"],
      label: t.nav.rewards,
      Icon: Stamp,
    },
    { href: "/menu", match: ["/menu"], label: t.nav.menu, Icon: Coffee },
    {
      href: "/order",
      match: ["/order"],
      label: t.nav.order,
      Icon: ShoppingBag,
      badge: count,
    },
    {
      href: signedIn ? "/dashboard/scan" : "/login?next=/dashboard/scan",
      match: ["/dashboard/scan"],
      label: t.nav.scan,
      Icon: ScanLine,
    },
    { href: "/stores", match: ["/stores"], label: t.nav.stores, Icon: MapPin },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-label={t.nav.home}
    >
      <ul className="glass-tabbar mx-3 flex items-stretch gap-0.5 rounded-[1.75rem] p-1.5">
        {tabs.map(({ href, match, label, Icon, badge }) => {
          const active = match.some(
            (m) => pathname === m || pathname.startsWith(m + "/"),
          );
          return (
            <li key={label} className="relative flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-[1.375rem] px-1 transition-colors",
                  active ? "text-[#2C3627]" : "text-[#7A7266]",
                )}
              >
                {active && (
                  <motion.span
                    aria-hidden
                    layoutId={reduced ? undefined : "tab-pill"}
                    className="absolute inset-0 rounded-[1.375rem] border-t border-t-[#C5A869]/55 bg-[#E7EBE3]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative flex flex-col items-center gap-1">
                  <span className="relative">
                    <Icon
                      className="size-5"
                      strokeWidth={active ? 2 : 1.5}
                      aria-hidden
                    />
                    {badge ? (
                      <span className="absolute -end-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C5A869] px-1 text-[0.5625rem] font-bold text-[#181512]">
                        {badge > 9 ? "9+" : badge}
                      </span>
                    ) : null}
                  </span>
                  <span className="text-[0.625rem] font-medium leading-none">
                    {label}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
