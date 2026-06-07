"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

function parseNumericValue(value: string): { number: number; prefix: string; suffix: string } | null {
  const match = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return null;
  return {
    prefix: match[1],
    number: parseFloat(match[2]),
    suffix: match[3],
  };
}

export function AnimatedCounter({ value, className, duration = 1.8 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = useReducedMotion();
  const hasStarted = useRef(false);
  const rafId = useRef(0);

  const parsed = useMemo(() => parseNumericValue(value), [value]);
  const isNumeric = parsed !== null;

  const [displayValue, setDisplayValue] = useState(() =>
    isNumeric && !reducedMotion ? `${parsed!.prefix}0${parsed!.suffix}` : value
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    setVisible(true);

    if (hasStarted.current) return;
    hasStarted.current = true;

    if (!parsed || reducedMotion) {
      setDisplayValue(value);
      return;
    }

    const target = parsed.number;
    const durationMs = duration * 1000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      const rounded =
        target % 1 === 0 ? Math.round(current) : parseFloat(current.toFixed(1));
      setDisplayValue(`${parsed.prefix}${rounded}${parsed.suffix}`);

      if (progress < 1) {
        rafId.current = requestAnimationFrame(tick);
      }
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
    };
  }, [isInView, value, duration, reducedMotion, parsed]);

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tabular-nums transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0",
        className
      )}
      aria-label={value}
    >
      {displayValue}
    </span>
  );
}
