"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, Upload, CheckCircle2, AlertCircle, RefreshCw, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StaffScanPage() {
  const { t } = useTranslation();
  const [scanning, setScanning] = useState(false);
  const [scannedReward, setScannedReward] = useState<{ id: number; customerName: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scannerRef.current = new Html5Qrcode("qr-reader");
    return () => {
      scannerRef.current?.clear();
    };
  }, []);

  async function checkRedemption(decodedText: string) {
    setToken(decodedText);
    const res = await fetch("/api/rewards/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: decodedText }),
    });
    const data = await res.json();
    if (res.ok) {
      setScannedReward(data.reward);
    } else {
      setError(data.error || "Invalid redemption code");
    }
  }

  const startScanning = useCallback(async () => {
    if (!scannerRef.current) return;
    setError("");
    setScannedReward(null);
    setToken(null);
    setConfirmed(false);
    setScanning(true);
    try {
      await scannerRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
          await scannerRef.current?.stop();
          setScanning(false);
          await checkRedemption(decodedText);
        },
        () => {},
      );
    } catch {
      setScanning(false);
    }
  }, []);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !scannerRef.current) return;
    setError("");
    setScannedReward(null);
    setToken(null);
    setConfirmed(false);
    try {
      const decodedText = await scannerRef.current.scanFile(file, false);
      await checkRedemption(decodedText);
    } catch {
      setError(t.scan.couldNotRead);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function confirmRedemption() {
    if (!token) return;
    setConfirming(true);
    const res = await fetch("/api/rewards/confirm/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    if (res.ok) {
      setConfirmed(true);
    } else {
      setError(data.error || "Failed to confirm");
    }
    setConfirming(false);
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
          <CardTitle className="text-2xl">{t.staff.scanTitle}</CardTitle>
          <CardDescription>{t.staff.scanSubtitle}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div
            id="qr-reader"
            className="mx-auto w-full overflow-hidden rounded-2xl border border-[#DDD9CC] bg-[#F8F7F3]"
          />

          {scanning && (
            <p className="text-center text-xs font-medium text-[#53634B] animate-pulse">
              {t.staff.pointCamera}
            </p>
          )}

          {!scanning && !scannedReward && !error && !confirmed && (
            <div className="space-y-3 pt-2">
              <Button
                onClick={startScanning}
                variant="olive"
                className="w-full h-11 gap-2 text-xs font-semibold"
              >
                <Camera className="h-4 w-4" />
                <span>{t.staff.startScanner}</span>
              </Button>
              <p className="text-center text-[11px] font-medium text-[#8A8175] uppercase tracking-wider">
                {t.common.or}
              </p>
              <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[#DDD9CC] bg-[#F8F7F3] px-4 py-3 text-center text-xs font-medium text-[#302B25] hover:border-[#C5A869] hover:bg-white transition-all">
                <Upload className="h-4 w-4 text-[#8A8175]" />
                <span>{t.staff.uploadImage}</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {scannedReward && !confirmed && (
            <div className="rounded-2xl border border-[#C5A869] bg-[#FAF7F0] p-6 text-center shadow-sm">
              <p className="font-brand-serif text-2xl font-bold text-[#2C3627]">
                {scannedReward.customerName}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#886C37] flex items-center justify-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#C5A869]" />
                <span>{t.staff.freeDrink}</span>
              </p>
              <div className="mt-5 flex gap-2.5 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setScannedReward(null);
                    setToken(null);
                  }}
                  className="text-xs"
                >
                  {t.staff.cancel}
                </Button>
                <Button
                  variant="gold"
                  size="sm"
                  onClick={confirmRedemption}
                  disabled={confirming}
                  className="text-xs font-semibold"
                >
                  {confirming ? t.staff.confirming : t.staff.confirmRedemption}
                </Button>
              </div>
            </div>
          )}

          {confirmed && (
            <div className="rounded-2xl border border-[#53634B]/30 bg-[#2C3627]/10 p-8 text-center space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2C3627] text-white">
                <CheckCircle2 className="h-6 w-6 text-[#E8D399]" />
              </div>
              <p className="font-brand-serif text-2xl font-bold text-[#2C3627]">{t.staff.confirmed}</p>
              <Button
                variant="link"
                onClick={startScanning}
                className="text-xs font-semibold text-[#53634B] hover:text-[#2C3627]"
              >
                {t.staff.scanAnother}
              </Button>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-5 text-center space-y-2">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/80">
                <AlertCircle className="h-4 w-4 text-rose-600" />
              </div>
              <p className="text-xs font-bold text-rose-800">{error}</p>
              <Button
                variant="link"
                onClick={() => {
                  setError("");
                  setScannedReward(null);
                  setToken(null);
                }}
                className="text-xs font-medium text-rose-700 gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                <span>{t.staff.scanAgain}</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
