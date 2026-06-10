'use client';

import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Layers, ZoomIn } from 'lucide-react';
import { useIsDark } from '@/hooks/use-is-dark';
import { SectionHeading } from '@/components/shared/section-heading';
import { Lightbox } from '@/components/shared/lightbox';
import { FloatingShapes } from '@/components/shared/floating-shapes';
import { GlowCard } from '@/components/shared/glow-card';
import { useLanguage } from '@/hooks/use-language';
import { photoshopProjects } from '@/config/portfolio';
import { slideInScale, staggerContainerFast, premiumSlideLeftGlow, premiumBlurToClear } from '@/lib/animations';
import { cn } from '@/lib/utils';
import type { TranslationKey } from '@/lib/i18n/translations';

export function PhotoshopSection() {
const { translate } = useLanguage();
const isDark = useIsDark();
const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
const filteredProjects = useMemo(() => photoshopProjects, []);
const lightboxItems = useMemo(
() =>
filteredProjects.map(p => ({
id: p.id,
title: p.title,
description: p.description,
image: p.image,
category: translate(`photoshop.category.${p.category}` as TranslationKey),
badge: translate('photoshop.badge'),
})),
[filteredProjects, translate],
);

const openLightbox = useCallback(
(id: string) => {
const index = filteredProjects.findIndex(p => p.id === id);
if (index >= 0) setLightboxIndex(index);
},
[filteredProjects],
);

return (
<section
id='photoshop'
className={cn(
'relative w-full max-w-full overflow-hidden section-spacing',
isDark ? '' : 'section-surface-alt',
)}>
{isDark ? (
<>
<div className='absolute inset-0 bg-[#030303]' aria-hidden />
<motion.div
className='absolute inset-0 opacity-40'
animate={{ opacity: [0.35, 0.5, 0.35] }}
transition={{ duration: 8, repeat: Infinity }}
style={{
backgroundImage:
'radial-gradient(ellipse 80% 50% at 20% 0%, rgba(220,38,38,0.15) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(220,38,38,0.08) 0%, transparent 50%)',
}}
aria-hidden
/>
</>
) : (
<>
<div className='absolute inset-0 bg-[var(--bg-deep)]' aria-hidden />
<motion.div
className='absolute inset-0 opacity-60'
animate={{ opacity: [0.5, 0.65, 0.5] }}
transition={{ duration: 10, repeat: Infinity }}
style={{
backgroundImage:
'radial-gradient(ellipse 75% 50% at 15% 0%, rgba(59,130,246,0.07) 0%, transparent 50%), radial-gradient(ellipse 60% 45% at 85% 100%, rgba(6,182,212,0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 35% at 50% 50%, rgba(20,184,166,0.04) 0%, transparent 55%)',
}}
aria-hidden
/>
</>
)}

<FloatingShapes variant='photoshop' />

<div className='section-container relative z-10'>
<SectionHeading title={translate('photoshop.title')} subtitle={translate('photoshop.subtitle')} dark={isDark} />

<motion.div
variants={staggerContainerFast}
initial='hidden'
whileInView='visible'
viewport={{ once: true, margin: '-40px' }}
className='columns-1 gap-4 xs:columns-2 xs:gap-5 md:gap-6 lg:columns-3'>
<AnimatePresence mode='popLayout'>
{filteredProjects.map((project, index) => (
<motion.article
key={project.id}
layout
variants={[slideInScale, premiumSlideLeftGlow, premiumBlurToClear][index % 3]}
initial='hidden'
whileInView='visible'
exit={{ opacity: 0, scale: 0.92 }}
viewport={{ once: true, margin: '-30px' }}
transition={{ layout: { duration: 0.35 }, delay: (index % 3) * 0.08 }}
className='mb-4 break-inside-avoid xs:mb-5 md:mb-6'>
<GlowCard variant={isDark ? 'red' : 'blue'}>
<button
type='button'
onClick={() => openLightbox(project.id)}
className={cn(
'group relative w-full overflow-hidden rounded-2xl text-left backdrop-blur-xl transition-all duration-500 focus-visible:outline-none focus-visible:ring-2',
isDark
? 'border border-white/8 bg-white/5 hover:border-red-500/50 focus-visible:ring-red-500/50'
: 'glass-card hover-accent-highlight focus-visible:ring-[rgb(var(--accent-primary)/0.35)]',
)}>
<div className='relative overflow-hidden'>
<motion.div
className='relative w-full'
whileHover={{ scale: 1.06 }}
transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
<Image
src={project.image}
alt={project.title}
width={800}
height={600}
className='w-full object-cover'
loading='lazy'
sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
/>
</motion.div>

<motion.div
className={cn(
'absolute inset-0 bg-gradient-to-t to-transparent',
isDark ? 'from-black/90 via-black/40' : 'from-[var(--bg-deep)]/90 via-[var(--bg-deep)]/35',
)}
initial={{ opacity: isDark ? 0.55 : 0.35 }}
whileHover={{ opacity: isDark ? 0.92 : 0.82 }}
transition={{ duration: 0.4 }}
/>

<motion.div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
<motion.span
className={cn(
'flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-sm',
isDark
? 'border border-white/30 bg-black/50 text-white'
: 'border border-[var(--border-subtle)] bg-[rgb(var(--surface-elevated-rgb)/0.85)] text-accent shadow-soft',
)}
whileHover={{ scale: 1.1 }}>
<ZoomIn className='h-5 w-5' />
</motion.span>
</motion.div>

<div className='absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 xs:p-5'>
<span
className={cn(
'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium xs:text-xs',
isDark ? 'bg-red-500/20 text-red-400' : 'bg-[rgb(var(--accent-primary)/0.1)] text-accent',
)}>
<Layers className='h-3 w-3' />
{translate('photoshop.badge')}
</span>

<h3
className={cn(
'mt-2 text-base font-semibold xs:text-lg',
isDark ? 'text-white' : 'text-primary-content',
)}>
{project.title}
</h3>

<p
className={cn(
'mt-1 line-clamp-2 text-xs xs:text-sm',
isDark ? 'text-white/70' : 'text-secondary-content',
)}>
{project.description}
</p>

<span
className={cn(
'mt-2 inline-block rounded-full border px-2 py-0.5 text-[0.65rem] xs:text-xs',
isDark
? 'border-white/15 text-white/50'
: 'border-[var(--border-subtle)] text-secondary-content',
)}>
{translate(`photoshop.category.${project.category}` as TranslationKey)}
</span>
</div>
</div>

<div
className={cn(
'border-t p-3 xs:p-4 md:hidden',
isDark ? 'border-white/5' : 'border-[var(--border-subtle)]',
)}>
<span
className={cn(
'text-[0.65rem] font-medium xs:text-xs',
isDark ? 'text-red-400' : 'text-accent',
)}>
{translate('photoshop.badge')}
</span>

<h3
className={cn(
'mt-1 text-sm font-semibold',
isDark ? 'text-white' : 'text-primary-content',
)}>
{project.title}
</h3>
</div>
</button>
</GlowCard>
</motion.article>
))}
</AnimatePresence>
</motion.div>
</div>

<Lightbox
items={lightboxItems}
activeIndex={lightboxIndex}
onClose={() => setLightboxIndex(null)}
onNavigate={setLightboxIndex}
/>
</section>
);
}
