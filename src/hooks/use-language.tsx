"use client";

// =====================================
// TIL HOOK (useLanguage)
// O'zbek, Ingliz, Rus tillarini boshqaradi.
// localStorage da saqlanadi.
// O'zgartirish mumkin: default til (uz)
// =====================================

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/config/portfolio";
import { t, type TranslationKey } from "@/lib/i18n/translations";

const STORAGE_KEY = "portfolio-locale";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translate: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("uz");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && ["uz", "en", "ru"].includes(stored)) {
      setLocaleState(stored);
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
  }, []);

  const translate = useCallback(
    (key: TranslationKey) => t(locale, key),
    [locale]
  );

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      locale: "uz" as Locale,
      setLocale: () => {},
      translate: (key: TranslationKey) => t("uz", key),
    };
  }
  return context;
}
