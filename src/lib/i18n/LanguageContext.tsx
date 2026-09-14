"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { en, type Translation, type Lang, translations } from "./translations";

type LanguageContextType = {
  lang: Lang;
  t: Translation;
  setLang: (l: Lang) => void;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  t: en,
  setLang: () => {},
});

export function LanguageProvider({
  children,
  initialLang = "en",
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored && (stored === "en" || stored === "ar")) {
      queueMicrotask(() => {
        setLangState(stored);
      });
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.cookie = `lang=${l};path=/;max-age=31536000;SameSite=Lax`;
    document.documentElement.lang = l === "ar" ? "ar" : "en";
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "ar" ? "ar" : "en";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
