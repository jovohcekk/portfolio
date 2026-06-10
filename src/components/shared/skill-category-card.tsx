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
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.5,
				ease: 'easeOut',
				delay: index * 0.05,
			}}
			viewport={{ once: true }}
			whileHover={{ y: -8, scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			className='group relative h-full w-full rounded-2xl border border-accent-primary/20 bg-gradient-surface p-8 transition-all duration-300 hover:border-accent-primary/40 hover:shadow-elevated'>
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

			<div className='relative z-10 flex flex-col gap-6'>
				{/* Icon */}
				<motion.div
					className='inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-all duration-300 group-hover:bg-accent-primary/20 group-hover:shadow-lg'
					whileHover={{ scale: 1.1, rotate: 5 }}
					transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
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
