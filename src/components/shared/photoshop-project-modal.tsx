'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X, Maximize2, Minimize2 } from 'lucide-react';

import { type PhotoshopGalleryItem } from '@/config/portfolio';

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
	const [mounted, setMounted] = useState(false);

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

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	if (!mounted || !project) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/80"
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
						className="relative z-20 flex items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0b0b]/90 shadow-[0_32px_120px_rgba(255,0,0,0.24)] p-4 md:p-8"
						style={{
							maxWidth: '90vw',
							maxHeight: '90vh',
						}}
						variants={contentVariants}
						layoutId={`gallery-image-${project.id}`}
						transition={{ type: 'spring', stiffness: 120, damping: 18 }}
						onClick={(e) => e.stopPropagation()}>
						{/* Image Container - Flex layout for centering */}
						<div className="relative w-full h-full flex items-center justify-center overflow-hidden">
							<Image
								src={project.image}
								alt={project.title}
								width={1200}
								height={1200}
								className="w-auto h-auto object-contain"
								style={{
									maxWidth: '90vw',
									maxHeight: '90vh',
								}}
								sizes="90vw"
								quality={90}
								priority
							/>

							{/* Header with Controls */}
							<div className="absolute inset-x-0 top-0 flex justify-end items-center p-4 z-10 bg-gradient-to-b from-black/60 to-transparent">
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
										title={isMaximized ? 'Minimize' : 'Maximize'}
										aria-label={isMaximized ? 'Minimize' : 'Maximize'}>
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
										title="Close (ESC)"
										aria-label="Close">
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
