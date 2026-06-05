"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { translate } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = (resolvedTheme ?? theme) === "dark";

  if (!mounted) {
    return <div className={cn("h-10 w-10 rounded-lg surface-chip", className)} aria-hidden />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-lg surface-chip text-primary-content hover-accent-highlight",
        className
      )}
      aria-label={isDark ? translate("theme.light") : translate("theme.dark")}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-[#2563EB]" />
      ) : (
        <Moon className="h-4 w-4 text-[#152F8E]" />
      )}
    </button>
  );
}
