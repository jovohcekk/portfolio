'use client';

import { FloatingShapes } from '@/components/shared/floating-shapes'
import { MagneticButton } from '@/components/shared/magnetic-button'
import { ParallaxLayer } from '@/components/shared/parallax-layer'
import { ParticleField } from '@/components/shared/particle-field'
import { HeroCleanProfile } from '@/components/shared/hero-clean-profile'
import { TextReveal } from '@/components/shared/text-reveal'
import { TypingText } from '@/components/shared/typing-text'
import { Button } from '@/components/ui/button'
import { floatingTechIcons, personalInfo } from '@/config/portfolio'
import { useLanguage } from '@/hooks/use-language'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { blurIn, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations'
import { scrollToSection } from '@/lib/utils'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, Sparkles } from 'lucide-react'
import { memo, useEffect, useState } from 'react'

export function HeroSectionComponent() {
	const { translate } = useLanguage();
	const reducedMotion = useReducedMotion();
	const { scrollY } = useScroll();
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		setIsMobile(window.innerWidth < 768);
	}, []);

	const heroOpacity = useTransform(scrollY, [0, 400], [1, reducedMotion ? 1 : 0.3]);
	const heroY = useTransform(scrollY, [0, 400], [0, reducedMotion ? 0 : 80]);

	return (
		<section
			id='home'
			className='section-surface relative flex min-h-[100dvh] w-full max-w-full items-center overflow-hidden pt-20 pb-12 xs:pt-24 xs:pb-16'>
			<div
				className={`pointer-events-none absolute inset-0 ambient-gradient-layer opacity-80 ${reducedMotion ? '' : 'animate-ambient-shift'}`}
				aria-hidden
			/>
			<FloatingShapes />
			<ParticleField count={reducedMotion ? 0 : (isMobile ? 10 : 20)} variant='hero' />

			<div className='pointer-events-none absolute inset-0'>
				<ParallaxLayer speed={0.2} className='absolute top-1/4 left-1/4'>
					<motion.div
						className={`glow-orb-primary h-48 w-48 rounded-full ${isMobile ? 'blur-[60px]' : 'xs:blur-[80px] md:blur-[100px]'} xs:h-64 xs:w-64 md:h-96 md:w-96`}
						style={{ willChange: 'transform, opacity' }}
						animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
						transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
					/>
				</ParallaxLayer>
				<ParallaxLayer speed={0.15} className='absolute bottom-1/4 right-1/4'>
					<motion.div
						className={`glow-orb-secondary h-48 w-48 rounded-full ${isMobile ? 'blur-[50px]' : 'xs:blur-[70px] md:blur-[100px]'} xs:h-64 xs:w-64 md:h-96 md:w-96`}
						style={{ willChange: 'transform, opacity' }}
						animate={{ opacity: [0.3, 0.65, 0.3], scale: [1, 1.06, 1] }}
						transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
					/>
				</ParallaxLayer>
				<div className='absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-60' />
			</div>

			<div className='pointer-events-none absolute inset-0 overflow-hidden max-w-full'>
				{floatingTechIcons.map((tech, i) => (
					<motion.span
						key={tech}
						className='absolute max-w-[calc(100%-1rem)] truncate rounded-lg surface-chip px-2 py-1 text-[0.65rem] font-mono xs:px-3 xs:py-1.5 xs:text-xs'
						style={{
							left: `${Math.min(10 + ((i * 11) % 80), 72)}%`,
							top: `${15 + ((i * 17) % 65)}%`,
							willChange: 'transform, opacity',
						}}
						animate={
							reducedMotion
								? undefined
								: {
										y: [0, -22, 0],
										opacity: [0.35, 1, 0.35],
										rotate: [0, i % 2 === 0 ? 3 : -3, 0],
									}
						}
						transition={{
							duration: 4 + (i % 3),
							repeat: reducedMotion ? 0 : Infinity,
							delay: i * 0.25,
						}}>
						{tech}
					</motion.span>
				))}
			</div>

			<motion.div
				style={{ opacity: heroOpacity, y: heroY }}
				className='section-container relative z-10 grid w-full min-w-0 gap-8 sm:gap-10 md:grid-cols-2 md:items-center lg:gap-16'>
				<motion.div
					variants={staggerContainer}
					initial='hidden'
					animate='visible'
					className='order-2 min-w-0 w-full md:order-1'>
					<motion.div
						variants={fadeInLeft}
						className='badge-accent mb-4 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full px-3 py-1.5 text-xs backdrop-blur-sm xs:px-4 xs:text-sm'>
						<motion.span
							animate={reducedMotion ? undefined : { rotate: [0, 15, -15, 0] }}
							transition={{ duration: 2, repeat: Infinity }}>
							<Sparkles className='h-4 w-4' />
						</motion.span>
						{translate('hero.available')}
					</motion.div>

					<motion.p variants={fadeInLeft} className='text-sm font-medium tracking-wide text-accent'>
						{personalInfo.role}
					</motion.p>

					<motion.h1 variants={blurIn} className='heading-display mt-3 break-words font-bold'>
						<TypingText text={translate('hero.headline')} className='text-gradient-brand' />
					</motion.h1>

					<motion.p variants={fadeInLeft} className='body-lg mt-5 text-secondary-content'>
						<TextReveal text={translate('hero.subheadline')} />
					</motion.p>

					<motion.p variants={fadeInLeft} className='mt-4 max-w-xl text-secondary-content leading-relaxed'>
						<TextReveal text={translate('hero.description')} />
					</motion.p>

					<motion.div variants={fadeInLeft} className='mt-4 flex items-center gap-2 text-sm text-secondary-content'>
						<MapPin className='h-4 w-4 shrink-0 text-accent' />
						<span className='break-words'>
							{personalInfo.location} · {personalInfo.age} {translate('years.old')}
						</span>
					</motion.div>

					<motion.div variants={fadeInLeft} className='mt-8 flex w-full flex-wrap gap-3 xs:gap-4'>
						<MagneticButton className='w-full xs:w-auto' strength={0.4}>
							<Button size='lg' className='btn-glow-pulse w-full xs:w-auto' onClick={() => scrollToSection('projects')}>
								{translate('hero.cta.projects')}
							</Button>
						</MagneticButton>
						<MagneticButton className='w-full xs:w-auto' strength={0.4}>
							<Button
								size='lg'
								variant='outline'
								className='w-full xs:w-auto'
								onClick={() => scrollToSection('contact')}>
								{translate('hero.cta.contact')}
							</Button>
						</MagneticButton>
					</motion.div>
				</motion.div>

				<motion.div
					variants={fadeInRight}
					initial='hidden'
					animate='visible'
					className='order-1 flex w-full min-w-0 justify-center md:order-2'>
					<ParallaxLayer speed={0.25} className='w-full'>
						<HeroCleanProfile
							src={personalInfo.profileImage}
							alt={personalInfo.name}
							reducedMotion={reducedMotion}
							priority
						/>
					</ParallaxLayer>
				</motion.div>
			</motion.div>
		</section>
	);
}

// OPTIMIZATION: Memoize to prevent re-renders when parent updates but props don't change
export const HeroSection = memo(HeroSectionComponent)
