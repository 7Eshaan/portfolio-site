"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { portfolioConfig } from "@/config/portfolio";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "GitHub", href: "#github" },
    { label: "LeetCode", href: "#leetcode" },
    { label: "Projects", href: "#projects" },
    ...(portfolioConfig.features.enableTimeline ? [{ label: "Timeline", href: "#timeline" }] : []),
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-black/85 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="#"
          className="flex items-center gap-2 group transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-mono font-bold text-sm group-hover:bg-zinc-200 transition-colors">
            ED
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight text-white group-hover:text-zinc-300 transition-colors">
              {portfolioConfig.personal.name}
            </span>
            <span className="text-[10px] font-mono text-zinc-400">
              VIT Bhopal
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-950/70 border border-zinc-800/70 rounded-full px-3 py-1 backdrop-blur-sm">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-mono text-zinc-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-zinc-800/70 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-2.5">
          <a
            href={portfolioConfig.socials.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="sm" className="text-xs font-mono">
              Resume
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-300 hover:text-white rounded-md bg-zinc-900 border border-zinc-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 py-4 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-mono text-zinc-300 hover:text-white py-2 px-3 rounded-lg hover:bg-zinc-900"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={portfolioConfig.socials.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button variant="primary" size="sm" className="w-full font-mono text-xs">
                View Resume
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
