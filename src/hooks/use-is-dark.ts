"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

function readDarkFromDom(): boolean {
  if (typeof document === "undefined") return true;
  return document.documentElement.classList.contains("dark");
}

/** Theme-aware dark mode flag that matches the inline script before hydration. */
export function useIsDark(): boolean {
  const { resolvedTheme, theme } = useTheme();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  if (hydrated && (resolvedTheme ?? theme)) {
    return (resolvedTheme ?? theme) === "dark";
  }

  return readDarkFromDom();
}
