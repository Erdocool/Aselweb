import { createContext, useContext, useEffect, type ReactNode } from "react";
import type { Locale } from "@/data/site";
import { en, tr, type Dictionary } from "@/i18n/dictionary";

const LocaleContext = createContext<{ locale: Locale; t: Dictionary } | null>(null);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = locale === "en" ? en : tr;

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "tr";
  }, [locale]);

  return <LocaleContext.Provider value={{ locale, t }}>{children}</LocaleContext.Provider>;
}

export function useI18n() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("Dil eksik");
  return value;
}
