"use client";

import React, { useState } from "react";
import { portfolioConfig } from "@/config/portfolio";
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  Code2, 
  Twitter, 
  ArrowUpRight, 
  Sparkles,
  MapPin,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TiltCard } from "@/components/ui/TiltCard";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioConfig.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct mailto link to ensure message reaches eshaandogra7@gmail.com
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Eshaan,\n\n${formData.message}\n\nFrom:\nName: ${formData.name}\nEmail: ${formData.email}`
    );
    window.location.href = `mailto:${portfolioConfig.socials.email}?subject=${subject}&body=${body}`;

    // Client-side submission feedback
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 5000);
  };

  return (
    <section id="contact" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Direct Info & Socials (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-6 bg-white" />
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                Get In Touch
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Let&apos;s Build Something Extraordinary.
            </h2>
            <p className="text-sm font-mono text-zinc-400 mt-2 leading-relaxed">
              Open for full-time software engineering roles, internships, open-source collaborations, and tech discussions.
            </p>
          </div>

          {/* Location & University Badge */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-300 backdrop-blur-sm">
              <GraduationCap className="w-4 h-4 text-white" />
              <span>{portfolioConfig.personal.college}</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-300 backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-white" />
              <span>{portfolioConfig.personal.location}</span>
            </div>
          </div>

          {/* Quick Copy Email Pill with 3D Tilt */}
          <TiltCard maxTilt={5} className="p-4 rounded-xl bg-zinc-950/90 border border-zinc-800 flex items-center justify-between group backdrop-blur-sm">
            <div className="flex items-center gap-3 truncate">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div className="truncate">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Direct Email</span>
                <div className="text-xs font-mono text-white font-semibold truncate">
                  {portfolioConfig.socials.email}
                </div>
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:border-white transition-all shrink-0 ml-2"
              title="Copy email to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </TiltCard>

          {/* Social Profiles Grid */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
              Connected Networks
            </span>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={portfolioConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800 hover:bg-white hover:text-black hover:border-white transition-all text-xs font-mono flex items-center justify-between group backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-black" />
              </a>

              <a
                href={portfolioConfig.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800 hover:bg-white hover:text-black hover:border-white transition-all text-xs font-mono flex items-center justify-between group backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  <span>LeetCode</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-black" />
              </a>

              <a
                href={portfolioConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800 hover:bg-white hover:text-black hover:border-white transition-all text-xs font-mono flex items-center justify-between group backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-black" />
              </a>

              {portfolioConfig.socials.x && (
                <a
                  href={portfolioConfig.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800 hover:bg-white hover:text-black hover:border-white transition-all text-xs font-mono flex items-center justify-between group backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <Twitter className="w-4 h-4" />
                    <span>Twitter/X</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-black" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form with 3D Tilt (7 cols) */}
        <TiltCard maxTilt={5} className="lg:col-span-7 rounded-2xl bg-zinc-950/90 border border-zinc-800 p-6 sm:p-8 backdrop-blur-sm">
          <h3 className="text-lg font-bold font-mono text-white mb-1">
            Send a Direct Message
          </h3>
          <p className="text-xs font-mono text-zinc-400 mb-6">
            Feel free to send a message directly to Eshaan Dogra
          </p>

          {formSubmitted ? (
            <div className="p-6 rounded-xl bg-zinc-900 border border-white/40 text-center space-y-3 animate-in zoom-in-95">
              <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white font-mono">Message Dispatched!</h4>
              <p className="text-xs text-zinc-400 font-mono">
                Thank you for reaching out. Eshaan will get back to you shortly at your provided email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Turing"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-black border border-zinc-800 rounded-lg text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-black border border-zinc-800 rounded-lg text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Message / Opportunity</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your project, team, or opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-black border border-zinc-800 rounded-lg text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={<Send className="w-4 h-4" />}
                  className="w-full font-mono text-xs"
                >
                  Transmit Message to Eshaan
                </Button>
              </div>
            </form>
          )}
        </TiltCard>

      </div>
    </section>
  );
}
