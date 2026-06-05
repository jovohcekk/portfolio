"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Terminal,
  Briefcase,
  Image,
  Box,
  Shield,
  Lightbulb,
  Braces,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { useLanguage } from "@/hooks/use-language";
import { personalInfo } from "@/config/portfolio";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";
import type { TranslationKey } from "@/lib/i18n/translations";

const aboutPoints: { key: TranslationKey; icon: typeof Code2 }[] = [
  { key: "about.points.fullstack", icon: Code2 },
  { key: "about.points.python", icon: Braces },
  { key: "about.points.linux", icon: Terminal },
  { key: "about.points.freelance", icon: Briefcase },
  { key: "about.points.photoshop", icon: Image },
  { key: "about.points.blender", icon: Box },
  { key: "about.points.security", icon: Shield },
  { key: "about.points.problem", icon: Lightbulb },
];

export function AboutSection() {
  const { translate } = useLanguage();

  return (
    <section id="about" className="section-surface relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-hero-mesh opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title={translate("about.title")}
          subtitle={translate("about.subtitle")}
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-2xl font-semibold text-primary-content">
              {personalInfo.name}
            </h3>
            <p className="mt-2 text-[#2563EB]">{personalInfo.role}</p>
            <p className="mt-6 leading-relaxed text-secondary-content">
              {translate("about.intro")}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {aboutPoints.map(({ key, icon: Icon }) => (
              <motion.div
                key={key}
                variants={scaleIn}
                className="group flex items-center gap-4 rounded-xl glass-card p-4 hover-accent-highlight"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#2563EB]/15 text-[#2563EB] transition group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-medium text-primary-content">{translate(key)}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
