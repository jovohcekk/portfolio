'use client';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { motion } from 'framer-motion';

interface LetterRevealProps {
	text: string;
	className?: string;
	as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const container = {
	hidden: { opacity: 0 },
	visible: (i = 1) => ({
		opacity: 1,
		transition: { staggerChildren: 0.03, delayChildren: 0.06 * i },
	}),
};

const letter = {
	hidden: { opacity: 0, y: 8, scale: 0.98 },
	visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 28 } },
};

export function LetterReveal({ text, className = '', as: Tag = 'span' }: LetterRevealProps) {
	const reducedMotion = useReducedMotion();
	if (reducedMotion) {
		return <Tag className={className}>{text}</Tag>;
	}

	const letters = Array.from(text);

	return (
		<Tag className={className} aria-label={text}>
			<motion.span
				variants={container}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, margin: '-60px' }}
				className='inline-flex flex-wrap'>
				{letters.map((char, i) => (
					<span key={`${char}-${i}`} className='inline-block overflow-hidden'>
						<motion.span variants={letter} className='inline-block'>
							{char === ' ' ? '\u00A0' : char}
						</motion.span>
					</span>
				))}
			</motion.span>
		</Tag>
	);
}
