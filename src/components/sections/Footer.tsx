"use client";

import React, { useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export function Footer() {
  const [clicked, setClicked] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleYoohoo = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClicked(true);
    setTimeout(() => setClicked(false), 600);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // Confetti burst from button position
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { x, y },
      colors: ["#00FF9D", "#00F0FF", "#FFE600", "#FF0055", "#FFFFFF"],
      disableForReducedMotion: true,
      startVelocity: 30,
    });

    // Secondary subtle sparkle burst
    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: Math.max(0.1, x - 0.05), y },
        colors: ["#FFFFFF", "#00F0FF", "#FFB800"],
      });
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: Math.min(0.9, x + 0.05), y },
        colors: ["#FFFFFF", "#FF0055", "#00FF9D"],
      });
    }, 150);
  };

  return (
    <footer className="border-t border-zinc-900 bg-black py-10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Spacer (left elements removed as requested) */}
        <div className="hidden sm:block sm:w-28" />

        {/* Center: "yoohoo" Interactive Confetti Button */}
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleYoohoo}
            className={`group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-mono text-sm font-bold transition-all duration-300 border border-zinc-700 bg-zinc-950 text-white hover:bg-white hover:text-black hover:border-white shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 ${
              clicked ? "scale-95 ring-2 ring-white" : ""
            }`}
            aria-label="Yoohoo celebration"
          >
            <Sparkles className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
            <span>yoohoo</span>
            <span className="text-xs opacity-60 group-hover:opacity-100">🎉</span>
          </button>
        </div>

        {/* Right: Scroll to top button */}
        <div className="sm:w-28 flex justify-end">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-black hover:bg-white hover:border-white transition-all group"
            aria-label="Scroll to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
