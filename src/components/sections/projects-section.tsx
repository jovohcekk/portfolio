'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GlowCard } from '@/components/shared/glow-card';
import { MagneticButton } from '@/components/shared/magnetic-button';
import { SectionHeading } from '@/components/shared/section-heading';
import { TiltCard } from '@/components/shared/tilt-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProjectImageModal } from '@/components/shared/project-image-modal';
import { projects, ProjectItem } from '@/config/portfolio';
import { useLanguage } from '@/hooks/use-language';
import { slideInScale, staggerContainer, premiumFadeBlurScale, premiumSaasPremium } from '@/lib/animations';
import { ExternalLink, Github } from 'lucide-react';
import { memo } from 'react';
import { cn } from '@/lib/utils';

// Get card size based on index or explicit displaySize property
const getCardSize = (project: ProjectItem, index: number): 'large' | 'medium' | 'small' | 'wide' => {
	if (project.displaySize) return project.displaySize;

	const sizes: Array<'large' | 'medium' | 'small' | 'wide'> = ['large', 'wide', 'medium', 'small'];
	return sizes[index % sizes.length];
};

// Get aspect ratio based on card size
const getAspectRatio = (size: 'large' | 'medium' | 'small' | 'wide'): string => {
	switch (size) {
		case 'large': return 'aspect-square';
		case 'medium': return 'aspect-[2/3]';
		case 'wide': return 'aspect-video';
		case 'small':
		default: return 'aspect-square';
	}
};

function ProjectsSectionComponent() {
	const { translate } = useLanguage();
	const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

	return (
		<section
			id='projects'
			className='section-surface section-surface-alt relative w-full max-w-full overflow-hidden section-spacing'
		>
			<div className='pointer-events-none absolute inset-0 bg-accent-deco opacity-40' />
			<div className='section-container relative'>
				<SectionHeading
					title={translate('projects.title')}
					subtitle={translate('projects.subtitle')}
				/>

				{/* Masonry Grid */}
				<motion.div
					variants={staggerContainer}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-60px' }}
					className='projects-masonry'
				>
					{projects.map((project, index) => {
						const cardSize = getCardSize(project, index);
						const aspectClass = getAspectRatio(cardSize);

						return (
							<motion.div
								key={project.id}
								variants={[slideInScale, premiumFadeBlurScale, premiumSaasPremium][index % 3]}
								custom={index}
								className={cn(
									'card-size',
									`card-size-${cardSize}`,
									'w-full min-w-0 cursor-pointer'
								)}
								onClick={() => setSelectedProject(project)}
							>
								<TiltCard maxTilt={8}>
									<GlowCard>
										<Card className='group w-full h-full min-w-0 max-w-full overflow-hidden border-0 bg-transparent shadow-none hover-accent-highlight flex flex-col'>
											{/* Image Container */}
											<div className={cn('relative overflow-hidden surface-media flex-1', aspectClass)}>
												<motion.div
													className='h-full w-full'
													whileHover={{ scale: 1.08 }}
													transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
												>
													<Image
														src={project.image}
														alt={project.title}
														fill
														className='object-cover'
														sizes={
															cardSize === 'large'
																? '(max-width: 768px) 100vw, 50vw'
																: cardSize === 'wide'
																? '(max-width: 768px) 100vw, 50vw'
																: '(max-width: 768px) 50vw, 33vw'
														}
													/>
												</motion.div>

												{/* Gradient Overlay */}
												<div className='absolute inset-0 bg-gradient-to-t from-[var(--bg-start)]/95 via-[var(--bg-start)]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 flex items-center justify-center gap-2 md:gap-3'>
													<MagneticButton strength={0.5}>
														<Button size='sm' variant='secondary' asChild>
															<a
																href={project.github}
																target='_blank'
																rel='noopener noreferrer'
																onClick={(e) => e.stopPropagation()}
															>
																<Github className='h-4 w-4' />
																<span className='hidden xs:inline'>{translate('projects.github')}</span>
															</a>
														</Button>
													</MagneticButton>
													<MagneticButton strength={0.5}>
														<Button size='sm' asChild className='btn-glow-pulse'>
															<a
																href={project.demo}
																target='_blank'
																rel='noopener noreferrer'
																onClick={(e) => e.stopPropagation()}
															>
																<ExternalLink className='h-4 w-4' />
																<span className='hidden xs:inline'>{translate('projects.demo')}</span>
															</a>
														</Button>
													</MagneticButton>
												</div>
											</div>

											{/* Content Section - Visible only on larger cards or when needed */}
											<CardContent className='p-3 xs:p-4 md:p-6 pt-3 md:pt-4 hidden md:block'>
												<h3 className='break-words text-base md:text-lg font-semibold tracking-tight text-primary-content transition-colors duration-300 group-hover:text-accent'>
													{project.title}
												</h3>
												<p className='mt-1 md:mt-2 text-xs md:text-sm leading-relaxed text-secondary-content line-clamp-2 md:line-clamp-3'>
													{project.description}
												</p>
												<p className='mt-2 md:mt-4 text-xs font-medium uppercase tracking-wider text-accent hidden lg:block'>
													{translate('projects.technologies')}
												</p>
												<div className='mt-2 md:mt-2 flex flex-wrap gap-1.5 hidden lg:flex'>
													{project.technologies.slice(0, 3).map((tech) => (
														<motion.span
															key={tech}
															whileHover={{ scale: 1.05 }}
															className='rounded-md surface-chip px-1.5 py-0.5 text-xs whitespace-nowrap'
														>
															{tech}
														</motion.span>
													))}
													{project.technologies.length > 3 && (
														<span className='text-xs text-secondary-content'>+{project.technologies.length - 3}</span>
													)}
												</div>
											</CardContent>
										</Card>
									</GlowCard>
								</TiltCard>
							</motion.div>
						);
					})}
				</motion.div>
			</div>

			{/* Image Modal */}
			{selectedProject && (
				<ProjectImageModal
					isOpen={!!selectedProject}
					image={selectedProject.image}
					title={selectedProject.title}
					description={selectedProject.description}
					technologies={selectedProject.technologies}
					onClose={() => setSelectedProject(null)}
				/>
			)}
		</section>
	);
}

// OPTIMIZATION: Memoize to prevent re-renders when parent updates but props don't change
export const ProjectsSection = memo(ProjectsSectionComponent);
