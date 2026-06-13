"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function CursorEffects() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const glowX = useMotionValue(-100);
  const glowY = useMotionValue(-100);

  // OPTIMIZATION: Throttle mouse tracking to ~16ms (60fps)
  const lastUpdateRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);

  const springConfig = { stiffness: 500, damping: 40, mass: 0.5 };
  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);
  const glowSpringX = useSpring(glowX, { stiffness: 150, damping: 25 });
  const glowSpringY = useSpring(glowY, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isDesktop = window.innerWidth >= 1024;
    setEnabled(isFinePointer && isDesktop && !reducedMotion);

    const handler = (e: MouseEvent) => {
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
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        glowX.set(e.clientX);
        glowY.set(e.clientY);
      });
    };

    if (isFinePointer && isDesktop && !reducedMotion) {
      window.addEventListener("mousemove", handler, { passive: true });
    }
    return () => {
      window.removeEventListener("mousemove", handler);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [reducedMotion, cursorX, cursorY, glowX, glowY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[90] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border mix-blend-difference lg:block"
        style={{ x: cursorSpringX, y: cursorSpringY, willChange: "transform" }}
        aria-hidden
      />
      <motion.div
        className="cursor-glow pointer-events-none fixed left-0 top-0 z-[1] hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] lg:block"
        style={{ x: glowSpringX, y: glowSpringY, willChange: "transform" }}
        aria-hidden
      />
    </>
  );
}
