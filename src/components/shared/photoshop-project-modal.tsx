'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { X, Maximize2, Minimize2 } from 'lucide-react';

import { type PhotoshopGalleryItem } from '@/config/portfolio';
import { useLanguage } from '@/hooks/use-language';
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

const infoPanelVariants = {
	hidden: { opacity: 0, x: 32 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
	},
	exit: {
		opacity: 0,
		x: 32,
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
	const { translate } = useLanguage();

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

					{/* Modal Content */}
					<motion.div
						className="relative z-20 flex w-full max-w-[1400px] flex-col gap-8 lg:flex-row lg:items-start"
						variants={contentVariants}
						onClick={(e) => e.stopPropagation()}>
						{/* Left Side: Image */}
						<motion.div
							className={cn(
								'relative mx-auto flex w-full overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0b0b]/90 shadow-[0_32px_120px_rgba(255,0,0,0.24)]',
								isMaximized ? 'h-[90vh] w-[90vw]' : 'min-h-[420px] lg:max-w-[780px]'
							)}
							layoutId={`gallery-image-${project.id}`}
							transition={{ type: 'spring', stiffness: 120, damping: 18 }}>
							{/* Image */}
							<Image
								src={project.image}
								alt={project.title}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 90vw"
								quality={95}
								priority
							/>

							{/* Image Gradient Overlay */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

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
						</motion.div>

						{/* Right Side: Info Panel */}
						<AnimatePresence>
							{!isMaximized && (
								<motion.div
									initial="hidden"
									animate="visible"
									exit="exit"
									variants={infoPanelVariants}
									className="flex-1 rounded-[24px] border border-white/10 bg-[#050505]/95 p-6 md:p-8 shadow-[0_32px_90px_rgba(255,20,20,0.15)] backdrop-blur-xl">
									{/* Category Badge */}
									<div className="inline-flex items-center px-3 py-1.5 rounded-full border border-red-400/25 bg-red-500/10 text-xs font-semibold uppercase tracking-[0.3em] text-red-300/90 mb-4">
										{project.category}
									</div>

									{/* Title */}
									<h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
										{project.title}
									</h2>

									{/* Meta Info */}
									<div className="flex items-center gap-3 text-sm text-slate-400 mb-6">
										<span className="font-medium">{project.year}</span>
										<span className="text-red-300/60">•</span>
										<span className="capitalize">{project.category}</span>
									</div>

									{/* Description */}
									<p className="text-base leading-8 text-slate-300 mb-8">
										{project.description}
									</p>

									{/* Tools Used */}
									<div className="mb-8">
										<p className="text-sm uppercase tracking-[0.28em] text-red-300/90 font-semibold mb-4">
											{translate('projects.modal.tools')}
										</p>
										<div className="flex flex-wrap gap-2">
											{project.tools.map((tool) => (
												<motion.span
													key={tool}
													className="inline-flex items-center px-3.5 py-2 rounded-full border border-white/10 bg-white/5 text-xs md:text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-200"
													whileHover={{ scale: 1.08, y: -2 }}>
													{tool}
												</motion.span>
											))}
										</div>
									</div>

									{/* Action Buttons */}
									<div className="flex flex-wrap gap-3">
										<motion.button
											className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-red-500/40 bg-red-500/15 text-sm font-semibold text-red-200 transition-all duration-300 hover:border-red-500/60 hover:bg-red-500/25 hover:shadow-[0_0_24px_rgba(255,45,45,0.3)]"
											whileHover={{ scale: 1.05, y: -2 }}
											whileTap={{ scale: 0.95 }}>
											{translate('projects.modal.viewDetails')}
										</motion.button>
										<motion.button
											className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-white/15 bg-white/8 text-sm font-semibold text-white transition-all duration-300 hover:border-red-400/50 hover:bg-red-500/12 hover:text-red-200 hover:shadow-[0_0_20px_rgba(255,45,45,0.25)]"
											whileHover={{ scale: 1.05, y: -2 }}
											whileTap={{ scale: 0.95 }}>
											{translate('projects.modal.livePreview')}
										</motion.button>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
