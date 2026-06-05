"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { projects } from "@/config/portfolio";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export function ProjectsSection() {
  const { translate } = useLanguage();

  return (
    <section id="projects" className="section-surface relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-accent-deco opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          title={translate("projects.title")}
          subtitle={translate("projects.subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2"
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={fadeInUp}>
              <Card className="group overflow-hidden hover-accent-highlight">
                <div className="relative aspect-video overflow-hidden surface-media">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[var(--bg-start)]/95 to-transparent opacity-0 transition group-hover:opacity-100">
                    <div className="flex gap-3">
                      <Button size="sm" variant="secondary" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          {translate("projects.github")}
                        </a>
                      </Button>
                      <Button size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          {translate("projects.demo")}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-primary-content transition group-hover:text-[#2563EB]">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-secondary-content line-clamp-3">
                    {project.description}
                  </p>
                  <p className="mt-4 text-xs font-medium text-[#2563EB]">
                    {translate("projects.technologies")}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="rounded-md surface-chip px-2 py-0.5 text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex gap-3 md:hidden">
                    <Button size="sm" variant="outline" asChild className="flex-1">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button size="sm" asChild className="flex-1">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
