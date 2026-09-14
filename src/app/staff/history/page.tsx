"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Inbox } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { SkeletonLine } from "@/components/Skeleton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface QREntry {
  id: number;
  points: number;
  used: boolean;
  type: string;
  expires_at: string | null;
  created_at: string;
  staff_name: string;
  customer_name: string | null;
}

export default function HistoryPage() {
  const { t } = useTranslation();
  const [history, setHistory] = useState<QREntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/staff/history")
      .then((r) => r.json())
      .then((data) => {
        setHistory(data.history || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-lg px-4 py-6 space-y-4"
    >
      <Button asChild variant="ghost" size="sm" className="gap-1.5 text-xs text-[#675E54] hover:text-[#2C3627]">
        <Link href="/staff">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{t.staff.dashboard}</span>
        </Link>
      </Button>

      <div>
        <h1 className="font-brand-serif text-2xl font-bold tracking-tight text-[#181512]">
          {t.staff.historyTitle}
        </h1>
        <p className="mt-0.5 text-xs text-[#675E54]">{t.staff.historySubtitle}</p>
      </div>

      {loading ? (
        <Card className="divide-y divide-[#E5E3D8]/70 overflow-hidden">
          <SkeletonLine />
          <SkeletonLine />
          <SkeletonLine />
        </Card>
      ) : history.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#2C3627]/10 text-[#2C3627]">
            <Inbox className="h-6 w-6" />
          </div>
          <p className="text-xs font-semibold text-[#181512]">{t.staff.noCodes}</p>
        </Card>
      ) : (
        <Card className="divide-y divide-[#E5E3D8]/70 overflow-hidden">
          {history.map((entry) => (
            <div key={`${entry.type}-${entry.id}`} className="flex items-center justify-between px-5 py-3.5">
              <div>
                {entry.type === "redeem" ? (
                  <>
                    <p className="text-xs font-bold text-rose-700">{t.customer.rewardRedeemed}</p>
                    <p className="text-[11px] text-[#8A8175] mt-0.5">
                      {new Date(entry.created_at).toLocaleString()} —{" "}
                      <span className="font-medium text-[#302B25]">{entry.customer_name}</span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-brand-serif text-sm font-bold text-[#181512]">
                      +{entry.points} {t.customer.punchCard}
                    </p>
                    <p className="text-[11px] text-[#8A8175] mt-0.5">
                      {new Date(entry.created_at).toLocaleString()} •{" "}
                      <span className="font-medium text-[#302B25]">{entry.staff_name}</span>
                    </p>
                  </>
                )}
              </div>
              <div className="text-right">
                {entry.type === "redeem" ? (
                  <Badge variant="outline" className="text-[10px]">
                    {t.staff.expired2}
                  </Badge>
                ) : entry.used ? (
                  <Badge variant="olive" className="text-[10px]">
                    {t.staff.claimedBy} {entry.customer_name || "guest"}
                  </Badge>
                ) : new Date(entry.expires_at!) < new Date() ? (
                  <Badge variant="outline" className="text-[10px]">
                    {t.staff.expired2}
                  </Badge>
                ) : (
                  <Badge variant="gold" className="text-[10px]">
                    {t.staff.active}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </Card>
      )}
    </motion.div>
  );
}
