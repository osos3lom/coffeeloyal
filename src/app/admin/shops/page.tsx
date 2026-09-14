"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { SkeletonCard } from "@/components/Skeleton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface ShopRow {
  id: number;
  name: string;
  address: string;
  phone: string;
  points_to_redeem: number;
  status: string;
  owner_name: string | null;
  owner_email: string | null;
  created_at: string;
}

export default function AdminShopsPage() {
  const { t } = useTranslation();
  const [shops, setShops] = useState<ShopRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", address: "", phone: "", pointsToRedeem: "", status: "" });
  const [saving, setSaving] = useState(false);

  function fetchShops() {
    fetch("/api/admin/shops")
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

  function startEdit(s: ShopRow) {
    setEditingId(s.id);
    setEditForm({
      name: s.name,
      address: s.address,
      phone: s.phone,
      pointsToRedeem: String(s.points_to_redeem),
      status: s.status,
    });
  }

  async function saveEdit() {
    setSaving(true);
    await fetch("/api/admin/shops", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ shopId: editingId, ...editForm }),
    });
    setSaving(false);
    setEditingId(null);
    fetchShops();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button asChild variant="outline" size="sm" className="text-xs">
          <Link href="/admin/users">{t.admin.users}</Link>
        </Button>
        <Button asChild variant="olive" size="sm" className="text-xs">
          <Link href="/admin/shops">{t.admin.shops}</Link>
        </Button>
      </div>

      <h1 className="font-brand-serif text-2xl font-bold tracking-tight text-[#181512]">
        {t.admin.shops}
      </h1>
      <p className="mt-0.5 text-xs text-[#675E54]">
        {t.admin.shopCount.replace("{n}", String(shops.length))}
      </p>

      {loading ? (
        <div className="mt-6 space-y-3">
          <SkeletonCard lines={2} />
          <SkeletonCard lines={2} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-3"
        >
          {shops.map((s) => (
            <Card key={s.id} className="p-4 shadow-sm">
              {editingId === s.id ? (
                <div className="space-y-3">
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="h-9 text-xs"
                    placeholder={t.settings.shopName}
                  />
                  <Input
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    className="h-9 text-xs"
                    placeholder={t.register.shopAddress}
                  />
                  <Input
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="h-9 text-xs"
                    placeholder={t.register.shopPhone}
                  />
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-[10px] uppercase font-bold text-[#8A8175]">{t.admin.pointsToRedeem}</label>
                      <Input
                        type="number"
                        value={editForm.pointsToRedeem}
                        onChange={(e) => setEditForm({ ...editForm, pointsToRedeem: e.target.value })}
                        className="h-9 text-xs mt-0.5"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] uppercase font-bold text-[#8A8175]">{t.admin.status}</label>
                      <select
                        value={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                        className="w-full h-9 rounded-xl border border-[#DDD9CC] px-3 py-1 text-xs text-[#181512] bg-white mt-0.5 focus:border-[#C5A869] focus:outline-none focus:ring-2 focus:ring-[#C5A869]/20"
                      >
                        <option value="pending">{t.admin.pending}</option>
                        <option value="active">{t.admin.active}</option>
                        <option value="rejected">{t.admin.rejected}</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button
                      onClick={saveEdit}
                      disabled={saving}
                      variant="olive"
                      size="sm"
                      className="text-xs"
                    >
                      {saving ? t.admin.saving : t.admin.save}
                    </Button>
                    <Button
                      onClick={() => setEditingId(null)}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      {t.admin.cancel}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-brand-serif text-base font-bold text-[#181512]">{s.name}</p>
                    <div className="mt-1 flex gap-2 flex-wrap items-center">
                      <Badge
                        variant={
                          s.status === "active"
                            ? "olive"
                            : s.status === "pending"
                            ? "gold"
                            : "destructive"
                        }
                        className="text-[10px]"
                      >
                        {s.status === "active"
                          ? t.admin.active
                          : s.status === "pending"
                          ? t.admin.pending
                          : t.admin.rejected}
                      </Badge>
                      {s.phone && <span className="text-[11px] text-[#675E54]">{s.phone}</span>}
                      <span className="text-[11px] text-[#8A8175] font-mono">{s.points_to_redeem} pts</span>
                    </div>
                    {s.owner_name && (
                      <p className="mt-1 text-[11px] text-[#8A8175]">
                        {t.admin.owner}: {s.owner_name} ({s.owner_email})
                      </p>
                    )}
                  </div>
                  <Button
                    onClick={() => startEdit(s)}
                    variant="outline"
                    size="sm"
                    className="text-xs shrink-0"
                  >
                    {t.admin.edit}
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </motion.div>
      )}
    </div>
  );
}
