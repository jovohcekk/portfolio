'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { photoshopProjects, type PhotoshopProject } from '@/config/portfolio';
import { useLanguage } from '@/hooks/use-language';
import type { TranslationKey } from '@/lib/i18n/translations';
import { cn } from '@/lib/utils';

// ═════════════════════════════════════════════════════════════════════════
// FIXED GRID LAYOUT CONFIGURATION
// ═════════════════════════════════════════════════════════════════════════

interface GridItem extends PhotoshopProject {
	gridCol: number;
	gridRow: number;
	colSpan: number;
	rowSpan: number;
	aspectRatio?: number;
}

// Create fixed grid layout from portfolio projects
const createFixedGridLayout = (projects: PhotoshopProject[]): GridItem[] => {
	const layout: GridItem[] = [];
	let currentRow = 1;
	let currentCol = 1;

	projects.forEach((project) => {
		let colSpan = 1;
		let rowSpan = 1;

		if (project.category === 'poster') {
			colSpan = 2;
			rowSpan = 2;
		} else if (project.category === 'banner' || project.category === 'manipulation') {
			colSpan = 2;
			rowSpan = 1;
		} else if (project.category === 'artwork') {
			colSpan = 1;
			rowSpan = 2;
		}

		const aspectRatio = project.width && project.height ? project.width / project.height : undefined;

		const item: GridItem = {
			...project,
			gridCol: currentCol,
			gridRow: currentRow,
			colSpan,
			rowSpan,
			aspectRatio
		};

		layout.push(item);

		currentCol += colSpan;
		if (currentCol > 4) {
			currentCol = 1;
			currentRow += rowSpan;
		}
	});

	return layout;
};

const FIXED_GRID = createFixedGridLayout(photoshopProjects);

