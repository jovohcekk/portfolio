"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
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
  const [scrolled, setScrolled] = useState(false);
  const { locale, setLocale, translate } = useLanguage();
  const sectionIds = navSections.map((s) => s.id);
  const activeId = useScrollSpy(sectionIds);
  const { scrollY } = useScroll();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const handleNav = (id: string) => {
    scrollToSection(id);
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full max-w-[100vw] transition-all duration-300",
        scrolled
          ? "surface-header shadow-[0_4px_24px_rgba(15,23,42,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent"
      )}
    >
      <nav
        className="section-container flex items-center justify-between gap-2 py-3 sm:py-4 min-w-0"
        aria-label="Main navigation"
      >
        <motion.button
          onClick={() => handleNav("home")}
          className="shrink-0 text-base font-bold sm:text-lg"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          aria-label={`${personalInfo.name} — ${translate("nav.home")}`}
        >
          <span className="text-gradient-brand">{personalInfo.name.split(" ")[0]}</span>
        </motion.button>

        <ul className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {navSections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => handleNav(section.id)}
                aria-current={activeId === section.id ? "true" : undefined}
                className={cn(
                  "relative rounded-lg px-2.5 py-2 text-xs font-medium transition-colors duration-300 xl:px-3.5 xl:text-sm",
                  activeId === section.id
                    ? "nav-active-text"
                    : "text-secondary-content hover:text-primary-content"
                )}
              >
                {activeId === section.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="nav-active-pill absolute inset-0 rounded-lg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{translate(section.labelKey as TranslationKey)}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="hidden sm:flex items-center rounded-lg surface-chip p-0.5" role="group" aria-label="Language">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => setLocale(loc)}
                aria-pressed={locale === loc}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-300",
                  locale === loc
                    ? "locale-active"
                    : "text-secondary-content hover:text-primary-content"
                )}
              >
                {localeLabels[loc]}
              </button>
            ))}
          </div>

          <ThemeToggle />

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg surface-chip text-primary-content lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full border-t border-[var(--border-subtle)] glass-card rounded-none border-x-0 lg:hidden overflow-hidden"
          >
            <ul className="flex flex-col gap-1 p-4">
              {navSections.map((section, i) => (
                <motion.li
                  key={section.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <button
                    onClick={() => handleNav(section.id)}
                    aria-current={activeId === section.id ? "true" : undefined}
                    className={cn(
                      "w-full rounded-lg px-4 py-3 text-left text-sm transition-colors duration-300",
                      activeId === section.id
                        ? "locale-active"
                        : "text-secondary-content"
                    )}
                  >
                    {translate(section.labelKey as TranslationKey)}
                  </button>
                </motion.li>
              ))}
              <li className="flex gap-2 pt-2" role="group" aria-label="Language">
                {locales.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocale(loc)}
                    aria-pressed={locale === loc}
                    className={cn(
                      "flex-1 rounded-lg py-2 text-xs font-medium surface-chip",
                      locale === loc && "locale-active"
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
