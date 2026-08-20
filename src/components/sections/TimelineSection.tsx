"use client";

import React from "react";
import { portfolioConfig } from "@/config/portfolio";
import { GraduationCap, Briefcase, Award, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function TimelineSection() {
  return (
    <section id="timeline" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 relative">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-px w-6 bg-white" />
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            Path & Progress
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
          <GraduationCap className="w-7 h-7" /> Experience & Academic Journey
        </h2>
        <p className="text-sm font-mono text-zinc-400 mt-1">
          Milestones, coursework, and software engineering development
        </p>
      </div>

      {/* Vertical Timeline Track */}
      <div className="relative border-l border-zinc-800 ml-4 md:ml-32 space-y-10 pl-6 md:pl-10">
        {portfolioConfig.timeline.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline Node Icon */}
            <div className="absolute -left-[35px] md:-left-[51px] top-1 w-6 h-6 rounded-full bg-zinc-950 border-2 border-white flex items-center justify-center group-hover:scale-125 group-hover:bg-white transition-all duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-black transition-colors" />
            </div>

            {/* Timestamp Badge (Desktop positioned to left) */}
            <div className="hidden md:block absolute -left-36 top-1 text-right w-24">
              <span className="text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
                {item.year}
              </span>
            </div>

            {/* Timeline Card */}
            <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-white hover:bg-white hover:text-black transition-all duration-300 group/card">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {item.type === "education" ? (
                    <GraduationCap className="w-4 h-4 text-zinc-400 group-hover/card:text-black" />
                  ) : item.type === "experience" ? (
                    <Briefcase className="w-4 h-4 text-zinc-400 group-hover/card:text-black" />
                  ) : (
                    <Award className="w-4 h-4 text-zinc-400 group-hover/card:text-black" />
                  )}
                  <h3 className="text-base font-bold font-mono text-white group-hover/card:text-black">
                    {item.title}
                  </h3>
                </div>

                {/* Mobile Year Badge */}
                <span className="md:hidden text-xs font-mono text-zinc-400 group-hover/card:text-zinc-800">
                  {item.year}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 group-hover/card:text-zinc-800 mb-3">
                <span className="font-semibold text-zinc-300 group-hover/card:text-black">
                  {item.organization}
                </span>
                {item.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {item.location}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 group-hover/card:text-zinc-900 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover/card:bg-black group-hover/card:text-white group-hover/card:border-black transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
