"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import LangSwitcher from "@/components/LangSwitcher";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState<"email" | "question" | "done">("email");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function lookupQuestion(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setQuestion(data.question);
      setStep("question");
    } else {
      setError(data.error || "Email not found");
    }
  }

  async function resetPassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, answer, newPassword }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setStep("done");
    } else {
      setError(data.error || "Reset failed");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F7F3] px-4 relative">
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
              {step === "email"
                ? t.forgotPassword.subtitle
                : step === "question"
                ? t.forgotPassword.answerPrompt
                : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {step === "email" && (
                <motion.form
                  key="email-step"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={lookupQuestion}
                  className="space-y-4"
                >
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
                  <Button
                    type="submit"
                    disabled={loading}
                    variant="olive"
                    className="w-full h-11"
                  >
                    {loading ? t.forgotPassword.lookingUp : t.forgotPassword.continue}
                  </Button>
                </motion.form>
              )}

              {step === "question" && (
                <motion.form
                  key="question-step"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={resetPassword}
                  className="space-y-4"
                >
                  {error && (
                    <div className="rounded-xl bg-red-50/80 px-3.5 py-2.5 text-xs font-medium text-red-700 border border-red-200">
                      {error}
                    </div>
                  )}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium tracking-wide text-[#302B25]">{question}</label>
                    <Input
                      type="text"
                      required
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder={t.forgotPassword.yourAnswer}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium tracking-wide text-[#302B25]">
                      {t.forgotPassword.newPassword}
                    </label>
                    <Input
                      type="password"
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder={t.forgotPassword.newPasswordHint}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    variant="olive"
                    className="w-full h-11"
                  >
                    {loading ? t.forgotPassword.resetting : t.forgotPassword.resetPassword}
                  </Button>
                </motion.form>
              )}

              {step === "done" && (
                <motion.div
                  key="done-step"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4 space-y-4"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2C3627]/10 text-[#2C3627]">
                    <CheckCircle2 className="h-6 w-6 text-[#2C3627]" />
                  </div>
                  <p className="text-sm font-semibold text-[#181512]">{t.forgotPassword.success}</p>
                  <Button asChild variant="olive" className="w-full h-11">
                    <Link href="/login">
                      {t.forgotPassword.signIn}
                    </Link>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-6 text-center text-xs text-[#675E54]">
              <Link href="/login" className="font-semibold text-[#53634B] hover:text-[#2C3627] transition-colors">
                {t.forgotPassword.backToSignIn}
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
