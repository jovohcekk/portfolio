"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/use-language";
import { personalInfo } from "@/config/portfolio";

const LOADING_DURATION = 2200;

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const { translate } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), LOADING_DURATION);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex w-full max-w-[100vw] flex-col items-center justify-center overflow-hidden page-background"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mb-6 h-16 w-16 rounded-2xl bg-gradient-primary p-[2px] mx-auto">
              <div className="flex h-full w-full items-center justify-center rounded-2xl glass-card text-2xl font-bold text-[#2563EB]">
                {personalInfo.name.charAt(0)}
              </div>
            </div>
            <h1 className="text-xl font-semibold text-primary-content md:text-2xl">
              {personalInfo.name}
            </h1>
            <p className="mt-2 text-sm text-secondary-content">{translate("loading")}</p>
            <motion.div className="mx-auto mt-6 h-1 w-48 overflow-hidden rounded-full surface-media">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: LOADING_DURATION / 1000, ease: "easeInOut" }}
                className="h-full rounded-full bg-gradient-primary"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
