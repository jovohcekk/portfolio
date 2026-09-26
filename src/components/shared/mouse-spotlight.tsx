'use client';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

export function MouseSpotlight() {
	const reducedMotion = useReducedMotion();
	const [enabled, setEnabled] = useState(false);

	const x = useMotionValue(0);
	const y = useMotionValue(0);

	useEffect(() => {
		const fine = window.matchMedia('(pointer: fine)').matches;
		const wide = window.innerWidth >= 1024;
		const touch = navigator.maxTouchPoints > 0;
		const shouldEnable = fine && wide && !touch && !reducedMotion;
		setEnabled(shouldEnable);

		const move = (e: MouseEvent) => {
			x.set(e.clientX - 160);
			y.set(e.clientY - 160);
		};

		if (shouldEnable) window.addEventListener('mousemove', move, { passive: true });

		return () => {
			window.removeEventListener('mousemove', move);
		};
	}, [reducedMotion, x, y]);

	if (!enabled) return null;

	return (
		<motion.div className='pointer-events-none fixed inset-0 z-[2] hidden lg:block' aria-hidden>
			<motion.div
				className='spotlight-glow absolute h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full'
				style={{ x, y, willChange: 'transform' }}
			/>
		</motion.div>
	);
}
