'use client';

import { motion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';
import { useReducedMotionAnimation } from '@/hooks/use-viewport-animation';

interface PremiumAnimatedWrapperProps {
	children: ReactNode;
	variants?: Variants;
	index?: number;
	className?: string;
	staggerInterval?: number;
	viewportOptions?: {
		once?: boolean;
		margin?: string;
		amount?: 'some' | 'all';
	};
}

/**
 * Wrapper component for applying premium scroll animations with viewport detection
 * Handles motion preferences and performance optimization
 */
export function PremiumAnimatedWrapper({
	children,
	variants,
	index = 0,
	className = '',
	staggerInterval = 0.08,
	viewportOptions = { once: true, margin: '-80px' },
}: PremiumAnimatedWrapperProps) {
	const reduceMotion = useReducedMotionAnimation();

	const customVariants = variants || {
		hidden: { opacity: 0, y: 24, scale: 0.96 },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				duration: 0.6,
				ease: [0.22, 1, 0.36, 1],
				delay: index * staggerInterval,
			},
		},
	};

	return (
		<motion.div
			className={className}
			variants={customVariants}
			initial="hidden"
			whileInView="visible"
			viewport={viewportOptions}
			transition={{ type: 'spring', stiffness: 300, damping: 25 }}
			style={{ opacity: reduceMotion ? 1 : undefined }}>
			{children}
		</motion.div>
	);
}

/**
 * Stagger container for animating child elements with automatic delays
 */
interface StaggerContainerProps {
	children: ReactNode;
	staggerInterval?: number;
	delayChildren?: number;
	className?: string;
}

export function StaggerContainer({
	children,
	staggerInterval = 0.06,
	delayChildren = 0.1,
	className = '',
}: StaggerContainerProps) {
	return (
		<motion.div
			className={className}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: '-80px' }}
			variants={{
				hidden: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: {
						staggerChildren: staggerInterval,
						delayChildren,
					},
				},
			}}>
			{children}
		</motion.div>
	);
}
