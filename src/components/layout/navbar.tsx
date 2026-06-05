"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navSections, type Locale } from "@/config/portfolio";
import { localeLabels } from "@/lib/i18n/translations";
import { useLanguage } from "@/hooks/use-language";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { scrollToSection, cn } from "@/lib/utils";
import { personalInfo } from "@/config/portfolio";
import type { TranslationKey } from "@/lib/i18n/translations";

const locales: Locale[] = ["uz", "en", "ru"];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, setLocale, translate } = useLanguage();
  const sectionIds = navSections.map((s) => s.id);
  const activeId = useScrollSpy(sectionIds);

  const handleNav = (id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full max-w-[100vw] surface-header transition-colors duration-300">
      <nav className="section-container flex items-center justify-between gap-2 py-3 sm:py-4 min-w-0">
        <button onClick={() => handleNav("home")} className="shrink-0 text-base font-bold text-gradient-brand sm:text-lg">
          {personalInfo.name.split(" ")[0]}
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {navSections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => handleNav(section.id)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm transition-colors duration-300",
                  activeId === section.id
                    ? "bg-[#2563EB]/15 text-[#2563EB]"
                    : "text-secondary-content hover:text-primary-content"
                )}
              >
                {translate(section.labelKey as TranslationKey)}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="hidden sm:flex items-center rounded-lg surface-chip p-0.5">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => setLocale(loc)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-300",
                  locale === loc
                    ? "bg-[#2563EB]/15 text-[#2563EB]"
                    : "text-secondary-content hover:text-primary-content"
                )}
              >
                {localeLabels[loc]}
              </button>
            ))}
          </div>

          <ThemeToggle />

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg surface-chip text-primary-content md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="w-full border-t border-[var(--border-subtle)] glass-card rounded-none border-x-0 md:hidden overflow-hidden"
          >
            <ul className="flex flex-col gap-1 p-4">
              {navSections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleNav(section.id)}
                    className={cn(
                      "w-full rounded-lg px-4 py-3 text-left text-sm transition-colors duration-300",
                      activeId === section.id
                        ? "bg-[#2563EB]/15 text-[#2563EB]"
                        : "text-secondary-content"
                    )}
                  >
                    {translate(section.labelKey as TranslationKey)}
                  </button>
                </li>
              ))}
              <li className="flex gap-2 pt-2">
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocale(loc)}
                    className={cn(
                      "flex-1 rounded-lg py-2 text-xs font-medium surface-chip",
                      locale === loc && "bg-[#2563EB]/15 text-[#2563EB]"
                    )}
                  >
                    {localeLabels[loc]}
                  </button>
                ))}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
