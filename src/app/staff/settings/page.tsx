"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function StaffShopSettingsPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", address: "", pointsToRedeem: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    const body: Record<string, string | number> = {};
    if (form.name) body.name = form.name;
    if (form.address) body.address = form.address;
    if (form.pointsToRedeem) {
      const pts = parseInt(form.pointsToRedeem, 10);
      if (isNaN(pts) || pts < 1 || pts > 100) {
        setError(t.settings.pointsHint);
        setLoading(false);
        return;
      }
      body.pointsToRedeem = pts;
    }
    if (Object.keys(body).length === 0) {
      setError(t.common.nothingToUpdate);
      setLoading(false);
      return;
    }
    const res = await fetch("/api/staff/shop", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setMessage(data.message);
      setForm({ name: "", address: "", pointsToRedeem: "" });
    } else {
      setError(data.error || "Failed to update");
    }
  }

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

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t.settings.shopSettings}</CardTitle>
          <CardDescription>{t.settings.shopSettingsSub}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl bg-red-50/80 px-3.5 py-2.5 text-xs font-medium text-red-700 border border-red-200">
                {error}
              </div>
            )}
            {message && (
              <div className="rounded-xl bg-[#2C3627]/10 px-3.5 py-2.5 text-xs font-medium text-[#2C3627] border border-[#2C3627]/20">
                {message}
              </div>
            )}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#302B25]">{t.settings.shopName}</label>
              <Input
                type="text"
                autoComplete="organization"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder={t.settings.shopName}
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#302B25]">{t.settings.shopAddress}</label>
              <Input
                type="text"
                autoComplete="street-address"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder={t.settings.shopAddress}
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#302B25]">{t.settings.pointsToRedeem}</label>
              <Input
                type="number"
                min={1}
                max={100}
                value={form.pointsToRedeem}
                onChange={(e) => update("pointsToRedeem", e.target.value)}
                placeholder="9"
              />
              <p className="text-[11px] text-[#8A8175]">{t.settings.pointsHint}</p>
            </div>
            <Button
              type="submit"
              disabled={loading}
              variant="olive"
              className="w-full h-10 font-semibold"
            >
              {loading ? t.settings.saving : t.settings.save}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
