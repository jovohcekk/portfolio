"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { useLanguage } from "@/hooks/use-language";
import { skillGroups } from "@/config/portfolio";
import { staggerContainer, scaleIn } from "@/lib/animations";
import type { TranslationKey } from "@/lib/i18n/translations";

const groupLabelKeys: Record<string, TranslationKey> = {
  programming: "skills.programming",
  devTools: "skills.devTools",
  linux: "skills.linux",
  creative: "skills.creative",
  cybersecurity: "skills.cybersecurity",
};

export function SkillsSection() {
  const { translate } = useLanguage();

  return (
    <section id="skills" className="section-surface py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title={translate("skills.title")}
          subtitle={translate("skills.subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.id}
              variants={scaleIn}
              className="glass-card rounded-2xl p-6 hover-accent-highlight"
            >
              <h3 className="mb-4 text-lg font-semibold text-[#2563EB]">
                {translate(groupLabelKeys[group.id] ?? "skills.programming")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="rounded-lg surface-chip px-3 py-1.5 text-sm font-medium text-primary-content"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
