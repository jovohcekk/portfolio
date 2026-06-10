// =====================================
// FRAMER MOTION ANIMATSIYA VARIANTLARI
// Barcha bo'limlarda qayta ishlatiladigan animatsiyalar.
// =====================================

import type { Transition, Variants } from 'framer-motion'

export const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const defaultTransition: Transition = {
	duration: 0.6,
	ease: EASE_OUT_EXPO,
};

export const viewportOnce = { once: true, margin: '-80px' as const };

export const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 48 },
	visible: {
		opacity: 1,
		y: 0,
		transition: defaultTransition,
	},
};

export const fadeInDown: Variants = {
	hidden: { opacity: 0, y: -40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: defaultTransition,
	},
};

export const fadeInLeft: Variants = {
	hidden: { opacity: 0, x: -48 },
	visible: {
		opacity: 1,
		x: 0,
		transition: defaultTransition,
	},
};

export const fadeInRight: Variants = {
	hidden: { opacity: 0, x: 48 },
	visible: {
		opacity: 1,
		x: 0,
		transition: defaultTransition,
	},
};

export const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.15,
		},
	},
};

export const staggerContainerFast: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
			delayChildren: 0.1,
		},
	},
};

export const cardHover = {
	rest: { scale: 1, y: 0 },
	hover: {
		scale: 1.02,
		y: -6,
		transition: { duration: 0.35, ease: 'easeOut' },
	},
};

export const scaleIn: Variants = {
	hidden: { opacity: 0, scale: 0.88 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.55, ease: EASE_OUT_EXPO },
	},
};

export const blurIn: Variants = {
	hidden: { opacity: 0, filter: 'blur(12px)', y: 20 },
	visible: {
		opacity: 1,
		filter: 'blur(0px)',
		y: 0,
		transition: { duration: 0.7, ease: EASE_OUT_EXPO },
	},
};

export const textRevealContainer: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.04, delayChildren: 0.1 },
	},
};

export const textRevealWord: Variants = {
	hidden: { opacity: 0, y: '100%' },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: EASE_OUT_EXPO },
	},
};

export const slideInScale: Variants = {
	hidden: { opacity: 0, scale: 0.95, y: 30 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { duration: 0.65, ease: EASE_OUT_EXPO },
	},
};

export const pageTransition: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.4, ease: EASE_IN_OUT },
	},
	exit: {
		opacity: 0,
		transition: { duration: 0.3 },
	},
};

export const floatAnimation = (delay = 0) => ({
	y: [0, -18, 0],
	transition: {
		duration: 5 + delay,
		repeat: Infinity,
		ease: 'easeInOut' as const,
		delay,
	},
});

export const glowPulse = {
	opacity: [0.35, 0.7, 0.35],
	scale: [1, 1.05, 1],
	transition: {
		duration: 4,
		repeat: Infinity,
		ease: 'easeInOut' as const,
	},
};

export const gradientSweep: Variants = {
	hidden: {
		backgroundPosition: '200% 0',
	},
	visible: {
		backgroundPosition: '-200% 0',
		transition: {
			duration: 3,
			ease: 'easeInOut' as const,
		},
	},
};

// =====================================
// PREMIUM CATEGORY TRANSITION ANIMATIONS (ULTRA STRONG)
// =====================================

/** Style A: EPIC Fade + Blur + Scale - DRAMATICALLY VISIBLE */
export const premiumFadeBlurScale: Variants = {
	hidden: { opacity: 0, filter: 'blur(30px)', scale: 0.75 },
	visible: {
		opacity: 1,
		filter: 'blur(0px)',
		scale: 1,
		transition: { duration: 0.8, ease: EASE_OUT_EXPO },
	},
	exit: {
		opacity: 0,
		filter: 'blur(30px)',
		scale: 0.75,
		transition: { duration: 0.6, ease: 'easeIn' },
	},
};

/** Style B: EPIC Slide Right + Reveal - POWERFUL entry from right */
export const premiumSlideRightReveal: Variants = {
	hidden: { opacity: 0, x: 200, filter: 'blur(15px)' },
	visible: {
		opacity: 1,
		x: 0,
		filter: 'blur(0px)',
		transition: { duration: 0.9, ease: EASE_OUT_EXPO },
	},
	exit: {
		opacity: 0,
		x: -200,
		filter: 'blur(15px)',
		transition: { duration: 0.6, ease: 'easeIn' },
	},
};

/** Style C: EPIC Slide Left + Glow - IMPRESSIVE with strong glow */
export const premiumSlideLeftGlow: Variants = {
	hidden: {
		opacity: 0,
		x: -200,
		filter: 'blur(15px)',
		boxShadow: '0 0 0px rgba(var(--accent-primary), 0)',
	},
	visible: {
		opacity: 1,
		x: 0,
		filter: 'blur(0px)',
		boxShadow: '0 0 50px rgba(var(--accent-primary), 0.6)',
		transition: { duration: 0.9, ease: EASE_OUT_EXPO },
	},
	exit: {
		opacity: 0,
		x: 200,
		filter: 'blur(15px)',
		boxShadow: '0 0 0px rgba(var(--accent-primary), 0)',
		transition: { duration: 0.6, ease: 'easeIn' },
	},
};

