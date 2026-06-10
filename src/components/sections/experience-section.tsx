'use client';

import { AnimatedCounter } from '@/components/shared/animated-counter'
import { SectionHeading } from '@/components/shared/section-heading'
import { TiltCard } from '@/components/shared/tilt-card'
import { statistics } from '@/config/portfolio'
import { useLanguage } from '@/hooks/use-language'
import {
    blurIn,
    premiumDepthTransition,
    premiumPerspectiveShift,
    scaleIn,
    staggerContainer
} from '@/lib/animations'
import type { TranslationKey } from '@/lib/i18n/translations'
import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { memo } from 'react'

function ExperienceSectionComponent() {
	const { translate } = useLanguage();

	return (
		<section
			id='experience'
			className='section-surface section-surface-elevated w-full max-w-full overflow-hidden section-spacing'>
			<div className='section-container'>
				<SectionHeading title={translate('experience.title')} subtitle={translate('experience.subtitle')} />

				<motion.div
					variants={blurIn}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					className='glass-card-premium mb-10 w-full min-w-0 rounded-2xl border-l-4 border-l-[rgb(var(--accent-primary))] p-5 xs:p-6 md:mb-16 md:p-10 hover-accent-highlight'>
					<div className='flex min-w-0 items-start gap-3 xs:gap-4'>
						<motion.div
							whileHover={{ rotate: [0, -5, 5, 0] }}
							transition={{ duration: 0.5 }}
							className='icon-box flex h-12 w-12 shrink-0 items-center justify-center rounded-xl xs:h-14 xs:w-14'>
							<Briefcase className='h-6 w-6 xs:h-7 xs:w-7' />
						</motion.div>
						<div className='min-w-0 flex-1'>
							<h3 className='break-words text-lg font-semibold tracking-tight text-primary-content xs:text-xl md:text-2xl'>
								{translate('experience.freelance.title')}
							</h3>
							<p className='mt-4 leading-relaxed text-secondary-content'>
								{translate('experience.freelance.description')}
							</p>
						</div>
					</div>
				</motion.div>

				<motion.div
					variants={staggerContainer}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					className='grid w-full min-w-0 grid-cols-1 gap-4 xs:grid-cols-2 xs:gap-6 lg:grid-cols-4'>
					{statistics.map((stat, index) => {
						// Use smart rotation for stat card animations - cycle through 3 animation styles
						const animationVariants = [scaleIn, premiumDepthTransition, premiumPerspectiveShift][index % 3];

						return (
							<TiltCard key={stat.id} maxTilt={5}>
								<motion.div
									variants={animationVariants}
									className='glass-card w-full min-w-0 max-w-full rounded-2xl p-4 text-center xs:p-6 hover-accent-highlight'>
									<div className='min-h-[2.5rem] xs:min-h-[3rem] md:min-h-[3.5rem]'>
										<AnimatedCounter
											value={stat.value}
											className='text-2xl font-bold text-gradient-brand xs:text-3xl md:text-4xl'
										/>
									</div>
									<p className='mt-2 text-sm text-secondary-content'>{translate(stat.labelKey as TranslationKey)}</p>
								</motion.div>
							</TiltCard>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
}

// OPTIMIZATION: Memoize to prevent re-renders when parent updates but props don't change
export const ExperienceSection = memo(ExperienceSectionComponent)
