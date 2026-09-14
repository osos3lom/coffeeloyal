"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, ChefHat, BellRing, Check, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { SkeletonCard } from "@/components/Skeleton";

type Status = "pending" | "accepted" | "ready" | "collected" | "cancelled";

interface OrderItem {
  nameAr: string;
  nameEn: string;
  size: "regular" | "large";
  qty: number;
  unitPrice: number;
}

interface Order {
  id: number;
  code: string;
  status: Status;
  total: number;
  notes: string;
  created_at: string;
  shop_name_ar: string;
  shop_name_en: string;
  items: OrderItem[];
}

const COPY = {
  en: {
    title: "My Orders",
    subtitle: "Your pickup orders",
    empty: "No orders yet",
    emptyHint: "Browse the menu and place a pickup order.",
    browse: "Browse the menu",
    currency: "SAR",
    pending: "Received",
    accepted: "Preparing",
    ready: "Ready to collect",
    collected: "Collected",
    cancelled: "Cancelled",
  },
  ar: {
    title: "طلباتي",
    subtitle: "طلبات الاستلام الخاصة بك",
    empty: "لا توجد طلبات بعد",
    emptyHint: "تصفح القائمة وأرسل طلب استلام.",
    browse: "تصفح القائمة",
    currency: "ر.س",
    pending: "تم الاستلام",
    accepted: "قيد التحضير",
    ready: "جاهز للاستلام",
    collected: "تم التسليم",
    cancelled: "ملغي",
  },
};

export default function MyOrdersPage() {
  const { lang } = useTranslation();
  const c = COPY[lang] ?? COPY.ar;
  const isAr = lang === "ar";
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        if (alive && res.ok) setOrders(data.orders ?? []);
      } catch {
        if (alive) setOrders([]);
      }
    }
    load();
    const id = window.setInterval(load, 15000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  const meta: Record<Status, { label: string; Icon: typeof Clock; cls: string }> = {
    pending: { label: c.pending, Icon: Clock, cls: "bg-[#FAF7F0] border-[#E8D399] text-[#886C37]" },
    accepted: { label: c.accepted, Icon: ChefHat, cls: "bg-[#F0F3EE] border-[#DCE4D8] text-[#3E4B37]" },
    ready: { label: c.ready, Icon: BellRing, cls: "bg-[#2C3627] border-[#2C3627] text-[#F3F3ED]" },
    collected: { label: c.collected, Icon: Check, cls: "bg-[#F3F3ED] border-[#E5E3D8] text-[#675E54]" },
    cancelled: { label: c.cancelled, Icon: X, cls: "bg-[#F3F3ED] border-[#E5E3D8] text-[#968D82]" },
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="font-brand-serif text-2xl font-bold tracking-tight text-[#181512]">
        {c.title}
      </h1>
      <p className="mt-0.5 text-xs text-[#675E54]">{c.subtitle}</p>

      {!orders ? (
        <div className="mt-6 space-y-3">
          <SkeletonCard lines={3} />
          <SkeletonCard lines={3} />
        </div>
      ) : orders.length === 0 ? (
        <div className="crema-card mt-6 p-10 text-center">
          <p className="text-sm font-semibold text-[#181512]">{c.empty}</p>
          <p className="mt-1 text-xs text-[#675E54]">{c.emptyHint}</p>
          <Link
            href="/menu"
            className="olive-button mt-5 inline-block rounded-lg px-4 py-2 text-xs transition-all"
          >
            {c.browse}
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {orders.map((o) => {
            const m = meta[o.status];
            return (
              <li key={o.id} className="crema-card p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-brand-serif text-lg font-bold text-[#181512]" dir="ltr">
                      {o.code}
                    </p>
                    <p className="mt-0.5 text-xs text-[#675E54]">
                      {isAr ? o.shop_name_ar : o.shop_name_en}
                    </p>
                  </div>
                  <span
                    className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${m.cls}`}
                  >
                    <m.Icon className="h-3 w-3" strokeWidth={2} />
                    {m.label}
                  </span>
                </div>

                <ul className="mt-3 space-y-1 border-t border-[#EFECE4] pt-3">
                  {o.items.map((it, i) => (
                    <li key={i} className="text-xs text-[#302B25]">
                      <span className="font-semibold" dir="ltr">
                        {it.qty}×
                      </span>{" "}
                      {isAr ? it.nameAr : it.nameEn}
                      {it.size === "large" && <span className="text-[#968D82]"> · L</span>}
                    </li>
                  ))}
                </ul>

                <div className="mt-3 border-t border-[#EFECE4] pt-3 text-end">
                  <span className="text-sm font-bold text-[#53634B]" dir="ltr">
                    {o.total}{" "}
                    <span className="text-[10px] font-normal">{c.currency}</span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
