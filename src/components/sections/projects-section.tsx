"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { TiltCard } from "@/components/shared/tilt-card";
import { GlowCard } from "@/components/shared/glow-card";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { projects } from "@/config/portfolio";
import { staggerContainer, slideInScale } from "@/lib/animations";

export function ProjectsSection() {
  const { translate } = useLanguage();

  return (
    <section id="projects" className="section-surface section-surface-alt relative w-full max-w-full overflow-hidden section-spacing">
      <div className="pointer-events-none absolute inset-0 bg-accent-deco opacity-40" />
      <div className="section-container relative">
        <SectionHeading
          title={translate("projects.title")}
          subtitle={translate("projects.subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid w-full min-w-0 grid-cols-1 gap-6 xs:gap-8 md:grid-cols-2"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={slideInScale}
              custom={index}
              className="min-w-0 w-full max-w-full"
            >
              <TiltCard maxTilt={8}>
                <GlowCard>
                  <Card className="group w-full min-w-0 max-w-full overflow-hidden border-0 bg-transparent shadow-none hover-accent-highlight">
                    <div className="relative aspect-video overflow-hidden surface-media">
                      <motion.div
                        className="h-full w-full"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-start)]/95 via-[var(--bg-start)]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                        <div className="absolute inset-0 flex items-center justify-center gap-3">
                          <MagneticButton strength={0.5}>
                            <Button size="sm" variant="secondary" asChild>
                              <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                                {translate("projects.github")}
                              </a>
                            </Button>
                          </MagneticButton>
                          <MagneticButton strength={0.5}>
                            <Button size="sm" asChild className="btn-glow-pulse">
                              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                                {translate("projects.demo")}
                              </a>
                            </Button>
                          </MagneticButton>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4 xs:p-6">
                      <h3 className="break-words text-lg font-semibold tracking-tight text-primary-content transition-colors duration-300 group-hover:text-accent xs:text-xl">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-secondary-content line-clamp-3">
                        {project.description}
                      </p>
                      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-accent">
                        {translate("projects.technologies")}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                            className="rounded-md surface-chip px-2 py-0.5 text-xs"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      <div className="mt-6 flex w-full flex-wrap gap-2 xs:gap-3 md:hidden">
                        <Button size="sm" variant="outline" asChild className="flex-1 min-w-0">
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            {translate("projects.github")}
                          </a>
                        </Button>
                        <Button size="sm" asChild className="flex-1 min-w-0">
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            {translate("projects.demo")}
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </GlowCard>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
