'use client';

import { useIsDark } from '@/hooks/use-is-dark'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { floatAnimation, glowPulse } from '@/lib/animations'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { memo, useEffect, useState, useMemo } from 'react'

interface FloatingShapesProps {
	variant?: 'default' | 'photoshop';
}

function FloatingShapesComponent({ variant = 'default' }: FloatingShapesProps) {
	const reducedMotion = useReducedMotion();
	const isDark = useIsDark();
	const [mounted, setMounted] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		setMounted(true);
		setIsMobile(window.innerWidth < 768);
	}, []);

	// Memoize animation config to prevent recalculation
	const floatAnim1 = useMemo(() => floatAnimation(0), []);
	const floatAnim2 = useMemo(() => floatAnimation(1.2), []);
	const floatAnim3 = useMemo(() => floatAnimation(0.8), []);

	if (!mounted || reducedMotion) return null;

	const isPhotoshop = variant === 'photoshop';

	return (
		<div className='pointer-events-none absolute inset-0 overflow-hidden' aria-hidden>
			{/* Primary glow orb - optimized with transform3d and reduced blur for mobile */}
			<motion.div
				className={cn(
					'absolute -left-20 top-1/4 h-72 w-72 rounded-full',
					isMobile ? 'blur-[60px]' : 'blur-[100px]',
					isPhotoshop ? (isDark ? 'bg-red-500/10' : 'bg-blue-500/8') : 'glow-orb-primary',
				)}
				style={{ willChange: 'transform, opacity' }}
				animate={glowPulse}
			/>
			{/* Secondary glow orb - optimized for mobile */}
			<motion.div
				className={cn(
					'absolute -right-16 bottom-1/4 h-64 w-64 rounded-full',
					isMobile ? 'blur-[50px]' : 'blur-[90px]',
					isPhotoshop ? (isDark ? 'bg-red-600/8' : 'bg-cyan-500/6') : 'glow-orb-secondary',
				)}
				style={{ willChange: 'transform, opacity' }}
				animate={{ ...glowPulse, transition: { ...glowPulse.transition, delay: 1.5 } }}
			/>
			{/* Small particle - only on desktop */}
			{!isMobile && (
				<motion.div
					className='particle-dot absolute left-1/3 top-1/2 h-3 w-3 rounded-full'
					style={{ willChange: 'transform' }}
					animate={floatAnim1}
				/>
			)}
			{/* Secondary particle - only on desktop */}
			{!isMobile && (
				<motion.div
					className={cn(
						'absolute right-1/4 top-1/3 h-2 w-2 rounded-full',
						isPhotoshop ? (isDark ? 'bg-red-500/40' : 'bg-blue-400/25') : 'particle-dot',
					)}
					style={{ willChange: 'transform' }}
					animate={floatAnim2}
				/>
			)}
			{/* Rotating particle - only on desktop */}
			{!isMobile && (
				<motion.div
					className='absolute bottom-1/3 left-1/4 h-4 w-4 rotate-45 border border-accent-soft'
					style={{ willChange: 'transform' }}
					animate={floatAnim3}
				/>
			)}
		</div>
	);
}

// OPTIMIZATION: Memoize to prevent re-renders when props haven't changed
export const FloatingShapes = memo(FloatingShapesComponent)
