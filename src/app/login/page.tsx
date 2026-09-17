"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import LangSwitcher from "@/components/LangSwitcher";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { safeInternalPath } from "@/lib/safe-next";

function LoginForm() {
  const { t, lang } = useTranslation();
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Where to land after signing in. Validated, because forwarding to an
  // arbitrary `next` would be an open redirect.
  const next = safeInternalPath(params.get("next"), "/");

  // The arrow points "back" along the reading direction, so it flips in RTL.
  const BackArrow = lang === "ar" ? ArrowRight : ArrowLeft;

  function goBack() {
    // Prefer real history so the user returns exactly where they were; fall
    // back to the brand site when this page was opened directly.
    if (window.history.length > 1) router.back();
    else router.push("/");
  }

  const isStatic = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isStatic) {
      const lower = email.toLowerCase();
      const role: "customer" | "staff" | "admin" = lower.includes("admin")
        ? "admin"
        : lower.includes("staff")
        ? "staff"
        : "customer";

      const { setDemoRole } = await import("@/lib/demo/demo-session");
      setDemoRole(role);
      setLoading(false);
      if (role === "admin") router.push("/admin");
      else if (role === "staff") router.push("/staff");
      else router.push(next === "/" ? "/dashboard" : next);
      return;
    }

    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError(t.login.invalidEmailOrPassword);
      return;
    }
    router.push(next);
  }

  // Carry `next` through to the sibling auth screens so the destination
  // survives a detour via register or password recovery.
  const withNext = (path: string) =>
    next === "/" ? path : path + "?next=" + encodeURIComponent(next);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#F8F7F3] px-4">
      {/* Back sits opposite the language switcher and mirrors with direction. */}
      <button
        onClick={goBack}
        className="absolute top-6 start-6 inline-flex items-center gap-2 text-sm font-medium text-[#5A5248] transition-colors hover:text-[#181512]"
      >
        <BackArrow className="size-4" />
        <span>{t.common.back}</span>
      </button>

      <LangSwitcher />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-sm"
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
              {t.login.subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isStatic && (
              <div className="mb-5 rounded-xl border border-[#C5A869]/40 bg-[#FAF7F0] p-3.5 text-xs text-[#181512]">
                <p className="font-semibold text-[#886C37] mb-2 flex items-center gap-1.5">
                  <Sparkles className="size-3.5" />
                  تسجيل دخول سريع لنسخة العرض:
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-8 text-[0.6875rem] border-[#C5A869]/50 bg-white hover:bg-[#F3F3ED]"
                    onClick={async () => {
                      const { setDemoRole } = await import("@/lib/demo/demo-session");
                      setDemoRole("customer");
                      router.push(next === "/" ? "/dashboard" : next);
                    }}
                  >
                    عميل
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-8 text-[0.6875rem] border-[#C5A869]/50 bg-white hover:bg-[#F3F3ED]"
                    onClick={async () => {
                      const { setDemoRole } = await import("@/lib/demo/demo-session");
                      setDemoRole("staff");
                      router.push("/staff");
                    }}
                  >
                    موظف
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="h-8 text-[0.6875rem] border-[#C5A869]/50 bg-white hover:bg-[#F3F3ED]"
                    onClick={async () => {
                      const { setDemoRole } = await import("@/lib/demo/demo-session");
                      setDemoRole("admin");
                      router.push("/admin");
                    }}
                  >
                    إدارة
                  </Button>
                </div>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-xl bg-red-50/80 px-3.5 py-2.5 text-xs font-medium text-red-700 border border-red-200">
                  {error}
                </div>
              )}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-medium tracking-wide text-[#302B25]">
                  {t.login.email}
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-xs font-medium tracking-wide text-[#302B25]">
                  {t.login.password}
                </label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                variant="olive"
                className="w-full h-11"
              >
                {loading ? t.login.signingIn : t.login.signIn}
              </Button>
            </form>
            <p className="mt-5 text-center text-xs text-[#675E54]">
              <Link
                href={withNext("/forgot-password")}
                className="text-[#675E54] hover:text-[#2C3627] transition-colors"
              >
                {t.login.forgotPassword}
              </Link>
            </p>
            <p className="mt-2 text-center text-xs text-[#675E54]">
              {t.login.noAccount}{" "}
              <Link
                href={withNext("/register")}
                className="font-semibold text-[#53634B] transition-colors hover:text-[#2C3627]"
              >
                {t.login.createOne}
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F7F3]" />}>
      <LoginForm />
    </Suspense>
  );
}
