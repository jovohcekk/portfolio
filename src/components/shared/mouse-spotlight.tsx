"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function MouseSpotlight() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // OPTIMIZATION: Throttle mouse tracking to ~16ms (60fps)
  const lastUpdateRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);

  const springX = useSpring(x, { stiffness: 120, damping: 25 });
  const springY = useSpring(y, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const wide = window.innerWidth >= 1024; // Changed from 768 to 1024 (lg breakpoint)
    setEnabled(fine && wide && !reducedMotion);

    const move = (e: MouseEvent) => {
      const now = Date.now();
      // OPTIMIZATION: Only update if 16ms has passed (60fps throttle)
      if (now - lastUpdateRef.current < 16) {
        return;
      }
      lastUpdateRef.current = now;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });
    };

    if (fine && wide && !reducedMotion) {
      window.addEventListener("mousemove", move, { passive: true });
    }
    return () => {
      window.removeEventListener("mousemove", move);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [reducedMotion, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[2] hidden lg:block"
      aria-hidden
    >
      <motion.div
        className="spotlight-glow absolute h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ x: springX, y: springY, willChange: "transform" }}
      />
    </motion.div>
  );
}
