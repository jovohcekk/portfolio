"use client";

import { motion } from "framer-motion";
import { Code2, Wrench, Terminal, Palette, Shield } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { TiltCard } from "@/components/shared/tilt-card";
import { SkillMeter } from "@/components/shared/skill-meter";
import { ParticleField } from "@/components/shared/particle-field";
import { useLanguage } from "@/hooks/use-language";
import { skillGroups } from "@/config/portfolio";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { staggerContainer, scaleIn } from "@/lib/animations";
import type { TranslationKey } from "@/lib/i18n/translations";

const groupLabelKeys: Record<string, TranslationKey> = {
  programming: "skills.programming",
  devTools: "skills.devTools",
  linux: "skills.linux",
  creative: "skills.creative",
  cybersecurity: "skills.cybersecurity",
};

const groupIcons: Record<string, typeof Code2> = {
  programming: Code2,
  devTools: Wrench,
  linux: Terminal,
  creative: Palette,
  cybersecurity: Shield,
};

export function SkillsSection() {
  const { translate } = useLanguage();
  const reducedMotion = useReducedMotion();

  return (
    <section id="skills" className="section-surface section-surface-tint relative w-full max-w-full overflow-hidden section-spacing">
      <ParticleField count={16} className="opacity-50" />
      <div className="section-container relative">
        <SectionHeading
          title={translate("skills.title")}
          subtitle={translate("skills.subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid w-full min-w-0 grid-cols-1 gap-4 xs:gap-6 sm-lg:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((group, groupIndex) => {
            const Icon = groupIcons[group.id] ?? Code2;
            return (
              <TiltCard key={group.id} maxTilt={5}>
                <motion.div
                  variants={scaleIn}
                  className="glass-card h-full w-full min-w-0 max-w-full rounded-2xl p-4 xs:p-6 hover-accent-highlight"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <motion.div
                      className="icon-box flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: groupIndex * 0.3 }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    <h3 className="text-lg font-semibold tracking-tight text-accent">
                      {translate(groupLabelKeys[group.id] ?? "skills.programming")}
                    </h3>
                  </div>

                  <SkillMeter
                    label={translate(groupLabelKeys[group.id] ?? "skills.programming")}
                    level={group.level ?? 80}
                    delay={groupIndex * 0.1}
                  />

                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((skill, index) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.04 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.08, y: -4, rotate: index % 2 === 0 ? 2 : -2 }}
                        className="max-w-full break-words rounded-lg surface-chip px-3 py-1.5 text-sm font-medium text-primary-content"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
