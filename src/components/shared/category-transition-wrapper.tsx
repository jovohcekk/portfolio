'use client';

import {
    getAnimationVariants,
    useSmartCategoryAnimation,
    type AnimationStyle,
} from '@/hooks/use-category-animations'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

interface CategoryTransitionWrapperProps {
children: React.ReactNode
categoryId: string | number
animationStyle?: AnimationStyle | 'auto'
}

/**
 * Smart Category Transition Wrapper
 * Applies PREMIUM, VISUALLY OBVIOUS animations when category changes
 * DRAMATICALLY enhanced for maximum impact and visibility
 */
export function CategoryTransitionWrapper({
	children,
	categoryId,
	animationStyle = 'auto',
}: CategoryTransitionWrapperProps) {
	const { getNextAnimation } = useSmartCategoryAnimation()
	const [currentStyle, setCurrentStyle] = useState<AnimationStyle>('fadeBlurScale')
	const previousCategoryRef = useRef<string | number | null>(null)

	// Update animation style when category changes
	useEffect(() => {
		if (categoryId !== previousCategoryRef.current) {
			if (animationStyle === 'auto') {
				// If using auto mode, get next animation
				setCurrentStyle(getNextAnimation())
			} else {
				// Use specified animation
				setCurrentStyle(animationStyle)
			}
			previousCategoryRef.current = categoryId
		}
	}, [categoryId, animationStyle, getNextAnimation])

	const animationVariants = getAnimationVariants(currentStyle)

	return (
		<AnimatePresence mode='wait'>
			<motion.div
				key={`category-${categoryId}`}
				initial='hidden'
				animate='visible'
				exit='exit'
				variants={animationVariants}>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}

interface CategoryTabsProps {
categories: Array<{
id: string | number
label: string
count?: number
}>
activeCategory: string | number
onCategoryChange: (categoryId: string | number) => void
showSlider?: boolean
}

/**
 * Premium Category Tabs Component
 * With smart animation rotation and premium styling
 */
export function PremiumCategoryTabs({
categories,
activeCategory,
onCategoryChange,
showSlider = true,
}: CategoryTabsProps) {
const [sliderStyle, setSliderStyle] = useState({
left: 0,
width: 0,
})
const containerRef = useRef<HTMLDivElement>(null)
const activeTabRef = useRef<HTMLButtonElement>(null)

// Update slider position on active category change
useEffect(() => {
if (activeTabRef.current && containerRef.current) {
const activeTab = activeTabRef.current
setSliderStyle({
left: activeTab.offsetLeft,
width: activeTab.offsetWidth,
})
}
}, [activeCategory])

// Handle window resize
useEffect(() => {
const handleResize = () => {
if (activeTabRef.current && containerRef.current) {
const activeTab = activeTabRef.current
setSliderStyle({
left: activeTab.offsetLeft,
width: activeTab.offsetWidth,
})
}
}

window.addEventListener('resize', handleResize)
return () => window.removeEventListener('resize', handleResize)
}, [])

return (
<div className='w-full'>
<div
ref={containerRef}
className='relative flex w-full flex-wrap items-center gap-2 rounded-full bg-[rgb(var(--surface-secondary-rgb)/0.5)] p-2 backdrop-blur-sm xs:gap-3 xs:p-3'>
{/* Animated background slider - ENHANCED */}
{showSlider && (
<motion.div
className='absolute top-2 z-0 rounded-full bg-gradient-to-r from-[rgb(var(--accent-primary)/0.25)] to-[rgb(var(--accent-secondary)/0.25)] shadow-lg xs:top-3'
initial={{ left: sliderStyle.left, width: sliderStyle.width }}
animate={{ left: sliderStyle.left, width: sliderStyle.width }}
transition={{
type: 'spring',
stiffness: 400,
damping: 35,
mass: 0.8,
}}
style={{
height: 'calc(100% - 16px)',
pointerEvents: 'none',
boxShadow: 'inset 0 0 20px rgba(var(--accent-primary), 0.2), 0 0 30px rgba(var(--accent-primary), 0.2)',
}}
/>
)}

{/* Category buttons - ENHANCED with premium hover */}
{categories.map((category) => {
const isActive = activeCategory === category.id

return (
<motion.button
key={category.id}
ref={isActive ? activeTabRef : null}
onClick={() => onCategoryChange(category.id)}
className={`relative z-10 flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 font-medium transition-all duration-300 xs:px-5 xs:py-2.5 ${
isActive
? 'text-accent shadow-[0_0_20px_rgba(var(--accent-primary),0.4)]'
: 'text-secondary-content hover:text-primary-content'
}`}
whileHover={{ scale: 1.08 }}
whileTap={{ scale: 0.95 }}>
<span>{category.label}</span>
{category.count !== undefined && (
<motion.span
className={`text-xs font-semibold ${
isActive
? 'bg-[rgb(var(--accent-primary)/0.4)] text-accent'
: 'bg-[rgb(var(--surface-elevated-rgb)/0.5)]'
} rounded-full px-2 py-0.5`}
animate={
isActive
? {
scale: [1, 1.1, 1],
backgroundColor: [
'rgba(var(--accent-primary), 0.4)',
'rgba(var(--accent-primary), 0.6)',
'rgba(var(--accent-primary), 0.4)',
],
}
: {}
}
transition={
isActive
? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
: {}
}>
{category.count}
</motion.span>
)}
</motion.button>
)
})}
</div>

{/* Category indicator text - ENHANCED */}
<motion.div
className='mt-4 text-center text-sm font-medium'
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: 10 }}
transition={{ duration: 0.5 }}>
<span className='text-accent'>
{categories.find((cat) => cat.id === activeCategory)?.label}
</span>
</motion.div>
</div>
)
}

interface CategoryCardGridProps {
items: Array<{
id: string | number
content: React.ReactNode
}>
columns?: number
gap?: string
}

/**
 * Animated Category Card Grid
 * Applies staggered animations to cards
 */
export function AnimatedCategoryCardGrid({
items,
columns = 3,
gap = 'gap-4 xs:gap-6',
}: CategoryCardGridProps) {
const containerVariants = {
hidden: { opacity: 0 },
visible: {
opacity: 1,
transition: {
staggerChildren: 0.12,
delayChildren: 0.2,
},
},
exit: {
opacity: 0,
transition: {
staggerChildren: 0.06,
staggerDirection: -1,
},
},
}

const itemVariants = {
hidden: { 
opacity: 0, 
y: 60, 
scale: 0.8, 
filter: 'blur(15px)' 
},
visible: {
opacity: 1,
y: 0,
scale: 1,
filter: 'blur(0px)',
transition: {
duration: 0.7,
ease: [0.34, 1.56, 0.64, 1],
},
},
exit: {
opacity: 0,
y: -60,
scale: 0.8,
filter: 'blur(15px)',
transition: { duration: 0.5 },
},
}

return (
<AnimatePresence mode='wait'>
<motion.div
key={`grid-${items.length}`}
variants={containerVariants}
initial='hidden'
animate='visible'
exit='exit'
className={`grid w-full grid-cols-1 ${gap} ${
columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-4'
}`}>
{items.map((item) => (
<motion.div key={item.id} variants={itemVariants}>
{item.content}
</motion.div>
))}
</motion.div>
</AnimatePresence>
)
}
