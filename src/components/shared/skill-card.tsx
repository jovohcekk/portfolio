'use client';

import { motion } from 'framer-motion';
import type { StaticImageData } from 'next/image';
import { memo } from 'react';

interface SkillCardProps {
	name: string;
	level: number;
	category: string;
	iconPath: string | StaticImageData;
}

export function SkillCardComponent({ name, level, category, iconPath }: SkillCardProps) {
	const iconSrc = typeof iconPath === 'string' ? iconPath : iconPath.src;

	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			whileHover={{ scale: 1.04 }}
			transition={{ type: 'spring', stiffness: 280, damping: 20 }}
			className='group relative flex min-w-0 flex-col items-center gap-2 rounded-xl border border-white/6 bg-gradient-to-br from-white/3 via-white/2 to-transparent p-3 shadow-sm backdrop-blur-md sm:gap-4 sm:rounded-2xl sm:p-5'
			style={{
				boxShadow: '0 6px 24px rgba(0,0,0,0.45), 0 0 30px rgba(0,229,255,0.06)',
			}}>
			<div className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-black/20 p-2 sm:h-16 sm:w-16 sm:p-3'>
				<img src={iconSrc} alt={`${name} icon`} className='h-7 w-7 object-contain sm:h-10 sm:w-10' />
			</div>

			<h4 className='w-full min-w-0 break-words text-center text-xs font-semibold text-[var(--text-primary)] sm:text-sm'>
				{name}
			</h4>

			{/* Progress */}
			<div className='w-full'>
				<div className='relative w-full'>
					<div
						className='relative h-2 w-full overflow-hidden rounded-full bg-white/10 opacity-0 transition-all duration-200 ease-out group-hover:scale-[1.01] group-hover:opacity-100 sm:h-3'
						style={{
							transformOrigin: 'center',
							willChange: 'transform, opacity',
						}}>
						<div
							className='h-full rounded-full transition-all duration-300 ease-out'
							style={{
								width: `${level}%`,
								background: '#EF4444',
								boxShadow: '0 6px 18px rgba(239,68,68,0.18)',
							}}
						/>
						<div className='absolute inset-0 flex items-center justify-center text-[9px] font-semibold text-black sm:text-[10px]'>
							{level}%
						</div>
					</div>
				</div>
			</div>

			{/* Category tag */}
			<div className='mt-0.5 max-w-full rounded-full bg-white/4 px-2 py-0.5 text-[10px] font-medium text-[var(--text-secondary)] sm:mt-1 sm:px-3 sm:py-1 sm:text-xs'>
				{category}
			</div>
		</motion.div>
	);
}

export const SkillCard = memo(SkillCardComponent);
