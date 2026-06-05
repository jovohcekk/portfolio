"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypingText } from "@/components/shared/typing-text";
import { useLanguage } from "@/hooks/use-language";
import { personalInfo, floatingTechIcons } from "@/config/portfolio";
import { fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import { scrollToSection } from "@/lib/utils";

export function HeroSection() {
  const { translate } = useLanguage();
  const [profileError, setProfileError] = useState(false);

  return (
    <section
      id="home"
      className="section-surface relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#2563EB]/10 blur-[120px] animate-pulse-glow dark:bg-[#2563EB]/15" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#152F8E]/10 blur-[120px] animate-pulse-glow dark:bg-[#152F8E]/15" />
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingTechIcons.map((tech, i) => (
          <motion.span
            key={tech}
            className="absolute rounded-lg surface-chip px-3 py-1.5 text-xs font-mono"
            style={{
              left: `${10 + (i * 11) % 80}%`,
              top: `${15 + (i * 17) % 70}%`,
            }}
            animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {tech}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:items-center md:px-6 lg:gap-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="order-2 md:order-1"
        >
          <motion.div
            variants={fadeInLeft}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 px-4 py-1.5 text-sm text-[#2563EB]"
          >
            <Sparkles className="h-4 w-4" />
            {translate("hero.available")}
          </motion.div>

          <motion.p variants={fadeInLeft} className="text-sm font-medium text-[#2563EB]">
            {personalInfo.role}
          </motion.p>

          <motion.h1
            variants={fadeInLeft}
            className="mt-2 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            <TypingText text={translate("hero.headline")} className="text-gradient-brand" />
          </motion.h1>

          <motion.p
            variants={fadeInLeft}
            className="mt-4 text-lg text-secondary-content md:text-xl"
          >
            {translate("hero.subheadline")}
          </motion.p>

          <motion.p variants={fadeInLeft} className="mt-4 max-w-xl text-secondary-content">
            {translate("hero.description")}
          </motion.p>

          <motion.div
            variants={fadeInLeft}
            className="mt-4 flex items-center gap-2 text-sm text-secondary-content"
          >
            <MapPin className="h-4 w-4 text-[#2563EB]" />
            {personalInfo.location} · {personalInfo.age} {translate("years.old")}
          </motion.div>

          <motion.div variants={fadeInLeft} className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" onClick={() => scrollToSection("projects")}>
              {translate("hero.cta.projects")}
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
              {translate("hero.cta.contact")}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInRight}
          initial="hidden"
          animate="visible"
          className="order-1 flex justify-center md:order-2"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-primary opacity-20 blur-2xl animate-pulse-glow dark:opacity-30 dark:shadow-[0_0_60px_rgba(236,72,153,0.12)]" />
            <div className="relative h-64 w-64 overflow-hidden rounded-3xl border-2 border-[#2563EB]/40 glass-card p-1 shadow-brand md:h-80 md:w-80 lg:h-96 lg:w-96">
              <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] surface-media">
                {!profileError ? (
                  <Image
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 256px, 384px"
                    onError={() => setProfileError(true)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-[#2563EB]">
                    {personalInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
