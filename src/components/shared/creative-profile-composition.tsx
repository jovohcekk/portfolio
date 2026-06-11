'use client';

import { motion, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { memo, useEffect, useRef, useState } from 'react'

interface CreativeProfileCompositionProps {
	src: string;
	alt: string;
	priority?: boolean;
	reducedMotion?: boolean;
}

function CreativeProfileCompositionComponent({
	src,
	alt,
	priority = false,
	reducedMotion = false,
}: CreativeProfileCompositionProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [mounted, setMounted] = useState(false);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	useEffect(() => {
		setMounted(true);
		if (reducedMotion) return;

		const handleMouseMove = (e: MouseEvent) => {
			if (!containerRef.current) return;
			const rect = containerRef.current.getBoundingClientRect();
			mouseX.set(e.clientX - rect.left - rect.width / 2);
			mouseY.set(e.clientY - rect.top - rect.height / 2);
		};

		const handleMouseLeave = () => {
			// reset values so the 3D transform returns to neutral when cursor leaves
			mouseX.set(0);
			mouseY.set(0);
		};

		window.addEventListener('mousemove', handleMouseMove);
		const el = containerRef.current;
		el?.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			el?.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, [mouseX, mouseY, reducedMotion]);

	// Derive numeric rotation values (degrees) so Framer Motion composes transforms properly
	const rotateXDeg = useMotionValue(0);
	const rotateYDeg = useMotionValue(0);
	useEffect(() => {
		const unsubX = mouseY.onChange(v => rotateXDeg.set(v * 0.02));
		const unsubY = mouseX.onChange(v => rotateYDeg.set(v * -0.02));
		// ensure reset on mount
		rotateXDeg.set(0);
		rotateYDeg.set(0);
		return () => {
			unsubX();
			unsubY();
		};
	}, [mouseX, mouseY, rotateXDeg, rotateYDeg]);

	return (
		<div ref={containerRef} className='relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg'>
			{/* Background floating elements */}
			<div className='pointer-events-none absolute inset-0 -z-20 overflow-hidden'>
				{/* Large background glow */}
				<motion.div
					className='absolute -top-20 -right-20 h-96 w-96 rounded-full bg-gradient-to-br from-accent-primary/20 to-transparent blur-3xl'
					animate={
						reducedMotion
							? undefined
							: {
									scale: [1, 1.2, 1],
									opacity: [0.4, 0.6, 0.4],
								}
					}
					transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
				/>
				<motion.div
					className='absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-gradient-to-tr from-accent-secondary/15 to-transparent blur-3xl'
					animate={
						reducedMotion
							? undefined
							: {
									scale: [1.2, 1, 1.2],
									opacity: [0.3, 0.5, 0.3],
								}
					}
					transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
				/>
			</div>

			{/* Main 3D perspective container */}
			<motion.div
				style={
					reducedMotion
						? undefined
						: { perspective: 1200, rotateX: rotateXDeg, rotateY: rotateYDeg, willChange: 'transform' }
				}
				transition={{ type: 'spring', stiffness: 100, damping: 30 }}
				className='relative'>
				{/* Floating card stack effect - asymmetrical depth */}
				<div className='relative aspect-[4/5] w-full'>
					{/* Back layer - offset accent */}
					<motion.div
						className='absolute inset-0 -left-4 -top-4 rounded-3xl border border-accent-primary/20 bg-gradient-to-br from-accent-primary/5 to-transparent'
						animate={
							reducedMotion
								? undefined
								: {
										x: [-8, 0, -8],
										y: [8, 0, 8],
										rotate: [-1, 0, -1],
									}
						}
						transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
					/>

					{/* Middle layer - colored accent */}
					<motion.div
						className='absolute inset-0 -left-2 top-2 rounded-3xl border border-accent-secondary/15 bg-gradient-to-br from-accent-secondary/3 to-transparent'
						animate={
							reducedMotion
								? undefined
								: {
										x: [4, 0, 4],
										y: [-6, 0, -6],
										rotate: [0.5, 0, 0.5],
									}
						}
						transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
					/>

					{/* Main creative frame - geometric design */}
					<div className='absolute inset-0 rounded-3xl border-2 border-accent-primary/40 p-1'>
						{/* Inner geometric layer */}
						<div className='relative h-full w-full overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-accent-primary/5 via-background to-background'>
							{/* Dynamic light sweep effect on hover */}
							<motion.div
								className='absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0'
								whileHover={
									reducedMotion
										? undefined
										: {
												opacity: [0, 0.15, 0],
												x: [-100, 100],
											}
								}
								transition={{ duration: 0.6 }}
							/>

							{/* Image with mask effect */}
							<div className='relative h-full w-full overflow-hidden'>
								<motion.div
									initial={{ scale: 1 }}
									whileHover={reducedMotion ? undefined : { scale: 1.05 }}
									transition={{ duration: 0.5 }}
									className='h-full w-full'>
									<Image
										src={src}
										alt={alt}
										fill
										className='object-cover'
										priority={priority}
										sizes='(max-width: 640px) 300px, (max-width: 768px) 400px, 500px'
									/>
								</motion.div>
							</div>

							{/* Gradient overlay for depth */}
							<div className='absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40' />
						</div>

						{/* Animated border glow */}
						<motion.div
							className='absolute inset-0 rounded-3xl border-2 border-accent-primary/0 shadow-2xl'
							animate={
								reducedMotion
									? undefined
									: {
											boxShadow: [
												'0 0 20px rgba(var(--accent-primary), 0.2)',
												'0 0 40px rgba(var(--accent-primary), 0.4)',
												'0 0 20px rgba(var(--accent-primary), 0.2)',
											],
										}
							}
							transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
						/>
					</div>
				</div>

				{/* Floating accent elements - geometric shapes */}
				<motion.div
					className='absolute -top-8 -right-8 h-24 w-24 rounded-full border-2 border-accent-primary/30 bg-gradient-to-br from-accent-primary/10 to-transparent'
					animate={
						reducedMotion
							? undefined
							: {
									y: [-10, 10, -10],
									x: [10, -10, 10],
									rotate: [0, 360],
								}
					}
					transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
				/>

				<motion.div
					className='absolute -bottom-6 -left-10 h-32 w-32 rounded-2xl border-2 border-accent-secondary/25 bg-gradient-to-tr from-accent-secondary/5 to-transparent'
					animate={
						reducedMotion
							? undefined
							: {
									y: [10, -10, 10],
									x: [-10, 10, -10],
									rotate: [0, -360],
								}
					}
					transition={{ duration: 10, repeat: Infinity, ease: 'linear', delay: 1 }}
				/>

				{/* Animated accent line - diagonal */}
				<motion.svg
					className='absolute right-0 top-1/3 -z-10 h-40 w-40 overflow-visible'
					viewBox='0 0 100 100'
					preserveAspectRatio='none'>
					<motion.path
						d='M 0 50 Q 50 30 100 50'
						fill='none'
						stroke='currentColor'
						strokeWidth='1.5'
						className='text-accent-primary'
						strokeOpacity='0.3'
						animate={
							reducedMotion
								? undefined
								: {
										strokeOpacity: [0.2, 0.5, 0.2],
										pathLength: [0, 1, 0],
									}
						}
						transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
					/>
				</motion.svg>

				{/* Floating particles around image */}
				{[...Array(3)].map((_, i) => (
					<motion.div
						key={i}
						className='absolute h-1 w-1 rounded-full bg-accent-primary/40'
						animate={
							reducedMotion
								? undefined
								: {
										x: [0, Math.cos((i * Math.PI * 2) / 3) * 80, 0],
										y: [0, Math.sin((i * Math.PI * 2) / 3) * 80, 0],
										opacity: [0, 1, 0],
									}
						}
						transition={{
							duration: 5,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: i * 0.3,
						}}
						style={{
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
						}}
					/>
				))}
			</motion.div>

			{/* Bottom accent element - tech style */}
			<motion.div
				className='mt-8 flex justify-center gap-2'
				initial={{ opacity: 0 }}
				animate={mounted ? { opacity: 1 } : { opacity: 0 }}
				transition={{ delay: 0.5, duration: 0.8 }}>
				<div className='h-1 w-16 bg-gradient-to-r from-accent-primary/30 to-transparent rounded-full' />
				<div className='h-1 w-1 rounded-full bg-accent-primary' />
				<div className='h-1 w-16 bg-gradient-to-l from-accent-primary/30 to-transparent rounded-full' />
			</motion.div>
		</div>
	);
}

export const CreativeProfileComposition = memo(CreativeProfileCompositionComponent);
