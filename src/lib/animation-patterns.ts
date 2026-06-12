/**
 * PREMIUM ANIMATION PATTERNS GUIDE
 * ================================
 * Apply these patterns across all portfolio sections for Awwwards-winning quality
 */

// ========================================
// 1. PROJECT CARDS - SHINE & GLOW EFFECTS
// ========================================

// Apply to src/components/sections/project-card.tsx
const projectCardEnhancements = {
	// Hover effect with lift, tilt, and border glow
	whileHover: {
		y: -16,
		scale: 1.04,
		boxShadow: '0 48px 120px rgba(255, 45, 45, 0.25)',
		transition: { duration: 0.4, ease: 'easeOut' },
	},

	// Shine sweep animation on hover
	shineSweep: {
		initial: { x: '-100%', opacity: 0 },
		whileHover: {
			x: '100%',
			opacity: [0, 0.4, 0],
			transition: { duration: 1.2, ease: 'easeInOut' },
		},
	},

	// Image zoom on hover
	imageHover: {
		scale: 1.12,
		transition: { duration: 0.5, ease: 'easeOut' },
	},

	// Card reveal animation
	initial: { opacity: 0, y: 40, scale: 0.95 },
	whileInView: { opacity: 1, y: 0, scale: 1 },
	viewport: { once: true },
	transition: {
		duration: 0.6,
		ease: 'easeOut',
		delay: 0.1, // Stagger per index
	},

	// Button glow effect
	buttonGlow: {
		boxShadow: [
			'0 0 10px rgba(255, 45, 45, 0)',
			'0 0 30px rgba(255, 45, 45, 0.4)',
			'0 0 10px rgba(255, 45, 45, 0)',
		],
		transition: {
			duration: 2,
			repeat: Infinity,
			ease: 'easeInOut',
		},
	},
};

// ========================================
// 2. PHOTOSHOP GALLERY - STAGGER & PARALLAX
// ========================================

// Apply to src/components/sections/photoshop-gallery-section.tsx
const photoshopGalleryEnhancements = {
	// Masonry stagger reveal
	containerVariants: {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.08,
				delayChildren: 0.2,
			},
		},
	},

	// Image item reveal
	itemVariants: {
		hidden: { opacity: 0, y: 40, scale: 0.9, filter: 'blur(10px)' },
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			filter: 'blur(0px)',
			transition: {
				duration: 0.7,
				ease: 'easeOut',
			},
		},
	},

	// Hover zoom and lift
	whileHover: {
		y: -10,
		scale: 1.06,
		transition: { duration: 0.3, ease: 'easeOut' },
	},

	// Floating effect
	animate: {
		y: [0, -8, 0],
		transition: {
			duration: 5,
			repeat: Infinity,
			ease: 'easeInOut',
			delay: 0.2, // Per item
		},
	},

	// Hover glow
	glowHover: {
		boxShadow: [
			'0 0 0px rgba(255, 45, 45, 0)',
			'0 0 40px rgba(255, 45, 45, 0.3)',
		],
		transition: { duration: 0.4, ease: 'easeOut' },
	},
};

// ========================================
// 3. TEXT ANIMATIONS - CHARACTER REVEAL
// ========================================

// Apply to section titles and headings
const textAnimationEnhancements = {
	// Character by character reveal
	characterReveal: {
		container: {
			hidden: { opacity: 0 },
			visible: {
				opacity: 1,
				transition: {
					staggerChildren: 0.05,
					delayChildren: 0.1,
				},
			},
		},
		character: {
			hidden: { opacity: 0, y: '100%' },
			visible: {
				opacity: 1,
				y: 0,
				transition: {
					duration: 0.4,
					ease: 'easeOut',
				},
			},
		},
	},

	// Word by word reveal
	wordReveal: {
		container: {
			hidden: { opacity: 0 },
			visible: {
				opacity: 1,
				transition: {
					staggerChildren: 0.1,
					delayChildren: 0.2,
				},
			},
		},
		word: {
			hidden: { opacity: 0, x: -20 },
			visible: {
				opacity: 1,
				x: 0,
				transition: {
					duration: 0.5,
					ease: 'easeOut',
				},
			},
		},
	},

	// Gradient text animation
	gradientText: {
		animate: {
			backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
		},
		transition: {
			duration: 6,
			repeat: Infinity,
			ease: 'linear',
		},
	},
};

// ========================================
// 4. MODAL/LIGHTBOX - CINEMATIC TRANSITIONS
// ========================================

// Apply to src/components/shared/photoshop-project-modal.tsx
const modalEnhancements = {
	// Backdrop blur transition
	backdropVariants: {
		hidden: { backdropFilter: 'blur(0px)', opacity: 0 },
		visible: {
			backdropFilter: 'blur(12px)',
			opacity: 1,
			transition: { duration: 0.3, ease: 'easeOut' },
		},
		exit: {
			backdropFilter: 'blur(0px)',
			opacity: 0,
			transition: { duration: 0.2, ease: 'easeOut' },
		},
	},

	// Content scale and fade
	contentVariants: {
		hidden: { opacity: 0, scale: 0.92, y: 40 },
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: 'easeOut',
			},
		},
		exit: {
			opacity: 0,
			scale: 0.92,
			y: 40,
			transition: { duration: 0.3, ease: 'easeOut' },
		},
	},

	// Maximize cinematic scaling
	maximizeVariants: {
		minimize: { width: 'auto', height: 'auto' },
		maximize: {
			width: '90vw',
			height: '90vh',
			transition: {
				duration: 0.6,
				ease: 'easeInOut',
				type: 'spring',
				stiffness: 100,
				damping: 20,
			},
		},
	},
};

