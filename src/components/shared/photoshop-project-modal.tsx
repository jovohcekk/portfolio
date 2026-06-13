'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X, Maximize2, Minimize2 } from 'lucide-react';

import { type PhotoshopGalleryItem } from '@/config/portfolio';
import { cn } from '@/lib/utils';

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
		backdropFilter: 'blur(24px)',
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
	// Handle escape key
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		document.body.style.overflow = 'hidden';

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	if (!project) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/80 p-4 md:p-8"
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={overlayVariants}
					onClick={handleBackdropClick}>
					{/* Backdrop Blur */}
					<motion.div
						className="absolute inset-0 bg-black/70"
						aria-hidden="true"
						variants={{
							hidden: { opacity: 0 },
							visible: { opacity: 1 },
							exit: { opacity: 0 },
						}}
						transition={{ duration: 0.3 }}
					/>

					{/* Modal Content - Image Only */}
					<motion.div
						className={cn(
							'relative z-20 overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0b0b]/90 shadow-[0_32px_120px_rgba(255,0,0,0.24)]',
							isMaximized
								? 'w-[90vw] max-w-[95vw] h-[90vh] max-h-[95vh]'
								: 'w-full max-w-[900px] h-auto'
						)}
						variants={contentVariants}
						layoutId={`gallery-image-${project.id}`}
						transition={{ type: 'spring', stiffness: 120, damping: 18 }}
						onClick={(e) => e.stopPropagation()}>
						{/* Image Container */}
						<div className={cn(
							'relative w-full',
							isMaximized ? 'h-full' : 'h-auto'
						)}>
							<Image
								src={project.image}
								alt={project.title}
								width={1200}
								height={1200}
								className={cn(
									'w-full object-contain',
									isMaximized ? 'h-full' : 'h-auto'
								)}
								sizes={isMaximized ? '90vw' : '(max-width: 768px) 100vw, 90vw'}
								quality={95}
								priority
							/>

							{/* Header with Controls */}
							<div className="absolute inset-x-0 top-0 flex justify-between items-center p-4 z-10 bg-gradient-to-b from-black/60 to-transparent">
								<div className="flex-1" />

								{/* Button Group */}
								<div className="flex gap-3">
									{/* Maximize Button */}
									<motion.button
										onClick={(e) => {
											e.stopPropagation();
											onToggleMaximize();
										}}
										className="rounded-full border border-white/20 bg-black/40 backdrop-blur-md p-2.5 text-white/90 transition-all duration-300 hover:border-red-400/70 hover:bg-red-500/10 hover:text-white"
										whileHover={{ scale: 1.08 }}
										whileTap={{ scale: 0.95 }}
										title={isMaximized ? 'Minimize' : 'Maximize'}>
										{isMaximized ? (
											<Minimize2 className="w-5 h-5" />
										) : (
											<Maximize2 className="w-5 h-5" />
										)}
									</motion.button>

									{/* Close Button */}
									<motion.button
										onClick={(e) => {
											e.stopPropagation();
											onClose();
										}}
										className="rounded-full border border-white/20 bg-black/40 backdrop-blur-md p-2.5 text-white/90 transition-all duration-300 hover:border-red-400/70 hover:bg-red-500/10 hover:text-white"
										whileHover={{ scale: 1.08 }}
										whileTap={{ scale: 0.95 }}
										title="Close (ESC)">
										<X className="w-5 h-5" />
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
