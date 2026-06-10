'use client';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { textRevealContainer, textRevealWord } from '@/lib/animations';
import { motion } from 'framer-motion';

interface TextRevealProps {
	text: string;
	className?: string;
	as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function TextReveal({ text, className, as: Tag = 'span' }: TextRevealProps) {
	const reducedMotion = useReducedMotion();
	const words = text.split(' ');

	if (reducedMotion) {
		return <Tag className={className}>{text}</Tag>;
	}

	return (
		<Tag className={className} aria-label={text} key={text}>
			<motion.span
				variants={textRevealContainer}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: false, margin: '-60px' }}
				className='inline-flex flex-wrap'>
				{words.map((word, i) => (
					<span key={`${text}-${i}-${word}`} className='overflow-hidden inline-block mr-[0.25em]'>
						<motion.span variants={textRevealWord} className='inline-block'>
							{word}
						</motion.span>
					</span>
				))}
			</motion.span>
		</Tag>
	);
}
