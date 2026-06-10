'use client';

import type { Locale } from '@/config/portfolio'
import { localeLabels } from '@/lib/i18n/translations'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { memo, useEffect, useRef, useState } from 'react'

interface LanguageDropdownProps {
	currentLocale: Locale;
	locales: Locale[];
	onLocaleChange: (locale: Locale) => void;
	className?: string;
}

function LanguageDropdownComponent({ currentLocale, locales, onLocaleChange, className = '' }: LanguageDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isOpen]);

	// Close on Escape key
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsOpen(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isOpen]);

	const handleLocaleSelect = (locale: Locale) => {
		onLocaleChange(locale);
		setIsOpen(false);
	};

	// Premium animation variants
	const dropdownVariants = {
		hidden: {
			opacity: 0,
			scale: 0.92,
			y: -8,
			pointerEvents: 'none' as const,
		},
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			pointerEvents: 'auto' as const,
			transition: {
				duration: 0.25,
				ease: [0.22, 1, 0.36, 1],
				type: 'spring',
				stiffness: 400,
				damping: 30,
			},
		},
		exit: {
			opacity: 0,
			scale: 0.92,
			y: -8,
			pointerEvents: 'none' as const,
			transition: {
				duration: 0.15,
				ease: [0.22, 1, 0.36, 1],
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, x: -4 },
		visible: (i: number) => ({
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.15,
				delay: i * 0.04,
				ease: 'easeOut',
			},
		}),
	};

	// Breathing glow animation
	const breathingVariants = {
		idle: {
			boxShadow: [
				'0 0 0px rgba(var(--accent-primary), 0)',
				'0 0 8px rgba(var(--accent-primary), 0.3)',
				'0 0 0px rgba(var(--accent-primary), 0)',
			],
			transition: {
				duration: 3,
				repeat: Infinity,
				ease: 'easeInOut',
			},
		},
		hover: {
			boxShadow: '0 0 16px rgba(var(--accent-primary), 0.5)',
		},
	};

	return (
		<div
			ref={dropdownRef}
			className={cn('relative', className)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			{/* Animated premium border glow background */}
			<motion.div
				className='absolute inset-0 rounded-lg -z-10 opacity-0'
				animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
				transition={{ duration: 0.3 }}
				style={{
					background: 'radial-gradient(circle at 50% 50%, rgba(var(--accent-primary), 0.1), transparent)',
					filter: 'blur(12px)',
				}}
			/>

			{/* Dropdown Button */}
			<motion.button
				onClick={() => setIsOpen(!isOpen)}
				className='relative flex items-center gap-1.5 rounded-lg surface-chip px-3 py-1.5 text-xs font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent-primary))]'
				animate={isHovered ? 'hover' : 'idle'}
				variants={breathingVariants}
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				aria-haspopup='listbox'
				aria-expanded={isOpen}
				aria-label='Select language'>
				{/* Border glow effect */}
				<motion.div
					className='absolute inset-0 rounded-lg border border-[rgb(var(--accent-primary))]'
					animate={{
						opacity: isOpen || isHovered ? [0.3, 0.6, 0.3] : 0,
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: 'easeInOut',
					}}
					style={{ pointerEvents: 'none' }}
				/>

				<span className='relative tracking-tight'>{localeLabels[currentLocale]}</span>
				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
					className='relative flex items-center justify-center'>
					<ChevronDown className='h-3.5 w-3.5' />
				</motion.div>
			</motion.button>

			{/* Dropdown Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial='hidden'
						animate='visible'
						exit='exit'
						variants={dropdownVariants}
						className='absolute top-full right-0 z-50 mt-2 w-40 rounded-lg glass-card border border-[var(--border-subtle)] overflow-hidden'
						style={{
							boxShadow: '0 16px 40px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.1)',
						}}
						role='listbox'>
						<motion.div className='flex flex-col gap-0.5 p-2'>
							{locales.map((locale, index) => (
								<motion.button
									key={locale}
									custom={index}
									initial='hidden'
									animate='visible'
									variants={itemVariants}
									onClick={() => handleLocaleSelect(locale)}
									className={cn(
										'flex items-center gap-3 rounded-md px-3 py-2.5 text-xs font-medium transition-all duration-250 cursor-pointer relative group',
										locale === currentLocale
											? 'bg-accent-primary/15 text-accent-primary'
											: 'text-primary-content',
									)}
									role='option'
									aria-selected={locale === currentLocale}
									whileHover={{ x: 4 }}
									layout>
									{/* Hover background glow */}
									<motion.div
										className='absolute inset-0 rounded-md bg-gradient-to-r from-accent-primary/0 via-accent-primary/5 to-accent-primary/0 -z-10'
										animate={{
											opacity: [0, 0.6, 0],
										}}
										transition={{
											duration: 2,
											repeat: Infinity,
											delay: index * 0.1,
										}}
									/>

									<span className='flex-1 text-left tracking-tight relative z-10'>
										{localeLabels[locale]}
									</span>
									<AnimatePresence mode='wait'>
										{locale === currentLocale && (
											<motion.div
												key='check-icon'
												initial={{ opacity: 0, scale: 0.6, rotate: -180 }}
												animate={{ opacity: 1, scale: 1, rotate: 0 }}
												exit={{ opacity: 0, scale: 0.6, rotate: 180 }}
												transition={{ duration: 0.2 }}
												className='flex items-center justify-center relative z-10'>
												<motion.div
													animate={{
														boxShadow: ['0 0 0px rgba(var(--accent-primary), 0)', '0 0 8px rgba(var(--accent-primary), 0.5)', '0 0 0px rgba(var(--accent-primary), 0)'],
													}}
													transition={{
														duration: 2,
														repeat: Infinity,
														ease: 'easeInOut',
													}}>
													<Check className='h-4 w-4' />
												</motion.div>
											</motion.div>
										)}
									</AnimatePresence>
								</motion.button>
							))}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

// OPTIMIZATION: Memoize to prevent re-renders when parent updates
export const LanguageDropdown = memo(LanguageDropdownComponent);
