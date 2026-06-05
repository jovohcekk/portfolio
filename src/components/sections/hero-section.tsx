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
      className="section-surface relative flex min-h-screen w-full max-w-full items-center overflow-hidden pt-20 pb-12 xs:pt-24 xs:pb-16"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-48 w-48 rounded-full bg-[#2563EB]/10 blur-[80px] animate-pulse-glow xs:h-64 xs:w-64 xs:blur-[100px] md:h-96 md:w-96 md:blur-[120px] dark:bg-[#2563EB]/15" />
        <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-[#152F8E]/10 blur-[80px] animate-pulse-glow xs:h-64 xs:w-64 xs:blur-[100px] md:h-96 md:w-96 md:blur-[120px] dark:bg-[#152F8E]/15" />
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden max-w-full">
        {floatingTechIcons.map((tech, i) => (
          <motion.span
            key={tech}
            className="absolute max-w-[calc(100%-1rem)] truncate rounded-lg surface-chip px-2 py-1 text-[0.65rem] font-mono xs:px-3 xs:py-1.5 xs:text-xs"
            style={{
              left: `${Math.min(10 + (i * 11) % 80, 72)}%`,
              top: `${15 + (i * 17) % 65}%`,
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

      <div className="section-container relative z-10 grid w-full min-w-0 gap-8 sm:gap-10 md:grid-cols-2 md:items-center lg:gap-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="order-2 min-w-0 w-full md:order-1"
        >
          <motion.div
            variants={fadeInLeft}
            className="mb-4 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 px-3 py-1.5 text-xs text-[#2563EB] xs:px-4 xs:text-sm"
          >
            <Sparkles className="h-4 w-4" />
            {translate("hero.available")}
          </motion.div>

          <motion.p variants={fadeInLeft} className="text-sm font-medium text-[#2563EB]">
            {personalInfo.role}
          </motion.p>

          <motion.h1
            variants={fadeInLeft}
            className="mt-2 break-words text-3xl font-bold tracking-tight xs:text-4xl sm-min:text-[2.25rem] md:text-5xl lg:text-6xl"
          >
            <TypingText text={translate("hero.headline")} className="text-gradient-brand" />
          </motion.h1>

          <motion.p
            variants={fadeInLeft}
            className="mt-4 text-base text-secondary-content sm-min:text-lg md:text-xl"
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

          <motion.div variants={fadeInLeft} className="mt-6 flex w-full flex-wrap gap-3 xs:mt-8 xs:gap-4">
            <Button size="lg" className="w-full xs:w-auto" onClick={() => scrollToSection("projects")}>
              {translate("hero.cta.projects")}
            </Button>
            <Button size="lg" variant="outline" className="w-full xs:w-auto" onClick={() => scrollToSection("contact")}>
              {translate("hero.cta.contact")}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInRight}
          initial="hidden"
          animate="visible"
          className="order-1 flex w-full min-w-0 justify-center md:order-2"
        >
          <div className="relative w-full max-w-[16rem] xs:max-w-[18rem] sm-min:max-w-[20rem] md:max-w-none">
            <div className="absolute -inset-4 rounded-full bg-gradient-primary opacity-20 blur-2xl animate-pulse-glow dark:opacity-30 dark:shadow-[0_0_60px_rgba(236,72,153,0.12)]" />
            <div className="relative mx-auto aspect-square w-full max-w-[16rem] overflow-hidden rounded-3xl border-2 border-[#2563EB]/40 glass-card p-1 shadow-brand xs:max-w-[18rem] sm-min:max-w-[20rem] md:h-80 md:w-80 md:max-w-[20rem] lg:h-96 lg:w-96 lg:max-w-[24rem]">
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
