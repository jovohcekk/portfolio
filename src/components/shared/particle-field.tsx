"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ParticleFieldProps {
  count?: number;
  className?: string;
  variant?: "default" | "hero";
}

export function ParticleField({ count = 24, className = "", variant = "default" }: ParticleFieldProps) {
  const reducedMotion = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: (i * 17 + 11) % 100,
        y: (i * 23 + 7) % 100,
        size: 2 + (i % 3),
        duration: 4 + (i % 5),
        delay: (i % 8) * 0.4,
      })),
    [count]
  );

  if (reducedMotion || count <= 0) return null;

  const dotClass = variant === "hero" ? "particle-dot-hero" : "particle-dot";

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute rounded-full ${dotClass}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
