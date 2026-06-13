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

// =====================================
// PREMIUM MICRO-INTERACTIONS
// =====================================

/** Magnetic button hover effect */
export const magneticHover = {
	scale: [1, 1.02, 1.01],
	transition: { duration: 0.4, ease: EASE_OUT_EXPO },
};

/** Ripple effect for buttons */
export const rippleEffect: Variants = {
	initial: { scale: 0, opacity: 1 },
	animate: {
		scale: 3,
		opacity: 0,
		transition: { duration: 0.6, ease: 'easeOut' },
	},
};

/** Shine sweep animation */
export const shineSweep: Variants = {
	initial: { x: '-100%', opacity: 0 },
	animate: {
		x: '100%',
		opacity: [0, 1, 0],
		transition: { duration: 1.5, ease: EASE_OUT_EXPO },
	},
};

/** Icon movement */
export const iconBounce = {
	y: [0, -3, 0],
	transition: { duration: 0.4, ease: EASE_OUT_EXPO },
};

/** Glow pulse effect */
export const glowPulseIntense = {
	boxShadow: [
		'0 0 10px rgba(255, 45, 45, 0)',
		'0 0 30px rgba(255, 45, 45, 0.4)',
		'0 0 10px rgba(255, 45, 45, 0)',
	],
	transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
};

/** Hover lift effect */
export const hoverLift = {
	y: -8,
	boxShadow: '0 32px 64px rgba(0, 0, 0, 0.3)',
	transition: { duration: 0.3, ease: EASE_OUT_EXPO },
};

/** Tilt effect */
export const tiltEffect = (x: number, y: number) => ({
	rotateX: y,
	rotateY: x,
	transition: { duration: 0.3, ease: EASE_OUT_EXPO },
});

/** Border glow animation */
export const borderGlow: Variants = {
	initial: {
		borderColor: 'rgba(255, 45, 45, 0)',
		boxShadow: '0 0 0px rgba(255, 45, 45, 0)',
	},
	hover: {
		borderColor: 'rgba(255, 45, 45, 0.5)',
		boxShadow: '0 0 20px rgba(255, 45, 45, 0.3), inset 0 0 20px rgba(255, 45, 45, 0.1)',
		transition: { duration: 0.3, ease: EASE_OUT_EXPO },
	},
};

/** Character reveal animation */
export const characterReveal: Variants = {
	hidden: { opacity: 0, y: '100%' },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.04,
			duration: 0.5,
			ease: EASE_OUT_EXPO,
		},
	}),
};

/** Word reveal animation */
export const wordReveal: Variants = {
	hidden: { opacity: 0, x: -10 },
	visible: (i: number) => ({
		opacity: 1,
		x: 0,
		transition: {
			delay: i * 0.08,
			duration: 0.5,
			ease: EASE_OUT_EXPO,
		},
	}),
};

/** Parallax scroll animation */
export const parallaxScroll = (offset: number) => ({
	y: [0, offset],
	transition: { duration: 1, ease: 'easeOut' },
});

/** Scroll reveal with stagger */
export const scrollRevealStagger: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};

/** Smooth color transition */
export const colorTransition = {
	transition: { duration: 0.3, ease: EASE_OUT_EXPO },
};

/** Image zoom effect */
export const imageZoom = {
	scale: 1.08,
	transition: { duration: 0.4, ease: EASE_OUT_EXPO },
};

/** Floating motion - continuous */
export const floatingMotion = {
	y: [0, -20, 0],
	transition: {
		duration: 6,
		repeat: Infinity,
		ease: 'easeInOut',
	},
};

/** Smooth spring animation */
export const springAnimation = (tension = 100, friction = 20) => ({
	type: 'spring' as const,
	stiffness: tension,
	damping: friction,
	mass: 1,
});

/** Carousel slide animation */
export const carouselSlide: Variants = {
	enter: { x: 1000, opacity: 0 },
	center: { zIndex: 1, x: 0, opacity: 1 },
	exit: { zIndex: 0, x: -1000, opacity: 0 },
};

/** Modal backdrop blur */
export const backdropBlur: Variants = {
	hidden: { backdropFilter: 'blur(0px)', opacity: 0 },
	visible: {
		backdropFilter: 'blur(12px)',
		opacity: 1,
		transition: { duration: 0.3, ease: EASE_OUT_EXPO },
	},
	exit: {
		backdropFilter: 'blur(0px)',
		opacity: 0,
		transition: { duration: 0.2, ease: 'easeOut' },
	},
};

