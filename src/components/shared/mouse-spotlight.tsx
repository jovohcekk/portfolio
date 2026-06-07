"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function MouseSpotlight() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 25 });
  const springY = useSpring(y, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const wide = window.innerWidth >= 768;
    setEnabled(fine && wide && !reducedMotion);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    if (fine && wide && !reducedMotion) {
      window.addEventListener("mousemove", move, { passive: true });
    }
    return () => window.removeEventListener("mousemove", move);
  }, [reducedMotion, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[2] hidden md:block"
      aria-hidden
    >
      <motion.div
        className="spotlight-glow absolute h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ x: springX, y: springY }}
      />
    </motion.div>
  );
}
