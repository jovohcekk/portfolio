'use client';

import { personalInfo } from '@/config/portfolio'
import { useLanguage } from '@/hooks/use-language'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// OPTIMIZED: Reduced display times for faster visible content
// Users don't need to wait - show content as soon as possible
const MIN_DISPLAY_MS = 200; // Was 600ms - now shows faster
const MAX_DISPLAY_MS = 400; // Was 1000ms - page visible much quicker
const EXIT_MS = 0.2;

export function LoadingScreen() {
	const [visible, setVisible] = useState(true);
	const { translate } = useLanguage();

	useEffect(() => {
		const shownAt = performance.now();
		let hidden = false;

		const dismiss = () => {
			if (hidden) return;
			hidden = true;
			const elapsed = performance.now() - shownAt;
			const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
			window.setTimeout(() => setVisible(false), wait);
		};

		if (document.readyState === 'complete') {
			dismiss();
		} else {
			window.addEventListener('load', dismiss, { once: true });
		}

		const maxTimer = window.setTimeout(dismiss, MAX_DISPLAY_MS);

		return () => {
			window.removeEventListener('load', dismiss);
			window.clearTimeout(maxTimer);
		};
	}, []);

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: EXIT_MS, ease: [0.22, 1, 0.36, 1] }}
					className='pointer-events-auto fixed inset-0 z-[100] flex w-full max-w-[100vw] flex-col items-center justify-center overflow-hidden bg-[var(--bg-start)]'>
					<motion.div
						initial={{ scale: 0.92, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
						className='relative text-center'>
						<div className='relative mx-auto mb-5 h-14 w-14 rounded-xl bg-gradient-primary p-[2px] shadow-brand'>
							<div className='flex h-full w-full items-center justify-center rounded-xl glass-card text-2xl font-bold text-accent'>
								{personalInfo.name.charAt(0)}
							</div>
						</div>

						<p className='text-base font-semibold text-primary-content'>{personalInfo.name}</p>
						<p className='mt-1 text-xs text-secondary-content'>{translate('loading')}</p>

						<div className='mx-auto mt-5 h-0.5 w-40 overflow-hidden rounded-full bg-[rgb(var(--surface-rgb)/0.5)]'>
							<motion.div
								className='h-full rounded-full bg-gradient-primary'
								initial={{ width: '0%' }}
								animate={{ width: '100%' }}
								transition={{ duration: MAX_DISPLAY_MS / 1000, ease: 'easeOut' }}
							/>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
