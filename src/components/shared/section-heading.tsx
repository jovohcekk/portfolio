"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`mb-8 w-full min-w-0 xs:mb-12 md:mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2 className="break-words text-2xl font-bold tracking-tight xs:text-3xl md:text-4xl lg:text-5xl">
        <span className="text-gradient-brand">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-3 break-words text-base text-secondary-content transition-colors duration-300 xs:text-lg">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-1 w-20 rounded-full bg-gradient-primary transition-colors duration-300 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}
