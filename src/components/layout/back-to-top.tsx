"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { scrollToSection } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { translate } = useLanguage();

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.08, y: -4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => scrollToSection("home")}
          className="fixed bottom-6 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full btn-gradient text-white shadow-brand backdrop-blur-sm xs:bottom-8 xs:right-6"
          aria-label={translate("backToTop")}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
