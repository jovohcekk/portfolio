'use client';

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectImageModalProps {
	isOpen: boolean;
	image: string;
	title: string;
	description?: string;
	technologies?: string[];
	onClose: () => void;
	projectId: string;
	projectIndex: number;
	projectCount: number;
	onPrevious: () => void;
	onNext: () => void;
}

export function ProjectImageModal({
	isOpen,
	image,
	title,
	description,
	technologies,
	onClose,
	projectId,
	projectIndex,
	projectCount,
	onPrevious,
	onNext,
}: ProjectImageModalProps) {
	const [isMaximized, setIsMaximized] = useState(false);

	// Handle escape key
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
				setIsMaximized(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		document.body.style.overflow = 'hidden';

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	useEffect(() => {
	if (isOpen) {
		setIsMaximized(false);
	}
	}, [isOpen]);

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
			setIsMaximized(false);
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						className='fixed inset-0 z-[199] bg-black/50'
						initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
						animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
						exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
						transition={{ duration: 0.25 }}
						onClick={handleBackdropClick}
						style={{
							backdropFilter: 'blur(20px)',
						}}
					/>

					{/* Modal Container */}
					<motion.div
						className='fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={handleBackdropClick}>
						{/* Modal Content */}
						<motion.div
							className={cn(
								'relative w-full h-full md:h-auto md:rounded-3xl overflow-hidden',
								'border border-[rgba(255,45,45,0.25)] bg-[rgba(10,10,10,0.9)]',
								'shadow-2xl',
								'flex flex-col',
								isMaximized ? 'md:max-w-[90vw] md:max-h-[90vh]' : 'md:max-w-4xl md:max-h-[85vh]',
							)}
							initial={{ scale: 0.85, opacity: 0, y: 20 }}
							animate={{ scale: 1, opacity: 1, y: 0 }}
							exit={{ scale: 0.85, opacity: 0, y: 20 }}
							transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
							{/* Header with Controls */}
							<div className='relative p-4 md:p-6 border-b border-[rgba(255,45,45,0.15)] flex items-center justify-between bg-gradient-to-b from-[rgba(20,20,20,0.8)] to-transparent'>
								<div className='flex-1 min-w-0'>
									<h2 className='text-lg md:text-xl font-bold text-white truncate'>{title}</h2>
									<div className='mt-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-gray-500'>
										<span>{projectIndex + 1} / {projectCount}</span>
										<span className='hidden sm:inline'>•</span>
										<span>{isMaximized ? 'Maximized' : 'Preview'}</span>
									</div>
									{description && <p className='text-xs md:text-sm text-gray-400 truncate mt-1'>{description}</p>}
								</div>

								{/* Buttons Container */}
								<div className='flex gap-2 md:gap-3 ml-4 flex-shrink-0'>
									{/* Maximize Button */}
									<motion.button
										onClick={() => setIsMaximized(!isMaximized)}
										className={cn(
											'p-2 rounded-lg transition-all duration-300',
											'border border-[rgba(255,45,45,0.3)] hover:border-[rgba(255,45,45,0.6)]',
											'bg-[rgba(255,45,45,0.05)] hover:bg-[rgba(255,45,45,0.1)]',
											'text-[rgba(255,45,45,0.7)] hover:text-[rgba(255,45,45,1)]',
										)}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										title={isMaximized ? 'Restore' : 'Maximize'}>
										{isMaximized ? (
											<Minimize2 className='w-5 h-5' />
										) : (
											<Maximize2 className='w-5 h-5' />
										)}
									</motion.button>

									{/* Close Button */}
									<motion.button
										onClick={() => {
											onClose();
											setIsMaximized(false);
										}}
										className={cn(
											'p-2 rounded-lg transition-all duration-300',
											'border border-[rgba(255,45,45,0.3)] hover:border-[rgba(255,45,45,0.6)]',
											'bg-[rgba(255,45,45,0.05)] hover:bg-[rgba(255,45,45,0.1)]',
											'text-[rgba(255,45,45,0.7)] hover:text-[rgba(255,45,45,1)]',
										)}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										title='Close (ESC)'>
										<X className='w-5 h-5' />
									</motion.button>
								</div>
							</div>

							{/* Image Container */}
							<motion.div
								className={cn(
									'flex-1 relative overflow-hidden flex items-center justify-center',
									'bg-gradient-to-br from-[rgba(20,20,20,0.5)] to-[rgba(5,5,5,0.8)]',
								)}
								layout>
									<div className='pointer-events-none absolute inset-0 flex items-center justify-between px-3 md:px-6'>
										<motion.button
											className={cn(
												'pointer-events-auto rounded-full p-2 transition-all duration-300',
												'border border-[rgba(255,45,45,0.22)] bg-[rgba(10,10,10,0.7)] text-[rgba(255,45,45,0.85)]',
												'hover:border-[rgba(255,45,45,0.4)] hover:bg-[rgba(255,45,45,0.12)]',
											)}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.95 }}
											onClick={onPrevious}
											disabled={projectCount <= 1}
											aria-label='Previous project'>
												<ChevronLeft className='w-5 h-5' />
											</motion.button>
										<motion.button
											className={cn(
												'pointer-events-auto rounded-full p-2 transition-all duration-300',
												'border border-[rgba(255,45,45,0.22)] bg-[rgba(10,10,10,0.7)] text-[rgba(255,45,45,0.85)]',
												'hover:border-[rgba(255,45,45,0.4)] hover:bg-[rgba(255,45,45,0.12)]',
											)}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.95 }}
											onClick={onNext}
											disabled={projectCount <= 1}
											aria-label='Next project'>
												<ChevronRight className='w-5 h-5' />
											</motion.button>
										</div>
								<motion.div
									className='relative w-full h-full flex items-center justify-center'
									layoutId={`project-image-${projectId}`}
									animate={{
										scale: isMaximized ? 1 : 1,
									}}
									transition={{ duration: 0.3 }}>
									<Image
										src={image}
										alt={title}
										fill
										className='object-contain'
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 90vw'
										quality={95}
										priority
									/>
								</motion.div>
							</motion.div>

							{/* Footer with Technologies */}
							{technologies && technologies.length > 0 && (
								<div className='px-4 md:px-6 py-4 border-t border-[rgba(255,45,45,0.15)] bg-gradient-to-t from-[rgba(20,20,20,0.8)] to-transparent'>
									<p className='text-xs md:text-sm text-gray-500 mb-2'>Technologies:</p>
									<div className='flex flex-wrap gap-2'>
										{technologies.map((tech, idx) => (
											<motion.span
												key={tech}
												className={cn(
													'px-2 py-1 rounded text-xs font-medium',
													'border border-[rgba(255,45,45,0.2)] bg-[rgba(255,45,45,0.05)]',
													'text-[rgba(255,45,45,0.8)]',
												)}
												initial={{ opacity: 0, scale: 0.9 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ delay: 0.2 + idx * 0.05 }}>
												{tech}
											</motion.span>
										))}
									</div>
								</div>
							)}
						</motion.div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