/** Slide in from left */
export const slideInFromLeft: Variants = {
	hidden: { x: -100, opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: { duration: 0.6, ease: EASE_OUT_EXPO },
	},
};

/** Slide in from right */
export const slideInFromRight: Variants = {
	hidden: { x: 100, opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: { duration: 0.6, ease: EASE_OUT_EXPO },
	},
};

/** Underline animation */
export const underlineReveal: Variants = {
	hidden: { scaleX: 0 },
	visible: {
		scaleX: 1,
		transition: { duration: 0.6, ease: EASE_OUT_EXPO },
	},
};

/** Gradient animation */
export const gradientAnimation: Variants = {
	animate: {
		backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
		transition: { duration: 6, repeat: Infinity, ease: 'linear' },
	},
};

// =====================================
// PREMIUM TEXT ANIMATIONS
// =====================================

/** Text fade in with slide up - PREMIUM */
export const textFadeInUp: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: EASE_OUT_EXPO },
	},
};

/** Title character reveal with glow - PREMIUM */
export const titleCharacterRevealGlow: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.04,
			delayChildren: 0.1,
		},
	},
};

/** Subtitle word reveal stagger - PREMIUM */
export const subtitleWordReveal: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.2,
		},
	},
};

/** Description progressive reveal - PREMIUM */
export const descriptionProgressiveReveal: Variants = {
	hidden: { opacity: 0, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.3 },
	},
};

// =====================================
// PREMIUM CARD ANIMATIONS
// =====================================

/** Enhanced card hover - PREMIUM (scale 1.05, lift -12px) */
export const cardHoverPremium: Variants = {
	rest: { scale: 1, y: 0 },
	hover: {
		scale: 1.05,
		y: -12,
		transition: { duration: 0.3, ease: 'easeOut', type: 'spring', stiffness: 300, damping: 20 },
	},
};

/** Card entrance with stagger - PREMIUM */
export const cardEntranceStagger: Variants = {
	hidden: { opacity: 0, y: 32, scale: 0.95 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			delay: i * 0.08,
			duration: 0.6,
			ease: EASE_OUT_EXPO,
		},
	}),
};

/** Image zoom on hover - PREMIUM */
export const imageZoomHover: Variants = {
	rest: { scale: 1 },
	hover: {
		scale: 1.08,
		transition: { duration: 0.4, ease: EASE_OUT_EXPO },
	},
};

// =====================================
// PREMIUM BUTTON ANIMATIONS
// =====================================

/** Button hover glow - PREMIUM (scale 1.04) */
export const buttonHoverGlowPremium: Variants = {
	rest: { scale: 1 },
	hover: {
		scale: 1.04,
		transition: { duration: 0.2, ease: 'easeOut', type: 'spring', stiffness: 400, damping: 25 },
	},
	tap: {
		scale: 0.97,
		transition: { duration: 0.1 },
	},
};

/** Button icon scale on hover - PREMIUM */
export const buttonIconScale: Variants = {
	rest: { scale: 1, rotate: 0 },
	hover: {
		scale: 1.15,
		rotate: 5,
		transition: { duration: 0.3, ease: EASE_OUT_EXPO },
	},
};

/** Button success animation - PREMIUM */
export const buttonSuccessState: Variants = {
	animate: {
		scale: [1, 1.1, 1],
		transition: { duration: 0.5, ease: EASE_OUT_EXPO },
	},
};

// =====================================
// PREMIUM FORM INPUT ANIMATIONS
// =====================================

/** Input focus glow - PREMIUM */
export const inputFocusGlow: Variants = {
	unfocused: {
		borderColor: 'rgba(255, 45, 45, 0.2)',
		boxShadow: '0 0 0px rgba(255, 45, 45, 0)',
	},
	focused: {
		borderColor: 'rgba(255, 45, 45, 0.6)',
		boxShadow: '0 0 20px rgba(255, 45, 45, 0.3), inset 0 0 10px rgba(255, 45, 45, 0.05)',
		transition: { duration: 0.3, ease: EASE_OUT_EXPO },
	},
};

