"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/** Theme-aware dark mode flag that matches the inline script before hydration. */
export function useIsDark(): boolean {
  const { resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted && (resolvedTheme ?? theme)) {
    return (resolvedTheme ?? theme) === "dark";
  }

  return false;
}
