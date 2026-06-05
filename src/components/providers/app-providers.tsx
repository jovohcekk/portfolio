"use client";

// =====================================
// APP PROVIDERS
// ThemeProvider (next-themes) + LanguageProvider
// =====================================

import { LanguageProvider } from "@/hooks/use-language";
import { ThemeProvider } from "@/components/providers/theme-provider";
import type { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
