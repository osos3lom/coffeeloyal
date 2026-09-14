"use client";

import { useTranslation } from "@/lib/i18n/LanguageContext";
import type { Lang } from "@/lib/i18n/translations";
import { motion } from "framer-motion";

export default function LangSwitcher() {
  const { lang, setLang } = useTranslation();

  return (
    <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 flex gap-1 p-1 bg-[#F3F3ED]/80 backdrop-blur-sm border border-[#DDD9CC]/80 rounded-xl z-10 shadow-sm">
      {(["en", "ar"] as Lang[]).map((l) => {
        const isActive = lang === l;
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`relative rounded-lg px-3 py-1 text-xs font-medium tracking-wide transition-colors ${
              isActive
                ? "text-[#F3F3ED]"
                : "text-[#6B6258] hover:text-[#181512]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeLang"
                className="absolute inset-0 rounded-lg bg-[#2C3627] shadow-sm"
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span>{l === "ar" ? "🇸🇦" : "🇬🇧"}</span>
              <span>{l === "ar" ? "العربية" : "English"}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
