'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface PremiumTextRevealProps {
	text: string
	className?: string
	delay?: number
	revealType?: 'word' | 'letter'
	duration?: number
	staggerDistance?: number
}

/**
 * Premium Text Reveal Component
 * Reveals text word-by-word with premium animation
 */
export function PremiumTextReveal({
	text,
	className = '',
	delay = 0,
	revealType = 'word',
	duration = 0.6,
	staggerDistance = 0.08,
}: PremiumTextRevealProps) {
	const words = useMemo(() => text.split(' '), [text])

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: staggerDistance,
				delayChildren: delay,
			},
		},
	}

	const itemVariants = {
		hidden: {
			opacity: 0,
			y: 20,
			filter: 'blur(8px)',
		},
		visible: {
			opacity: 1,
			y: 0,
			filter: 'blur(0px)',
			transition: {
				duration,
				ease: [0.34, 1.56, 0.64, 1],
			},
		},
	}

	return (
		<motion.div
			className={className}
			variants={containerVariants}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: false, amount: 0.5 }}>
			{revealType === 'word' ? (
				words.map((word, i) => (
					<motion.span key={`${text}-${i}-${word}`} variants={itemVariants} className='inline-block'>
						{word}
						{i < words.length - 1 && <span>&nbsp;</span>}
					</motion.span>
				))
			) : (
				<motion.span variants={itemVariants}>{text}</motion.span>
			)}
		</motion.div>
	)
}

interface PremiumGlowTextProps {
	text: string
	className?: string
	delay?: number
	glowColor?: string
}

/**
 * Premium Glow Text Component
 * Text with animated glow effect
 */
export function PremiumGlowText({
	text,
	className = '',
	delay = 0,
	glowColor = 'rgb(var(--accent-primary))',
}: PremiumGlowTextProps) {
	const glowVariants = {
		hidden: {
			opacity: 0,
			textShadow: `0 0 0px ${glowColor}`,
		},
		visible: {
			opacity: 1,
			textShadow: [
				`0 0 10px ${glowColor}`,
				`0 0 20px ${glowColor}`,
				`0 0 10px ${glowColor}`,
			],
			transition: {
				delay,
				duration: 1.5,
				repeat: Infinity,
				ease: 'easeInOut',
			},
		},
	}

	return (
		<motion.h2
			className={className}
			variants={glowVariants}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: false, amount: 0.5 }}>
			{text}
		</motion.h2>
	)
}

interface PremiumDescriptionRevealProps {
	text: string
	className?: string
	delay?: number
}

/**
 * Premium Description Reveal Component
 * Smooth fade and blur-to-clear effect for descriptions
 */
export function PremiumDescriptionReveal({
	text,
	className = '',
	delay = 0.2,
}: PremiumDescriptionRevealProps) {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
				delayChildren: delay,
			},
		},
	}

	const charVariants = {
		hidden: {
			opacity: 0,
			filter: 'blur(8px)',
		},
		visible: {
			opacity: 1,
			filter: 'blur(0px)',
			transition: {
				duration: 0.5,
				ease: 'easeOut',
			},
		},
	}

	const chars = text.split('')

	return (
		<motion.p
			className={className}
			variants={containerVariants}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: false, amount: 0.5 }}>
			{chars.map((char, i) => (
				<motion.span key={`${text}-${i}-${char}`} variants={charVariants}>
					{char}
				</motion.span>
			))}
		</motion.p>
	)
}
