'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

import { DevelopmentProjectsSection } from '@/components/sections/development-projects-section';
import { PhotoshopSection } from '@/components/sections/photoshop-section';
import { PhotoshopProjectModal } from '@/components/shared/photoshop-project-modal';
import { type PhotoshopGalleryItem } from '@/config/portfolio';

/**
 * Main Projects container that orchestrates:
 * 1. Development Projects Section (top)
 * 2. Photoshop Projects Section (bottom)
 * 3. Shared modal system for Photoshop projects
 */
export function ProjectsSection() {
	const [selectedProject, setSelectedProject] = useState<PhotoshopGalleryItem | null>(null);
	const [isMaximized, setIsMaximized] = useState(false);

	// Handle modal close
	const handleCloseModal = useCallback(() => {
		setSelectedProject(null);
		setIsMaximized(false);
	}, []);

	// Handle maximize toggle
	const handleToggleMaximize = useCallback(() => {
		setIsMaximized(prev => !prev);
	}, []);

	// Handle project selection from gallery
	const handleSelectProject = useCallback((project: PhotoshopGalleryItem) => {
		setSelectedProject(project);
		setIsMaximized(false);
	}, []);

	return (
		<>
			{/* Development Projects Section */}
			<DevelopmentProjectsSection />

			{/* Photoshop Projects Section with Modal Trigger */}
			<PhotoshopSection onProjectSelect={handleSelectProject} />

			{/* Shared Modal for Photoshop Projects */}
			<AnimatePresence>
				{selectedProject && (
					<PhotoshopProjectModal
						project={selectedProject}
						isOpen={!!selectedProject}
						onClose={handleCloseModal}
						isMaximized={isMaximized}
						onToggleMaximize={handleToggleMaximize}
					/>
				)}
			</AnimatePresence>
		</>
	);
}
