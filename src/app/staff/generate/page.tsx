"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, RefreshCw, AlertCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GenerateQRPage() {
  const { t } = useTranslation();
  const [points, setPoints] = useState(1);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  async function generate() {
    setError("");
    setLoading(true);
    const res = await fetch("/api/staff/generate-qr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ points }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to generate QR");
      setLoading(false);
      return;
    }
    const qr = await QRCode.toDataURL(data.qr.token, {
      width: 320,
      margin: 2,
      color: { dark: "#2C3627", light: "#FFFFFF" },
    });
    setQrDataUrl(qr);
    const expiry = new Date(data.qr.expiresAt);
    const remaining = Math.max(0, Math.floor((expiry.getTime() - Date.now()) / 1000));
    setSecondsLeft(remaining);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const left = Math.max(0, Math.floor((expiry.getTime() - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left <= 0) {
        setQrDataUrl(null);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, 500);
    setLoading(false);
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
          <CardTitle className="text-2xl">{t.staff.generateTitle}</CardTitle>
          <CardDescription>{t.staff.generateSubtitle}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="border-t border-[#E5E3D8] pt-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8A8175] text-center">
              {t.staff.pointsToAward}
            </label>

            <div className="mt-4 flex items-center justify-center gap-6">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setPoints(Math.max(1, points - 1))}
                disabled={points <= 1}
                className="h-12 w-12 rounded-full text-lg"
              >
                <Minus className="h-5 w-5" />
              </Button>
              <span className="font-brand-serif text-5xl font-bold text-[#2C3627] tabular-nums min-w-[2ch] text-center">
                {points}
              </span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setPoints(Math.min(20, points + 1))}
                disabled={points >= 20}
                className="h-12 w-12 rounded-full text-lg"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <p className="mt-3 text-center text-[11px] text-[#8A8175]">{points} {t.staff.pointsPerCoffee}</p>

            {!qrDataUrl ? (
              <Button
                onClick={generate}
                disabled={loading}
                variant="olive"
                className="mt-6 w-full h-12 text-xs font-semibold"
              >
                {loading ? t.staff.generatingBtn : `${t.staff.generateBtn} +${points}`}
              </Button>
            ) : (
              <div className="mt-6 text-center">
                <div className="relative mx-auto w-fit rounded-2xl border-2 border-[#C5A869] p-4 bg-white shadow-md">
                  <Image src={qrDataUrl} alt="QR Code" width={256} height={256} className="h-64 w-64 rounded-lg" />
                </div>
                <div className="mt-4">
                  {secondsLeft > 0 ? (
                    <p className="font-mono text-3xl font-bold text-[#886C37] tabular-nums">
                      0:{String(secondsLeft).padStart(2, "0")}
                    </p>
                  ) : (
                    <p className="text-xs font-bold text-rose-700">{t.staff.expired}</p>
                  )}
                  <p className="mt-1 text-xs text-[#675E54]">
                    {t.staff.validFor.replace("{points}", String(points))}
                  </p>
                </div>
                <Button
                  variant="link"
                  onClick={() => {
                    setQrDataUrl(null);
                    setSecondsLeft(0);
                    if (timerRef.current) clearInterval(timerRef.current);
                  }}
                  className="mt-3 text-xs font-medium text-[#675E54] hover:text-[#181512] gap-1.5"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>{t.staff.generateNew}</span>
                </Button>
              </div>
            )}

            {error && (
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-rose-700">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
