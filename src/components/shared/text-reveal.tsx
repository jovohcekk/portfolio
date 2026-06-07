"use client";

import { motion } from "framer-motion";
import { textRevealContainer, textRevealWord } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({ text, className, as: Tag = "span" }: TextRevealProps) {
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        variants={textRevealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="inline-flex flex-wrap"
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="overflow-hidden inline-block mr-[0.25em]">
            <motion.span variants={textRevealWord} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
