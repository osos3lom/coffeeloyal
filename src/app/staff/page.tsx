"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { QrCode, CheckCircle2, History, ShoppingBag, X, Users, Sparkles, TrendingUp, Gift } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { SkeletonStat } from "@/components/Skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface Analytics {
  total_customers: string;
  customers_this_week: string;
  total_points_earned: string;
  points_this_week: string;
  total_points_redeemed: string;
  redeemed_this_week: string;
  total_redemptions: string;
  redemptions_this_week: string;
}

export default function StaffDashboardPage() {
  const { t, lang } = useTranslation();
  const { data: session } = useSession();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    fetch("/api/staff/analytics")
      .then((r) => r.json())
      .then((d) => setAnalytics(d.analytics))
      .catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      {session?.user?.shopStatus === "active" && !bannerDismissed && (
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-[#53634B]/30 bg-[#2C3627]/10 px-4 py-2.5 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#2C3627]" />
            <p className="text-xs font-semibold text-[#2C3627]">{t.staff.shopActive}</p>
          </div>
          <button
            onClick={() => setBannerDismissed(true)}
            className="text-[#687960] hover:text-[#2C3627] p-0.5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div>
        <h1 className="font-brand-serif text-2xl font-bold tracking-tight text-[#181512]">
          {t.staff.dashboard}
        </h1>
        <p className="mt-0.5 text-xs text-[#675E54]">{t.staff.manageShop}</p>
      </div>

      {!analytics ? (
        <div className="mt-6 grid grid-cols-2 gap-3">
          <SkeletonStat />
          <SkeletonStat />
          <SkeletonStat />
          <SkeletonStat />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 grid grid-cols-2 gap-3"
        >
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8175]">
                {t.staff.customers}
              </p>
              <Users className="h-3.5 w-3.5 text-[#8A8175]" />
            </div>
            <p className="mt-2 font-brand-serif text-2xl font-bold text-[#181512]">
              {analytics.total_customers}
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-[#53634B]">
              +{analytics.customers_this_week} {t.staff.thisWeek}
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8175]">
                {t.staff.pointsEarned}
              </p>
              <TrendingUp className="h-3.5 w-3.5 text-[#53634B]" />
            </div>
            <p className="mt-2 font-brand-serif text-2xl font-bold text-[#2C3627]">
              {analytics.total_points_earned}
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-[#53634B]">
              +{analytics.points_this_week} {t.staff.thisWeek}
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8175]">
                {t.staff.pointsRedeemed}
              </p>
              <Sparkles className="h-3.5 w-3.5 text-[#8A8175]" />
            </div>
            <p className="mt-2 font-brand-serif text-2xl font-bold text-[#675E54]">
              {analytics.total_points_redeemed}
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-rose-700">
              {analytics.redeemed_this_week} {t.staff.thisWeek}
            </p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8175]">
                {t.staff.freeDrinks}
              </p>
              <Gift className="h-3.5 w-3.5 text-[#C5A869]" />
            </div>
            <p className="mt-2 font-brand-serif text-2xl font-bold text-[#886C37]">
              {analytics.total_redemptions}
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-[#53634B]">
              {analytics.redemptions_this_week} {t.staff.thisWeek}
            </p>
          </Card>
        </motion.div>
      )}

      <div className="mt-6 grid gap-3.5">
        <Link href="/staff/orders" className="block group">
          <Card className="transition-all duration-200 group-hover:border-[#C5A869]/70 group-hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-4.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F3EE] border border-[#DCE4D8] text-[#3E4B37] shrink-0">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-brand-serif text-base font-bold text-[#181512] group-hover:text-[#2C3627] transition-colors">
                  {lang === "ar" ? "طلبات الاستلام" : "Pickup Orders"}
                </h2>
                <p className="text-xs text-[#675E54] mt-0.5">
                  {lang === "ar"
                    ? "استقبل الطلبات وحدّث حالتها"
                    : "Accept orders and update their status"}
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/staff/generate" className="block group">
          <Card className="transition-all duration-200 group-hover:border-[#C5A869]/70 group-hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-4.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FAF7F0] border border-[#E8D399] text-[#886C37] shrink-0">
                <QrCode className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-brand-serif text-base font-bold text-[#181512] group-hover:text-[#2C3627] transition-colors">
                  {t.staff.generateQR}
                </h2>
                <p className="text-xs text-[#675E54] mt-0.5">{t.staff.generateQRDesc}</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/staff/scan" className="block group">
          <Card className="transition-all duration-200 group-hover:border-[#53634B]/70 group-hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-4.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2C3627]/10 border border-[#53634B]/30 text-[#2C3627] shrink-0">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-brand-serif text-base font-bold text-[#181512] group-hover:text-[#2C3627] transition-colors">
                  {t.staff.scanRedemption}
                </h2>
                <p className="text-xs text-[#675E54] mt-0.5">{t.staff.scanRedemptionDesc}</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/staff/history" className="block group">
          <Card className="transition-all duration-200 group-hover:border-[#DDD9CC] group-hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-4.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F7F3] border border-[#DDD9CC] text-[#675E54] shrink-0">
                <History className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-brand-serif text-base font-bold text-[#181512] group-hover:text-[#2C3627] transition-colors">
                  {t.staff.pointHistory}
                </h2>
                <p className="text-xs text-[#675E54] mt-0.5">{t.staff.pointHistoryDesc}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
