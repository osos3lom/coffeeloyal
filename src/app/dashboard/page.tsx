"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { QrCode, Sparkles, Coffee } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { SkeletonCard } from "@/components/Skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ShopSummary {
  id: number;
  name: string;
  slug: string;
  address: string;
  points_to_redeem: number;
  earned_points: string;
  redeemed_points: string;
  balance: string;
  reward_id: number | null;
  reward_status: string | null;
  reward_token: string | null;
}

export default function DashboardPage() {
  const { t } = useTranslation();
  const [shops, setShops] = useState<ShopSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/customer/shops")
      .then((r) => r.json())
      .then((data) => {
        setShops(data.shops || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="font-brand-serif text-2xl font-bold tracking-tight text-[#181512]">
            {t.customer.yourPoints}
          </h1>
          <p className="text-xs text-[#675E54] mt-0.5">{t.customer.tapToSee}</p>
        </div>
        <Button asChild variant="gold" size="sm" className="gap-1.5 shadow-sm">
          <Link href="/dashboard/scan">
            <QrCode className="h-4 w-4" />
            <span>{t.customer.scanQR}</span>
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          <SkeletonCard lines={3} />
          <SkeletonCard lines={3} />
        </div>
      ) : shops.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#2C3627]/10 text-[#2C3627]">
            <Coffee className="h-7 w-7" />
          </div>
          <p className="text-sm font-semibold text-[#181512]">{t.customer.noShops}</p>
          <p className="mt-1 text-xs text-[#675E54] max-w-xs mx-auto">{t.customer.noShopsHint}</p>
        </Card>
      ) : (
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="space-y-3.5"
        >
          {shops.map((shop) => {
            const balance = parseInt(shop.balance, 10);
            const threshold = shop.points_to_redeem || 9;
            const progress = balance % threshold;
            const hasReward = shop.reward_status === "available";

            return (
              <motion.div
                key={shop.id}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Link href={`/dashboard/shop/${shop.id}`} className="block group">
                  <Card className="transition-all duration-200 group-hover:border-[#C5A869]/70 group-hover:shadow-md">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="font-brand-serif text-lg font-bold text-[#181512] group-hover:text-[#2C3627] transition-colors">
                            {shop.name}
                          </h2>
                          {shop.address && (
                            <p className="text-xs text-[#675E54] mt-0.5">{shop.address}</p>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-brand-serif text-3xl font-bold text-[#2C3627] leading-none block">
                            {balance}
                          </span>
                          <span className="text-[11px] font-medium text-[#8A8175] block mt-0.5">
                            {t.customer.totalPoints}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#E5E3D8]/70">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {Array.from({ length: threshold }, (_, i) => (
                              <div
                                key={i}
                                className={`h-3 w-3 rounded-full transition-all ${
                                  i < progress
                                    ? "bg-[#C5A869] ring-2 ring-[#FAF5E9]"
                                    : "bg-[#EBEAE2] border border-[#DDD9CC]"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-semibold text-[#675E54] tabular-nums font-mono">
                            {progress}/{threshold}
                          </span>
                        </div>
                      </div>

                      {hasReward && (
                        <div className="mt-3.5 rounded-xl bg-[#FAF7F0] border border-[#E8D399] px-3 py-1.5 text-xs font-semibold text-[#886C37] flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-[#C5A869]" />
                            {t.customer.earnedFree}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider text-[#A18548]">→</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
