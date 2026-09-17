"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import LangSwitcher from "@/components/LangSwitcher";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer" as "customer" | "staff",
    shopName: "",
    shopAddress: "",
    shopPhone: "",
    recoveryQuestion: "",
    recoveryAnswer: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const isStatic = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isStatic) {
      const { setDemoRole } = await import("@/lib/demo/demo-session");
      const targetRole = form.role === "staff" ? "staff" : "customer";
      setDemoRole(targetRole);
      setLoading(false);
      router.push(targetRole === "staff" ? "/staff" : "/dashboard");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Registration failed.");
      setLoading(false);
      return;
    }
    await signIn("credentials", { email: form.email, password: form.password, redirect: false });
    setLoading(false);
    router.push("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F7F3] px-4 py-12 relative">
      <LangSwitcher />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-[#DDD9CC]/80">
          <CardHeader className="text-center pb-4">
            <Image
              src="/logo.png"
              alt="Princes' Coffee"
              width={180}
              height={90}
              className="mx-auto mb-2 h-14 w-auto object-contain"
              priority
            />
            <CardDescription className="text-xs font-medium tracking-wide text-[#675E54]">
              {t.register.subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-xl bg-red-50/80 px-3.5 py-2.5 text-xs font-medium text-red-700 border border-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium tracking-wide text-[#302B25] mb-1.5">
                  {t.register.iAmA}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["customer", "staff"] as const).map((r) => (
                    <Button
                      key={r}
                      type="button"
                      variant={form.role === r ? "olive" : "outline"}
                      className="h-10 text-xs font-semibold"
                      onClick={() => update("role", r)}
                    >
                      {r === "staff" ? t.register.shopOwner : t.register.customer}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium tracking-wide text-[#302B25]">
                  {t.register.fullName}
                </label>
                <Input
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder={t.register.fullName}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium tracking-wide text-[#302B25]">
                  {t.register.email}
                </label>
                <Input
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium tracking-wide text-[#302B25]">
                  {t.register.password}
                </label>
                <Input
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder={t.register.passwordHint}
                />
              </div>

              <div className="border-t border-[#E5E3D8] pt-4">
                <p className="text-xs font-semibold text-[#302B25]">{t.register.recoveryTitle}</p>
                <p className="text-[11px] text-[#8A8175] mt-0.5 mb-2.5">{t.register.recoveryHint}</p>
                <div className="space-y-2.5">
                  <select
                    required
                    value={form.recoveryQuestion}
                    onChange={(e) => update("recoveryQuestion", e.target.value)}
                    className="w-full rounded-xl border border-[#DDD9CC] bg-[#FFFFFF] px-3 py-2.5 text-xs text-[#181512] focus:border-[#C5A869] focus:outline-none focus:ring-2 focus:ring-[#C5A869]/20"
                  >
                    <option value="">{t.recoveryQuestions.select}</option>
                    <option value={t.recoveryQuestions.coffee}>{t.recoveryQuestions.coffee}</option>
                    <option value={t.recoveryQuestions.city}>{t.recoveryQuestions.city}</option>
                    <option value={t.recoveryQuestions.pet}>{t.recoveryQuestions.pet}</option>
                    <option value={t.recoveryQuestions.drink}>{t.recoveryQuestions.drink}</option>
                    <option value={t.recoveryQuestions.car}>{t.recoveryQuestions.car}</option>
                  </select>
                  <Input
                    type="text"
                    required
                    autoComplete="off"
                    value={form.recoveryAnswer}
                    onChange={(e) => update("recoveryAnswer", e.target.value)}
                    placeholder={t.register.recoveryAnswer}
                  />
                </div>
              </div>

              <AnimatePresence>
                {form.role === "staff" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden border-t border-[#E5E3D8] pt-4 space-y-3"
                  >
                    <p className="text-xs font-semibold text-[#302B25] mb-1">{t.register.shopDetails}</p>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-[#302B25]">{t.register.shopName}</label>
                      <Input
                        type="text"
                        required
                        autoComplete="organization"
                        value={form.shopName}
                        onChange={(e) => update("shopName", e.target.value)}
                        placeholder={t.register.shopNamePlaceholder}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-[#302B25]">{t.register.shopAddress}</label>
                      <Input
                        type="text"
                        autoComplete="street-address"
                        value={form.shopAddress}
                        onChange={(e) => update("shopAddress", e.target.value)}
                        placeholder={t.register.shopAddressPlaceholder}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-[#302B25]">{t.register.shopPhone}</label>
                      <Input
                        type="tel"
                        required
                        autoComplete="tel"
                        value={form.shopPhone}
                        onChange={(e) => update("shopPhone", e.target.value)}
                        placeholder={t.register.shopPhonePlaceholder}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                disabled={loading}
                variant="olive"
                className="w-full h-11"
              >
                {loading ? t.register.creating : t.register.createAccount}
              </Button>
            </form>

            <p className="mt-5 text-center text-xs text-[#675E54]">
              {t.register.haveAccount}{" "}
              <Link href="/login" className="font-semibold text-[#53634B] hover:text-[#2C3627] transition-colors">
                {t.register.signIn}
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}