/** Label float animation - PREMIUM */
export const labelFloat: Variants = {
	initial: { y: 0, opacity: 0.7 },
	animate: {
		y: -24,
		opacity: 1,
		transition: { duration: 0.3, ease: EASE_OUT_EXPO },
	},
};

/** Input error shake - PREMIUM (transform-based) */
export const inputErrorShake: Variants = {
	animate: {
		x: [-8, 8, -8, 8, 0],
		transition: { duration: 0.4, ease: 'easeInOut' },
	},
};

/** Error message fade in - PREMIUM */
export const errorMessageFade: Variants = {
	hidden: { opacity: 0, y: -10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.3, ease: EASE_OUT_EXPO },
	},
};

// =====================================
// PREMIUM NAVIGATION ANIMATIONS
// =====================================

/** Nav link underline reveal - PREMIUM */
export const navUnderlineReveal: Variants = {
	initial: { scaleX: 0 },
	hover: {
		scaleX: 1,
		transition: { duration: 0.3, ease: EASE_OUT_EXPO },
	},
};

/** Dropdown item entrance - PREMIUM */
export const dropdownItemEntrance: Variants = {
	hidden: { opacity: 0, y: -8, scale: 0.95 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			delay: i * 0.06,
			duration: 0.4,
			ease: EASE_OUT_EXPO,
			type: 'spring',
			stiffness: 300,
			damping: 20,
		},
	}),
};

// =====================================
// PREMIUM SCROLL ENTRANCE ANIMATIONS
// =====================================

/** Section fade in stagger - PREMIUM */
export const sectionFadeInStagger: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.06,
			delayChildren: 0.1,
		},
	},
};

/** Section entrance children - PREMIUM */
export const sectionEntranceChild: Variants = {
	hidden: { opacity: 0, y: 24, scale: 0.96 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.6, ease: EASE_OUT_EXPO },
	},
};

/** Badge entrance stagger - PREMIUM */
export const badgeEntranceStagger: Variants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: (i: number) => ({
		opacity: 1,
		scale: 1,
		transition: {
			delay: i * 0.06,
			duration: 0.5,
			ease: EASE_OUT_EXPO,
		},
	}),
};

// =====================================
// PREMIUM MODAL/OVERLAY ANIMATIONS
// =====================================

/** Modal content zoom entrance - PREMIUM */
export const modalContentZoom: Variants = {
	hidden: { opacity: 0, scale: 0.92, y: 20 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { duration: 0.5, ease: EASE_OUT_EXPO, type: 'spring', stiffness: 300, damping: 25 },
	},
	exit: {
		opacity: 0,
		scale: 0.92,
		y: 20,
		transition: { duration: 0.3, ease: 'easeIn' },
	},
};

/** Modal backdrop blur enhancement - PREMIUM */
export const backdropBlurEnhanced: Variants = {
	hidden: { backdropFilter: 'blur(0px)', opacity: 0 },
	visible: {
		backdropFilter: 'blur(12px)',
		opacity: 1,
		transition: { duration: 0.35, ease: EASE_OUT_EXPO },
	},
	exit: {
		backdropFilter: 'blur(0px)',
		opacity: 0,
		transition: { duration: 0.25, ease: 'easeOut' },
	},
};

// =====================================
// PREMIUM LOADING & STATUS ANIMATIONS
// =====================================

/** Loading pulse - PREMIUM */
export const loadingPulse: Variants = {
	animate: {
		scale: [1, 1.05, 1],
		opacity: [0.6, 1, 0.6],
		transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
	},
};

/** Success checkmark - PREMIUM */
export const successCheckmark: Variants = {
	hidden: { scale: 0, rotate: -90 },
	visible: {
		scale: 1,
		rotate: 0,
		transition: { duration: 0.5, ease: EASE_OUT_EXPO, type: 'spring', stiffness: 300, damping: 20 },
	},
};

// =====================================
// PREMIUM INFINITE ANIMATIONS
// =====================================

/** Subtle glow pulse - PREMIUM (infinite) */
export const subtleGlowPulse: Variants = {
	animate: {
		opacity: [0.4, 0.6, 0.4],
		scale: [1, 1.02, 1],
		transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
	},
};

/** Smooth float - PREMIUM (infinite) */
export const smoothFloat: Variants = {
	animate: {
		y: [0, -12, 0],
		transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
	},
};
