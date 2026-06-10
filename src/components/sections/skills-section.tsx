'use client';

import { ParticleField } from '@/components/shared/particle-field';
import { SectionHeading } from '@/components/shared/section-heading';
import { SkillCategoryCard } from '@/components/shared/skill-category-card';
import { SkillCategoryModal } from '@/components/shared/skill-category-modal';
import { useLanguage } from '@/hooks/use-language';
import { staggerContainer } from '@/lib/animations';
import { motion } from 'framer-motion';
import { Code2, Database, Terminal, Palette, Shield } from 'lucide-react';
import { memo, useState } from 'react';

// Skill categories with their metadata
const skillCategories = [
	{
		id: 'programming',
		name: 'Programming',
		level: 92,
		icon: Code2,
		skills: [
			{ name: 'HTML5', level: 96 },
			{ name: 'CSS3', level: 95 },
			{ name: 'JavaScript', level: 87 },
			{ name: 'Python', level: 70 },
			{ name: 'Django', level: 70 },
		],
	},
	{
		id: 'devTools',
		name: 'Development Tools',
		level: 88,
		icon: Database,
		skills: [
			{ name: 'Git', level: 50 },
			{ name: 'Linux', level: 30 },
			{ name: 'REST API', level: 43 },
		],
	},
	{
		id: 'linux',
		name: 'Linux Experience',
		level: 85,
		icon: Terminal,
		skills: [
			{ name: 'Arch Linux', level: 92 },
			{ name: 'BlackArch', level: 88 },
			{ name: 'Kali Linux', level: 85 },
			{ name: 'Ubuntu', level: 0 },
		],
	},
	{
		id: 'creative',
		name: 'Creative Tools',
		level: 82,
		icon: Palette,
		skills: [
			{ name: 'Adobe Photoshop', level: 69 },
			{ name: 'Blender', level: 12 },
		],
	},
	{
		id: 'cybersecurity',
		name: 'Cybersecurity',
		level: 78,
		icon: Shield,
		skills: [
			{ name: 'Security Fundamentals', level: 8 },
			{ name: 'Linux Security Basics', level: 3 },
		],
	},
];

export function SkillsSectionComponent() {
	const { translate } = useLanguage();
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<(typeof skillCategories)[0] | null>(null);

	const handleCategoryClick = (category: (typeof skillCategories)[0]) => {
		setSelectedCategory(category);
		setModalOpen(true);
	};

	return (
		<section
			id='skills'
			className='section-surface section-surface-tint relative w-full max-w-full overflow-hidden section-spacing'>
			<ParticleField count={16} className='opacity-50' />
			<div className='section-container relative'>
				<SectionHeading title={translate('skills.title')} subtitle={translate('skills.subtitle')} />

				<motion.div
					variants={staggerContainer}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-50px' }}
					className='grid w-full min-w-0 grid-cols-1 gap-4 xs:gap-6 sm:grid-cols-2 lg:grid-cols-3'>
					{skillCategories.map((category, index) => (
						<SkillCategoryCard
							key={category.id}
							name={category.name}
							level={category.level}
							icon={category.icon}
							skillCount={category.skills.length}
							index={index}
							onClick={() => handleCategoryClick(category)}
						/>
					))}
				</motion.div>
			</div>

			{/* Premium Modal */}
			{selectedCategory && (
				<SkillCategoryModal
					isOpen={modalOpen}
					category={selectedCategory.name}
					skills={selectedCategory.skills}
					onClose={() => setModalOpen(false)}
				/>
			)}
		</section>
	);
}

// OPTIMIZATION: Memoize to prevent re-renders when parent updates but props don't change
export const SkillsSection = memo(SkillsSectionComponent)
