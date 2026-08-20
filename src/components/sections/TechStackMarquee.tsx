"use client";

import React, { useState } from "react";
import { portfolioConfig } from "@/config/portfolio";
import { TechIcon } from "@/components/ui/TechIcon";

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
                <div
                  key={`${item.name}-r1-${idx}`}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-200 transition-all duration-300 cursor-pointer hover:bg-white hover:text-black hover:border-white hover:scale-105 shadow-md group/item"
                >
                  <TechIcon
                    name={item.iconName}
                    className="w-5 h-5 text-zinc-300 group-hover/item:text-black transition-colors"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold font-mono tracking-tight group-hover/item:text-black">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 group-hover/item:text-zinc-700">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Belt Row 2: Rightward Infinite Marquee */}
          <div className="flex overflow-hidden group">
            <div className="flex gap-4 animate-marquee-reverse group-hover:[animation-play-state:paused] whitespace-nowrap py-1">
              {infiniteRow2.map((item, idx) => (
                <div
                  key={`${item.name}-r2-${idx}`}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-200 transition-all duration-300 cursor-pointer hover:bg-white hover:text-black hover:border-white hover:scale-105 shadow-md group/item"
                >
                  <TechIcon
                    name={item.iconName}
                    className="w-5 h-5 text-zinc-300 group-hover/item:text-black transition-colors"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold font-mono tracking-tight group-hover/item:text-black">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 group-hover/item:text-zinc-700">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Filtered Grid View when specific category is chosen */
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredTech.map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center justify-center text-center p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-200 hover:bg-white hover:text-black hover:border-white hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <TechIcon
                  name={item.iconName}
                  className="w-8 h-8 text-zinc-300 group-hover:text-black mb-2 transition-colors"
                />
                <span className="text-xs font-semibold font-mono group-hover:text-black">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-700 mt-0.5">
                  {item.experienceLevel || item.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
