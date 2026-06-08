'use client';

import { LetterReveal } from '@/components/shared/letter-reveal';
import { blurIn, fadeInUp } from '@/lib/animations';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
	title: string;
	subtitle?: string;
	align?: 'left' | 'center';
	dark?: boolean;
}

export function SectionHeading({ title, subtitle, align = 'center', dark = false }: SectionHeadingProps) {
	return (
		<motion.div
			variants={fadeInUp}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, margin: '-80px' }}
			className={`mb-8 w-full min-w-0 xs:mb-12 md:mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
			<h2 className='heading-section break-words font-bold tracking-tight'>
				<LetterReveal text={title} className={dark ? 'text-white' : 'text-gradient-brand'} as='span' />
			</h2>
			{subtitle && (
				<motion.p
					variants={blurIn}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true }}
					className={`body-lg mt-4 break-words transition-colors duration-300 ${dark ? 'text-white/60' : 'text-secondary-content'}`}>
					{subtitle}
				</motion.p>
			)}
			<motion.div
				initial={{ scaleX: 0 }}
				whileInView={{ scaleX: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
				className={`mt-5 h-0.5 w-16 rounded-full ${dark ? 'bg-[rgb(var(--accent-primary))]' : 'bg-gradient-primary'} ${
					align === 'center' ? 'mx-auto' : ''
				}`}
				style={{ transformOrigin: align === 'center' ? 'center' : 'left' }}
			/>
		</motion.div>
	);
}
