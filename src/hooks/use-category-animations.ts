import { useCallback, useRef, useState } from 'react';

/**
 * Premium Animation Styles for Category Transitions
 * Each provides a unique, premium visual experience
 */
export type AnimationStyle =
	| 'fadeBlurScale' // Style A: Fade + Blur + Scale
	| 'slideRightReveal' // Style B: Slide Right + Reveal
	| 'slideLeftGlow' // Style C: Slide Left + Glow
	| 'verticalLiftFade' // Style D: Vertical Lift + Fade
	| 'zoomTransition' // Style E: Zoom Transition
	| 'depthTransition' // Style F: 3D Depth Transition
	| 'blurToClear' // Style G: Blur To Clear
	| 'staggerReveal' // Style H: Stagger Reveal
	| 'perspectiveShift' // Style I: Perspective Transition
	| 'saasPremium'; // Style J: Premium SaaS Motion

const ANIMATION_STYLES: AnimationStyle[] = [
	'fadeBlurScale',
	'slideRightReveal',
	'slideLeftGlow',
	'verticalLiftFade',
	'zoomTransition',
	'depthTransition',
	'blurToClear',
	'staggerReveal',
	'perspectiveShift',
	'saasPremium',
];

/**
 * Hook that manages smart animation rotation
 * Cycles through different premium transition styles
 * Never uses the same animation twice in a row
 */
export function useSmartCategoryAnimation() {
	const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
	const previousIndexRef = useRef(-1);

	const getNextAnimation = useCallback((): AnimationStyle => {
		let nextIndex = (currentAnimationIndex + 1) % ANIMATION_STYLES.length;

		// Ensure we don't pick the same animation twice
		while (nextIndex === previousIndexRef.current) {
			nextIndex = (nextIndex + 1) % ANIMATION_STYLES.length;
		}

		previousIndexRef.current = currentAnimationIndex;
		setCurrentAnimationIndex(nextIndex);

		return ANIMATION_STYLES[nextIndex];
	}, [currentAnimationIndex]);

	const getCurrentAnimation = useCallback((): AnimationStyle => {
		return ANIMATION_STYLES[currentAnimationIndex];
	}, [currentAnimationIndex]);

	const getAnimationAtIndex = useCallback((index: number): AnimationStyle => {
		// Cycle through animations deterministically based on index
		return ANIMATION_STYLES[index % ANIMATION_STYLES.length];
	}, []);

	return {
		getNextAnimation,
		getCurrentAnimation,
		getAnimationAtIndex,
		availableAnimations: ANIMATION_STYLES,
	};
}

/**
 * Gets animation variants for a specific style
 * Returns Framer Motion animation definitions
 */
export function getAnimationVariants(style: AnimationStyle) {
	switch (style) {
		// Style A: Fade + Blur + Scale
		case 'fadeBlurScale':
			return {
				exit: {
					opacity: 0,
					filter: 'blur(12px)',
					scale: 0.92,
					transition: { duration: 0.4, ease: 'easeInOut' },
				},
				enter: {
					opacity: 1,
					filter: 'blur(0px)',
					scale: 1,
					transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
				},
			};

		// Style B: Slide Right + Reveal
		case 'slideRightReveal':
			return {
				exit: {
					x: 100,
					opacity: 0,
					transition: { duration: 0.35, ease: 'easeIn' },
				},
				enter: {
					x: 0,
					opacity: 1,
					transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
				},
			};

		// Style C: Slide Left + Glow
		case 'slideLeftGlow':
			return {
				exit: {
					x: -100,
					opacity: 0,
					boxShadow: '0 0 0px rgba(var(--accent-primary), 0)',
					transition: { duration: 0.35, ease: 'easeIn' },
				},
				enter: {
					x: 0,
					opacity: 1,
					boxShadow: '0 0 30px rgba(var(--accent-primary), 0.3)',
					transition: {
						duration: 0.6,
						ease: [0.34, 1.56, 0.64, 1],
					},
				},
			};

		// Style D: Vertical Lift + Fade
		case 'verticalLiftFade':
			return {
				exit: {
					y: 60,
					opacity: 0,
					transition: { duration: 0.4, ease: 'easeIn' },
				},
				enter: {
					y: 0,
					opacity: 1,
					transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
				},
			};

		// Style E: Zoom Transition
		case 'zoomTransition':
			return {
				exit: {
					scale: 1.15,
					opacity: 0,
					transition: { duration: 0.3, ease: 'easeIn' },
				},
				enter: {
					scale: 1,
					opacity: 1,
					transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
				},
			};

		// Style F: 3D Depth Transition
		case 'depthTransition':
			return {
				exit: {
					perspective: 1200,
					rotateX: 90,
					opacity: 0,
					transition: { duration: 0.4, ease: 'easeIn' },
				},
				enter: {
					perspective: 1200,
					rotateX: 0,
					opacity: 1,
					transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
				},
			};

		// Style G: Blur To Clear
		case 'blurToClear':
			return {
				exit: {
					filter: 'blur(20px)',
					opacity: 0,
					transition: { duration: 0.35, ease: 'easeIn' },
				},
				enter: {
					filter: 'blur(0px)',
					opacity: 1,
					transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
				},
			};

		// Style H: Stagger Reveal
		case 'staggerReveal':
			return {
				exit: {
					opacity: 0,
					transition: { duration: 0.3, staggerChildren: 0.05, staggerDirection: -1 },
				},
				enter: {
					opacity: 1,
					transition: {
						duration: 0.5,
						staggerChildren: 0.08,
						delayChildren: 0.1,
					},
				},
			};

		// Style I: Perspective Shift
		case 'perspectiveShift':
			return {
				exit: {
					perspective: 1000,
					rotateY: 75,
					opacity: 0,
					transition: { duration: 0.4, ease: 'easeIn' },
				},
				enter: {
					perspective: 1000,
					rotateY: 0,
					opacity: 1,
					transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
				},
			};

		// Style J: Premium SaaS Motion
		case 'saasPremium':
			return {
				exit: {
					scale: 0.85,
					y: 40,
					filter: 'blur(8px)',
					opacity: 0,
					transition: { duration: 0.4, ease: 'easeIn' },
				},
				enter: {
					scale: 1,
					y: 0,
					filter: 'blur(0px)',
					opacity: 1,
					transition: {
						duration: 0.7,
						ease: [0.34, 1.56, 0.64, 1],
						delay: 0.05,
					},
				},
			};

		default:
			return {
				exit: { opacity: 0 },
				enter: { opacity: 1 },
			};
	}
}

