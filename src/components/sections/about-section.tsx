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
import { TiltCard } from "@/components/shared/tilt-card";
import { ParallaxLayer } from "@/components/shared/parallax-layer";
import { useLanguage } from "@/hooks/use-language";
import { personalInfo } from "@/config/portfolio";
import { staggerContainer, scaleIn, blurIn } from "@/lib/animations";
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
    <section id="about" className="section-surface section-surface-alt relative w-full max-w-full overflow-hidden section-spacing">
      <ParallaxLayer speed={0.1} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-hero-mesh opacity-50" />
      </ParallaxLayer>
      <div className="section-container relative">
        <SectionHeading
          title={translate("about.title")}
          subtitle={translate("about.subtitle")}
        />

        <div className="grid w-full min-w-0 gap-8 md:gap-12 lg:grid-cols-2 lg:items-center">
          <TiltCard maxTilt={6}>
            <motion.div
              variants={blurIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card-premium w-full min-w-0 rounded-2xl p-5 xs:p-6 md:p-8 hover-accent-highlight"
            >
              <h3 className="text-2xl font-semibold tracking-tight text-primary-content">
                {personalInfo.name}
              </h3>
              <p className="mt-2 font-medium text-accent">{personalInfo.role}</p>
              <p className="mt-6 leading-relaxed text-secondary-content">
                {translate("about.intro")}
              </p>
            </motion.div>
          </TiltCard>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid w-full min-w-0 grid-cols-1 gap-3 xs:gap-4 sm:grid-cols-2"
          >
            {aboutPoints.map(({ key, icon: Icon }) => (
              <motion.div
                key={key}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className="group flex min-w-0 items-center gap-3 rounded-xl glass-card p-3 xs:gap-4 xs:p-4 hover-accent-highlight"
              >
                <div className="icon-box flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 xs:h-12 xs:w-12">
                  <Icon className="h-5 w-5 xs:h-6 xs:w-6" />
                </div>
                <span className="min-w-0 flex-1 break-words font-medium text-primary-content text-sm xs:text-base">
                  {translate(key)}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
