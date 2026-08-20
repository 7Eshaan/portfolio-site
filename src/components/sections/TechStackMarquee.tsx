"use client";

import React, { useState } from "react";
import { portfolioConfig } from "@/config/portfolio";
import { TechIcon } from "@/components/ui/TechIcon";

// Official brand accent colors for each tech tool
const techBrandMap: Record<
  string,
  { color: string; bg: string; border: string; glow: string }
> = {
  java: {
    color: "#F89820",
    bg: "rgba(248, 152, 32, 0.12)",
    border: "rgba(248, 152, 32, 0.6)",
    glow: "rgba(248, 152, 32, 0.35)",
  },
  springboot: {
    color: "#6DB33F",
    bg: "rgba(109, 179, 63, 0.12)",
    border: "rgba(109, 179, 63, 0.6)",
    glow: "rgba(109, 179, 63, 0.35)",
  },
  spring: {
    color: "#6DB33F",
    bg: "rgba(109, 179, 63, 0.12)",
    border: "rgba(109, 179, 63, 0.6)",
    glow: "rgba(109, 179, 63, 0.35)",
  },
  nextjs: {
    color: "#FFFFFF",
    bg: "rgba(255, 255, 255, 0.15)",
    border: "rgba(255, 255, 255, 0.8)",
    glow: "rgba(255, 255, 255, 0.3)",
  },
  next: {
    color: "#FFFFFF",
    bg: "rgba(255, 255, 255, 0.15)",
    border: "rgba(255, 255, 255, 0.8)",
    glow: "rgba(255, 255, 255, 0.3)",
  },
  react: {
    color: "#61DAFB",
    bg: "rgba(97, 218, 251, 0.12)",
    border: "rgba(97, 218, 251, 0.6)",
    glow: "rgba(97, 218, 251, 0.35)",
  },
  nodejs: {
    color: "#5FA04E",
    bg: "rgba(95, 160, 78, 0.12)",
    border: "rgba(95, 160, 78, 0.6)",
    glow: "rgba(95, 160, 78, 0.35)",
  },
  node: {
    color: "#5FA04E",
    bg: "rgba(95, 160, 78, 0.12)",
    border: "rgba(95, 160, 78, 0.6)",
    glow: "rgba(95, 160, 78, 0.35)",
  },
  typescript: {
    color: "#3178C6",
    bg: "rgba(49, 120, 198, 0.14)",
    border: "rgba(49, 120, 198, 0.65)",
    glow: "rgba(49, 120, 198, 0.35)",
  },
  ts: {
    color: "#3178C6",
    bg: "rgba(49, 120, 198, 0.14)",
    border: "rgba(49, 120, 198, 0.65)",
    glow: "rgba(49, 120, 198, 0.35)",
  },
  javascript: {
    color: "#F7DF1E",
    bg: "rgba(247, 223, 30, 0.12)",
    border: "rgba(247, 223, 30, 0.6)",
    glow: "rgba(247, 223, 30, 0.35)",
  },
  js: {
    color: "#F7DF1E",
    bg: "rgba(247, 223, 30, 0.12)",
    border: "rgba(247, 223, 30, 0.6)",
    glow: "rgba(247, 223, 30, 0.35)",
  },
  docker: {
    color: "#2496ED",
    bg: "rgba(36, 150, 237, 0.14)",
    border: "rgba(36, 150, 237, 0.65)",
    glow: "rgba(36, 150, 237, 0.35)",
  },
  postgresql: {
    color: "#4169E1",
    bg: "rgba(65, 105, 225, 0.14)",
    border: "rgba(65, 105, 225, 0.65)",
    glow: "rgba(65, 105, 225, 0.35)",
  },
  postgres: {
    color: "#4169E1",
    bg: "rgba(65, 105, 225, 0.14)",
    border: "rgba(65, 105, 225, 0.65)",
    glow: "rgba(65, 105, 225, 0.35)",
  },
  mongodb: {
    color: "#47A248",
    bg: "rgba(71, 162, 72, 0.14)",
    border: "rgba(71, 162, 72, 0.65)",
    glow: "rgba(71, 162, 72, 0.35)",
  },
  mongo: {
    color: "#47A248",
    bg: "rgba(71, 162, 72, 0.14)",
    border: "rgba(71, 162, 72, 0.65)",
    glow: "rgba(71, 162, 72, 0.35)",
  },
  git: {
    color: "#F05032",
    bg: "rgba(240, 80, 50, 0.12)",
    border: "rgba(240, 80, 50, 0.6)",
    glow: "rgba(240, 80, 50, 0.35)",
  },
  tailwindcss: {
    color: "#06B6D4",
    bg: "rgba(6, 182, 212, 0.14)",
    border: "rgba(6, 182, 212, 0.65)",
    glow: "rgba(6, 182, 212, 0.35)",
  },
  tailwind: {
    color: "#06B6D4",
    bg: "rgba(6, 182, 212, 0.14)",
    border: "rgba(6, 182, 212, 0.65)",
    glow: "rgba(6, 182, 212, 0.35)",
  },
  redis: {
    color: "#DC382D",
    bg: "rgba(220, 56, 45, 0.14)",
    border: "rgba(220, 56, 45, 0.65)",
    glow: "rgba(220, 56, 45, 0.35)",
  },
  restapis: {
    color: "#85EA2D",
    bg: "rgba(133, 234, 45, 0.12)",
    border: "rgba(133, 234, 45, 0.6)",
    glow: "rgba(133, 234, 45, 0.35)",
  },
  restapi: {
    color: "#85EA2D",
    bg: "rgba(133, 234, 45, 0.12)",
    border: "rgba(133, 234, 45, 0.6)",
    glow: "rgba(133, 234, 45, 0.35)",
  },
  graphql: {
    color: "#E10098",
    bg: "rgba(225, 0, 152, 0.14)",
    border: "rgba(225, 0, 152, 0.65)",
    glow: "rgba(225, 0, 152, 0.35)",
  },
  linux: {
    color: "#FCC624",
    bg: "rgba(252, 198, 36, 0.12)",
    border: "rgba(252, 198, 36, 0.6)",
    glow: "rgba(252, 198, 36, 0.35)",
  },
  python: {
    color: "#3776AB",
    bg: "rgba(55, 118, 171, 0.14)",
    border: "rgba(55, 118, 171, 0.65)",
    glow: "rgba(55, 118, 171, 0.35)",
  },
  postman: {
    color: "#FF6C37",
    bg: "rgba(255, 108, 55, 0.14)",
    border: "rgba(255, 108, 55, 0.65)",
    glow: "rgba(255, 108, 55, 0.35)",
  },
};

