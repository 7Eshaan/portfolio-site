"use client";

import React, { useState } from "react";
import { portfolioConfig } from "@/config/portfolio";
import { TechIcon } from "@/components/ui/TechIcon";

// Vibrant Electric Neon Brand Colors for TechStack Tools
const techBrandMap: Record<
  string,
  { color: string; bg: string; border: string; glow: string }
> = {
  java: {
    color: "#FF9100",
    bg: "rgba(255, 145, 0, 0.16)",
    border: "#FF9100",
    glow: "rgba(255, 145, 0, 0.6)",
  },
  springboot: {
    color: "#00FF66",
    bg: "rgba(0, 255, 102, 0.16)",
    border: "#00FF66",
    glow: "rgba(0, 255, 102, 0.6)",
  },
  spring: {
    color: "#00FF66",
    bg: "rgba(0, 255, 102, 0.16)",
    border: "#00FF66",
    glow: "rgba(0, 255, 102, 0.6)",
  },
  nextjs: {
    color: "#FFFFFF",
    bg: "rgba(255, 255, 255, 0.2)",
    border: "#FFFFFF",
    glow: "rgba(255, 255, 255, 0.7)",
  },
  next: {
    color: "#FFFFFF",
    bg: "rgba(255, 255, 255, 0.2)",
    border: "#FFFFFF",
    glow: "rgba(255, 255, 255, 0.7)",
  },
  react: {
    color: "#00F0FF",
    bg: "rgba(0, 240, 255, 0.16)",
    border: "#00F0FF",
    glow: "rgba(0, 240, 255, 0.6)",
  },
  nodejs: {
    color: "#39FF14",
    bg: "rgba(57, 255, 20, 0.16)",
    border: "#39FF14",
    glow: "rgba(57, 255, 20, 0.6)",
  },
  node: {
    color: "#39FF14",
    bg: "rgba(57, 255, 20, 0.16)",
    border: "#39FF14",
    glow: "rgba(57, 255, 20, 0.6)",
  },
  typescript: {
    color: "#00D2FF",
    bg: "rgba(0, 210, 255, 0.16)",
    border: "#00D2FF",
    glow: "rgba(0, 210, 255, 0.6)",
  },
  ts: {
    color: "#00D2FF",
    bg: "rgba(0, 210, 255, 0.16)",
    border: "#00D2FF",
    glow: "rgba(0, 210, 255, 0.6)",
  },
  javascript: {
    color: "#FFE600",
    bg: "rgba(255, 230, 0, 0.16)",
    border: "#FFE600",
    glow: "rgba(255, 230, 0, 0.65)",
  },
  js: {
    color: "#FFE600",
    bg: "rgba(255, 230, 0, 0.16)",
    border: "#FFE600",
    glow: "rgba(255, 230, 0, 0.65)",
  },
  docker: {
    color: "#00A6FF",
    bg: "rgba(0, 166, 255, 0.16)",
    border: "#00A6FF",
    glow: "rgba(0, 166, 255, 0.6)",
  },
  postgresql: {
    color: "#4D7CFF",
    bg: "rgba(77, 124, 255, 0.16)",
    border: "#4D7CFF",
    glow: "rgba(77, 124, 255, 0.6)",
  },
  postgres: {
    color: "#4D7CFF",
    bg: "rgba(77, 124, 255, 0.16)",
    border: "#4D7CFF",
    glow: "rgba(77, 124, 255, 0.6)",
  },
  mongodb: {
    color: "#00FF88",
    bg: "rgba(0, 255, 136, 0.16)",
    border: "#00FF88",
    glow: "rgba(0, 255, 136, 0.6)",
  },
  mongo: {
    color: "#00FF88",
    bg: "rgba(0, 255, 136, 0.16)",
    border: "#00FF88",
    glow: "rgba(0, 255, 136, 0.6)",
  },
  git: {
    color: "#FF3D00",
    bg: "rgba(255, 61, 0, 0.16)",
    border: "#FF3D00",
    glow: "rgba(255, 61, 0, 0.6)",
  },
  tailwindcss: {
    color: "#00F5FF",
    bg: "rgba(0, 245, 255, 0.16)",
    border: "#00F5FF",
    glow: "rgba(0, 245, 255, 0.6)",
  },
  tailwind: {
    color: "#00F5FF",
    bg: "rgba(0, 245, 255, 0.16)",
    border: "#00F5FF",
    glow: "rgba(0, 245, 255, 0.6)",
  },
  redis: {
    color: "#FF0055",
    bg: "rgba(255, 0, 85, 0.16)",
    border: "#FF0055",
    glow: "rgba(255, 0, 85, 0.6)",
  },
  restapis: {
    color: "#76FF03",
    bg: "rgba(118, 255, 3, 0.16)",
    border: "#76FF03",
    glow: "rgba(118, 255, 3, 0.6)",
  },
  restapi: {
    color: "#76FF03",
    bg: "rgba(118, 255, 3, 0.16)",
    border: "#76FF03",
    glow: "rgba(118, 255, 3, 0.6)",
  },
  graphql: {
    color: "#FF007F",
    bg: "rgba(255, 0, 127, 0.16)",
    border: "#FF007F",
    glow: "rgba(255, 0, 127, 0.6)",
  },
  linux: {
    color: "#FFD600",
    bg: "rgba(255, 214, 0, 0.16)",
    border: "#FFD600",
    glow: "rgba(255, 214, 0, 0.6)",
  },
  python: {
    color: "#2979FF",
    bg: "rgba(41, 121, 255, 0.16)",
    border: "#2979FF",
    glow: "rgba(41, 121, 255, 0.6)",
  },
  postman: {
    color: "#FF6D00",
    bg: "rgba(255, 109, 0, 0.16)",
    border: "#FF6D00",
    glow: "rgba(255, 109, 0, 0.6)",
  },
};

