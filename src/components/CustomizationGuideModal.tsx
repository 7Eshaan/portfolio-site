"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  FileCode2, 
  Github, 
  Zap, 
  Image, 
  Briefcase, 
  GraduationCap, 
  Check, 
  Copy, 
  ExternalLink,
  Sliders
} from "lucide-react";

interface CustomizationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CustomizationGuideModal({ isOpen, onClose }: CustomizationGuideModalProps) {
  const [activeTab, setActiveTab] = useState<"all" | "github" | "leetcode" | "pfp" | "timeline" | "projects">("all");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 3000);
  };

  const sections = [
    {
      id: "config",
      title: "1. Central Configuration File",
      icon: <FileCode2 className="w-4 h-4 text-white" />,
      tag: "CORE",
      description: "Everything is centralized in a single file so you never need to hunt through components.",
      location: "src/config/portfolio.ts",
      code: `// src/config/portfolio.ts
export const portfolioConfig = {
  personal: {
    name: "Eshaan Dogra",
    tagline: "Software Engineer & Full-Stack Architect",
    college: "Vellore Institute of Technology, Bhopal",
    ...
  }
};`,
    },
    {
      id: "pfp",
      title: "2. Profile Picture (PFP)",
      icon: <Image className="w-4 h-4 text-white" />,
      tag: "MEDIA",
      description: "You can preview any photo immediately using the on-page 'Upload Custom PFP' button. To make it permanent across builds:",
      location: "public/images/profile.jpg",
      code: `// Method A: Replace the file
Save your photo as: public/images/profile.jpg

// Method B: Or update the URL in src/config/portfolio.ts
profileImage: "https://your-image-url.com/avatar.jpg"`,
    },
    {
      id: "github",
      title: "3. GitHub Process & Stats",
      icon: <Github className="w-4 h-4 text-white" />,
      tag: "INTEGRATION",
      description: "Links directly to your GitHub profile and fetches repo stars, commit activity, and language breakdown via /api/github.",
      location: "src/config/portfolio.ts -> socials.github",
      code: `// In src/config/portfolio.ts:
socials: {
  github: "https://github.com/YOUR_GITHUB_USERNAME",
  ...
}

// (Optional) Add unlimited rate limits in .env.local:
GITHUB_TOKEN=ghp_yourPersonalAccessTokenHere`,
    },
    {
      id: "leetcode",
      title: "4. LeetCode Problem Solving",
      icon: <Zap className="w-4 h-4 text-white" />,
      tag: "INTEGRATION",
      description: "Calculates solved counts (Easy/Med/Hard), acceptance rate, global ranking, and streaks via /api/leetcode.",
      location: "src/config/portfolio.ts -> socials.leetcode",
      code: `// In src/config/portfolio.ts:
socials: {
  leetcode: "https://leetcode.com/u/YOUR_LEETCODE_USERNAME",
  ...
}`,
    },
    {
      id: "timeline",
      title: "5. Enabling Timeline Progress Bar",
      icon: <GraduationCap className="w-4 h-4 text-white" />,
      tag: "MODULAR",
      description: "We pre-architected the Education & Experience timeline. You can toggle it on with one boolean flag!",
      location: "src/config/portfolio.ts -> features.enableTimeline",
      code: `// In src/config/portfolio.ts:
features: {
  enableTimeline: true, // 👈 Change from false to true to display the timeline section!
  ...
}`,
    },
    {
      id: "projects",
      title: "6. Projects Showcase",
      icon: <Briefcase className="w-4 h-4 text-white" />,
      tag: "PROJECTS",
      description: "Add, remove, or modify your featured projects and metrics.",
      location: "src/config/portfolio.ts -> projects[]",
      code: `// In src/config/portfolio.ts:
projects: [
  {
    id: "project-1",
    title: "Your Project Name",
    description: "Detailed system description...",
    tags: ["Java", "Spring Boot", "Next.js", "Docker"],
    githubUrl: "https://github.com/yourname/repo",
    liveUrl: "https://your-demo.com",
    featured: true,
  },
  ...
]`,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Portfolio Customization & Placeholder Guide">
      <div className="space-y-6">
        <p className="text-xs font-mono text-zinc-400 leading-relaxed">
          Welcome Eshaan! Here is the complete breakdown of every placeholder and how to customize each section of your portfolio site.
        </p>

        <div className="space-y-6">
          {sections.map((sec) => (
            <div
              key={sec.id}
              className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {sec.icon}
                  <h4 className="text-sm font-bold font-mono text-white">{sec.title}</h4>
                </div>
                <Badge variant="invert">{sec.tag}</Badge>
              </div>

              <p className="text-xs text-zinc-300 font-mono leading-relaxed">
                {sec.description}
              </p>

              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                <span>File:</span>
                <code className="text-white bg-black px-2 py-0.5 rounded border border-zinc-800">
                  {sec.location}
                </code>
              </div>

              <div className="relative bg-black rounded-lg p-3 border border-zinc-800 overflow-x-auto text-[11px] font-mono text-zinc-300">
                <pre>{sec.code}</pre>
                <button
                  onClick={() => handleCopy(sec.code, sec.id)}
                  className="absolute top-2 right-2 px-2 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] text-white flex items-center gap-1 font-mono transition-colors"
                >
                  {copiedKey === sec.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === sec.id ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" size="sm" onClick={onClose} className="font-mono text-xs">
            Done / Close Guide
          </Button>
        </div>
      </div>
    </Modal>
  );
}
