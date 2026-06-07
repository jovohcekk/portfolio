"use client";

import { motion } from "framer-motion";
import { Github, Instagram, Mail, MessageCircle, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { personalInfo, socialLinkItems } from "@/config/portfolio";
import { fadeInUp } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const footerIcons: Record<string, LucideIcon> = {
  telegram: MessageCircle,
  instagram: Instagram,
  github: Github,
  email: Mail,
};

export function Footer() {
  const { translate } = useLanguage();
  const reducedMotion = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer className="surface-footer w-full max-w-full overflow-hidden py-10 xs:py-12 transition-colors duration-300">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="section-container"
      >
        <div className="flex w-full min-w-0 flex-col items-center justify-between gap-6 md:flex-row">
          <div className="min-w-0 text-center md:text-left">
            <p className="font-semibold tracking-tight text-primary-content">{personalInfo.name}</p>
            <p className="text-sm text-secondary-content">{personalInfo.role}</p>
          </div>

          <div className="flex gap-3 xs:gap-4">
            {socialLinkItems.map((item) => {
              const Icon = footerIcons[item.id] ?? Mail;
              return (
                <motion.a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg surface-chip text-secondary-content hover-accent-highlight hover:text-accent"
                  aria-label={item.label}
                  whileHover={reducedMotion ? undefined : { y: -4, scale: 1.05 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.95 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex w-full min-w-0 flex-col items-center justify-between gap-2 border-t border-[var(--border-subtle)] pt-8 text-center text-sm text-secondary-content md:flex-row md:text-left">
          <p className="break-words text-primary-content">
            © {year} {personalInfo.name}. {translate("footer.rights")}
          </p>
          <p className="break-words">{translate("footer.made")}</p>
        </div>
      </motion.div>
    </footer>
  );
}
