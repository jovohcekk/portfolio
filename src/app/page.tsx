import { BackToTop } from '@/components/layout/back-to-top'
import { Footer } from '@/components/layout/footer'
import { LoadingScreen } from '@/components/layout/loading-screen'
import { Navbar } from '@/components/layout/navbar'
import { AboutSection } from '@/components/sections/about-section'
import { ContactSection } from '@/components/sections/contact-section'
import { ExperienceSection } from '@/components/sections/experience-section'
import { HeroSection } from '@/components/sections/hero-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { SkillsSection } from '@/components/sections/skills-section'

export default function HomePage() {
	return (
		<div className='min-h-screen w-full max-w-[100vw] overflow-x-hidden page-background'>
			<a href='#main-content' className='skip-link'>
				Skip to content
			</a>
			<LoadingScreen />
			<Navbar />
			<main id='main-content' className='w-full max-w-full overflow-x-hidden'>
				<HeroSection />
				<AboutSection />
				<SkillsSection />
				<ProjectsSection />
				<ExperienceSection />
				<ContactSection />
			</main>
			<Footer />
			<BackToTop />
		</div>
	);
}
