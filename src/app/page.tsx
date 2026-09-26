'use client';

import { BackToTop } from '@/components/layout/back-to-top';
import { Footer } from '@/components/layout/footer';
import { LoadingScreen } from '@/components/layout/loading-screen';
import { Navbar } from '@/components/layout/navbar';
import { LazySection } from '@/components/shared/lazy-section';

export default function HomePage() {
	return (
		<div className='min-h-screen w-full max-w-[100vw] overflow-x-hidden page-background'>
			<a href='#main-content' className='skip-link'>
				Skip to content
			</a>
			<LoadingScreen />
			<Navbar />
			<main id='main-content' className='w-full max-w-full overflow-x-hidden'>
				<LazySection
					id='home'
					eager
					load={() => import('@/components/sections/hero-section').then(module => ({ default: module.HeroSection }))}
					fallbackClassName='min-h-[100dvh]'
				/>
				<LazySection
					id='about'
					load={() => import('@/components/sections/about-section').then(module => ({ default: module.AboutSection }))}
				/>
				<LazySection
					id='skills'
					load={() =>
						import('@/components/sections/skills-section').then(module => ({ default: module.SkillsSection }))
					}
				/>
				<LazySection
					id='projects'
					load={() =>
						import('@/components/sections/projects-section').then(module => ({ default: module.ProjectsSection }))
					}
				/>
				<LazySection
					id='experience'
					load={() =>
						import('@/components/sections/experience-section').then(module => ({ default: module.ExperienceSection }))
					}
				/>
				<LazySection
					id='contact'
					load={() =>
						import('@/components/sections/contact-section').then(module => ({ default: module.ContactSection }))
					}
				/>
			</main>
			<Footer />
			<BackToTop />
		</div>
	);
}
