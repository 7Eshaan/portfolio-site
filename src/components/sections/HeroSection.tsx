"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolioConfig } from "@/config/portfolio";
import { 
  Github, 
  Linkedin, 
  ArrowUpRight, 
  GraduationCap, 
  Code
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";

export function HeroSection() {
  const [profileImgSrc, setProfileImgSrc] = useState<string>(
    portfolioConfig.personal.profileImage || "/images/avatar.svg"
  );

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Subtle Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.02] blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="relative max-w-6xl w-full mx-auto px-4 sm:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bio & Intro (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Main Name & Current Developer Status Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                Hi, I&apos;m{" "}
                <span className="text-white underline decoration-zinc-600 underline-offset-8 decoration-2">
                  {portfolioConfig.personal.name}
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-mono text-zinc-400">
                {portfolioConfig.personal.tagline}
              </p>
            </div>

            {/* College Highlight */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 backdrop-blur-sm text-xs font-mono text-zinc-200">
              <GraduationCap className="w-4 h-4 text-white" />
              <span>{portfolioConfig.personal.college}</span>
            </div>

            {/* About Paragraph */}
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl">
              {portfolioConfig.personal.about}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              <a href="#projects" className="w-full sm:w-auto">
                <Button variant="primary" size="md" className="w-full sm:w-auto font-mono text-xs">
                  View Projects <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </a>

              <a
                href={portfolioConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="secondary"
                  size="md"
                  icon={<Github className="w-4 h-4" />}
                  className="w-full sm:w-auto font-mono text-xs"
                >
                  GitHub
                </Button>
              </a>

              <a
                href={portfolioConfig.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="secondary"
                  size="md"
                  icon={<Code className="w-4 h-4" />}
                  className="w-full sm:w-auto font-mono text-xs"
                >
                  LeetCode
                </Button>
              </a>

              <a
                href={portfolioConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="secondary"
                  size="md"
                  icon={<Linkedin className="w-4 h-4" />}
                  className="w-full sm:w-auto font-mono text-xs"
                >
                  LinkedIn
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Profile Picture (PFP) Showcase with 3D Tilt (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <TiltCard maxTilt={10} scale={1.03} className="relative w-full max-w-[340px] group rounded-2xl">
              
              {/* Decorative Corner Accents */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-white z-20 pointer-events-none transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-white z-20 pointer-events-none transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-white z-20 pointer-events-none transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-white z-20 pointer-events-none transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />

              {/* Main Clean Photo Card Frame */}
              <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-2xl bg-zinc-950/90 border border-zinc-800 p-2 shadow-2xl overflow-hidden group-hover:border-zinc-500 transition-all duration-300 backdrop-blur-sm">
                
                {/* Photo container with object-cover and grayscale filter with hover contrast */}
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-900 flex items-center justify-center">
                  <Image
                    src={profileImgSrc}
                    alt={portfolioConfig.personal.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    priority
                    className="object-cover object-[75%_center] grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105 transition-all duration-700 ease-out cursor-pointer"
                    onError={() => {
                      setProfileImgSrc("/images/avatar.svg");
                    }}
                  />

                  {/* Dark subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

            </TiltCard>
          </div>

        </div>
      </div>
    </section>
  );
}
