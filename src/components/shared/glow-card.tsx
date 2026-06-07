"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  variant?: "blue" | "red";
}

export function GlowCard({ children, className, variant = "blue" }: GlowCardProps) {
  const isRed = variant === "red";

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl glow-card-shadow transition-shadow duration-500",
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-[-1px] z-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          isRed
            ? "bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-shimmer bg-[length:200%_100%]"
            : "glow-shimmer-blue animate-shimmer"
        )}
        aria-hidden
      />
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
