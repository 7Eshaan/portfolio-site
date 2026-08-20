"use client";

import React, { useState } from "react";
import { portfolioConfig } from "@/config/portfolio";
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Layers, 
  ArrowUpRight, 
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function ProjectsSection() {
  const [filterTag, setFilterTag] = useState<string>("All");

  // Extract all unique tags
  const allTags = ["All", ...Array.from(new Set(portfolioConfig.projects.flatMap((p) => p.tags)))];

  const filteredProjects =
    filterTag === "All"
      ? portfolioConfig.projects
      : portfolioConfig.projects.filter((p) => p.tags.includes(filterTag));

  return (
    <section id="projects" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-white" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Selected Works
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <FolderGit2 className="w-7 h-7" /> Engineered Projects
          </h2>
          <p className="text-sm font-mono text-zinc-400 mt-1">
            Production-grade systems, microservices, and interactive applications
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-1.5 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800 backdrop-blur-sm">
          {allTags.slice(0, 6).map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag)}
              className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                filterTag === tag
                  ? "bg-white text-black font-semibold shadow"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="group relative rounded-2xl bg-zinc-950/90 border border-zinc-800 p-6 flex flex-col justify-between hover:border-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
          >
            {/* Top Area */}
            <div>
              {/* Card Index & Featured Pill */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  0{idx + 1} / SYSTEM
                </span>
                {project.featured && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-zinc-900 border border-zinc-700 text-white">
                    FEATURED
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-white transition-colors mb-2">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Stats Highlights (if present) */}
              {project.stats && project.stats.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-6 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  {project.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="space-y-0.5">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                        {stat.label}
                      </span>
                      <div className="text-sm font-bold font-mono text-white">{stat.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Area: Tags & Action Links */}
            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80">
                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={<Github className="w-3.5 h-3.5" />}
                        className="text-xs font-mono"
                      >
                        Code
                      </Button>
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<ExternalLink className="w-3.5 h-3.5" />}
                        className="text-xs font-mono"
                      >
                        Live Demo
                      </Button>
                    </a>
                  )}
                </div>

                <span className="text-[11px] font-mono text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1">
                  Explore <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Footer */}
      <div className="mt-10 text-center">
        <p className="text-xs font-mono text-zinc-400">
          Want to see more repositories? Check out all projects on{" "}
          <a
            href={portfolioConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4 hover:text-zinc-300"
          >
            GitHub ({portfolioConfig.socials.github.replace(/.*github\.com\//, "@")})
          </a>
        </p>
      </div>
    </section>
  );
}