function TechItemCard({ item }: { item: { name: string; category: string; iconName: string; experienceLevel?: string } }) {
  const [isHovered, setIsHovered] = useState(false);
  const normalizedKey = item.iconName.toLowerCase().replace(/[\s.-]/g, "");
  const brand = techBrandMap[normalizedKey] || {
    color: "#FFFFFF",
    bg: "rgba(255, 255, 255, 0.15)",
    border: "#FFFFFF",
    glow: "rgba(255, 255, 255, 0.5)",
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered ? brand.bg : "rgba(24, 24, 27, 0.85)",
        borderColor: isHovered ? brand.border : "rgba(39, 39, 42, 0.9)",
        boxShadow: isHovered
          ? `0 0 28px ${brand.glow}, 0 0 10px ${brand.color}, inset 0 0 14px ${brand.bg}`
          : "none",
        transform: isHovered ? "scale(1.08)" : "scale(1)",
      }}
      className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border text-zinc-200 transition-all duration-300 cursor-pointer shadow-md select-none"
    >
      <div
        style={{
          color: isHovered ? brand.color : "#a1a1aa",
          filter: isHovered
            ? `drop-shadow(0 0 8px ${brand.color}) drop-shadow(0 0 16px ${brand.glow})`
            : "none",
        }}
        className="transition-all duration-300 flex items-center justify-center shrink-0"
      >
        <TechIcon name={item.iconName} className="w-5 h-5" />
      </div>

      <div className="flex flex-col text-left">
        <span
          style={{
            color: isHovered ? brand.color : "#ffffff",
            textShadow: isHovered ? `0 0 14px ${brand.glow}` : "none",
          }}
          className="text-sm font-semibold font-mono tracking-tight transition-all duration-300"
        >
          {item.name}
        </span>
        <span
          style={{
            color: isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(161, 161, 170, 0.8)",
          }}
          className="text-[10px] font-mono transition-colors duration-300"
        >
          {item.category}
        </span>
      </div>
    </div>
  );
}

export function TechStackMarquee() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Language", "Framework", "Database", "DevOps & Tools", "Architecture"];

  const filteredTech =
    activeCategory === "All"
      ? portfolioConfig.techStack
      : portfolioConfig.techStack.filter((t) => t.category === activeCategory);

  // Split stack into 2 rows for alternating conveyor belt effect
  const midIndex = Math.ceil(portfolioConfig.techStack.length / 2);
  const row1 = portfolioConfig.techStack.slice(0, midIndex);
  const row2 = portfolioConfig.techStack.slice(midIndex);

  // Double items for seamless infinite loop
  const infiniteRow1 = [...row1, ...row1, ...row1, ...row1];
  const infiniteRow2 = [...row2, ...row2, ...row2, ...row2];

  return (
    <section id="tech-stack" className="py-16 border-y border-zinc-800/80 bg-zinc-950/40 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-white/[0.02] blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              TechStack
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800 backdrop-blur-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                  activeCategory === cat
                    ? "bg-white text-black font-semibold shadow"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Infinite Marquee Conveyor Belts (Shows when 'All' is selected) */}
      {activeCategory === "All" ? (
        <div className="space-y-4 relative w-full overflow-hidden">
          {/* Left and Right Fade Gradients */}
          <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

          {/* Belt Row 1: Leftward Infinite Marquee */}
          <div className="flex overflow-hidden group">
            <div className="flex gap-4 animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap py-1">
              {infiniteRow1.map((item, idx) => (
                <TechItemCard key={`${item.name}-r1-${idx}`} item={item} />
              ))}
            </div>
          </div>

          {/* Belt Row 2: Rightward Infinite Marquee */}
          <div className="flex overflow-hidden group">
            <div className="flex gap-4 animate-marquee-reverse group-hover:[animation-play-state:paused] whitespace-nowrap py-1">
              {infiniteRow2.map((item, idx) => (
                <TechItemCard key={`${item.name}-r2-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Filtered Grid View when specific category is chosen */
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredTech.map((item) => {
              const normalizedKey = item.iconName.toLowerCase().replace(/[\s.-]/g, "");
              const brand = techBrandMap[normalizedKey] || {
                color: "#FFFFFF",
                bg: "rgba(255, 255, 255, 0.15)",
                border: "#FFFFFF",
                glow: "rgba(255, 255, 255, 0.5)",
              };

              return (
                <div
                  key={item.name}
                  style={{
                    ["--hover-bg" as any]: brand.bg,
                    ["--hover-border" as any]: brand.border,
                    ["--hover-color" as any]: brand.color,
                    ["--hover-glow" as any]: brand.glow,
                  }}
                  className="flex flex-col items-center justify-center text-center p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-200 transition-all duration-300 cursor-pointer hover:border-[var(--hover-border)] hover:bg-[var(--hover-bg)] hover:shadow-[0_0_25px_var(--hover-glow)] hover:scale-105 group"
                >
                  <div
                    style={{
                      color: "var(--hover-color)",
                      filter: "drop-shadow(0 0 8px var(--hover-glow))",
                    }}
                    className="w-8 h-8 text-zinc-400 group-hover:text-[var(--hover-color)] mb-2 transition-colors duration-300"
                  >
                    <TechIcon name={item.iconName} className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-semibold font-mono group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 mt-0.5">
                    {item.experienceLevel || item.category}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