/** Style D: EPIC Vertical Lift + Fade - DRAMATIC upward reveal */
export const premiumVerticalLiftFade: Variants = {
	hidden: { opacity: 0, y: 100, filter: 'blur(20px)' },
	visible: {
		opacity: 1,
		y: 0,
		filter: 'blur(0px)',
		transition: { duration: 0.85, ease: EASE_OUT_EXPO },
	},
	exit: {
		opacity: 0,
		y: -100,
		filter: 'blur(20px)',
		transition: { duration: 0.6, ease: 'easeIn' },
	},
};

/** Style E: EPIC Zoom Transition - STRONG in/out zoom */
export const premiumZoomTransition: Variants = {
	hidden: { opacity: 0, scale: 1.4, filter: 'blur(20px)' },
	visible: {
		opacity: 1,
		scale: 1,
		filter: 'blur(0px)',
		transition: { duration: 0.8, ease: EASE_OUT_EXPO },
	},
	exit: {
		opacity: 0,
		scale: 0.6,
		filter: 'blur(20px)',
		transition: { duration: 0.6, ease: 'easeIn' },
	},
};

/** Style F: EPIC 3D Depth Transition - IMPRESSIVE perspective */
export const premiumDepthTransition: Variants = {
	hidden: { opacity: 0, rotateX: 120, perspective: 1200, filter: 'blur(15px)' },
	visible: {
		opacity: 1,
		rotateX: 0,
		perspective: 1200,
		filter: 'blur(0px)',
		transition: { duration: 0.85, ease: EASE_OUT_EXPO },
	},
	exit: {
		opacity: 0,
		rotateX: -120,
		perspective: 1200,
		filter: 'blur(15px)',
		transition: { duration: 0.6, ease: 'easeIn' },
	},
};

/** Style G: EPIC Blur To Clear - UNMISSABLE progressive clarity */
export const premiumBlurToClear: Variants = {
	hidden: { opacity: 0, filter: 'blur(40px)' },
	visible: {
		opacity: 1,
		filter: 'blur(0px)',
		transition: { duration: 0.9, ease: EASE_OUT_EXPO },
	},
	exit: {
		opacity: 0,
		filter: 'blur(40px)',
		transition: { duration: 0.6, ease: 'easeIn' },
	},
};

/** Style H: EPIC Stagger Reveal - DRAMATIC sequential appearance */
export const premiumStaggerReveal: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.7,
			staggerChildren: 0.12,
			delayChildren: 0.15,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.5,
			staggerChildren: 0.08,
			staggerDirection: -1,
		},
	},
};

/** Style I: EPIC Perspective Shift - POWERFUL Y-axis rotation */
export const premiumPerspectiveShift: Variants = {
	hidden: { opacity: 0, rotateY: 100, perspective: 1000, filter: 'blur(15px)' },
	visible: {
		opacity: 1,
		rotateY: 0,
		perspective: 1000,
		filter: 'blur(0px)',
		transition: { duration: 0.85, ease: EASE_OUT_EXPO },
	},
	exit: {
		opacity: 0,
		rotateY: -100,
		perspective: 1000,
		filter: 'blur(15px)',
		transition: { duration: 0.6, ease: 'easeIn' },
	},
};

/** Style J: EPIC Premium SaaS Motion - GRAND Scale + Lift + Blur combo */
export const premiumSaasPremium: Variants = {
	hidden: { opacity: 0, scale: 0.7, y: 80, filter: 'blur(20px)' },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		filter: 'blur(0px)',
		transition: { duration: 0.9, delay: 0.1, ease: EASE_OUT_EXPO },
	},
	exit: {
		opacity: 0,
		scale: 0.7,
		y: -80,
		filter: 'blur(20px)',
		transition: { duration: 0.6, ease: 'easeIn' },
	},
};

// =====================================
// CATEGORY-SPECIFIC ANIMATIONS
// =====================================

/** Active category indicator glow */
export const activeCategoryGlow: Variants = {
	initial: {
		background: 'rgba(var(--accent-primary), 0)',
		boxShadow: '0 0 0px rgba(var(--accent-primary), 0)',
	},
	animate: {
		background: 'rgba(var(--accent-primary), 0.1)',
		boxShadow: '0 0 20px rgba(var(--accent-primary), 0.3)',
		transition: { duration: 0.4, ease: EASE_OUT_EXPO },
	},
};

/** Sliding category indicator */
export const slidingCategoryIndicator: Variants = {
	initial: { width: 0, opacity: 0 },
	animate: {
		width: '100%',
		opacity: 1,
		transition: { duration: 0.5, ease: EASE_OUT_EXPO },
	},
	exit: { width: 0, opacity: 0 },
};
