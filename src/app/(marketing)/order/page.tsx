"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  MapPin,
  Search,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing } from "@/lib/i18n/marketing";
import { branches, cities } from "@/lib/content/branches";
import { useCart } from "@/lib/cart/CartContext";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/marketing/PageHeader";
import { cn } from "@/lib/utils";

export default function OrderPage() {
  const { lang } = useTranslation();
  const t = marketing[lang];
  const isAr = lang === "ar";
  const router = useRouter();
  const { status } = useSession();
  const { branch, lines, total, count, ready, setBranch, setQty, remove, clear } =
    useCart();

  const [q, setQ] = useState("");
  const [notes, setNotes] = useState("");
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState<{ code: string } | null>(null);
  const [picking, setPicking] = useState(false);

  const selected = branches.find((b) => b.slug === branch) ?? null;

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return branches;
    return branches.filter((b) =>
      [b.ar, b.en, b.addressAr, b.addressEn].some((f) =>
        f.toLowerCase().includes(needle),
      ),
    );
  }, [q]);

  async function placeOrder() {
    if (!selected || lines.length === 0) return;
    if (status !== "authenticated") {
      router.push("/login?next=/order");
      return;
    }
    setPlacing(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branchSlug: selected.slug,
          notes,
          lines: lines.map((l) => ({ slug: l.slug, size: l.size, qty: l.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to place order");
        return;
      }
      setPlaced({ code: data.order.code });
      clear();
    } catch {
      toast.error("Failed to place order");
    } finally {
      setPlacing(false);
    }
  }

  // ---------- Confirmation ----------
  if (placed) {
    return (
      <>
        <PageHeader eyebrow={t.order.eyebrow} title={t.order.placed} lede={t.order.placedBody} />
        <div className="mx-auto w-full max-w-md px-[var(--gutter)] pb-24">
          <div className="royal-hero-card rounded-[1rem] px-8 py-12 text-center">
            <CheckCircle2
              className="mx-auto size-10 text-[#E8D399]"
              strokeWidth={1.25}
              aria-hidden
            />
            <p className="mt-6 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#A9B3A3]">
              {t.order.cart}
            </p>
            <p
              className="font-brand-serif mt-2 text-[2.75rem] leading-none text-[#F8F7F3]"
              dir="ltr"
            >
              {placed.code}
            </p>
            <p className="mt-5 text-[0.875rem] text-[#C9D0C4]">
              {isAr ? selected?.ar : selected?.en}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Button asChild variant="royal" size="xl" className="rounded-full">
              <Link href="/dashboard/orders">{t.order.viewOrders}</Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="rounded-full">
              <Link href="/menu">{t.menu.cta}</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  // ---------- Branch picker ----------
  const needsBranch = !selected || picking;

  return (
    <>
      <PageHeader eyebrow={t.order.eyebrow} title={t.order.title} lede={t.order.lede} />

      <div className="mx-auto w-full max-w-2xl px-[var(--gutter)] pb-28 pt-2">
        {/* Branch */}
        <section className="rounded-[0.5rem] border border-[#E5E3D8] bg-white p-5">
          <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[#8A8175]">
            {t.order.pickupFrom}
          </h2>

          {selected && !picking ? (
            <div className="mt-3 flex items-start justify-between gap-4">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#53634B]" strokeWidth={1.5} />
                <div>
                  <p className="font-semibold text-[#181512]">
                    {isAr ? selected.ar : selected.en}
                  </p>
                  <p className="mt-0.5 text-[0.8125rem] text-[#675E54]">
                    {isAr ? selected.addressAr : selected.addressEn}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPicking(true)}
                className="min-h-[38px] shrink-0 rounded-full border border-[#E5E3D8] px-3.5 text-[0.75rem] font-medium text-[#675E54] transition-colors hover:border-[#C5A869] hover:text-[#181512]"
              >
                {t.order.changeBranch}
              </button>
            </div>
          ) : (
            <div className="mt-3">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-[#968D82]"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={t.stores.search}
                  aria-label={t.stores.search}
                  className="min-h-[48px] w-full rounded-full border border-[#E5E3D8] bg-[#F8F7F3] ps-11 pe-4 text-[0.9375rem] text-[#181512] placeholder-[#968D82] focus:border-[#C5A869] focus:outline-none focus:ring-2 focus:ring-[#C5A869]/20"
                />
              </div>

              <ul className="mt-3 max-h-80 divide-y divide-[#EFECE4] overflow-y-auto">
                {filtered.map((b) => {
                  const city = cities.find((c) => c.id === b.city);
                  return (
                    <li key={b.slug}>
                      <button
                        onClick={() => {
                          // Switching branch clears the order: prices and
                          // availability are per-branch.
                          if (branch && branch !== b.slug && count > 0) {
                            if (!window.confirm(t.order.switchBranchBody)) return;
                            clear();
                          }
                          setBranch(b.slug);
                          setPicking(false);
                          setQ("");
                        }}
                        className="flex w-full min-h-[56px] items-center justify-between gap-3 py-3 text-start transition-colors hover:bg-[#F8F7F3]"
                      >
                        <span>
                          <span className="block text-[0.9375rem] font-medium text-[#181512]">
                            {isAr ? b.ar : b.en}
                          </span>
                          <span className="mt-0.5 block text-[0.75rem] text-[#968D82]">
                            {isAr ? b.addressAr : b.addressEn}
                          </span>
                        </span>
                        <span className="shrink-0 text-[0.6875rem] uppercase tracking-wider text-[#A18548]">
                          {isAr ? city?.ar : city?.en}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>

        {/* Order lines */}
        <section className="mt-4 rounded-[0.5rem] border border-[#E5E3D8] bg-white p-5">
          <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[#8A8175]">
            {t.order.cart}
          </h2>

          {!ready ? (
            <div className="py-10" />
          ) : lines.length === 0 ? (
            <div className="py-10 text-center">
              <ShoppingBag
                className="mx-auto size-8 text-[#C9C2B8]"
                strokeWidth={1.25}
                aria-hidden
              />
              <p className="mt-4 font-medium text-[#181512]">{t.order.empty}</p>
              <p className="mt-1 text-[0.875rem] text-[#675E54]">{t.order.emptyHint}</p>
              <Button asChild variant="royal" size="lg" className="mt-6 rounded-full">
                <Link href="/menu">{t.menu.cta}</Link>
              </Button>
            </div>
          ) : (
            <>
              <ul className="mt-2 divide-y divide-[#EFECE4]">
                {lines.map((l) => (
                  <li key={l.key} className="flex items-center gap-3 py-4">
                    <span className="relative size-14 shrink-0 overflow-hidden rounded-[0.375rem] bg-[#F3F3ED]">
                      <Image
                        src={l.item.image}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.9375rem] font-medium text-[#181512]">
                        {isAr ? l.item.ar : l.item.en}
                      </span>
                      <span className="mt-0.5 block text-[0.75rem] text-[#968D82]">
                        {l.size === "large" ? t.menu.large : t.menu.regular} ·{" "}
                        <span dir="ltr">
                          {l.unitPrice} {t.menu.currency}
                        </span>
                      </span>
                    </span>

                    <span className="flex shrink-0 items-center gap-1 rounded-full border border-[#E5E3D8] p-0.5">
                      <button
                        onClick={() => setQty(l.slug, l.size, l.qty - 1)}
                        aria-label="-"
                        className="flex size-9 items-center justify-center rounded-full text-[#53634B] transition-colors hover:bg-[#F3F3ED]"
                      >
                        {l.qty === 1 ? (
                          <Trash2 className="size-3.5" strokeWidth={1.5} />
                        ) : (
                          <Minus className="size-3.5" strokeWidth={1.75} />
                        )}
                      </button>
                      <span
                        className="w-5 text-center text-[0.875rem] font-semibold text-[#181512]"
                        dir="ltr"
                      >
                        {l.qty}
                      </span>
                      <button
                        onClick={() => setQty(l.slug, l.size, l.qty + 1)}
                        aria-label="+"
                        className="flex size-9 items-center justify-center rounded-full text-[#53634B] transition-colors hover:bg-[#F3F3ED]"
                      >
                        <Plus className="size-3.5" strokeWidth={1.75} />
                      </button>
                    </span>

                    <button
                      onClick={() => remove(l.slug, l.size)}
                      aria-label={`${t.order.remove} — ${isAr ? l.item.ar : l.item.en}`}
                      className="hidden size-9 shrink-0 items-center justify-center rounded-full text-[#968D82] transition-colors hover:text-[#A8423F] sm:flex"
                    >
                      <Trash2 className="size-4" strokeWidth={1.5} />
                    </button>
                  </li>
                ))}
              </ul>

              <label className="mt-5 block">
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[#8A8175]">
                  {t.order.notes}
                </span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  maxLength={500}
                  placeholder={t.order.notesPlaceholder}
                  className="mt-2 w-full rounded-[0.5rem] border border-[#E5E3D8] bg-[#F8F7F3] px-3.5 py-2.5 text-[0.875rem] text-[#181512] placeholder-[#968D82] focus:border-[#C5A869] focus:outline-none focus:ring-2 focus:ring-[#C5A869]/20"
                />
              </label>

              <hr className="hairline-gold my-5" />

              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#181512]">{t.order.total}</span>
                <span className="text-[1.25rem] font-semibold text-[#53634B]" dir="ltr">
                  {total}
                  <span className="ms-1 text-[0.75rem] font-normal text-[#8A8175]">
                    {t.menu.currency}
                  </span>
                </span>
              </div>
              <p className="mt-1 text-end text-[0.75rem] text-[#968D82]">
                {t.order.payAtCounter}
              </p>
            </>
          )}
        </section>

        {lines.length > 0 && (
          <div className="mt-5">
            <Button
              onClick={placeOrder}
              disabled={placing || needsBranch}
              variant="gold"
              size="xl"
              className={cn("w-full", needsBranch && "opacity-60")}
            >
              {placing
                ? t.order.placing
                : status !== "authenticated"
                  ? t.order.signInToOrder
                  : needsBranch
                    ? t.order.chooseBranch
                    : t.order.place}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
