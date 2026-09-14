"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { SkeletonCard } from "@/components/Skeleton";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface UserRow {
  id: number;
  email: string;
  name: string;
  role: string;
  shop_id: number | null;
  shop_name: string | null;
  created_at: string;
}

export default function AdminUsersPage() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function fetchUsers() {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => {
        setUsers(d.users || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function startEdit(u: UserRow) {
    setEditingId(u.id);
    setEditForm({ name: u.name, email: u.email, role: u.role });
    setMessage("");
  }

  async function saveEdit() {
    setSaving(true);
    const res = await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: editingId, ...editForm }),
    });
    const d = await res.json();
    setSaving(false);
    if (res.ok) {
      setMessage(t.common.saved);
      setEditingId(null);
      fetchUsers();
    } else {
      setMessage(d.error || "Failed");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button asChild variant="olive" size="sm" className="text-xs">
          <Link href="/admin/users">{t.admin.users}</Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="text-xs">
          <Link href="/admin/shops">{t.admin.shops}</Link>
        </Button>
      </div>

      <h1 className="font-brand-serif text-2xl font-bold tracking-tight text-[#181512]">
        {t.admin.users}
      </h1>
      <p className="mt-0.5 text-xs text-[#675E54]">
        {t.admin.userCount.replace("{n}", String(users.length))}
      </p>

      {loading ? (
        <div className="mt-6 space-y-2.5">
          <SkeletonCard lines={2} />
          <SkeletonCard lines={2} />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 space-y-2.5"
        >
          {users.map((u) => (
            <Card key={u.id} className="p-4 shadow-sm">
              {editingId === u.id ? (
                <div className="space-y-3">
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="h-9 text-xs"
                    placeholder={t.admin.name}
                  />
                  <Input
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="h-9 text-xs"
                    placeholder={t.admin.email}
                  />
                  <select
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="w-full h-9 rounded-xl border border-[#DDD9CC] px-3 py-1 text-xs text-[#181512] bg-white focus:border-[#C5A869] focus:outline-none focus:ring-2 focus:ring-[#C5A869]/20"
                  >
                    <option value="customer">{t.admin.roleCustomer}</option>
                    <option value="staff">{t.admin.roleStaff}</option>
                    <option value="admin">{t.admin.roleAdmin}</option>
                  </select>
                  <div className="flex gap-2 items-center pt-1">
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
                    {message && <span className="text-xs text-[#53634B] ml-2">{message}</span>}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-xs text-[#181512]">{u.name}</p>
                    <p className="text-[11px] text-[#8A8175]">{u.email}</p>
                    <div className="mt-1 flex gap-2 items-center">
                      <Badge
                        variant={
                          u.role === "admin"
                            ? "default"
                            : u.role === "staff"
                            ? "gold"
                            : "outline"
                        }
                        className="text-[10px]"
                      >
                        {u.role === "admin"
                          ? t.admin.roleAdmin
                          : u.role === "staff"
                          ? t.admin.roleStaff
                          : t.admin.roleCustomer}
                      </Badge>
                      {u.shop_name && (
                        <span className="text-[11px] text-[#8A8175] font-medium">• {u.shop_name}</span>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => startEdit(u)}
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
