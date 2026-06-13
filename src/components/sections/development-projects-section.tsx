'use client';

import { motion } from 'framer-motion';

import { ProjectCard } from './project-card';
import { SectionHeading } from '@/components/shared/section-heading';
import { useLanguage } from '@/hooks/use-language';
import { projects } from '@/config/portfolio';
import { fadeInUp, floatAnimation, staggerContainer } from '@/lib/animations';

export function DevelopmentProjectsSection() {
	const { translate } = useLanguage();
	const devProjects = projects.slice(0, 2);

	return (
		<motion.section
			id="projects"
			className="section-surface section-surface-alt relative w-full overflow-hidden section-spacing"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			variants={staggerContainer}>
			{/* Ambient background effects */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute left-1/4 top-32 h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,45,45,0.24),transparent_50%)] blur-3xl opacity-85"
					animate={floatAnimation(0)}
				/>
				<motion.div
					className="absolute right-1/4 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,45,45,0.18),transparent_45%)] blur-3xl opacity-70"
					animate={floatAnimation(2)}
				/>
			</div>

			<div className="section-container relative z-10">
				{/* Premium Section Heading with Red Gradient */}
				<SectionHeading
					title={translate('projects.title')}
					
				/>

				{/* 2-Column Project Cards Grid */}
				<motion.div
					className="mx-auto max-w-[1400px]"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					variants={fadeInUp}>
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-10">
						{devProjects.map((project, idx) => (
							<ProjectCard key={project.id} project={project} index={idx} />
						))}
					</div>
				</motion.div>
			</div>
		</motion.section>
	);
}
