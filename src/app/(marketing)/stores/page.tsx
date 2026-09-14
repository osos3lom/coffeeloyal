"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Search,
  MapPin,
  ExternalLink,
  ShoppingBag,
  LocateFixed,
  Loader2,
  Info,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { marketing, type MarketingCopy } from "@/lib/i18n/marketing";
import { cities, mapsUrl, type Branch } from "@/lib/content/branches";
import { useCart } from "@/lib/cart/CartContext";
import {
  locatedBranches,
  nearestBranches,
  formatDistance,
  type LatLng,
  type LocatedBranch,
} from "@/lib/geo";
import PageHeader from "@/components/marketing/PageHeader";
import Reveal from "@/components/marketing/Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Leaflet touches `window` at import time, so it can never be server-rendered.
const BranchMap = dynamic(() => import("@/components/marketing/BranchMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-[#EFECE4]" />,
});

type GeoState = "idle" | "locating" | "ready" | "denied" | "error";

export default function StoresPage() {
  const { lang } = useTranslation();
  const t = marketing[lang];
  const isAr = lang === "ar";
  const { setBranch } = useCart();

  const [q, setQ] = useState("");
  const [userPos, setUserPos] = useState<LatLng | null>(null);
  const [accuracyM, setAccuracyM] = useState<number | null>(null);
  const [geo, setGeo] = useState<GeoState>("idle");
  const [selected, setSelected] = useState<string | null>(null);
  const [focus, setFocus] = useState<LatLng | null>(null);

  const locate = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setGeo("error");
      return;
    }
    setGeo("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const at = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserPos(at);
        setAccuracyM(pos.coords.accuracy ?? null);
        setGeo("ready");
        const best = nearestBranches(at, 1)[0];
        setFocus(best ? { lat: best.coords.lat, lng: best.coords.lng } : at);
        if (best) setSelected(best.slug);
      },
      (err) => setGeo(err.code === err.PERMISSION_DENIED ? "denied" : "error"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }, []);

  // Ranked by distance once we know where the user is, otherwise source order.
  const ranked: LocatedBranch[] = useMemo(
    () => (userPos ? nearestBranches(userPos) : locatedBranches),
    [userPos],
  );

  const matches = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return ranked;
    return ranked.filter((b) =>
      [b.ar, b.en, b.addressAr, b.addressEn].some((f) =>
        f.toLowerCase().includes(needle),
      ),
    );
  }, [q, ranked]);

  const nearest = userPos ? ranked[0] : null;

  const grouped = cities
    .map((c) => ({ city: c, list: matches.filter((b) => b.city === c.id) }))
    .filter((g) => g.list.length > 0);

  function show(b: LocatedBranch) {
    setSelected(b.slug);
    setFocus({ lat: b.coords.lat, lng: b.coords.lng });
    document.getElementById("branch-map")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  return (
    <>
      <PageHeader
        eyebrow={t.stores.eyebrow}
        title={t.stores.title}
        lede={t.stores.lede}
      >
        <div
          className="rise-in mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: "280ms" }}
        >
          <div className="relative flex-1 sm:max-w-md">
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
              className="min-h-[48px] w-full rounded-full border border-[#E5E3D8] bg-white ps-11 pe-4 text-[0.9375rem] text-[#181512] placeholder-[#968D82] transition-colors focus:border-[#C5A869] focus:outline-none focus:ring-2 focus:ring-[#C5A869]/20"
            />
          </div>

          <Button
            onClick={locate}
            disabled={geo === "locating"}
            variant="royal"
            size="xl"
            className="shrink-0 rounded-full"
          >
            {geo === "locating" ? (
              <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
            ) : (
              <LocateFixed className="size-4" strokeWidth={1.75} />
            )}
            {geo === "locating" ? t.stores.locating : t.stores.useLocation}
          </Button>
        </div>

        {(geo === "denied" || geo === "error") && (
          <p className="mt-3 text-[0.8125rem] text-[#A8423F]">
            {geo === "denied" ? t.stores.locationDenied : t.stores.locationUnavailable}
          </p>
        )}
      </PageHeader>

      <div className="mx-auto w-full max-w-6xl px-[var(--gutter)] pb-16 md:pb-24">
        {/* Nearest branch */}
        {nearest && (
          <Reveal className="royal-hero-card mb-6 rounded-[0.75rem] p-6 md:p-7">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#E8D399]">
              {t.stores.nearest}
            </p>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-brand-serif text-[1.5rem] text-[#F8F7F3]">
                  {isAr ? nearest.ar : nearest.en}
                </h2>
                <p className="mt-1 text-[0.8125rem] text-[#C9D0C4]">
                  {isAr ? nearest.addressAr : nearest.addressEn}
                </p>
              </div>
              {typeof nearest.distanceKm === "number" && (
                <p className="text-[1.75rem] font-semibold text-[#E8D399]" dir="ltr">
                  {formatDistance(nearest.distanceKm, lang)}
                </p>
              )}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild variant="gold" size="lg" className="rounded-full">
                <a href={mapsUrl(nearest)} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-4" strokeWidth={1.5} />
                  {t.stores.directions}
                </a>
              </Button>
              <Button
                asChild
                variant="ghostGold"
                size="lg"
                className="rounded-full"
              >
                <Link href="/order" onClick={() => setBranch(nearest.slug)}>
                  <ShoppingBag className="size-4" strokeWidth={1.5} />
                  {t.stores.orderHere}
                </Link>
              </Button>
            </div>
          </Reveal>
        )}

        {/* Map */}
        <Reveal
          className="overflow-hidden rounded-[0.75rem] border border-[#E5E3D8] bg-[#EFECE4]"
        >
          <div id="branch-map" className="h-[22rem] w-full md:h-[30rem]">
            <BranchMap
              branches={matches}
              userPos={userPos}
              accuracyM={accuracyM}
              nearestSlug={nearest?.slug ?? null}
              selectedSlug={selected}
              onSelect={setSelected}
              focus={focus}
              lang={lang}
              labels={{
                directions: t.stores.directions,
                approximate: t.stores.approximate,
                you: t.stores.you,
              }}
            />
          </div>
        </Reveal>

        <p className="mt-3 flex items-start gap-2 text-[0.75rem] leading-relaxed text-[#968D82]">
          <Info className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.5} aria-hidden />
          {t.stores.mapNote}
        </p>

        {/* List */}
        {grouped.length === 0 && (
          <p className="py-16 text-center text-[#675E54]">{t.stores.noResults}</p>
        )}

        {grouped.map(({ city, list }) => (
          <section key={city.id} id={city.id} className="scroll-mt-28 pt-12">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-brand-serif text-[1.5rem] text-[#181512]">
                {isAr ? city.ar : city.en}
              </h2>
              <span className="text-[0.8125rem] text-[#968D82]">
                {list.length} {t.stores.branchCount}
              </span>
            </div>
            <hr className="hairline-gold mt-4" />

            <ul className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {list.map((b, i) => (
                <Reveal as="li" key={b.slug} delay={Math.min(i, 5) * 0.03}>
                  <BranchCard
                    branch={b}
                    isAr={isAr}
                    lang={lang}
                    t={t}
                    active={b.slug === selected}
                    isNearest={b.slug === nearest?.slug}
                    onOrder={setBranch}
                    onShow={show}
                  />
                </Reveal>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

function BranchCard({
  branch,
  isAr,
  lang,
  t,
  active,
  isNearest,
  onOrder,
  onShow,
}: {
  branch: LocatedBranch;
  isAr: boolean;
  lang: "ar" | "en";
  t: MarketingCopy;
  active: boolean;
  isNearest: boolean;
  onOrder: (slug: string) => void;
  onShow: (b: LocatedBranch) => void;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-[0.5rem] border bg-white p-5 transition-colors",
        active ? "border-[#C5A869]" : "border-[#E5E3D8] hover:border-[#C5A869]/45",
      )}
    >
      <div className="flex items-start gap-2.5">
        <MapPin
          className="mt-0.5 size-4 shrink-0 text-[#53634B]"
          strokeWidth={1.5}
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[0.9375rem] font-semibold text-[#181512]">
              {isAr ? branch.ar : branch.en}
            </h3>
            {typeof branch.distanceKm === "number" &&
              branch.coords.quality !== "city" && (
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold",
                    isNearest
                      ? "bg-[#FAF7F0] text-[#886C37] ring-1 ring-[#E8D399]"
                      : "text-[#53634B]",
                  )}
                  dir="ltr"
                >
                  {formatDistance(branch.distanceKm, lang)}
                </span>
              )}
          </div>
          <p className="mt-1 text-[0.8125rem] leading-relaxed text-[#675E54]">
            {isAr ? branch.addressAr : branch.addressEn}
          </p>
          <button
            onClick={() => onShow(branch)}
            className="mt-2 text-[0.75rem] font-medium text-[#53634B] underline-offset-2 transition-colors hover:text-[#2C3627] hover:underline"
          >
            {t.stores.showOnMap}
          </button>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-2 pt-5">
        <a
          href={mapsUrl(branch)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[38px] flex-1 items-center justify-center gap-1.5 rounded-full border border-[#E5E3D8] px-3 text-[0.75rem] font-medium text-[#675E54] transition-colors hover:border-[#C5A869] hover:text-[#181512]"
        >
          <ExternalLink className="size-3.5" strokeWidth={1.5} />
          {t.stores.directions}
        </a>
        <Link
          href="/order"
          onClick={() => onOrder(branch.slug)}
          className="inline-flex min-h-[38px] flex-1 items-center justify-center gap-1.5 rounded-full bg-[#53634B] px-3 text-[0.75rem] font-semibold text-[#F8F7F3] transition-colors hover:bg-[#2C3627]"
        >
          <ShoppingBag className="size-3.5" strokeWidth={1.5} />
          {t.stores.orderHere}
        </Link>
      </div>
    </article>
  );
}

export type { Branch };
