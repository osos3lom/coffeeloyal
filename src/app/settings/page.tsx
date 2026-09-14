"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ email: "", currentPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    if (!form.email && !form.newPassword) {
      setError(t.common.nothingToUpdate);
      setLoading(false);
      return;
    }
    const body: Record<string, string> = {};
    if (form.email) body.email = form.email;
    if (form.newPassword) {
      body.newPassword = form.newPassword;
      body.currentPassword = form.currentPassword;
    }
    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setMessage(data.message);
      setForm({ email: "", currentPassword: "", newPassword: "" });
    } else {
      setError(data.error || "Failed to update");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-lg px-4 py-8 space-y-4"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{t.settings.account}</CardTitle>
          <CardDescription>{t.settings.accountSub}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
              <label className="block text-xs font-medium text-[#302B25]">{t.settings.newEmail}</label>
              <Input
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder={t.settings.emailPlaceholder}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#302B25]">{t.settings.currentPassword}</label>
              <Input
                type="password"
                autoComplete="current-password"
                value={form.currentPassword}
                onChange={(e) => update("currentPassword", e.target.value)}
                placeholder={t.settings.currentPasswordPlaceholder}
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#302B25]">{t.settings.newPassword}</label>
              <Input
                type="password"
                autoComplete="new-password"
                value={form.newPassword}
                onChange={(e) => update("newPassword", e.target.value)}
                placeholder={t.settings.newPasswordPlaceholder}
              />
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

          <Separator />

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-rose-700">
              {t.settings.dangerZone}
            </h2>
            <p className="text-[11px] text-[#8A8175] mt-0.5">{t.settings.dangerDesc}</p>

            {!deleteConfirm ? (
              <Button
                variant="outline"
                onClick={() => setDeleteConfirm(true)}
                className="mt-3 w-full border-rose-200 text-rose-700 hover:bg-rose-50"
              >
                {t.settings.deleteAccount}
              </Button>
            ) : (
              <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50/70 p-4 space-y-3">
                <p className="text-xs font-semibold text-rose-900">{t.settings.confirmDelete}</p>
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      setDeleting(true);
                      await fetch("/api/user/delete", { method: "DELETE" });
                      await signOut({ callbackUrl: "/login" });
                    }}
                    disabled={deleting}
                    className="flex-1"
                  >
                    {deleting ? t.settings.deleting : t.settings.yesDelete}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setDeleteConfirm(false)}
                    className="flex-1"
                  >
                    {t.common.cancel}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
