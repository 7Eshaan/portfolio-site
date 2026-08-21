"use client";

import React, { useState, useEffect } from "react";
import { portfolioConfig } from "@/config/portfolio";
import { LeetCodeStatsData } from "@/types/portfolio";
import { 
  Flame, 
  ExternalLink, 
  Trophy,
  Zap,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TiltCard } from "@/components/ui/TiltCard";
import { extractUsername } from "@/lib/utils";

export function LeetCodeSection() {
  const [stats, setStats] = useState<LeetCodeStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredTier, setHoveredTier] = useState<"Easy" | "Medium" | "Hard" | null>(null);
  const currentUsername = extractUsername(portfolioConfig.socials.leetcode, "leetcode") || "7Eshaan";

  const fetchStats = async (user: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/leetcode?username=${encodeURIComponent(user)}`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Error fetching LeetCode stats", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(currentUsername);
  }, [currentUsername]);

  const totalSolved = stats?.totalSolved || 119;
  const easySolved = stats?.easySolved || 55;
  const mediumSolved = stats?.mediumSolved || 60;
  const hardSolved = stats?.hardSolved || 4;

  // Donut chart calculations
  const circumference = 2 * Math.PI * 46; // radius 46
  const easyRatio = totalSolved > 0 ? easySolved / totalSolved : 0.46;
  const mediumRatio = totalSolved > 0 ? mediumSolved / totalSolved : 0.5;
  const hardRatio = totalSolved > 0 ? hardSolved / totalSolved : 0.04;

  const easyStroke = easyRatio * circumference;
  const mediumStroke = mediumRatio * circumference;
  const hardStroke = hardRatio * circumference;

  const easyOffset = 0;
  const mediumOffset = -easyStroke;
  const hardOffset = -(easyStroke + mediumStroke);

  const isAnyTierHovered = hoveredTier !== null;

  return (
    <section id="leetcode" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-white" />
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Algorithms & Data Structures
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Zap className="w-7 h-7 text-white" /> LeetCode Progress & Mastery
          </h2>
          <p className="text-sm font-mono text-zinc-400 mt-1">
            Real-time algorithmic performance tracking for{" "}
            <span className="text-white font-semibold">@{currentUsername}</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <a
            href={`https://leetcode.com/u/${currentUsername}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="primary"
              size="sm"
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              className="text-xs font-mono"
            >
              Open LeetCode Profile
            </Button>
          </a>
        </div>
      </div>

      {/* Main LeetCode Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Donut Chart Breakdown 3D Tilt Panel (7 cols) */}
        <TiltCard maxTilt={6} className="lg:col-span-7 rounded-2xl bg-zinc-950/80 border border-zinc-800 p-6 flex flex-col justify-between backdrop-blur-sm">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-6">
              <div>
                <span className="text-xs font-mono text-zinc-400">Total Solved</span>
                <div className="text-4xl font-bold font-mono text-white mt-1">
                  {loading ? "--" : totalSolved}{" "}
                  <span className="text-sm font-mono text-zinc-400 font-normal">
                    / {stats?.totalQuestions ?? 4029} Problems
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-zinc-400">Acceptance Rate</span>
                <div className="text-2xl font-bold font-mono text-white mt-1">
                  {loading ? "--" : stats?.acceptanceRate ?? 55.6}%
                </div>
              </div>
            </div>

            {/* Crisp Donut Pie Chart with Pop-Out & Isolate Darken Effect */}
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
              
              {/* SVG Crisp Donut Pie Chart */}
              <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                  {/* Track Background */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="transparent"
                    stroke="#18181b"
                    strokeWidth="11"
                  />

                  {/* Easy Segment (#00ff11) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="transparent"
                    stroke="#00ff11"
                    strokeWidth={hoveredTier === "Easy" ? 15 : 11}
                    strokeDasharray={`${easyStroke} ${circumference}`}
                    strokeDashoffset={easyOffset}
                    strokeLinecap="round"
                    opacity={isAnyTierHovered ? (hoveredTier === "Easy" ? 1 : 0.06) : 1}
                    onMouseEnter={() => setHoveredTier("Easy")}
                    onMouseLeave={() => setHoveredTier(null)}
                    className="transition-all duration-300 ease-out cursor-pointer"
                  />

                  {/* Medium Segment (Bright Yellow #FFE600) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="transparent"
                    stroke="#FFE600"
                    strokeWidth={hoveredTier === "Medium" ? 15 : 11}
                    strokeDasharray={`${mediumStroke} ${circumference}`}
                    strokeDashoffset={mediumOffset}
                    strokeLinecap="round"
                    opacity={isAnyTierHovered ? (hoveredTier === "Medium" ? 1 : 0.06) : 1}
                    onMouseEnter={() => setHoveredTier("Medium")}
                    onMouseLeave={() => setHoveredTier(null)}
                    className="transition-all duration-300 ease-out cursor-pointer"
                  />

                  {/* Hard Segment (Bright Red #FF1744) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="46"
                    fill="transparent"
                    stroke="#FF1744"
                    strokeWidth={hoveredTier === "Hard" ? 15 : 11}
                    strokeDasharray={`${hardStroke} ${circumference}`}
                    strokeDashoffset={hardOffset}
                    strokeLinecap="round"
                    opacity={isAnyTierHovered ? (hoveredTier === "Hard" ? 1 : 0.06) : 1}
                    onMouseEnter={() => setHoveredTier("Hard")}
                    onMouseLeave={() => setHoveredTier(null)}
                    className="transition-all duration-300 ease-out cursor-pointer"
                  />
                </svg>

                {/* Donut Center Counter */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span 
                    style={{
                      color: hoveredTier === "Easy" 
                        ? "#00ff11" 
                        : hoveredTier === "Medium" 
                        ? "#FFE600" 
                        : hoveredTier === "Hard" 
                        ? "#FF1744" 
                        : "#FFFFFF"
                    }}
                    className="text-2xl font-bold font-mono tracking-tight transition-colors duration-300"
                  >
                    {hoveredTier === "Easy" ? easySolved : hoveredTier === "Medium" ? mediumSolved : hoveredTier === "Hard" ? hardSolved : totalSolved}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    {hoveredTier ? `${hoveredTier} Solved` : "Total Solved"}
                  </span>
                </div>
              </div>

              {/* Difficulty Cards: Easy = #00ff11, Medium = Bright Yellow, Hard = Bright Red with Hover Isolation */}
              <div className="flex-1 w-full space-y-3">
                {/* Easy Pill (#00ff11) */}
                <div 
                  onMouseEnter={() => setHoveredTier("Easy")}
                  onMouseLeave={() => setHoveredTier(null)}
                  style={{
                    transform: hoveredTier === "Easy" ? "translateX(6px)" : "translateX(0px)",
                    backgroundColor: hoveredTier === "Easy" ? "rgba(0, 255, 17, 0.14)" : "rgba(24, 24, 27, 0.8)",
                    borderColor: hoveredTier === "Easy" ? "#00ff11" : "rgba(39, 39, 42, 0.8)",
                    opacity: isAnyTierHovered ? (hoveredTier === "Easy" ? 1 : 0.3) : 1,
                  }}
                  className="p-3 rounded-xl border flex items-center justify-between transition-all duration-200 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform duration-200"
                      style={{
                        backgroundColor: "#00ff11",
                        transform: hoveredTier === "Easy" ? "scale(1.3)" : "scale(1)",
                      }}
                    />
                    <div>
                      <div className="text-xs font-bold font-mono text-white transition-colors">
                        Easy
                      </div>
                      <div className="text-[10px] font-mono text-zinc-400">
                        {Math.round(easyRatio * 100)}% of solved
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-[#00ff11]">
                      {easySolved}
                    </span>
                    <span className="text-xs font-mono text-zinc-400"> / {stats?.totalEasy ?? 960}</span>
                  </div>
                </div>

                {/* Medium Pill (Bright Yellow #FFE600) */}
                <div 
                  onMouseEnter={() => setHoveredTier("Medium")}
                  onMouseLeave={() => setHoveredTier(null)}
                  style={{
                    transform: hoveredTier === "Medium" ? "translateX(6px)" : "translateX(0px)",
                    backgroundColor: hoveredTier === "Medium" ? "rgba(255, 230, 0, 0.14)" : "rgba(24, 24, 27, 0.8)",
                    borderColor: hoveredTier === "Medium" ? "#FFE600" : "rgba(39, 39, 42, 0.8)",
                    opacity: isAnyTierHovered ? (hoveredTier === "Medium" ? 1 : 0.3) : 1,
                  }}
                  className="p-3 rounded-xl border flex items-center justify-between transition-all duration-200 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform duration-200"
                      style={{
                        backgroundColor: "#FFE600",
                        transform: hoveredTier === "Medium" ? "scale(1.3)" : "scale(1)",
                      }}
                    />
                    <div>
                      <div className="text-xs font-bold font-mono text-white transition-colors">
                        Medium
                      </div>
                      <div className="text-[10px] font-mono text-zinc-400">
                        {Math.round(mediumRatio * 100)}% of solved
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-[#FFE600]">
                      {mediumSolved}
                    </span>
                    <span className="text-xs font-mono text-zinc-400"> / {stats?.totalMedium ?? 2103}</span>
                  </div>
                </div>

                {/* Hard Pill (Bright Red #FF1744) */}
                <div 
                  onMouseEnter={() => setHoveredTier("Hard")}
                  onMouseLeave={() => setHoveredTier(null)}
                  style={{
                    transform: hoveredTier === "Hard" ? "translateX(6px)" : "translateX(0px)",
                    backgroundColor: hoveredTier === "Hard" ? "rgba(255, 23, 68, 0.14)" : "rgba(24, 24, 27, 0.8)",
                    borderColor: hoveredTier === "Hard" ? "#FF1744" : "rgba(39, 39, 42, 0.8)",
                    opacity: isAnyTierHovered ? (hoveredTier === "Hard" ? 1 : 0.3) : 1,
                  }}
                  className="p-3 rounded-xl border flex items-center justify-between transition-all duration-200 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 transition-transform duration-200"
                      style={{
                        backgroundColor: "#FF1744",
                        transform: hoveredTier === "Hard" ? "scale(1.3)" : "scale(1)",
                      }}
                    />
                    <div>
                      <div className="text-xs font-bold font-mono text-white transition-colors">
                        Hard
                      </div>
                      <div className="text-[10px] font-mono text-zinc-400">
                        {Math.round(hardRatio * 100)}% of solved
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold font-mono text-[#FF1744]">
                      {hardSolved}
                    </span>
                    <span className="text-xs font-mono text-zinc-400"> / {stats?.totalHard ?? 966}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Focus: Recursion, Backtracking & Linked Lists</span>
            <span>Primary Language: Java</span>
          </div>
        </TiltCard>

        {/* Right: Ranking, Streak, & Submissions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Top 2 Cards: Ranking & Streak (With 3D Corner Tilt) */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 hover:bg-white hover:text-black hover:border-white transition-all duration-300 group cursor-default">
              <div className="flex items-center justify-between text-zinc-400 group-hover:text-zinc-800 mb-2">
                <span className="text-xs font-mono">Global Rank</span>
                <Trophy className="w-4 h-4 group-hover:text-black" />
              </div>
              <div className="text-2xl font-bold font-mono text-white group-hover:text-black">
                #{loading ? "--" : (stats?.ranking ?? 1410855).toLocaleString()}
              </div>
              <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-700 mt-1">
                Active problem solver
              </span>
            </Card>

            <Card className="p-4 hover:bg-white hover:text-black hover:border-white transition-all duration-300 group cursor-default">
              <div className="flex items-center justify-between text-zinc-400 group-hover:text-zinc-800 mb-2">
                <span className="text-xs font-mono">Active Practice</span>
                <Flame className="w-4 h-4 group-hover:text-black" />
              </div>
              <div className="text-2xl font-bold font-mono text-white group-hover:text-black">
                {stats?.streakDays ?? 92} Days
              </div>
              <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-700 mt-1">
                Active submission days
              </span>
            </Card>
          </div>

          {/* Recent Solved Submissions 3D Tilt Panel */}
          <TiltCard maxTilt={6} className="flex-1 rounded-2xl bg-zinc-950/80 border border-zinc-800 p-5 flex flex-col justify-between backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold font-mono text-white uppercase tracking-wider">
                  Recent Accepted Problems
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
              </div>

              <div className="space-y-2">
                {(stats?.recentSubmissions || [
                  { title: "Word Search", lang: "Java", timestamp: "Recent" },
                  { title: "Palindrome Partitioning", lang: "Java", timestamp: "Recent" },
                  { title: "Letter Combinations of a Phone Number", lang: "Java", timestamp: "Recent" },
                  { title: "Combination Sum III", lang: "Java", timestamp: "Recent" },
                ]).map((sub, idx) => (
                  <div
                    key={`${sub.title}-${idx}`}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-xs font-mono hover:bg-white hover:text-black hover:border-white transition-all group cursor-default"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-black shrink-0" />
                      <span className="text-zinc-200 group-hover:text-black font-semibold truncate">
                        {sub.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-400 group-hover:text-zinc-800 shrink-0 ml-2">
                      {sub.lang}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>{stats?.badgesCount ?? 3} Badges Earned</span>
              <span className="text-white">Primary: Java</span>
            </div>
          </TiltCard>

        </div>

      </div>
    </section>
  );
}
