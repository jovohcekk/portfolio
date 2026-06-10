'use client';

import { motion } from 'framer-motion'
import Image from 'next/image'
import { memo, useState } from 'react'

interface PremiumProfileFrameProps {
	src: string;
	alt: string;
	name: string;
	reducedMotion?: boolean;
	onError?: () => void;
	priority?: boolean;
}

function PremiumProfileFrameComponent({
	src,
	alt,
	name,
	reducedMotion = false,
	onError,
	priority = true,
}: PremiumProfileFrameProps) {
	const [profileError, setProfileError] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const handleError = () => {
		setProfileError(true);
		onError?.();
	};

	return (
		<div className='relative w-full max-w-[16rem] xs:max-w-[18rem] sm-min:max-w-[20rem] md:max-w-none'>
			{/* Animated background glow layers */}
			<motion.div
				className='absolute -inset-6 rounded-full bg-gradient-animated opacity-20 blur-3xl md:-inset-8'
				animate={reducedMotion ? undefined : { scale: [1, 1.08, 1] }}
				transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
			/>

			{/* Secondary glow layer */}
			<motion.div
				className='absolute -inset-4 rounded-full bg-accent-primary/10 blur-2xl'
				animate={
					reducedMotion
						? undefined
						: {
								scale: [1, 1.05, 1],
								opacity: [0.15, 0.3, 0.15],
							}
				}
				transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
			/>

			{/* Outer premium frame border */}
			<motion.div
				className='absolute inset-0 rounded-3xl pointer-events-none'
				animate={
					reducedMotion
						? undefined
						: {
								boxShadow: [
									'0 0 0px rgba(var(--accent-primary), 0), inset 0 0 20px rgba(var(--accent-primary), 0.1)',
									'0 0 24px rgba(var(--accent-primary), 0.3), inset 0 0 30px rgba(var(--accent-primary), 0.15)',
									'0 0 0px rgba(var(--accent-primary), 0), inset 0 0 20px rgba(var(--accent-primary), 0.1)',
								],
							}
				}
				transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
			/>

			{/* Main image container with premium styling */}
			<motion.div
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				whileHover={
					reducedMotion
						? undefined
						: {
								scale: 1.04,
								rotateX: 5,
							}
				}
				transition={{ duration: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
				className='relative mx-auto aspect-square w-full max-w-[16rem] overflow-hidden xs:max-w-[18rem] sm-min:max-w-[20rem] md:h-80 md:w-80 md:max-w-[20rem] lg:h-96 lg:w-96 lg:max-w-[24rem]'
				style={{
					perspective: '1000px',
				}}>
				{/* Layered frame design with premium borders */}
				<div className='absolute inset-0 rounded-3xl border-2 border-accent-primary/60 backdrop-blur-sm' />
				<div className='absolute inset-1 rounded-2xl border border-accent-primary/30' />
				<div className='absolute inset-2 rounded-xl border border-accent-primary/10' />

				{/* Inner content container */}
				<div className='relative h-full w-full overflow-hidden rounded-3xl surface-media p-1'>
					{/* Floating light sweep effect on hover */}
					<motion.div
						className='absolute inset-0 z-10 pointer-events-none'
						animate={
							isHovered && !reducedMotion
								? {
										x: ['-100%', '100%'],
									}
								: undefined
						}
						transition={{ duration: 0.6, ease: 'easeInOut' }}
						style={{
							background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
						}}
					/>

					{/* Image content */}
					{!profileError ? (
						<Image
							src={src}
							alt={alt}
							fill
							className='object-cover'
							priority={priority}
							sizes='(max-width: 768px) 256px, 384px'
							onError={handleError}
						/>
					) : (
						<div className='absolute inset-0 flex items-center justify-center text-6xl font-bold text-accent'>
							{name
								.split(' ')
								.map(n => n[0])
								.join('')}
						</div>
					)}

					{/* Premium gradient overlay on top */}
					<motion.div
						className='absolute inset-0 z-20 pointer-events-none'
						animate={{
							backgroundImage: [
								'radial-gradient(circle at 50% 50%, rgba(var(--accent-primary), 0.05), transparent)',
								'radial-gradient(circle at 60% 40%, rgba(var(--accent-primary), 0.1), transparent)',
								'radial-gradient(circle at 50% 50%, rgba(var(--accent-primary), 0.05), transparent)',
							],
						}}
						transition={{
							duration: 5,
							repeat: Infinity,
							ease: 'easeInOut',
						}}
					/>
				</div>

				{/* Animated corner accents */}
				<motion.div
					className='absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent-primary rounded-tl-2xl'
					animate={
						reducedMotion
							? undefined
							: {
									opacity: [0.3, 0.6, 0.3],
									scale: [1, 1.1, 1],
								}
					}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
				/>
				<motion.div
					className='absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent-primary rounded-tr-2xl'
					animate={
						reducedMotion
							? undefined
							: {
									opacity: [0.2, 0.5, 0.2],
									scale: [1, 1.1, 1],
								}
					}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 1,
					}}
				/>
				<motion.div
					className='absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent-primary rounded-bl-2xl'
					animate={
						reducedMotion
							? undefined
							: {
									opacity: [0.2, 0.5, 0.2],
									scale: [1, 1.1, 1],
								}
					}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 2,
					}}
				/>
				<motion.div
					className='absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent-primary rounded-br-2xl'
					animate={
						reducedMotion
							? undefined
							: {
									opacity: [0.3, 0.6, 0.3],
									scale: [1, 1.1, 1],
								}
					}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: 'easeInOut',
						delay: 3,
					}}
				/>
			</motion.div>

			{/* Premium floating glow on hover */}
			{isHovered && !reducedMotion && (
				<motion.div
					className='absolute -inset-3 rounded-3xl bg-gradient-to-r from-accent-primary/20 via-transparent to-accent-primary/20 blur-xl pointer-events-none'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				/>
			)}
		</div>
	);
}

// OPTIMIZATION: Memoize to prevent unnecessary re-renders
export const PremiumProfileFrame = memo(PremiumProfileFrameComponent);
