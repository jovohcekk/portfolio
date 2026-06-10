'use client';

import { useIsDark } from '@/hooks/use-is-dark'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { floatAnimation, glowPulse } from '@/lib/animations'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { memo } from 'react'

interface FloatingShapesProps {
	variant?: 'default' | 'photoshop';
}

function FloatingShapesComponent({ variant = 'default' }: FloatingShapesProps) {
	const reducedMotion = useReducedMotion();
	const isDark = useIsDark();
	if (reducedMotion) return null;

	const isPhotoshop = variant === 'photoshop';

	return (
		<div className='pointer-events-none absolute inset-0 overflow-hidden' aria-hidden>
			<motion.div
				className={cn(
					'absolute -left-20 top-1/4 h-72 w-72 rounded-full blur-[100px]',
					isPhotoshop ? (isDark ? 'bg-red-500/10' : 'bg-blue-500/8') : 'glow-orb-primary',
				)}
				animate={glowPulse}
			/>
			<motion.div
				className={cn(
					'absolute -right-16 bottom-1/4 h-64 w-64 rounded-full blur-[90px]',
					isPhotoshop ? (isDark ? 'bg-red-600/8' : 'bg-cyan-500/6') : 'glow-orb-secondary',
				)}
				animate={{ ...glowPulse, transition: { ...glowPulse.transition, delay: 1.5 } }}
			/>
			<motion.div className='particle-dot absolute left-1/3 top-1/2 h-3 w-3 rounded-full' animate={floatAnimation(0)} />
			<motion.div
				className={cn(
					'absolute right-1/4 top-1/3 h-2 w-2 rounded-full',
					isPhotoshop ? (isDark ? 'bg-red-500/40' : 'bg-blue-400/25') : 'particle-dot',
				)}
				animate={floatAnimation(1.2)}
			/>
			<motion.div
				className='absolute bottom-1/3 left-1/4 h-4 w-4 rotate-45 border border-accent-soft'
				animate={floatAnimation(0.8)}
			/>
		</div>
	);
}

// OPTIMIZATION: Memoize to prevent re-renders when props haven't changed
export const FloatingShapes = memo(FloatingShapesComponent)
