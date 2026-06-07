"use client";

import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useIsDark } from "@/hooks/use-is-dark";
import { cn } from "@/lib/utils";

export interface LightboxItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  badge?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ items, activeIndex, onClose, onNavigate }: LightboxProps) {
  const isDark = useIsDark();
  const isOpen = activeIndex !== null;
  const item = activeIndex !== null ? items[activeIndex] : null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || activeIndex === null) return;

      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "ArrowLeft") onNavigate(Math.max(0, activeIndex - 1));
      if (e.key === "ArrowRight") onNavigate(Math.min(items.length - 1, activeIndex + 1));

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [isOpen, activeIndex, onClose, onNavigate, items.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    triggerRef.current = document.activeElement as HTMLElement;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    window.addEventListener("keydown", handleKeyDown);
    const focusTimer = window.setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isOpen, handleKeyDown]);

  const openFullscreen = () => {
    if (!item) return;
    window.open(item.image, "_blank")?.focus();
  };

  return (
    <AnimatePresence>
      {isOpen && item && activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 xs:p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          <motion.button
            type="button"
            className={cn(
              "absolute inset-0 backdrop-blur-md",
              isDark ? "bg-black/90" : "bg-[var(--bg-deep)]/80"
            )}
            onClick={onClose}
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative z-10 flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl shadow-2xl backdrop-blur-xl",
              isDark
                ? "border border-white/10 bg-black/80"
                : "glass-card-premium border border-[var(--border-subtle)]"
            )}
          >
            <div className="relative aspect-[4/3] w-full max-h-[60vh] overflow-hidden sm:aspect-video sm:max-h-[65vh]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>

            <div
              className={cn(
                "flex flex-col gap-3 border-t p-4 xs:p-6 sm:flex-row sm:items-start sm:justify-between",
                isDark ? "border-white/10" : "border-[var(--border-subtle)]"
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {item.badge && (
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        isDark
                          ? "bg-red-500/20 text-red-400"
                          : "bg-[rgb(var(--accent-primary)/0.1)] text-accent"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.category && (
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 text-xs",
                        isDark
                          ? "border-white/15 text-white/60"
                          : "border-[var(--border-subtle)] text-secondary-content"
                      )}
                    >
                      {item.category}
                    </span>
                  )}
                </div>
                <h3
                  className={cn(
                    "mt-2 text-lg font-semibold xs:text-xl",
                    isDark ? "text-white" : "text-primary-content"
                  )}
                >
                  {item.title}
                </h3>
                <p
                  className={cn(
                    "mt-1 text-sm",
                    isDark ? "text-white/70" : "text-secondary-content"
                  )}
                >
                  {item.description}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={openFullscreen}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg border transition",
                    isDark
                      ? "border-white/15 text-white/80 hover:border-red-500/50 hover:text-red-400"
                      : "surface-chip text-secondary-content hover:border-[var(--border-glow)] hover:text-accent"
                  )}
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={onClose}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg border transition",
                    isDark
                      ? "border-white/15 text-white/80 hover:border-red-500/50 hover:text-red-400"
                      : "surface-chip text-secondary-content hover:border-[var(--border-glow)] hover:text-accent"
                  )}
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate(Math.max(0, activeIndex - 1))}
                  disabled={activeIndex === 0}
                  className={cn(
                    "absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition sm:left-4",
                    isDark
                      ? "border-white/15 bg-black/50 text-white hover:border-red-500/50"
                      : "border-[var(--border-subtle)] bg-[rgb(var(--surface-elevated-rgb)/0.9)] text-accent hover:border-[var(--border-glow)]",
                    activeIndex === 0 && "pointer-events-none opacity-30"
                  )}
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(Math.min(items.length - 1, activeIndex + 1))}
                  disabled={activeIndex === items.length - 1}
                  className={cn(
                    "absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition sm:right-4",
                    isDark
                      ? "border-white/15 bg-black/50 text-white hover:border-red-500/50"
                      : "border-[var(--border-subtle)] bg-[rgb(var(--surface-elevated-rgb)/0.9)] text-accent hover:border-[var(--border-glow)]",
                    activeIndex === items.length - 1 && "pointer-events-none opacity-30"
                  )}
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
