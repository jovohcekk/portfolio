"use client";

// =====================================
// THEME PROVIDER (next-themes)
// Butun ilovani o'rab oladi; html ga "dark" class qo'shiladi.
// localStorage: portfolio-theme
// O'zgartirish mumkin: defaultTheme, storageKey
// =====================================

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="portfolio-theme"
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
