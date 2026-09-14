import type { ReactNode } from "react";
import FloatingNav from "@/components/marketing/FloatingNav";
import MobileTopBar from "@/components/marketing/MobileTopBar";
import MobileTabBar from "@/components/marketing/MobileTabBar";
import SiteFooter from "@/components/marketing/SiteFooter";
import { CartProvider } from "@/lib/cart/CartContext";

/**
 * Shell for the public brand site. Kept in its own route group so the
 * authenticated app layouts (dashboard, staff, admin) are untouched.
 */
export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CartProvider>
      <FloatingNav />
      <MobileTopBar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <MobileTabBar />
    </CartProvider>
  );
}
