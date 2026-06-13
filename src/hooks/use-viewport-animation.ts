'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Hook to pause/control animations based on viewport visibility
 * Helps optimize performance by pausing off-screen animations
 */
export function useViewportAnimation(threshold = 0.1) {
	const ref = useRef<HTMLElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (!ref.current) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold }
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [threshold]);

	return { ref, isVisible };
}

/**
 * Hook to control animation intensity based on reduced motion preferences
 */
export function useReducedMotionAnimation(shouldReduce = false) {
	const [reduceMotion, setReduceMotion] = useState(shouldReduce);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

		const handleChange = (e: MediaQueryListEvent) => {
			setReduceMotion(e.matches);
		};

		setReduceMotion(mediaQuery.matches);
		mediaQuery.addEventListener('change', handleChange);

		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	return reduceMotion;
}

/**
 * Get animation config based on visibility and motion preferences
 */
export function useSmartAnimationConfig(isVisible: boolean, reduceMotion: boolean) {
	return {
		shouldAnimate: isVisible && !reduceMotion,
		duration: reduceMotion ? 0.1 : 0.6,
		delay: reduceMotion ? 0 : 0.1,
	};
}