// ========================================
// 5. SCROLL ANIMATIONS - PARALLAX & REVEAL
// ========================================

// Apply throughout all sections
const scrollAnimationEnhancements = {
	// Parallax movement
	parallaxVariant: {
		initial: { y: 0, opacity: 0 },
		whileInView: {
			y: [-20, 0],
			opacity: 1,
		},
		transition: {
			duration: 1,
			ease: 'easeOut',
		},
	},

	// Scroll triggered appear
	scrollReveal: {
		initial: { opacity: 0, y: 60, scale: 0.9 },
		whileInView: {
			opacity: 1,
			y: 0,
			scale: 1,
		},
		viewport: { once: true, amount: 0.2 },
		transition: {
			duration: 0.7,
			ease: 'easeOut',
		},
	},

	// Staggered scroll reveal
	staggerScrollReveal: {
		container: {
			hidden: { opacity: 0 },
			visible: {
				opacity: 1,
				transition: {
					staggerChildren: 0.12,
					delayChildren: 0.1,
				},
			},
		},
		item: {
			hidden: { opacity: 0, y: 40 },
			visible: {
				opacity: 1,
				y: 0,
				transition: {
					duration: 0.6,
					ease: 'easeOut',
				},
			},
		},
	},
};

// ========================================
// 6. BUTTON MICRO-INTERACTIONS
// ========================================

const buttonEnhancements = {
	// Ripple effect
	rippleEffect: {
		initial: { scale: 0, opacity: 1 },
		animate: {
			scale: 3,
			opacity: 0,
			transition: { duration: 0.6, ease: 'easeOut' },
		},
	},

	// Magnetic hover
	magneticHover: {
		scale: [1, 1.02, 1.01],
		transition: { duration: 0.4, ease: 'easeOut' },
	},

	// Icon bounce
	iconBounce: {
		y: [0, -4, 0],
		transition: { duration: 0.4, ease: 'easeOut' },
	},

	// Button glow animation
	glowPulse: {
		boxShadow: [
			'0 0 10px rgba(255, 45, 45, 0)',
			'0 0 40px rgba(255, 45, 45, 0.5)',
			'0 0 10px rgba(255, 45, 45, 0)',
		],
		transition: {
			duration: 2,
			repeat: Infinity,
			ease: 'easeInOut',
		},
	},
};

// ========================================
// 7. LANGUAGE SWITCHER ANIMATION
// ========================================

// Apply to src/components/shared/language-dropdown.tsx
const languageSwitcherEnhancements = {
	// Fade transition
	fadeTransition: {
		exit: { opacity: 0, scale: 0.9 },
		enter: { opacity: 1, scale: 1 },
		transition: { duration: 0.3, ease: 'easeOut' },
	},

	// Text morph
	textMorph: {
		initial: { opacity: 0, y: -10 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 10 },
		transition: { duration: 0.3, ease: 'easeOut' },
	},

	// Stagger content update
	staggerUpdate: {
		container: {
			hidden: { opacity: 0 },
			visible: {
				opacity: 1,
				transition: {
					staggerChildren: 0.05,
				},
			},
		},
		item: {
			hidden: { opacity: 0, x: -10 },
			visible: { opacity: 1, x: 0 },
		},
	},
};

// ========================================
// 8. BACKGROUND EFFECTS - ANIMATED GLOWS
// ========================================

// Apply to all sections
const backgroundEffects = {
	// Moving gradient glow
	gradientGlow: {
		animate: {
			backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
		},
		transition: {
			duration: 8,
			repeat: Infinity,
			ease: 'linear',
		},
	},

	// Floating orb animation
	floatingOrb: {
		animate: {
			y: [0, -30, 0],
			opacity: [0.3, 0.8, 0.3],
			scale: [1, 1.15, 1],
		},
		transition: {
			duration: 8,
			repeat: Infinity,
			ease: 'easeInOut',
		},
	},

	// Ambient particle effect
	ambientParticle: {
		animate: {
			y: [0, -50, 0],
			x: [0, 20, 0],
			opacity: [0.2, 0.6, 0.2],
		},
		transition: {
			duration: 6,
			repeat: Infinity,
			ease: 'easeInOut',
			delay: 0.2,
		},
	},
};

// ========================================
// IMPLEMENTATION EXAMPLES
// ========================================

/*
// Example 1: Enhance a section with stagger and scroll reveal
<motion.div
	variants={staggerScrollReveal.container}
	initial="hidden"
	whileInView="visible"
	viewport={{ once: true, amount: 0.2 }}
>
	{items.map((item, i) => (
		<motion.div key={i} variants={staggerScrollReveal.item}>
			{item}
		</motion.div>
	))}
</motion.div>

// Example 2: Premium card hover effect
<motion.div
	initial={{ opacity: 0, y: 40 }}
	whileInView={{ opacity: 1, y: 0 }}
	whileHover={projectCardEnhancements.whileHover}
	viewport={{ once: true }}
	className="group relative overflow-hidden rounded-xl"
>
	<motion.div
		className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
		whileHover={projectCardEnhancements.shineSweep}
	/>
	{content}
</motion.div>

// Example 3: Cinematic modal
<motion.div
	variants={modalEnhancements.backdropVariants}
	initial="hidden"
	animate="visible"
	exit="exit"
>
	<motion.div
		variants={modalEnhancements.contentVariants}
		initial="hidden"
		animate="visible"
		exit="exit"
	>
		{content}
	</motion.div>
</motion.div>
*/

export {
	projectCardEnhancements,
	photoshopGalleryEnhancements,
	textAnimationEnhancements,
	modalEnhancements,
	scrollAnimationEnhancements,
	buttonEnhancements,
	languageSwitcherEnhancements,
	backgroundEffects,
};
