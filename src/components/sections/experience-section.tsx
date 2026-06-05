"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { useLanguage } from "@/hooks/use-language";
import { statistics } from "@/config/portfolio";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";
import type { TranslationKey } from "@/lib/i18n/translations";

export function ExperienceSection() {
  const { translate } = useLanguage();

  return (
    <section id="experience" className="section-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title={translate("experience.title")}
          subtitle={translate("experience.subtitle")}
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass-card mb-16 rounded-2xl border-l-4 border-l-[#2563EB] p-8 md:p-10"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#2563EB]/15 text-[#2563EB]">
              <Briefcase className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-content md:text-2xl">
                {translate("experience.freelance.title")}
              </h3>
              <p className="mt-4 leading-relaxed text-secondary-content">
                {translate("experience.freelance.description")}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {statistics.map((stat) => (
            <motion.div
              key={stat.id}
              variants={scaleIn}
              className="glass-card rounded-2xl p-6 text-center hover-accent-highlight"
            >
              <p className="text-3xl font-bold text-gradient-brand md:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm text-secondary-content">
                {translate(stat.labelKey as TranslationKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