/**
 * Card-specific animation variants
 * For enter/exit animations of card elements
 */
export function getCardAnimationVariants(style: AnimationStyle) {
	const baseVariants = getAnimationVariants(style);

	return {
		...baseVariants,
		// Add staggered children for card animations
		container: {
			exit: {
				transition: {
					staggerChildren: 0.04,
					staggerDirection: -1,
					delayChildren: 0,
				},
			},
			enter: {
				transition: {
					staggerChildren: 0.06,
					delayChildren: 0.05,
				},
			},
		},
		item: {
			hidden: { opacity: 0, y: 12 },
			visible: {
				opacity: 1,
				y: 0,
				transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
			},
		},
	};
}

/**
 * Text animation variants
 * For title and description animations
 */
export function getTextAnimationVariants(style: AnimationStyle, isTitle: boolean = false) {
	if (isTitle) {
		// Titles use letter-by-letter or word-by-word reveal
		return {
			hidden: { opacity: 0, y: 10 },
			visible: {
				opacity: 1,
				y: 0,
				transition: {
					duration: 0.5,
					ease: [0.34, 1.56, 0.64, 1],
				},
			},
			withGlow: {
				opacity: 1,
				y: 0,
				textShadow: [
					'0 0 0px rgba(var(--accent-primary), 0)',
					'0 0 30px rgba(var(--accent-primary), 0.5)',
					'0 0 0px rgba(var(--accent-primary), 0)',
				],
				transition: {
					duration: 0.6,
					ease: 'easeInOut',
				},
			},
		};
	}

	// Descriptions use smooth fade-up
	return {
		hidden: { opacity: 0, y: 8 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: [0.34, 1.56, 0.64, 1],
				delay: 0.1,
			},
		},
	};
}

/**
 * Active category indicator animation
 * For the selected category pill/button
 */
export const activeCategoryVariants = {
	initial: {
		background: 'rgba(var(--accent-primary), 0)',
		boxShadow: '0 0 0px rgba(var(--accent-primary), 0)',
	},
	animate: {
		background: 'rgba(var(--accent-primary), 0.1)',
		boxShadow: '0 0 20px rgba(var(--accent-primary), 0.3)',
		transition: {
			duration: 0.4,
			ease: [0.34, 1.56, 0.64, 1],
		},
	},
	exit: {
		background: 'rgba(var(--accent-primary), 0)',
		boxShadow: '0 0 0px rgba(var(--accent-primary), 0)',
		transition: { duration: 0.3, ease: 'easeOut' },
	},
};

/**
 * Sliding indicator animation
 * For the underline/background that follows active category
 */
export const slidingIndicatorVariants = {
	initial: { width: 0, opacity: 0 },
	animate: (width: number) => ({
		width,
		opacity: 1,
		transition: {
			duration: 0.5,
			ease: [0.34, 1.56, 0.64, 1],
		},
	}),
	exit: { width: 0, opacity: 0 },
};
