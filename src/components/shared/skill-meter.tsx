"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SkillMeterProps {
  label: string;
  level: number;
  delay?: number;
}

export function SkillMeter({ label, level, delay = 0 }: SkillMeterProps) {
  const reducedMotion = useReducedMotion();
  const clamped = Math.min(100, Math.max(0, level));

  return (
    <div className="group/skill">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-primary-content transition-colors group-hover/skill:text-accent">
          {label}
        </span>
        <motion.span
          className="text-xs font-mono text-secondary-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3 }}
        >
          {clamped}%
        </motion.span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[rgb(var(--surface-rgb)/0.5)]">
        <motion.div
          className="h-full rounded-full bg-gradient-primary"
          initial={{ width: reducedMotion ? `${clamped}%` : "0%" }}
          whileInView={{ width: `${clamped}%` }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: reducedMotion ? 0 : 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
