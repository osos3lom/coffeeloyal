"use client";

import { useCallback, useEffect, useState } from "react";
import { Clock, ChefHat, BellRing, Check, X, RefreshCw } from "lucide-react";
import { toast } from "sonner";
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
  customer_name: string;
  items: OrderItem[];
}

const COPY = {
  en: {
    title: "Pickup Orders",
    subtitle: "Live queue for your branch",
    empty: "No open orders",
    emptyHint: "New pickup orders will appear here.",
    refresh: "Refresh",
    accept: "Accept",
    ready: "Mark ready",
    collected: "Collected",
    cancel: "Cancel",
    notes: "Notes",
    pending: "New",
    accepted: "Preparing",
    readyLabel: "Ready",
    currency: "SAR",
    awarded: "Collected — 1 loyalty point awarded",
    rewardUnlocked: "Free drink unlocked for this customer",
  },
  ar: {
    title: "طلبات الاستلام",
    subtitle: "قائمة الطلبات المباشرة لفرعك",
    empty: "لا توجد طلبات",
    emptyHint: "ستظهر طلبات الاستلام الجديدة هنا.",
    refresh: "تحديث",
    accept: "قبول",
    ready: "جاهز",
    collected: "تم الاستلام",
    cancel: "إلغاء",
    notes: "ملاحظات",
    pending: "جديد",
    accepted: "قيد التحضير",
    readyLabel: "جاهز",
    currency: "ر.س",
    awarded: "تم الاستلام — أُضيف ختم ولاء",
    rewardUnlocked: "تم فتح مشروب مجاني لهذا العميل",
  },
};

export default function StaffOrdersPage() {
  const { lang } = useTranslation();
  const c = COPY[lang] ?? COPY.ar;
  const isAr = lang === "ar";

  const [orders, setOrders] = useState<Order[] | null>(null);
  const [busy, setBusy] = useState<number | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/staff/orders");
      const data = await res.json();
      if (res.ok) setOrders(data.orders ?? []);
    } catch {
      /* keep the last good list on a transient failure */
    }
  }, []);

  useEffect(() => {
    // Short poll: a barista needs to see a new order within seconds, and the
    // queue is small enough that this is cheap. The first fetch is scheduled
    // rather than called inline so the effect does not push state during the
    // commit phase.
    const first = window.setTimeout(load, 0);
    const id = window.setInterval(load, 10000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [load]);

  async function advance(order: Order, next: Status) {
    setBusy(order.id);
    try {
      const res = await fetch(`/api/staff/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed");
        return;
      }
      if (next === "collected") {
        toast.success(c.awarded);
        if (data.rewardCreated) toast.success(c.rewardUnlocked);
      }
      await load();
    } catch {
      toast.error("Failed");
    } finally {
      setBusy(null);
    }
  }

  const statusMeta: Record<
    string,
    { label: string; Icon: typeof Clock; cls: string }
  > = {
    pending: {
      label: c.pending,
      Icon: Clock,
      cls: "bg-[#FAF7F0] border-[#E8D399] text-[#886C37]",
    },
    accepted: {
      label: c.accepted,
      Icon: ChefHat,
      cls: "bg-[#F0F3EE] border-[#DCE4D8] text-[#3E4B37]",
    },
    ready: {
      label: c.readyLabel,
      Icon: BellRing,
      cls: "bg-[#2C3627] border-[#2C3627] text-[#F3F3ED]",
    },
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-brand-serif text-2xl font-bold tracking-tight text-[#181512]">
            {c.title}
          </h1>
          <p className="mt-0.5 text-xs text-[#675E54]">{c.subtitle}</p>
        </div>
        <button
          onClick={load}
          aria-label={c.refresh}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E3D8] bg-[#F8F7F3] text-[#53634B] transition-colors hover:bg-[#F3F3ED]"
        >
          <RefreshCw className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>

      {!orders ? (
        <div className="mt-6 space-y-3">
          <SkeletonCard lines={3} />
          <SkeletonCard lines={3} />
        </div>
      ) : orders.length === 0 ? (
        <div className="crema-card mt-6 p-10 text-center">
          <p className="text-sm font-semibold text-[#181512]">{c.empty}</p>
          <p className="mt-1 text-xs text-[#675E54]">{c.emptyHint}</p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {orders.map((o) => {
            const meta = statusMeta[o.status];
            return (
              <li key={o.id} className="crema-card p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p
                      className="font-brand-serif text-lg font-bold text-[#181512]"
                      dir="ltr"
                    >
                      {o.code}
                    </p>
                    <p className="mt-0.5 text-xs text-[#675E54]">
                      {o.customer_name}
                    </p>
                  </div>
                  {meta && (
                    <span
                      className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold ${meta.cls}`}
                    >
                      <meta.Icon className="h-3 w-3" strokeWidth={2} />
                      {meta.label}
                    </span>
                  )}
                </div>

                <ul className="mt-3 space-y-1.5 border-t border-[#EFECE4] pt-3">
                  {o.items.map((it, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between gap-3 text-xs"
                    >
                      <span className="text-[#302B25]">
                        <span className="font-semibold" dir="ltr">
                          {it.qty}×
                        </span>{" "}
                        {isAr ? it.nameAr : it.nameEn}
                        {it.size === "large" && (
                          <span className="text-[#968D82]"> · L</span>
                        )}
                      </span>
                      <span className="shrink-0 text-[#675E54]" dir="ltr">
                        {(it.unitPrice * it.qty).toFixed(0)}
                      </span>
                    </li>
                  ))}
                </ul>

                {o.notes && (
                  <p className="mt-3 rounded-lg bg-[#FAF7F0] border border-[#E2D3B1] px-3 py-2 text-[11px] text-[#886C37]">
                    <span className="font-bold">{c.notes}: </span>
                    {o.notes}
                  </p>
                )}

                <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#EFECE4] pt-3">
                  <span className="text-sm font-bold text-[#53634B]" dir="ltr">
                    {o.total} <span className="text-[10px] font-normal">{c.currency}</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => advance(o, "cancelled")}
                      disabled={busy === o.id}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E3D8] text-[#A8423F] transition-colors hover:bg-red-50/60 disabled:opacity-50"
                      aria-label={c.cancel}
                    >
                      <X className="h-4 w-4" strokeWidth={1.75} />
                    </button>

                    {o.status === "pending" && (
                      <button
                        onClick={() => advance(o, "accepted")}
                        disabled={busy === o.id}
                        className="olive-button rounded-lg px-4 py-2 text-xs transition-all disabled:opacity-50"
                      >
                        {c.accept}
                      </button>
                    )}
                    {o.status === "accepted" && (
                      <button
                        onClick={() => advance(o, "ready")}
                        disabled={busy === o.id}
                        className="olive-button rounded-lg px-4 py-2 text-xs transition-all disabled:opacity-50"
                      >
                        {c.ready}
                      </button>
                    )}
                    {o.status === "ready" && (
                      <button
                        onClick={() => advance(o, "collected")}
                        disabled={busy === o.id}
                        className="gold-button flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs transition-all disabled:opacity-50"
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={2} />
                        {c.collected}
                      </button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
