'use client';

import { useState, memo, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/shared/section-heading';
import { photoshopGallery, type PhotoshopGalleryItem } from '@/config/portfolio';
import { useLanguage } from '@/hooks/use-language';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface PhotoshopSectionProps {
	onProjectSelect?: (project: PhotoshopGalleryItem) => void;
}

function PhotoshopSectionComponent({ onProjectSelect }: PhotoshopSectionProps) {
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const { translate } = useLanguage();
	const reducedMotion = useReducedMotion();

	const galleryImages = useMemo(() => photoshopGallery, []);

	// OPTIMIZATION: useCallback to prevent re-renders
	const handleMouseEnter = useCallback((id: string) => {
		setHoveredId(id);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setHoveredId(null);
	}, []);

	const handleProjectSelect = useCallback((project: PhotoshopGalleryItem) => {
		onProjectSelect?.(project);
	}, [onProjectSelect]);

	return (
		<motion.section
			id='photoshop'
			className='section-surface section-surface-alt relative w-full overflow-hidden section-spacing'
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, amount: 0.2 }}>
			{/* Ambient background effects - reduced blur on mobile */}
			<div className='pointer-events-none absolute inset-0 overflow-hidden'>
				<motion.div
					className='absolute right-1/3 top-40 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,45,45,0.22),transparent_50%)] blur-3xl opacity-75'
					style={{ willChange: 'transform, opacity' }}
					animate={reducedMotion ? undefined : {
						y: [0, -20, 0],
						opacity: [0.75, 0.85, 0.75],
					}}
					transition={{
						duration: 8,
						ease: 'easeInOut',
						repeat: Infinity,
					}}
				/>
			</div>

			<div className='section-container relative z-10'>
				<SectionHeading
					title={translate('photoshop.title')}
				/>

				{/* Masonry Gallery - No Fixed Aspect Ratios */}
				<motion.div
					className='mx-auto max-w-[1400px]'
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.1 }}
					variants={{
						hidden: { opacity: 0 },
						visible: {
							opacity: 1,
							transition: {
								staggerChildren: 0.05,
								delayChildren: 0.1,
							},
						},
					}}>
					<div className='columns-1 gap-6 sm:columns-2 lg:columns-3 2xl:columns-4'>
						{galleryImages.map((item, idx) => (
							<motion.button
								type='button'
								key={item.id}
								onClick={() => handleProjectSelect(item)}
								onMouseEnter={() => handleMouseEnter(item.id)}
								onMouseLeave={handleMouseLeave}
								whileHover={reducedMotion ? {} : { y: -6, scale: 1.03 }}
								whileTap={reducedMotion ? {} : { scale: 0.98 }}
								variants={{
									hidden: { opacity: 0, y: 32, scale: 0.96, filter: 'blur(20px)' },
									visible: {
										opacity: 1,
										y: 0,
										scale: 1,
										filter: 'blur(0px)',
										transition: {
											duration: 0.65,
											ease: [0.22, 1, 0.36, 1],
										},
									},
								}}
								className='group mb-6 w-full overflow-hidden rounded-[20px] border border-white/10 bg-[#050505]/95 shadow-[0_24px_72px_rgba(255,16,16,0.18)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] break-inside-avoid hover:border-white/20 hover:shadow-[0_32px_90px_rgba(255,45,45,0.25)]'>
								<div className='relative w-full overflow-hidden rounded-[20px]'>
									<motion.div
										layoutId={`gallery-image-${item.id}`}
										className='relative w-full overflow-hidden rounded-[20px]'
										style={{ aspectRatio: 'auto', willChange: 'transform' }}>
										<Image
											src={item.image}
											alt={item.title}
											width={600}
											height={600}
											className='w-full h-auto object-contain'
											sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
											quality={idx < 3 ? 85 : 75}
											priority={idx < 3}
											loading={idx < 3 ? 'eager' : 'lazy'}
										/>
										{/* Gradient Overlay */}
										<div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent' />

										{/* Hover Glow Effect - skipped if reduced motion */}
										{!reducedMotion && (
											<motion.div
												className='absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100'
												animate={{
													opacity: hoveredId === item.id ? 1 : 0,
												}}>
												<div className='absolute inset-0 bg-[radial-gradient(circle,rgba(255,10,10,0.16),transparent_40%)]' />
											</motion.div>
										)}
									</motion.div>
								</div>
							</motion.button>
						))}
					</div>
				</motion.div>
			</div>
		</motion.section>
	);
}

// OPTIMIZATION: Memoize to prevent re-renders
export const PhotoshopSection = memo(PhotoshopSectionComponent)
