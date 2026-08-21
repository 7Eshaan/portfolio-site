"use client";

import React, { useState, useEffect } from "react";
import { portfolioConfig } from "@/config/portfolio";
import { GitHubStatsData } from "@/types/portfolio";
import { 
  Github, 
  Star, 
  GitFork, 
  Users, 
  BookOpen, 
  ExternalLink, 
  Code2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { extractUsername } from "@/lib/utils";

export function GitHubSection() {
  const [stats, setStats] = useState<GitHubStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const currentUsername = extractUsername(portfolioConfig.socials.github, "github") || "7Eshaan";

  const fetchStats = async (user: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/github?username=${encodeURIComponent(user)}`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Error fetching GitHub stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(currentUsername);
  }, [currentUsername]);

  // Exact Specified Colors for GitHub Languages:
  // TypeScript: Turquoise (#00F5D4), Python: #00ff11, JavaScript: Bright Yellow (#FFE600), Java: Bright Red (#FF1744), EJS: Bright Pink (#FF007F)
  const languageColorMap: Record<string, { hex: string; bg: string; border: string }> = {
    TypeScript: { 
      hex: "#00F5D4", // Turquoise
      bg: "rgba(0, 245, 212, 0.12)",
      border: "#00F5D4"
    },
    Python: { 
      hex: "#00ff11", // Exact specified green
      bg: "rgba(0, 255, 17, 0.12)",
      border: "#00ff11"
    },
    JavaScript: { 
      hex: "#FFE600", // Bright Yellow
      bg: "rgba(255, 230, 0, 0.12)",
      border: "#FFE600"
    },
    Java: { 
      hex: "#FF1744", // Bright Red
      bg: "rgba(255, 23, 68, 0.12)",
      border: "#FF1744"
    },
    EJS: { 
      hex: "#FF007F", // Bright Pink
      bg: "rgba(255, 0, 127, 0.12)",
      border: "#FF007F"
    },
    "HTML / EJS": { 
      hex: "#FF007F", 
      bg: "rgba(255, 0, 127, 0.12)",
      border: "#FF007F"
    },
    HTML: { 
      hex: "#FF007F", 
      bg: "rgba(255, 0, 127, 0.12)",
      border: "#FF007F"
    },
    CSS: { 
      hex: "#8B5CF6", 
      bg: "rgba(139, 92, 246, 0.12)",
      border: "#8B5CF6"
    },
    C: { 
      hex: "#00F5D4", 
      bg: "rgba(0, 245, 212, 0.12)",
      border: "#00F5D4"
    },
    "C++": { 
      hex: "#00F5D4", 
      bg: "rgba(0, 245, 212, 0.12)",
      border: "#00F5D4"
    },
  };

  const defaultLanguages = [
    { name: "TypeScript", percentage: 33, color: "#00F5D4" },
    { name: "Python", percentage: 22, color: "#00ff11" },
    { name: "JavaScript", percentage: 22, color: "#FFE600" },
    { name: "Java", percentage: 11, color: "#FF1744" },
    { name: "EJS", percentage: 11, color: "#FF007F" },
  ];

  const languages = (stats?.topLanguages && stats.topLanguages.length > 0)
    ? stats.topLanguages.map((l) => ({
        ...l,
        color: languageColorMap[l.name]?.hex || l.color || "#00F5D4",
        bg: languageColorMap[l.name]?.bg || "rgba(0, 245, 212, 0.12)",
        border: languageColorMap[l.name]?.border || "#00F5D4",
      }))
    : defaultLanguages.map((l) => ({
        ...l,
        bg: languageColorMap[l.name]?.bg || "rgba(0, 245, 212, 0.12)",
        border: languageColorMap[l.name]?.border || "#00F5D4",
      }));

  // Donut Pie calculations
  const circumference = 2 * Math.PI * 40; // radius 40
  let accumulatedPercent = 0;

  return (
    <section id="github" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-white" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Open Source & Commits
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Github className="w-7 h-7 text-white" /> GitHub Engineering Process
          </h2>
          <p className="text-sm font-mono text-zinc-400 mt-1">
            Live repository metrics & activity for{" "}
            <span className="text-white font-semibold">@{currentUsername}</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <a
            href={`https://github.com/${currentUsername}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="primary"
              size="sm"
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              className="text-xs font-mono"
            >
              Open GitHub Profile
            </Button>
          </a>
        </div>
      </div>

      {/* GitHub Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="flex flex-col justify-between p-5 hover:border-white hover:bg-white hover:text-black transition-all duration-300 group cursor-default">
          <div className="flex items-center justify-between text-zinc-400 group-hover:text-zinc-800 mb-3">
            <span className="text-xs font-mono">Public Repos</span>
            <BookOpen className="w-4 h-4 group-hover:text-black" />
          </div>
          <div className="text-3xl font-bold font-mono text-white group-hover:text-black">
            {loading ? "--" : stats?.publicRepos ?? 8}
          </div>
          <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-700 mt-1">
            Actively maintained
          </span>
        </Card>

        <Card className="flex flex-col justify-between p-5 hover:border-white hover:bg-white hover:text-black transition-all duration-300 group cursor-default">
          <div className="flex items-center justify-between text-zinc-400 group-hover:text-zinc-800 mb-3">
            <span className="text-xs font-mono">Total Stars</span>
            <Star className="w-4 h-4 group-hover:text-black" />
          </div>
          <div className="text-3xl font-bold font-mono text-white group-hover:text-black">
            {loading ? "--" : stats?.totalStars ?? 0}
          </div>
          <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-700 mt-1">
            Across public repos
          </span>
        </Card>

        <Card className="flex flex-col justify-between p-5 hover:border-white hover:bg-white hover:text-black transition-all duration-300 group cursor-default">
          <div className="flex items-center justify-between text-zinc-400 group-hover:text-zinc-800 mb-3">
            <span className="text-xs font-mono">Forks & Contributions</span>
            <GitFork className="w-4 h-4 group-hover:text-black" />
          </div>
          <div className="text-3xl font-bold font-mono text-white group-hover:text-black">
            {loading ? "--" : stats?.totalForks ?? 0}
          </div>
          <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-700 mt-1">
            Ecosystem collaboration
          </span>
        </Card>

        <Card className="flex flex-col justify-between p-5 hover:border-white hover:bg-white hover:text-black transition-all duration-300 group cursor-default">
          <div className="flex items-center justify-between text-zinc-400 group-hover:text-zinc-800 mb-3">
            <span className="text-xs font-mono">Followers</span>
            <Users className="w-4 h-4 group-hover:text-black" />
          </div>
          <div className="text-3xl font-bold font-mono text-white group-hover:text-black">
            {loading ? "--" : stats?.followers ?? 1}
          </div>
          <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-700 mt-1">
            Developer network
          </span>
        </Card>
      </div>

      {/* Detailed Languages Breakdown with Exact Specified Colors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top Languages Donut (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-zinc-800/80 pb-3">
              <h3 className="text-sm font-bold font-mono text-white">Top GitHub Languages</h3>
              <Code2 className="w-4 h-4 text-zinc-400" />
            </div>
            
            {/* SVG Crisp Donut Pie Chart (No blurry glow) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-2">
              <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  {/* Track Background */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#1f1f23"
                    strokeWidth="10"
                  />

                  {/* Specified Color Segments */}
                  {languages.map((lang) => {
                    const strokeLength = (lang.percentage / 100) * circumference;
                    const offset = -(accumulatedPercent / 100) * circumference;
                    accumulatedPercent += lang.percentage;
                    const isHovered = hoveredLang === lang.name;

                    return (
                      <circle
                        key={lang.name}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke={lang.color}
                        strokeWidth={isHovered ? 12 : 10}
                        strokeDasharray={`${strokeLength} ${circumference}`}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        onMouseEnter={() => setHoveredLang(lang.name)}
                        onMouseLeave={() => setHoveredLang(null)}
                        className="transition-all duration-300 ease-out cursor-pointer hover:opacity-95"
                      />
                    );
                  })}
                </svg>

                {/* Donut Center Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span 
                    style={{
                      color: hoveredLang 
                        ? languages.find(l => l.name === hoveredLang)?.color || "#FFFFFF"
                        : "#FFFFFF"
                    }}
                    className="text-base font-bold font-mono tracking-tight transition-colors duration-300"
                  >
                    {hoveredLang 
                      ? `${languages.find(l => l.name === hoveredLang)?.percentage}%`
                      : `${languages[0]?.percentage || 33}%`
                    }
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400">
                    {hoveredLang 
                      ? hoveredLang
                      : (languages[0]?.name || "TS")
                    }
                  </span>
                </div>
              </div>

              {/* Language Legend List with Specified Colors */}
              <div className="flex-1 w-full space-y-2">
                {languages.map((lang) => {
                  const isHovered = hoveredLang === lang.name;

                  return (
                    <div
                      key={lang.name}
                      onMouseEnter={() => setHoveredLang(lang.name)}
                      onMouseLeave={() => setHoveredLang(null)}
                      style={{
                        transform: isHovered ? "translateX(4px)" : "translateX(0px)",
                        backgroundColor: isHovered ? lang.bg : "rgba(24, 24, 27, 0.8)",
                        borderColor: isHovered ? lang.border : "rgba(39, 39, 42, 0.8)",
                      }}
                      className="p-2.5 rounded-xl border flex items-center justify-between text-xs font-mono transition-all duration-200 cursor-pointer select-none group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform duration-200"
                          style={{
                            backgroundColor: lang.color,
                            transform: isHovered ? "scale(1.25)" : "scale(1)",
                          }}
                        />
                        <span 
                          style={{ color: isHovered ? "#FFFFFF" : "rgba(228, 228, 231, 0.9)" }}
                          className="text-xs font-semibold truncate transition-colors"
                        >
                          {lang.name}
                        </span>
                      </div>
                      <span 
                        style={{ color: lang.color }}
                        className="font-bold font-mono text-sm"
                      >
                        {lang.percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-400">
            📊 Auto-computed from repository code volume
          </div>
        </div>

        {/* Recent GitHub Repositories (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-zinc-950/80 border border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-4 border-b border-zinc-800/80 pb-3">
            <h3 className="text-sm font-bold font-mono text-white">Featured GitHub Repositories</h3>
            <span className="text-xs font-mono text-zinc-400">Live Pushed</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(stats?.recentRepos || []).map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:bg-white hover:text-black hover:border-white transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-sm font-bold font-mono text-white group-hover:text-black truncate">
                      {repo.name}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-black shrink-0" />
                  </div>
                  <p className="text-xs text-zinc-400 group-hover:text-zinc-800 line-clamp-2 leading-relaxed mb-3">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 group-hover:border-zinc-300 text-[11px] font-mono text-zinc-400 group-hover:text-zinc-900">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-white group-hover:bg-black" />
                    {repo.language}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" /> {repo.forks}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
