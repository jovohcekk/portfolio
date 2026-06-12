'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { SectionHeading } from '@/components/shared/section-heading';
import { useLanguage } from '@/hooks/use-language';
import { photoshopGallery, type PhotoshopGalleryItem } from '@/config/portfolio';

interface PhotoshopGallerySectionProps {
	onImageSelect: (item: PhotoshopGalleryItem) => void;
}

const sizeClasses = {
	portrait: 'aspect-[4/5]',
	square: 'aspect-square',
	landscape: 'aspect-[16/9]',
};

export function PhotoshopGallerySection({ onImageSelect }: PhotoshopGallerySectionProps) {
	const { translate } = useLanguage();
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	return (
		<motion.section
			id="photoshop"
			className="section-surface section-surface-alt relative w-full overflow-hidden section-spacing"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}>
			{/* Ambient background effects */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute right-1/3 top-40 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,45,45,0.22),transparent_50%)] blur-3xl opacity-75"
					animate={{
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

			<div className="section-container relative z-10">
				{/* Section Header */}
				<motion.div
					className="mx-auto max-w-3xl text-center mb-16"
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
					<p className="text-xs md:text-sm font-semibold uppercase tracking-[0.4em] text-red-300/80 mb-4">
						{translate('photoshop.title')}
					</p>
					<h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
						{translate('photoshop.subtitle')}
					</h2>
					<p className="text-base md:text-lg leading-8 text-slate-300">
						{translate('photoshop.description')}
					</p>
				</motion.div>

				{/* Masonry Gallery */}
				<motion.div
					className="mx-auto max-w-[1400px]"
					initial="hidden"
					whileInView="visible"
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
					<div className="columns-1 gap-6 sm:columns-2 xl:columns-3 2xl:columns-4">
						{photoshopGallery.map((item, idx) => (
							<motion.button
								type="button"
								key={item.id}
								onClick={() => onImageSelect(item)}
								onMouseEnter={() => setHoveredId(item.id)}
								onMouseLeave={() => setHoveredId(null)}
								whileHover={{ y: -6, scale: 1.03 }}
								whileTap={{ scale: 0.98 }}
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
								className={`group mb-6 w-full overflow-hidden rounded-[20px] border border-white/10 bg-[#050505]/95 shadow-[0_24px_72px_rgba(255,16,16,0.18)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] break-inside-avoid hover:border-white/20 hover:shadow-[0_32px_90px_rgba(255,45,45,0.25)] ${sizeClasses[item.display]}`}>
								<div className="relative h-full w-full overflow-hidden rounded-[20px]">
									<motion.div
										layoutId={`gallery-image-${item.id}`}
										className="relative h-full w-full overflow-hidden rounded-[20px]">
										<Image
											src={item.image}
											alt={item.title}
											fill
											className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
											sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
											quality={85}
											priority={idx < 3}
										/>
										{/* Gradient Overlay */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

										{/* Hover Glow Effect */}
										<motion.div
											className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
											animate={{
												opacity: hoveredId === item.id ? 1 : 0,
											}}>
											<div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,10,10,0.16),transparent_40%)]" />
										</motion.div>

										{/* Title Overlay */}
										<motion.div
											className="absolute inset-0 flex flex-col items-end justify-end p-5 md:p-6"
											initial={{ opacity: 0, y: 8 }}
											animate={{
												opacity: hoveredId === item.id ? 1 : 0,
												y: hoveredId === item.id ? 0 : 8,
											}}
											transition={{ duration: 0.3 }}>
											<div className="text-right">
												<p className="text-xs uppercase tracking-[0.3em] text-red-300/80 mb-2">
													{item.category}
												</p>
												<h3 className="text-lg md:text-xl font-bold text-white leading-tight">
													{item.title}
												</h3>
											</div>
										</motion.div>
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
