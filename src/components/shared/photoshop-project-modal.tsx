'use client';

import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X, Maximize2, Minimize2 } from 'lucide-react';

import { type PhotoshopGalleryItem } from '@/config/portfolio';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface PhotoshopProjectModalProps {
	project: PhotoshopGalleryItem | null;
	isOpen: boolean;
	onClose: () => void;
	isMaximized: boolean;
	onToggleMaximize: () => void;
}

const overlayVariants = {
	hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
	visible: {
		opacity: 1,
		backdropFilter: 'blur(12px)',
		transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
	},
	exit: {
		opacity: 0,
		backdropFilter: 'blur(0px)',
		transition: { duration: 0.25, ease: 'easeOut' },
	},
};

const contentVariants = {
	hidden: { opacity: 0, scale: 0.94, y: 32 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
	},
	exit: {
		opacity: 0,
		scale: 0.94,
		y: 32,
		transition: { duration: 0.3, ease: 'easeOut' },
	},
};

export function PhotoshopProjectModal({
	project,
	isOpen,
	onClose,
	isMaximized,
	onToggleMaximize,
}: PhotoshopProjectModalProps) {
	const [mounted, setMounted] = useState(false);
	const reducedMotion = useReducedMotion();

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted || !isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		document.body.style.overflow = 'hidden';

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = '';
		};
	}, [isOpen, onClose, mounted]);

	const handleBackdropClick = useCallback((e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}, [onClose]);

	const handleMaximizeClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
		onToggleMaximize();
	}, [onToggleMaximize]);

	const handleCloseClick = useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
		onClose();
	}, [onClose]);

	if (!mounted || !project) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className='fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/80'
					initial='hidden'
					animate='visible'
					exit='exit'
					variants={overlayVariants}
					onClick={handleBackdropClick}>
					{/* Backdrop Blur */}
					<motion.div
						className='absolute inset-0 bg-black/70'
						aria-hidden='true'
						variants={{
							hidden: { opacity: 0 },
							visible: { opacity: 1 },
							exit: { opacity: 0 },
						}}
						transition={{ duration: 0.3 }}
						style={{ willChange: 'opacity' }}
					/>

					{/* Modal Content - Image Only */}
					<motion.div
						className='relative z-20 flex items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0b0b]/90 shadow-[0_32px_120px_rgba(255,0,0,0.24)] p-4 md:p-8'
						style={{
							maxWidth: '90vw',
							maxHeight: '90vh',
							willChange: 'transform, opacity',
						}}
						variants={contentVariants}
						layoutId={`gallery-image-${project.id}`}
						transition={reducedMotion ? {} : { type: 'spring', stiffness: 120, damping: 18 }}
						onClick={(e) => e.stopPropagation()}>
						{/* Image Container - Flex layout for centering */}
						<div className='relative w-full h-full flex items-center justify-center overflow-hidden'>
							<Image
								src={project.image}
								alt={project.title}
								width={1200}
								height={1200}
								className='w-auto h-auto object-contain'
								style={{
									maxWidth: '90vw',
									maxHeight: '90vh',
								}}
								sizes='90vw'
								quality={90}
								priority
								loading='eager'
							/>

							{/* Header with Controls */}
							<div className='absolute inset-x-0 top-0 flex justify-end items-center p-4 z-10 bg-gradient-to-b from-black/60 to-transparent'>
								{/* Button Group */}
								<div className='flex gap-3'>
									{/* Maximize Button */}
									<motion.button
										onClick={handleMaximizeClick}
										className='rounded-full border border-white/20 bg-black/40 backdrop-blur-md p-2.5 text-white/90 transition-all duration-300 hover:border-red-400/70 hover:bg-red-500/10 hover:text-white'
										whileHover={reducedMotion ? {} : { scale: 1.08 }}
										whileTap={reducedMotion ? {} : { scale: 0.95 }}
										title={isMaximized ? 'Minimize' : 'Maximize'}
										aria-label={isMaximized ? 'Minimize' : 'Maximize'}>
										{isMaximized ? (
											<Minimize2 className='w-5 h-5' />
										) : (
											<Maximize2 className='w-5 h-5' />
										)}
									</motion.button>

									{/* Close Button */}
									<motion.button
										onClick={handleCloseClick}
										className='rounded-full border border-white/20 bg-black/40 backdrop-blur-md p-2.5 text-white/90 transition-all duration-300 hover:border-red-400/70 hover:bg-red-500/10 hover:text-white'
										whileHover={reducedMotion ? {} : { scale: 1.08 }}
										whileTap={reducedMotion ? {} : { scale: 0.95 }}
										title='Close (ESC)'
										aria-label='Close'>
										<X className='w-5 h-5' />
									</motion.button>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}