export function PhotoshopSection() {
	const { translate } = useLanguage();
	const [selectedCategory, setSelectedCategory] = useState<string>('all');

	const visibleProjects = selectedCategory === 'all'
		? FIXED_GRID
		: FIXED_GRID.filter(p => p.category === selectedCategory);

	const categories = [
		{
			id: 'all',
			label: translate('photoshop.filter.all'),
			emoji: '✨',
			count: FIXED_GRID.length
		},
		{
			id: 'poster',
			label: translate('photoshop.category.poster'),
			emoji: '📄',
			count: FIXED_GRID.filter(p => p.category === 'poster').length
		},
		{
			id: 'thumbnail',
			label: translate('photoshop.category.thumbnail'),
			emoji: '🎬',
			count: FIXED_GRID.filter(p => p.category === 'thumbnail').length
		},
		{
			id: 'social',
			label: translate('photoshop.category.social'),
			emoji: '📱',
			count: FIXED_GRID.filter(p => p.category === 'social').length
		},
		{
			id: 'banner',
			label: translate('photoshop.category.banner'),
			emoji: '🎨',
			count: FIXED_GRID.filter(p => p.category === 'banner').length
		},
		{
			id: 'manipulation',
			label: translate('photoshop.category.manipulation'),
			emoji: '🖼️',
			count: FIXED_GRID.filter(p => p.category === 'manipulation').length
		},
		{
			id: 'artwork',
			label: translate('photoshop.category.artwork'),
			emoji: '🌟',
			count: FIXED_GRID.filter(p => p.category === 'artwork').length
		}
	];

	return (
		<section id='photoshop' className='photoshop-section'>
			<div className='section-container'>
				{/* Header */}
				<motion.div
					className='section-header'
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
				>
					<div>
						<h2>{translate('photoshop.title')}</h2>
						<p>{translate('photoshop.subtitle')}</p>
					</div>
				</motion.div>

				{/* Category Filters */}
				<motion.div
					className='category-filters'
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.1 }}
					viewport={{ once: true }}
				>
					{categories.map((cat) => (
						<motion.button
							key={cat.id}
							className={cn(
								'filter-btn',
								selectedCategory === cat.id && 'active'
							)}
							onClick={() => setSelectedCategory(cat.id)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<span className='emoji'>{cat.emoji}</span>
							<span className='label'>{cat.label}</span>
							<span className='count'>({cat.count})</span>
						</motion.button>
					))}
				</motion.div>

				{/* Grid Gallery */}
				<motion.div
					className='grid-container'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.4 }}
				>
					<AnimatePresence mode='wait'>
						{visibleProjects.length > 0 ? (
							visibleProjects.map((project, idx) => (
								<motion.article
									key={project.id}
									className={cn(
										'grid-item',
										`col-span-${project.colSpan}`,
										`row-span-${project.rowSpan}`
									)}
									style={{
										gridColumn: `${project.gridCol} / span ${project.colSpan}`,
										gridRow: `${project.gridRow} / span ${project.rowSpan}`,
										aspectRatio: project.aspectRatio?.toString()
									}}
									initial={{ opacity: 0, scale: 0.95 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.95 }}
									transition={{
										duration: 0.4,
										delay: idx * 0.02
									}}
								>
									<div className='project-card'>
										{/* Image */}
										<div className='image-wrapper'>
											<Image
												src={project.image}
												alt={translate(project.titleKey as TranslationKey)}
												fill
												className='project-image'
												sizes={`
													(max-width: 640px) 100vw,
													(max-width: 1024px) 50vw,
													33vw
												`}
												quality={85}
												priority={idx < 3}
											/>
										</div>

										{/* Overlay */}
										<div className='overlay'>
											<div className='overlay-content'>
												{/* Category Badge */}
												<motion.span
													className='category-badge'
													initial={{ opacity: 0, y: 10 }}
													whileHover={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.3 }}
												>
													{translate(`photoshop.category.${project.category}` as TranslationKey)}
												</motion.span>

												{/* Content */}
												<motion.div
													className='content-box'
													initial={{ opacity: 0, y: 20 }}
													whileHover={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.3, delay: 0.05 }}
												>
													<h3 className='title'>
														{translate(project.titleKey as TranslationKey)}
													</h3>
													<p className='description'>
														{translate(project.descriptionKey as TranslationKey)}
													</p>

													{/* Gallery Indicator */}
													{project.gallery && project.gallery.length > 0 && (
														<div className='gallery-info'>
															<svg viewBox='0 0 24 24' className='icon'>
																<rect x='3' y='3' width='7' height='7' fill='currentColor' />
																<rect x='14' y='3' width='7' height='7' fill='currentColor' />
																<rect x='3' y='14' width='7' height='7' fill='currentColor' />
															</svg>
															<span>{project.gallery.length + 1} images</span>
														</div>
													)}

													{/* View Button */}
													<button className='view-btn'>
														<svg viewBox='0 0 24 24' className='icon'>
															<path d='M10 19l-7-7m0 0l7-7m-7 7h18' stroke='currentColor' strokeWidth='2' fill='none' />
														</svg>
														{translate('projects.demo')}
													</button>
												</motion.div>
											</div>
										</div>
									</div>
								</motion.article>
							))
						) : (
							<motion.div
								className='empty-state'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.4 }}
							>
								<p>No projects in this category</p>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</div>

			<style jsx>{`
				/* ═══════════════════════════════════════════════════════════ */
				/* COLOR PALETTE - PORTFOLIO EXACT MATCH */
				/* ═══════════════════════════════════════════════════════════ */

				:root {
					--bg-deep: #050505;
					--bg-primary: #0a0a0a;
					--bg-secondary: #111111;
					--text-primary: #ffffff;
					--text-secondary: #b0b0b0;
					--text-tertiary: #808080;
					--accent-red: #ff2d2d;
					--accent-red-dark: #cc0000;
					--accent-red-glow: rgba(255, 45, 45, 0.3);
					--accent-red-glow-strong: rgba(255, 45, 45, 0.6);
					--border-red: rgba(255, 45, 45, 0.25);
					--border-subtle: rgba(255, 255, 255, 0.05);
					--shadow-dark: rgba(0, 0, 0, 0.8);
				}

				/* ═══════════════════════════════════════════════════════════ */
				/* SECTION */
				/* ═══════════════════════════════════════════════════════════ */

				.photoshop-section {
					width: 100%;
					background: var(--bg-primary);
					padding: 80px 24px;
					position: relative;
					overflow: hidden;
				}

				.photoshop-section::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: radial-gradient(
						circle at 20% 50%,
						rgba(255, 45, 45, 0.03) 0%,
						transparent 50%
					);
					pointer-events: none;
				}

				.section-container {
					max-width: 1400px;
					margin: 0 auto;
					position: relative;
					z-index: 1;
				}

				/* ═══════════════════════════════════════════════════════════ */
				/* HEADER */
				/* ═══════════════════════════════════════════════════════════ */

				.section-header {
					margin-bottom: 60px;
				}

				.section-header h2 {
					font-size: clamp(32px, 5vw, 56px);
					font-weight: 800;
					color: var(--text-primary);
					margin-bottom: 12px;
					letter-spacing: -1.5px;
					line-height: 1.1;
				}

				.section-header p {
					font-size: 16px;
					color: var(--text-secondary);
					max-width: 550px;
					line-height: 1.6;
				}

				/* ═══════════════════════════════════════════════════════════ */
				/* FILTERS */
				/* ═══════════════════════════════════════════════════════════ */

				.category-filters {
					display: flex;
					gap: 12px;
					margin-bottom: 60px;
					flex-wrap: wrap;
					justify-content: flex-start;
				}

				.filter-btn {
					display: flex;
					align-items: center;
					gap: 8px;
					padding: 10px 16px;
					background: transparent;
					border: 1px solid var(--border-subtle);
					border-radius: 20px;
					color: var(--text-secondary);
					font-size: 12px;
					font-weight: 600;
					cursor: pointer;
					transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
					text-transform: uppercase;
					letter-spacing: 0.5px;
					white-space: nowrap;
				}

				.filter-btn:hover {
					background: rgba(255, 45, 45, 0.05);
					border-color: var(--border-red);
					color: var(--text-primary);
					transform: translateY(-2px);
				}

				.filter-btn.active {
					background: rgba(255, 45, 45, 0.1);
					border-color: var(--accent-red);
					color: var(--accent-red);
					box-shadow: 0 0 20px var(--accent-red-glow);
				}

				.emoji {
					font-size: 16px;
				}

				.count {
					opacity: 0.75;
					font-weight: 500;
				}

				/* ═══════════════════════════════════════════════════════════ */
				/* GRID LAYOUT */
				/* ═══════════════════════════════════════════════════════════ */

				.grid-container {
					display: grid;
					grid-template-columns: repeat(4, 1fr);
					grid-auto-rows: auto;
					gap: 24px;
					margin-bottom: 40px;
				}

				.grid-item {
					animation: fadeInScale 0.6s ease-out forwards;
					opacity: 0;
				}

				.grid-item:nth-child(1) { animation-delay: 0.05s; }
				.grid-item:nth-child(2) { animation-delay: 0.1s; }
				.grid-item:nth-child(3) { animation-delay: 0.15s; }
				.grid-item:nth-child(4) { animation-delay: 0.2s; }
				.grid-item:nth-child(5) { animation-delay: 0.25s; }
				.grid-item:nth-child(6) { animation-delay: 0.3s; }
				.grid-item:nth-child(7) { animation-delay: 0.35s; }

				.grid-item.col-span-1 { grid-column: span 1; }
				.grid-item.col-span-2 { grid-column: span 2; }
				.grid-item.row-span-1 { grid-row: span 1; }
				.grid-item.row-span-2 { grid-row: span 2; }

				/* ═══════════════════════════════════════════════════════════ */
				/* PROJECT CARD */
				/* ═══════════════════════════════════════════════════════════ */

				.project-card {
					position: relative;
					width: 100%;
					height: 100%;
					overflow: hidden;
					border-radius: 20px;
					background: var(--bg-secondary);
					border: 1px solid var(--border-subtle);
					cursor: pointer;
					transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
					box-shadow: 0 0 0 0 transparent;
				}

				.project-card:hover {
					transform: scale(1.03) translateY(-8px);
					border-color: var(--border-red);
					box-shadow:
						0 0 40px var(--accent-red-glow),
						0 0 20px var(--accent-red-glow),
						0 12px 48px rgba(0, 0, 0, 0.6);
				}

				/* ═══════════════════════════════════════════════════════════ */
				/* IMAGE */
				/* ═══════════════════════════════════════════════════════════ */

				.image-wrapper {
					position: relative;
					width: 100%;
					height: 100%;
					background: var(--bg-deep);
					overflow: hidden;
				}

				.project-image {
					width: 100%;
					height: 100%;
					object-fit: cover;
					object-position: center;
					transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
					display: block;
				}

				.project-card:hover .project-image {
					transform: scale(1.08);
				}

				/* ═══════════════════════════════════════════════════════════ */
				/* OVERLAY */
				/* ═══════════════════════════════════════════════════════════ */

				.overlay {
					position: absolute;
					inset: 0;
					background: linear-gradient(
						180deg,
						transparent 0%,
						rgba(0, 0, 0, 0.4) 40%,
						rgba(5, 5, 5, 0.9) 100%
					);
					opacity: 0;
					transition: opacity 0.4s ease;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 24px;
					z-index: 2;
				}

				.project-card:hover .overlay {
					opacity: 1;
				}

				.overlay-content {
					display: flex;
					flex-direction: column;
					gap: 16px;
					height: 100%;
					justify-content: space-between;
				}

				/* ═══════════════════════════════════════════════════════════ */
				/* CATEGORY BADGE */
				/* ═══════════════════════════════════════════════════════════ */

				.category-badge {
					display: inline-block;
					background: rgba(255, 45, 45, 0.15);
					color: var(--accent-red);
					padding: 6px 12px;
					border-radius: 16px;
					font-size: 10px;
					font-weight: 700;
					text-transform: uppercase;
					letter-spacing: 0.5px;
					border: 1px solid var(--border-red);
					backdrop-filter: blur(10px);
					width: fit-content;
				}

				/* ═══════════════════════════════════════════════════════════ */
				/* CONTENT */
				/* ═══════════════════════════════════════════════════════════ */

				.content-box {
					display: flex;
					flex-direction: column;
					gap: 12px;
				}

				.title {
					font-size: clamp(14px, 2.5vw, 18px);
					font-weight: 700;
					color: var(--text-primary);
					line-height: 1.3;
					margin: 0;
				}

				.description {
					font-size: 12px;
					color: var(--text-secondary);
					line-height: 1.4;
					margin: 0;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				/* ═══════════════════════════════════════════════════════════ */
				/* GALLERY INFO & BUTTON */
				/* ═══════════════════════════════════════════════════════════ */

				.gallery-info {
					display: flex;
					align-items: center;
					gap: 6px;
					font-size: 11px;
					color: var(--text-secondary);
					padding: 6px 8px;
					background: rgba(255, 45, 45, 0.05);
					border-radius: 6px;
					border: 1px solid var(--border-red);
					width: fit-content;
				}

				.gallery-info .icon {
					width: 12px;
					height: 12px;
					color: var(--accent-red);
				}

				.view-btn {
					display: inline-flex;
					align-items: center;
					gap: 6px;
					padding: 8px 14px;
					background: rgba(255, 45, 45, 0.15);
					color: var(--accent-red);
					border: 1px solid var(--border-red);
					border-radius: 8px;
					font-size: 12px;
					font-weight: 600;
					cursor: pointer;
					transition: all 0.3s ease;
					width: fit-content;
				}

				.view-btn:hover {
					background: rgba(255, 45, 45, 0.25);
					border-color: var(--accent-red);
					box-shadow: 0 0 20px var(--accent-red-glow);
				}

				.view-btn .icon {
					width: 14px;
					height: 14px;
				}

				/* ═══════════════════════════════════════════════════════════ */
				/* EMPTY STATE */
				/* ═══════════════════════════════════════════════════════════ */

				.empty-state {
					grid-column: 1 / -1;
					text-align: center;
					padding: 80px 24px;
					color: var(--text-tertiary);
					font-size: 16px;
				}

				/* ═══════════════════════════════════════════════════════════ */
				/* ANIMATIONS */
				/* ═══════════════════════════════════════════════════════════ */

				@keyframes fadeInScale {
					from {
						opacity: 0;
						transform: scale(0.95);
					}
					to {
						opacity: 1;
						transform: scale(1);
					}
				}

				/* ═══════════════════════════════════════════════════════════ */
				/* RESPONSIVE: TABLET (1024px) */
				/* ═══════════════════════════════════════════════════════════ */

				@media (max-width: 1024px) {
					.grid-container {
						grid-template-columns: repeat(2, 1fr);
						gap: 20px;
					}

					.grid-item.col-span-2 {
						grid-column: span 2;
					}

					.grid-item.row-span-2 {
						grid-row: span 1;
					}

					.section-header {
						margin-bottom: 40px;
					}

					.section-header h2 {
						font-size: 32px;
					}
				}

				/* ═══════════════════════════════════════════════════════════ */
				/* RESPONSIVE: MOBILE (768px) */
				/* ═══════════════════════════════════════════════════════════ */

				@media (max-width: 768px) {
					.photoshop-section {
						padding: 60px 16px;
					}

					.grid-container {
						grid-template-columns: 1fr;
						gap: 16px;
					}

					.grid-item {
						grid-column: span 1 !important;
						grid-row: span 1 !important;
					}

					.project-card {
						min-height: auto;
					}

					.category-filters {
						gap: 8px;
						margin-bottom: 40px;
						overflow-x: auto;
						-webkit-overflow-scrolling: touch;
						padding-bottom: 8px;
					}

					.filter-btn {
						flex-shrink: 0;
						padding: 8px 14px;
						font-size: 11px;
					}

					.overlay {
						padding: 16px;
					}

					.title {
						font-size: 14px;
					}

					.description {
						font-size: 11px;
					}
				}

				/* ═══════════════════════════════════════════════════════════ */
				/* RESPONSIVE: SMALL MOBILE (480px) */
				/* ═══════════════════════════════════════════════════════════ */

				@media (max-width: 480px) {
					.photoshop-section {
						padding: 40px 12px;
					}

					.section-header {
						margin-bottom: 30px;
					}

					.section-header h2 {
						font-size: 24px;
					}

					.grid-container {
						gap: 12px;
						margin-bottom: 30px;
					}

					.project-card {
						min-height: auto;
						border-radius: 16px;
					}

					.overlay {
						padding: 12px;
					}

					.category-badge {
						font-size: 9px;
						padding: 5px 10px;
					}

					.title {
						font-size: 13px;
					}
				}
			`}</style>
		</section>
	);
}
