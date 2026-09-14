"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Users, Store, Check, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { SkeletonCard } from "@/components/Skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PendingShop {
  id: number;
  name: string;
  address: string;
  phone: string;
  created_at: string;
  owner_name: string;
  owner_email: string;
}

export default function AdminDashboardPage() {
  const { t } = useTranslation();
  const [shops, setShops] = useState<PendingShop[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  function fetchShops() {
    fetch("/api/admin/pending-shops")
      .then((r) => r.json())
      .then((d) => {
        setShops(d.shops || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    fetchShops();
  }, []);

  async function handleAction(shopId: number, action: "approve" | "reject") {
    setActionLoading(shopId);
    await fetch("/api/admin/approve-shop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shopId, action }),
    });
    setActionLoading(null);
    fetchShops();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-brand-serif text-2xl font-bold tracking-tight text-[#181512]">
            {t.admin.registrations}
          </h1>
          <p className="mt-0.5 text-xs text-[#675E54]">{t.admin.review}</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="gap-1.5 text-xs">
            <Link href="/admin/users">
              <Users className="h-3.5 w-3.5 text-[#8A8175]" />
              <span>{t.admin.allUsers}</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="gap-1.5 text-xs">
            <Link href="/admin/shops">
              <Store className="h-3.5 w-3.5 text-[#8A8175]" />
              <span>{t.admin.allShops}</span>
            </Link>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="mt-6 space-y-4">
          <SkeletonCard lines={4} />
          <SkeletonCard lines={4} />
        </div>
      ) : shops.length === 0 ? (
        <Card className="mt-6 p-12 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#2C3627]/10 text-[#2C3627]">
            <CheckCircle2 className="h-6 w-6 text-[#2C3627]" />
          </div>
          <p className="text-xs font-semibold text-[#181512]">{t.admin.noPending}</p>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-4"
        >
          {shops.map((shop) => (
            <Card key={shop.id} className="shadow-sm">
              <CardContent className="p-6">
                <h2 className="font-brand-serif text-lg font-bold text-[#181512]">{shop.name}</h2>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8A8175] w-16">{t.admin.owner}</span>
                    <span className="text-xs font-semibold text-[#181512]">{shop.owner_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8A8175] w-16">{t.admin.email}</span>
                    <span className="text-xs font-medium text-[#302B25]">{shop.owner_email}</span>
                  </div>
                  {shop.phone && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#8A8175] w-16">{t.admin.phone}</span>
                      <span className="text-xs font-semibold text-[#2C3627]">{shop.phone}</span>
                    </div>
                  )}
                  {shop.address && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#8A8175] w-16">{t.admin.address}</span>
                      <span className="text-xs text-[#675E54]">{shop.address}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8A8175] w-16">{t.admin.date}</span>
                    <span className="text-xs text-[#8A8175]">{new Date(shop.created_at).toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-5 flex gap-3">
                  <Button
                    onClick={() => handleAction(shop.id, "approve")}
                    disabled={actionLoading === shop.id}
                    variant="olive"
                    size="sm"
                    className="flex-1 text-xs font-semibold gap-1.5"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>{actionLoading === shop.id ? "..." : t.admin.approve}</span>
                  </Button>
                  <Button
                    onClick={() => handleAction(shop.id, "reject")}
                    disabled={actionLoading === shop.id}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs font-semibold gap-1.5 border-rose-200 text-rose-700 hover:bg-rose-50"
                  >
                    <X className="h-3.5 w-3.5" />
                    <span>{actionLoading === shop.id ? "..." : t.admin.reject}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}
    </div>
  );
}
