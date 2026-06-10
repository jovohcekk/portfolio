'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Terminal, Palette, Shield, X } from 'lucide-react';
import { useEffect, useState, memo, useRef } from 'react';

interface Skill {
	name: string;
	level: number;
}

interface SkillCategoryModalProps {
	isOpen: boolean;
	category: string;
	skills: Skill[];
	onClose: () => void;
}

// Get category icon
const getCategoryIcon = (category: string) => {
	const icons: Record<string, React.ComponentType<{ className?: string }>> = {
		programming: Code,
		devTools: Database,
		linux: Terminal,
		creative: Palette,
		cybersecurity: Shield,
	};
	return icons[category] || Code;
};

function SkillCategoryModalComponent({ isOpen, category, skills, onClose }: SkillCategoryModalProps) {
	const [mounted, setMounted] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!isOpen) return;

		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		const handleClickOutside = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
				onClose();
			}
		};

		// Prevent scroll when modal is open
		document.body.style.overflow = 'hidden';

		window.addEventListener('keydown', handleEsc);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.body.style.overflow = 'unset';
			window.removeEventListener('keydown', handleEsc);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

	if (!mounted) return null;

	const CategoryIcon = getCategoryIcon(category);
	const isOddCount = skills.length % 2 === 1;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.25 }}
					className='fixed inset-0 z-50 flex items-center justify-center p-4'>
					{/* Premium Backdrop with Blur */}
					<motion.div
						initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
						animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
						exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
						transition={{ duration: 0.3 }}
						onClick={onClose}
						className='absolute inset-0 bg-black/50'
					/>

					{/* Premium Modal */}
					<motion.div
						ref={modalRef}
						initial={{ scale: 0.85, opacity: 0, y: 30 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.85, opacity: 0, y: 30 }}
						transition={{ duration: 0.4, ease: 'easeOut' }}
						className='relative z-10 w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-[24px] p-12'
						style={{
							background: 'rgba(10, 10, 10, 0.9)',
							backdropFilter: 'blur(20px)',
							border: '1px solid rgb(220, 38, 38, 0.3)',
							boxShadow: `
								0 0 0 1px rgba(220, 38, 38, 0.1) inset,
								0 0 60px rgba(220, 38, 38, 0.15),
								0 25px 50px -12px rgba(0, 0, 0, 0.8)
							`,
						}}>
						{/* Close Button - Premium Style */}
						<motion.button
							onClick={onClose}
							whileHover={{ scale: 1.1, rotate: 90 }}
							whileTap={{ scale: 0.95 }}
							transition={{ type: 'spring', stiffness: 400, damping: 20 }}
							className='absolute right-8 top-8 rounded-full p-2 text-gray-400 transition-all hover:text-red-500'
							style={{
								background: 'rgba(220, 38, 38, 0.05)',
								border: '1px solid rgba(220, 38, 38, 0.2)',
								boxShadow: 'inset 0 0 20px rgba(220, 38, 38, 0.05)',
							}}>
							<X className='h-6 w-6' />
						</motion.button>

						{/* Header Section */}
						<div className='mb-12'>
							<div className='mb-6 flex items-end gap-6'>
								<motion.div
									initial={{ scale: 0, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									transition={{ delay: 0.1, duration: 0.3 }}
									className='flex h-16 w-16 items-center justify-center rounded-2xl'
									style={{
										background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(220, 38, 38, 0.05))',
										border: '1px solid rgba(220, 38, 38, 0.2)',
										boxShadow: 'inset 0 0 20px rgba(220, 38, 38, 0.1)',
									}}>
									<CategoryIcon className='h-8 w-8 text-red-500' />
								</motion.div>

								<motion.h1
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.15, duration: 0.3 }}
									className='text-5xl font-bold text-white capitalize'>
									{category}
								</motion.h1>
							</div>

							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.2, duration: 0.3 }}
								className='text-gray-400'>
								{skills.length} {skills.length === 1 ? 'skill' : 'skills'} in this category
							</motion.p>
						</div>

						{/* Skills Grid - 2 Columns */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.25, duration: 0.3 }}
							className={`grid gap-8 ${isOddCount ? 'grid-cols-1 xs:grid-cols-2' : 'grid-cols-1 xs:grid-cols-2'}`}>
							{skills.map((skill, index) => (
								<PremiumSkillCard
									key={skill.name}
									skill={skill}
									index={index}
								/>
							))}
						</motion.div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

// Premium Skill Card Component
function PremiumSkillCard({ skill, index }: { skill: Skill; index: number }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.4,
				ease: 'easeOut',
				delay: 0.35 + index * 0.1,
			}}
			className='group rounded-[20px] p-8 transition-all duration-300'
			style={{
				background: 'rgba(30, 30, 30, 0.8)',
				border: '1px solid rgba(220, 38, 38, 0.2)',
				backdropFilter: 'blur(10px)',
				boxShadow: 'inset 0 0 20px rgba(220, 38, 38, 0.05), 0 8px 32px rgba(0, 0, 0, 0.3)',
			}}>
			{/* Icon Section */}
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				transition={{
					duration: 0.4,
					ease: 'easeOut',
					delay: 0.4 + index * 0.1,
				}}
				className='mb-6 flex h-14 w-14 items-center justify-center rounded-xl'
				style={{
					background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15), rgba(220, 38, 38, 0.05))',
					border: '1px solid rgba(220, 38, 38, 0.3)',
					boxShadow: 'inset 0 0 15px rgba(220, 38, 38, 0.1)',
				}}>
				<svg className='h-7 w-7' fill='currentColor' viewBox='0 0 20 20' style={{ color: '#dc2626' }}>
					<path
						fillRule='evenodd'
						d='M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z'
						clipRule='evenodd'
					/>
				</svg>
			</motion.div>

			{/* Content */}
			<div className='mb-6'>
				<motion.h3
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.45 + index * 0.1, duration: 0.3 }}
					className='text-xl font-semibold text-white mb-3'>
					{skill.name}
				</motion.h3>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
					className='flex items-baseline gap-2'>
					<span className='text-4xl font-bold text-red-500'>{skill.level}</span>
					<span className='text-gray-400'>%</span>
				</motion.div>
			</div>

			{/* Progress Bar */}
			<div className='h-2 overflow-hidden rounded-full' style={{ background: 'rgba(220, 38, 38, 0.1)' }}>
				<motion.div
					initial={{ width: 0 }}
					animate={{ width: `${skill.level}%` }}
					transition={{
						duration: 1.5,
						ease: 'easeOut',
						delay: 0.55 + index * 0.1,
					}}
					className='h-full rounded-full transition-all duration-500'
					style={{
						background: 'linear-gradient(90deg, #dc2626, #ef4444, #fca5a5)',
						boxShadow: 'inset 0 0 10px rgba(220, 38, 38, 0.5), 0 0 20px rgba(220, 38, 38, 0.3)',
					}}
				/>
			</div>
		</motion.div>
	);
}

export const SkillCategoryModal = memo(SkillCategoryModalComponent);
