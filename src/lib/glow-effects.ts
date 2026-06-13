/**
 * Glow effect utilities for premium animations
 * Reusable glow patterns for borders, shadows, and cursor effects
 */

export const glowEffects = {
	// Border glow colors
	border: {
		primary: 'rgba(255, 45, 45, 0.5)',
		secondary: 'rgba(255, 45, 45, 0.3)',
		subtle: 'rgba(255, 45, 45, 0.2)',
	},

	// Box shadow glow effects
	shadow: {
		primary: '0 0 20px rgba(255, 45, 45, 0.3)',
		secondary: '0 0 30px rgba(255, 45, 45, 0.2)',
		subtle: '0 0 12px rgba(255, 45, 45, 0.1)',
		inset: 'inset 0 0 20px rgba(255, 45, 45, 0.05)',
		combined: '0 0 20px rgba(255, 45, 45, 0.3), inset 0 0 20px rgba(255, 45, 45, 0.1)',
	},

	// Text glow effects (for gradient text)
	text: {
		primary: `
			text-transparent
			bg-clip-text
			bg-gradient-to-r
			from-accent-primary
			via-[rgba(255,120,120,0.8)]
			to-accent-primary
		`,
		secondary: `
			text-transparent
			bg-clip-text
			bg-gradient-to-r
			from-white
			via-white
			to-[rgba(255,255,255,0.7)]
		`,
	},

	// Animation timing
	timing: {
		fast: 0.2,
		normal: 0.3,
		slow: 0.5,
		verySlow: 0.8,
	},

	// Easing functions
	easing: {
		expo: [0.22, 1, 0.36, 1] as [number, number, number, number],
		inOut: [0.65, 0, 0.35, 1] as [number, number, number, number],
		out: 'easeOut',
		in: 'easeIn',
	},
};

export const glowClasses = {
	// Glow border classes
	borderGlow: 'border-accent-primary/20 hover:border-accent-primary/50 hover:shadow-[0_0_20px_rgba(255,45,45,0.3)]',
	borderGlowSubtle: 'border-accent-primary/10 hover:border-accent-primary/30 hover:shadow-[0_0_12px_rgba(255,45,45,0.15)]',

	// Button glow classes
	buttonGlow: 'hover:shadow-[0_0_20px_rgba(255,45,45,0.3)] hover:border-accent-primary/60',
	buttonGlowSubtle: 'hover:shadow-[0_0_12px_rgba(255,45,45,0.15)] hover:border-accent-primary/40',

	// Card glow classes
	cardGlow: 'hover:shadow-[0_48px_120px_rgba(255,45,45,0.25)] hover:border-accent-primary/50',
	cardGlowSubtle: 'hover:shadow-[0_24px_60px_rgba(255,45,45,0.15)] hover:border-accent-primary/40',
};

/**
 * Get spring physics config for smooth animations
 */
export const springConfig = {
	default: { type: 'spring' as const, stiffness: 300, damping: 20 },
	snappy: { type: 'spring' as const, stiffness: 400, damping: 25 },
	smooth: { type: 'spring' as const, stiffness: 250, damping: 30 },
	bouncy: { type: 'spring' as const, stiffness: 350, damping: 10 },
};

/**
 * Stagger interval presets
 */
export const staggerIntervals = {
	fast: 0.04,
	normal: 0.06,
	medium: 0.08,
	slow: 0.1,
	verySlow: 0.12,
};
