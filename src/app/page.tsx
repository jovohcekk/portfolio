import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { BackToTop } from "@/components/layout/back-to-top";
import { ClientEffects } from "@/components/layout/client-effects";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ContactSection } from "@/components/sections/contact-section";

const PhotoshopSection = dynamic(() =>
  import("@/components/sections/photoshop-section").then((m) => m.PhotoshopSection)
);

export default function HomePage() {
  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden page-background">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <LoadingScreen />
      <ClientEffects />
      <Navbar />
      <main id="main-content" className="w-full max-w-full overflow-x-hidden">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <PhotoshopSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
