"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BackgroundParticles } from "@/components/BackgroundParticles";
import { Hero } from "@/components/Hero";
import { SongDial } from "@/components/SongDial";
import { BentoGrid } from "@/components/BentoGrid";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { NavbarDock, TabId } from "@/components/NavbarDock";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 selection:text-zinc-100 overflow-x-hidden flex flex-col justify-between">
      {/* Background Floating Dust Particles & Comets */}
      <BackgroundParticles />

      {/* Main Tab Screen Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex flex-col items-center justify-center"
          >
            {activeTab === "home" && <Hero />}
            {activeTab === "vibes" && <SongDial />}
            {activeTab === "about" && <BentoGrid />}
            {activeTab === "skills" && <SkillsSection />}
            {activeTab === "projects" && <ProjectsSection />}
            {activeTab === "contact" && <ContactSection />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Fixed/Absolute Top Navigation Dock with Tab Switching */}
      <NavbarDock activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Compact Site Footer */}
      <Footer />
    </div>
  );
}
