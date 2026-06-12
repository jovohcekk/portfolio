'use client';

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { Github, Globe } from 'lucide-react';

import { type ProjectItem } from '@/config/portfolio';

interface ProjectCardProps {
	project: ProjectItem;
	index: number;
}

const cardVariants: Variants = {
	hidden: { opacity: 0, y: 48, scale: 0.93 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.7,
			delay: i * 0.15,
			ease: [0.22, 1, 0.36, 1],
		},
	}),
};

export function ProjectCard({ project, index }: ProjectCardProps) {
	return (
		<motion.div
			custom={index}
			variants={cardVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: '-80px' }}
			className="group relative overflow-hidden rounded-[24px] border border-[rgba(255,45,45,0.16)] bg-[rgba(8,8,8,0.88)] backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[rgba(255,45,45,0.35)] hover:bg-[rgba(10,10,10,0.94)] hover:shadow-[0_36px_110px_rgba(255,45,45,0.22)]"
			whileHover={{ scale: 1.02, y: -4 }}>
			{/* Card Glow Effect on Hover */}
			<div className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-100">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.16),transparent_30%)]" />
			</div>

			{/* Image Container */}
			<motion.div
				className="relative overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(10,10,10,0.4)]"
				whileHover={{ scale: 1.05 }}
				transition={{ duration: 0.6 }}>
				<div className="relative aspect-video w-full overflow-hidden">
					<Image
						src={project.image}
						alt={project.title}
						fill
						className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
						quality={90}
						priority={index === 0}
					/>
					{/* Image Gradient Overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

					{/* Hover Glow Effect */}
					<div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
						<div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,10,10,0.16),transparent_40%)]" />
					</div>
				</div>
			</motion.div>

			{/* Content Container */}
			<div className="relative p-6 md:p-8">
				{/* Project Title */}
				<h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3 group-hover:text-white transition-colors duration-300">
					{project.title}
				</h3>

				{/* Description */}
				<p className="text-sm md:text-base leading-7 text-slate-300 mb-6 line-clamp-3">
					{project.description}
				</p>

				{/* Technologies Tags */}
				<motion.div
					className="flex flex-wrap gap-2 mb-6"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: 0.2 + index * 0.05 }}>
					{project.technologies.map((tech, tidx) => (
						<motion.span
							key={tech}
							whileHover={{ y: -2 }}
							className="inline-flex items-center px-3 py-1.5 rounded-full border border-[rgba(255,45,45,0.28)] bg-[rgba(255,45,45,0.08)] text-xs md:text-sm font-medium text-[rgba(255,120,120,0.95)] backdrop-blur-md transition-all duration-300 hover:border-[rgba(255,45,45,0.5)] hover:bg-[rgba(255,45,45,0.15)] hover:shadow-[0_0_12px_rgba(255,45,45,0.3)]"
							transition={{ delay: 0.05 * tidx }}>
							{tech}
						</motion.span>
					))}
				</motion.div>

				{/* Action Buttons */}
				<motion.div
					className="flex flex-wrap gap-3"
					initial={{ opacity: 0, y: 8 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 + index * 0.1 }}>
					<motion.a
						href={project.github}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(255,45,45,0.35)] bg-[rgba(255,45,45,0.1)] text-sm font-semibold text-[rgba(255,120,120,0.95)] transition-all duration-300 hover:border-[rgba(255,45,45,0.6)] hover:bg-[rgba(255,45,45,0.2)] hover:shadow-[0_0_20px_rgba(255,45,45,0.3)]"
						whileHover={{ scale: 1.05, y: -2 }}>
						<Github className="w-4 h-4" />
						GitHub
					</motion.a>

					<motion.a
						href={project.demo}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] text-sm font-semibold text-white transition-all duration-300 hover:border-[rgba(255,45,45,0.5)] hover:bg-[rgba(255,45,45,0.12)] hover:shadow-[0_0_20px_rgba(255,45,45,0.25)]"
						whileHover={{ scale: 1.05, y: -2 }}>
						<Globe className="w-4 h-4" />
						Live Website
					</motion.a>
				</motion.div>
			</div>
		</motion.div>
	);
}
