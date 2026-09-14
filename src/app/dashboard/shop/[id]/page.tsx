"use client";

import { useEffect, useState, use } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, Coffee } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { SkeletonCard } from "@/components/Skeleton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ShopDetail {
  name: string;
  address: string;
  balance: number;
  points_to_redeem: number;
  earned_points: number;
  redeemed_points: number;
  reward_id: number | null;
  reward_status: string | null;
}

export default function ShopPage({ params }: { params: Promise<{ id: string }> }) {
  const { t } = useTranslation();
  const { id } = use(params);
  const [shop, setShop] = useState<ShopDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [redeemError, setRedeemError] = useState("");
  const [redeeming, setRedeeming] = useState(false);
  const [history, setHistory] = useState<
    { id: number; amount: number; source: string; balance: number; created_at: string }[]
  >([]);

  useEffect(() => {
    fetch("/api/customer/shops")
      .then((r) => r.json())
      .then((data) => {
        const found = (data.shops || []).find((s: { id: number }) => String(s.id) === id);
        setShop(
          found
            ? {
                name: found.name,
                address: found.address,
                balance: parseInt(found.balance, 10),
                points_to_redeem: found.points_to_redeem || 9,
                earned_points: parseInt(found.earned_points, 10),
                redeemed_points: parseInt(found.redeemed_points, 10),
                reward_id: found.reward_id,
                reward_status: found.reward_status,
              }
            : null,
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch(`/api/customer/points-history?shopId=${id}`)
      .then((r) => r.json())
      .then((data) => setHistory(data.history || []))
      .catch(() => {});
  }, [id]);

  async function handleRedeem() {
    setRedeemError("");
    setRedeeming(true);
    const res = await fetch("/api/rewards/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shopId: parseInt(id, 10) }),
    });
    const data = await res.json();
    if (!res.ok) {
      setRedeemError(data.error || "Failed to redeem");
      setRedeeming(false);
      return;
    }
    const qr = await QRCode.toDataURL(data.reward.redemptionToken, { width: 300, margin: 2 });
    setQrDataUrl(qr);
    setRedeeming(false);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-lg px-4 py-8 space-y-4">
        <SkeletonCard lines={5} />
        <SkeletonCard lines={3} />
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center text-xs text-[#675E54]">
        {t.common.shopNotFound}
      </div>
    );
  }

  const threshold = shop.points_to_redeem || 9;
  const progress = shop.balance % threshold;
  const hasReward = shop.reward_status === "available" || shop.balance >= threshold;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-lg px-4 py-6 space-y-4"
    >
      {/* Back button */}
      <Button asChild variant="ghost" size="sm" className="gap-1.5 text-xs text-[#675E54] hover:text-[#2C3627]">
        <Link href="/dashboard">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{t.customer.yourPoints}</span>
        </Link>
      </Button>

      {/* Royal Hero Balance Card */}
      <div className="royal-hero-card p-6 rounded-2xl text-[#F8F7F3] shadow-lg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-brand-serif text-2xl font-bold tracking-tight">{shop.name}</h1>
            {shop.address && <p className="text-xs text-[#E8D399]/85 mt-0.5">{shop.address}</p>}
          </div>
          <div className="text-right shrink-0">
            <span className="font-brand-serif text-3xl sm:text-4xl font-bold text-[#F8F7F3] block leading-none">
              {shop.balance}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#E8D399]/80 font-medium block mt-1">
              {t.customer.totalPoints}
            </span>
          </div>
        </div>

        {hasReward && (
          <div className="mt-5 pt-4 border-t border-[#E8D399]/20 flex items-center justify-between gap-3">
            <div className="text-xs">
              <span className="font-semibold text-[#E8D399] flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#E8D399]" />
                {t.customer.earnedFree}
              </span>
            </div>
            <Button
              onClick={handleRedeem}
              disabled={redeeming || !!qrDataUrl}
              variant="gold"
              size="sm"
              className="h-8 text-xs font-semibold shrink-0"
            >
              {redeeming ? t.customer.generating : t.customer.redeem}
            </Button>
          </div>
        )}

        {redeemError && <p className="mt-2 text-xs font-medium text-red-200">{redeemError}</p>}
      </div>

      {/* QR Voucher Modal / Inline display */}
      <AnimatePresence>
        {qrDataUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="p-6 text-center border-[#C5A869]/50 bg-[#FAF7F0]">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#886C37]">
                {t.customer.showToStaff}
              </p>
              <div className="inline-block p-3 bg-white rounded-xl border border-[#DDD9CC] shadow-sm">
                <Image src={qrDataUrl} alt="Redemption QR" width={240} height={240} className="mx-auto rounded-lg" />
              </div>
              <div>
                <Button
                  variant="link"
                  onClick={() => setQrDataUrl(null)}
                  className="mt-3 text-xs font-semibold text-[#675E54] hover:text-[#181512]"
                >
                  {t.customer.dismiss}
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Royal Stamp Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#8A8175]">
            {t.customer.punchCard}
          </h2>
          <span className="text-xs font-mono font-semibold text-[#675E54]">
            {progress} / {threshold}
          </span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5">
          {Array.from({ length: threshold }, (_, i) => {
            const isFilled = i < progress;
            return (
              <motion.div
                key={i}
                initial={isFilled ? { scale: 0.8, opacity: 0 } : false}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: i * 0.04 }}
                className={`flex aspect-square items-center justify-center rounded-xl transition-all ${
                  isFilled ? "stamp-filled shadow-sm" : "stamp-empty"
                }`}
              >
                {isFilled ? (
                  <Coffee className="h-5 w-5 text-[#886C37]" />
                ) : (
                  <span className="text-xs font-mono text-[#8A8175]/60">{i + 1}</span>
                )}
              </motion.div>
            );
          })}
        </div>

        <p className="mt-4 text-xs text-[#675E54]">
          <span className="font-bold text-[#2C3627]">{progress}</span> {t.customer.of}{" "}
          <span className="font-bold text-[#181512]">{threshold}</span> —{" "}
          {threshold - progress > 0
            ? `${threshold - progress} ${t.customer.moreUntilFree}`
            : t.customer.earnedFree}
        </p>
      </Card>

      {/* Stamp History */}
      {history.length > 0 && (
        <Card className="p-6">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#8A8175] mb-3">
            {t.customer.pointHistory}
          </h2>
          <div className="divide-y divide-[#E5E3D8]/70">
            {history.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                <div>
                  <p className="text-xs font-medium text-[#181512]">
                    {entry.source === "earn" ? t.customer.qrScan : t.customer.rewardRedeemed}
                  </p>
                  <p className="text-[10px] text-[#8A8175] mt-0.5">
                    {new Date(entry.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-xs font-bold tabular-nums ${
                      entry.source === "earn" ? "text-[#53634B]" : "text-rose-700"
                    }`}
                  >
                    {entry.source === "earn" ? "+" : "−"}
                    {entry.amount}
                  </p>
                  <p className="text-[10px] text-[#8A8175] tabular-nums font-mono">{entry.balance} pts</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </motion.div>
  );
}
