'use client';

import { ParticleField } from '@/components/shared/particle-field';
import { SectionHeading } from '@/components/shared/section-heading';
import { SkillCard } from '@/components/shared/skill-card';
import { useLanguage } from '@/hooks/use-language';
import { staggerContainer } from '@/lib/animations';
import { motion } from 'framer-motion';
import { memo, useState } from 'react';

import adobePhotoshopIcon from '../../../icon/adobe-photoshop.png';
import cssIcon from '../../../icon/css-3.png';
import dockerIcon from '../../../icon/Docker.png';
import figmaIcon from '../../../icon/figma.png';
import gitIcon from '../../../icon/git.png';
import htmlIcon from '../../../icon/html.png';
import jsIcon from '../../../icon/js.png';
import nodejsIcon from '../../../icon/nodejs.png';
import reactIcon from '../../../icon/React.png';

const skills = [
	{ name: 'HTML', level: 95, category: 'Frontend', icon: htmlIcon },
	{ name: 'CSS', level: 97, category: 'Frontend', icon: cssIcon },
	{ name: 'JavaScript', level: 90, category: 'Frontend', icon: jsIcon },
	{ name: 'React', level: 87, category: 'Frontend', icon: reactIcon },
	{ name: 'Node.js', level: 90, category: 'Backend', icon: nodejsIcon },
	{ name: 'Git', level: 80, category: 'DevOps', icon: gitIcon },
	{ name: 'Docker', level: 62, category: 'DevOps', icon: dockerIcon },
	{ name: 'Figma', level: 93, category: 'Design', icon: figmaIcon },
	{ name: 'Adobe Photoshop', level: 98, category: 'Design', icon: adobePhotoshopIcon },
];

export function SkillsSectionComponent() {
	const { translate } = useLanguage();
	const [selectedCategory, setSelectedCategory] = useState<string>('All');

	const categories = ['All', 'Frontend', 'Backend', 'DevOps', 'Design'];

	return (
		<section
			id='skills'
			className='section-surface section-surface-tint relative w-full max-w-full overflow-hidden section-spacing'>
			<ParticleField count={16} className='opacity-50' />
			<div className='section-container relative'>
				<SectionHeading title={translate('skills.title')} />

				<div className='mb-6 flex flex-wrap gap-3'>
					{categories.map(cat => (
						<button
							key={cat}
							onClick={() => setSelectedCategory(cat)}
							className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
								selectedCategory === cat
									? 'bg-[#00e5ff] text-black shadow-lg'
									: 'bg-white/5 text-[var(--text-secondary)] hover:bg-white/8 hover:text-[var(--text-link-hover)]'
							}`}>
							{cat}
						</button>
					))}
				</div>

				<motion.div
					variants={staggerContainer}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-50px' }}
					className='grid w-full min-w-0 grid-cols-2 gap-3 xs:gap-3 sm-lg:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4'>
					{skills
						.filter(s => selectedCategory === 'All' || s.category === selectedCategory)
						.map((s, idx) => (
							<SkillCard
								key={`${s.name}-${idx}`}
								name={s.name}
								level={s.level}
								category={s.category}
								iconPath={s.icon}
							/>
						))}
				</motion.div>
			</div>
		</section>
	);
}

// OPTIMIZATION: Memoize to prevent re-renders when parent updates but props don't change
export const SkillsSection = memo(SkillsSectionComponent);
