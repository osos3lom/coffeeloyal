"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, Upload, RefreshCw, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ScanPage() {
  const { t } = useTranslation();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scannerRef.current = new Html5Qrcode("qr-reader");
    return () => {
      scannerRef.current?.clear();
    };
  }, []);

  const claimPoints = useCallback(async (token: string) => {
    const res = await fetch("/api/customer/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    if (res.ok) {
      setResult({
        success: true,
        message: `+${data.claimed} ${t.scan.earned}${data.rewardCreated ? t.scan.unlockedFree : ""}`,
      });
    } else {
      setResult({ success: false, message: data.error || t.scan.invalidQR });
    }
  }, [t]);

  const startScanning = useCallback(async () => {
    if (!scannerRef.current) return;
    setResult(null);
    setScanning(true);
    try {
      await scannerRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
          await scannerRef.current?.stop();
          setScanning(false);
          await claimPoints(decodedText);
        },
        () => {},
      );
    } catch {
      setScanning(false);
    }
  }, [claimPoints]);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !scannerRef.current) return;
    setResult(null);
    try {
      const decodedText = await scannerRef.current.scanFile(file, false);
      await claimPoints(decodedText);
    } catch {
      setResult({ success: false, message: t.scan.couldNotRead });
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-lg px-4 py-6 space-y-4"
    >
      <Button asChild variant="ghost" size="sm" className="gap-1.5 text-xs text-[#675E54] hover:text-[#2C3627]">
        <Link href="/dashboard">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{t.customer.yourPoints}</span>
        </Link>
      </Button>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">{t.scan.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            id="qr-reader"
            className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-[#DDD9CC] bg-[#F8F7F3]"
          />

          {scanning && (
            <p className="text-center text-xs font-medium text-[#53634B] animate-pulse">
              {t.scan.pointCamera}
            </p>
          )}

          {!scanning && !result && (
            <div className="space-y-3 pt-2">
              <Button
                onClick={startScanning}
                variant="olive"
                className="w-full h-11 gap-2 text-xs font-semibold"
              >
                <Camera className="h-4 w-4" />
                <span>{t.scan.startScanner}</span>
              </Button>
              <p className="text-center text-[11px] font-medium text-[#8A8175] uppercase tracking-wider">
                {t.common.or}
              </p>
              <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[#DDD9CC] bg-[#F8F7F3] px-4 py-3 text-center text-xs font-medium text-[#302B25] hover:border-[#C5A869] hover:bg-white transition-all">
                <Upload className="h-4 w-4 text-[#8A8175]" />
                <span>{t.scan.uploadImage}</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <div className="pt-2">
                <Button
                  onClick={() => claimPoints("PRINCES-DEMO-QR-TOKEN")}
                  variant="gold"
                  className="w-full h-11 gap-2 text-xs font-semibold shadow-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>محاكاة مسح كود QR (+١ ختم لفرع التحلية)</span>
                </Button>
              </div>
            </div>
          )}

          {result && (
            <div
              className={`rounded-2xl border p-5 text-center transition-all ${
                result.success
                  ? "border-[#C5A869] bg-[#FAF7F0] text-[#2C3627]"
                  : "border-rose-200 bg-rose-50/70 text-rose-800"
              }`}
            >
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80">
                {result.success ? (
                  <CheckCircle2 className="h-5 w-5 text-[#2C3627]" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-rose-600" />
                )}
              </div>
              <p className="text-sm font-bold font-brand-serif">{result.message}</p>
              <Button
                variant="link"
                onClick={() => setResult(null)}
                className="mt-2 text-xs font-semibold text-[#675E54] hover:text-[#181512] gap-1.5"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>{t.scan.scanAgain}</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
