import type { Metadata } from "next";
import "./globals.css";
import { portfolioConfig } from "@/config/portfolio";

export const metadata: Metadata = {
  title: `${portfolioConfig.personal.name} | Portfolio - Full-Stack Engineer`,
  description: `${portfolioConfig.personal.name} - Software Engineer studying at ${portfolioConfig.personal.college}. Specializing in Java, Spring Boot, Next.js, and Distributed Systems.`,
  keywords: [
    "Eshaan Dogra",
    "VIT Bhopal",
    "Vellore Institute of Technology",
    "Full Stack Developer",
    "Software Engineer",
    "Java",
    "Spring Boot",
    "Next.js",
    "TypeScript",
    "LeetCode",
  ],
  authors: [{ name: portfolioConfig.personal.name }],
  openGraph: {
    title: `${portfolioConfig.personal.name} | Portfolio`,
    description: `${portfolioConfig.personal.name} - Software Engineer studying at ${portfolioConfig.personal.college}`,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-black text-white antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
