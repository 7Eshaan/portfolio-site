"use client";

import React from "react";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TechStackMarquee } from "@/components/sections/TechStackMarquee";
import { GitHubSection } from "@/components/sections/GitHubSection";
import { LeetCodeSection } from "@/components/sections/LeetCodeSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { InteractiveBackground } from "@/components/ui/InteractiveBackground";
import { portfolioConfig } from "@/config/portfolio";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative selection:bg-white selection:text-black">
      {/* Global Interactive Neural Constellation Particle Network (Across all sections) */}
      <InteractiveBackground />

      {/* Navigation */}
      <Navbar />

      {/* Hero with Right-side PFP */}
      <HeroSection />

      {/* Infinite Conveyor Belt Tech Stack Marquee */}
      <TechStackMarquee />

      {/* GitHub Live Process & Stats */}
      <GitHubSection />

      {/* LeetCode Problem Solving Progress */}
      <LeetCodeSection />

      {/* Selected Engineered Projects */}
      <ProjectsSection />

      {/* Modular Timeline (Displays when enabled in config or ready to be toggled) */}
      {portfolioConfig.features.enableTimeline && <TimelineSection />}

      {/* Contact & Socials */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
