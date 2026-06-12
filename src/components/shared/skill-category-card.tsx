'use client';

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { memo } from 'react'

interface SkillCategoryCardProps {
	name: string;
	level: number;
	icon: LucideIcon;
	skillCount: number;
	onClick?: () => void;
	index: number;
}

function SkillCategoryCardComponent({ name, level, icon: Icon, skillCount, onClick, index }: SkillCategoryCardProps) {
	return (
		<motion.button
			onClick={onClick}
			initial={{ opacity: 0, y: 20, scale: 0.9 }}
			whileInView={{ opacity: 1, y: 0, scale: 1 }}
			transition={{
				duration: 0.6,
				ease: 'easeOut',
				delay: index * 0.08,
			}}
			viewport={{ once: true }}
			whileHover={{
				y: -12,
				scale: 1.05,
				boxShadow: '0 40px 100px rgba(255, 45, 45, 0.2)',
			}}
			whileTap={{ scale: 0.96 }}
			className='group relative h-full w-full rounded-2xl border border-accent-primary/20 bg-gradient-surface p-8 transition-all duration-300 hover:border-accent-primary/50 overflow-hidden'>
			{/* Glow Effect */}
			<motion.div
				className='absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-primary/5 via-transparent to-accent-secondary/5 opacity-0 transition-opacity duration-300'
				whileHover={{ opacity: 1 }}
			/>

			{/* Animated Background Gradient */}
			<motion.div
				className='absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-accent-primary/0 via-accent-secondary/0 to-accent-primary/0 opacity-0 blur'
				animate={{
					backgroundPosition: ['0% 0%', '100% 100%'],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					repeatType: 'reverse',
				}}
				style={{ backgroundSize: '200% 200%' }}
				whileHover={{ opacity: 0.3 }}
			/>

			{/* Shine Effect */}
			<motion.div
				className='absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0'
				whileHover={{
					opacity: [0, 0.3, 0],
					x: [-1000, 1000],
				}}
				transition={{ duration: 0.6, ease: 'easeInOut' }}
				style={{ pointerEvents: 'none' }}
			/>

			<div className='relative z-10 flex flex-col gap-6'>
				{/* Icon */}
				<motion.div
					className='inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-primary/10 text-accent-primary transition-all duration-300 group-hover:bg-accent-primary/30 group-hover:shadow-lg relative overflow-hidden'
					whileHover={{
						scale: 1.15,
						rotate: 8,
						boxShadow: '0 0 30px rgba(255, 45, 45, 0.4)',
					}}
					animate={{
						y: [0, -5, 0],
					}}
					transition={{
						y: {
							duration: 4,
							repeat: Infinity,
							ease: 'easeInOut',
							delay: index * 0.2,
						},
						default: { type: 'spring', stiffness: 300, damping: 20 },
					}}>
					<Icon className='h-7 w-7' />
				</motion.div>

				{/* Content */}
				<div className='text-left'>
					<h3 className='mb-2 text-lg font-semibold text-foreground'>{name}</h3>
					<p className='text-sm text-muted-foreground'>{skillCount} skills</p>
				</div>

				{/* Level Display */}
				<div className='flex items-center justify-between'>
					<motion.span
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ delay: 0.2 }}
						className='text-3xl font-bold text-accent-primary'>
						{level}%
					</motion.span>
					<motion.span
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ delay: 0.25 }}
						className='text-xs font-semibold text-accent-primary/70 group-hover:text-accent-primary'>
						View Details
					</motion.span>
				</div>

				{/* Progress Bar */}
				<div className='h-2 overflow-hidden rounded-full bg-accent-primary/10'>
					<motion.div
						initial={{ width: 0 }}
						whileInView={{ width: `${level}%` }}
						transition={{
							duration: 0.8,
							ease: 'easeOut',
							delay: 0.1,
						}}
						viewport={{ once: true }}
						className='h-full rounded-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary shadow-lg'
					/>
				</div>

				{/* Hover Glow Line */}
				<motion.div
					className='h-1 rounded-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary opacity-0 blur-sm'
					whileHover={{ opacity: 0.6 }}
					transition={{ duration: 0.3 }}
				/>
			</div>
		</motion.button>
	);
}

export const SkillCategoryCard = memo(SkillCategoryCardComponent);