function TechItemCard({ item }: { item: { name: string; category: string; iconName: string; experienceLevel?: string } }) {
  const [isHovered, setIsHovered] = useState(false);
  const normalizedKey = item.iconName.toLowerCase().replace(/[\s.-]/g, "");
  const brand = techBrandMap[normalizedKey] || {
    color: "#FFFFFF",
    bg: "rgba(255, 255, 255, 0.1)",
    border: "rgba(255, 255, 255, 0.5)",
    glow: "rgba(255, 255, 255, 0.2)",
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered ? brand.bg : "rgba(24, 24, 27, 0.85)",
        borderColor: isHovered ? brand.border : "rgba(39, 39, 42, 0.9)",
        boxShadow: isHovered ? `0 0 22px ${brand.glow}, inset 0 0 12px ${brand.bg}` : "none",
        transform: isHovered ? "scale(1.06)" : "scale(1)",
      }}
      className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border text-zinc-200 transition-all duration-300 cursor-pointer shadow-md select-none"
    >
      <div
        style={{
          color: isHovered ? brand.color : "#a1a1aa",
          filter: isHovered ? `drop-shadow(0 0 6px ${brand.glow})` : "none",
        }}
        className="transition-all duration-300 flex items-center justify-center shrink-0"
      >
        <TechIcon name={item.iconName} className="w-5 h-5" />
      </div>

      <div className="flex flex-col text-left">
        <span
          style={{
            color: isHovered ? brand.color : "#ffffff",
          }}
          className="text-sm font-semibold font-mono tracking-tight transition-colors duration-300"
        >
          {item.name}
        </span>
        <span className="text-[10px] font-mono text-zinc-400">
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
                bg: "rgba(255, 255, 255, 0.1)",
                border: "rgba(255, 255, 255, 0.5)",
                glow: "rgba(255, 255, 255, 0.2)",
              };

              return (
                <div
                  key={item.name}
                  style={{
                    ["--hover-bg" as any]: brand.bg,
                    ["--hover-border" as any]: brand.border,
                    ["--hover-color" as any]: brand.color,
                  }}
                  className="flex flex-col items-center justify-center text-center p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-200 transition-all duration-300 cursor-pointer hover:border-[var(--hover-border)] hover:bg-[var(--hover-bg)] hover:scale-105 group"
                >
                  <div
                    style={{ color: "var(--hover-color)" }}
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
