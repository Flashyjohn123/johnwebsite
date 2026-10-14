import { BackgroundParticles } from "@/components/BackgroundParticles";
import { Hero } from "@/components/Hero";
import { SongDial } from "@/components/SongDial";
import { BentoGrid } from "@/components/BentoGrid";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { NavbarDock } from "@/components/NavbarDock";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 selection:text-zinc-100 overflow-x-hidden">
      {/* Background Floating Dust Particles */}
      <BackgroundParticles />

      {/* Main Container */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <SongDial />
        <BentoGrid />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>

      {/* Persistent Floating Bottom Dock */}
      <NavbarDock />
    </div>
  );
}
