import { PortfolioConfig } from "@/types/portfolio";

/**
 * =========================================================================================
 * ⚙️ PORTFOLIO CONFIGURATION - ESHAAN DOGRA
 * =========================================================================================
 * Welcome! All personal details, links, accounts, tech stack items, and projects are centralized
 * here. Any line with `// ✏️ EDIT HERE` is a placeholder you can customize directly.
 * =========================================================================================
 */

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: "Eshaan Dogra",
    tagline: "Full-Stack Developer & CS Undergraduate", // ✏️ EDIT HERE: Your current status / headline
    college: "Vellore Institute of Technology, Bhopal", // Specifically configured as requested
    degree: "B.Tech in Computer Science & Engineering", // ✏️ EDIT HERE: Your exact degree / specialization
    location: "Bhopal, India", // ✏️ EDIT HERE: Your current location
    about:
      "Passionate developer focused on building scalable, resilient full-stack systems and high-throughput backend services. Constantly honing data structures and algorithms on LeetCode while shipping modern web architectures with Next.js, Spring Boot, and cloud databases.",
    status: "Open to Software Engineering Internships & Opportunities", // ✏️ EDIT HERE: Status banner
    profileImage: "/images/profile.jpg", // ✏️ EDIT HERE: Place your image at public/images/profile.jpg or use the in-browser uploader!
  },

  // ---------------------------------------------------------------------------------------
  // 🔗 SOCIAL & PLATFORM LINKS
  // ---------------------------------------------------------------------------------------
  socials: {
    // ✏️ EDIT HERE: Replace with your exact usernames / profile links
    github: "https://github.com/7Eshaan", // Your GitHub Profile URL
    leetcode: "https://leetcode.com/u/7Eshaan/", // Your LeetCode Profile URL
    linkedin: "https://linkedin.com/in/eshaandogra", // ✏️ EDIT HERE: Your LinkedIn Profile URL
    x: "https://x.com/eshaandogra", // ✏️ EDIT HERE: Optional Twitter/X URL
    email: "eshaandogra7@gmail.com", // Your primary contact email
    resume: "/resume.pdf", // ✏️ EDIT HERE: Place your PDF resume in public/resume.pdf
  },

  // ---------------------------------------------------------------------------------------
  // ⚡ CONVEYOR BELT TECH STACK
  // ---------------------------------------------------------------------------------------
  // These items are showcased in the infinite conveyor belt marquee.
  // Hovering over any item inverts its appearance!
  techStack: [
    { name: "Java", category: "Language", iconName: "java", experienceLevel: "Proficient" },
    { name: "Spring Boot", category: "Framework", iconName: "springboot", experienceLevel: "Proficient" },
    { name: "Next.js", category: "Framework", iconName: "nextjs", experienceLevel: "Proficient" },
    { name: "Node.js", category: "Framework", iconName: "nodejs", experienceLevel: "Proficient" },
    { name: "React", category: "Framework", iconName: "react", experienceLevel: "Proficient" },
    { name: "TypeScript", category: "Language", iconName: "typescript", experienceLevel: "Proficient" },
    { name: "JavaScript", category: "Language", iconName: "javascript", experienceLevel: "Proficient" },
    { name: "Docker", category: "DevOps & Tools", iconName: "docker", experienceLevel: "Intermediate" },
    { name: "PostgreSQL", category: "Database", iconName: "postgresql", experienceLevel: "Proficient" },
    { name: "MongoDB", category: "Database", iconName: "mongodb", experienceLevel: "Proficient" },
    { name: "Git", category: "DevOps & Tools", iconName: "git", experienceLevel: "Proficient" },
    { name: "Tailwind CSS", category: "Framework", iconName: "tailwindcss", experienceLevel: "Proficient" },
    { name: "Redis", category: "Database", iconName: "redis", experienceLevel: "Intermediate" },
    { name: "REST APIs", category: "Architecture", iconName: "restapi", experienceLevel: "Proficient" },
    { name: "GraphQL", category: "Architecture", iconName: "graphql", experienceLevel: "Intermediate" },
    { name: "Linux", category: "DevOps & Tools", iconName: "linux", experienceLevel: "Proficient" },
    { name: "Python", category: "Language", iconName: "python", experienceLevel: "Intermediate" },
    { name: "Postman", category: "DevOps & Tools", iconName: "postman", experienceLevel: "Proficient" },
  ],

  // ---------------------------------------------------------------------------------------
  // 🚀 FEATURED PROJECTS
  // ---------------------------------------------------------------------------------------
  projects: [
    {
      id: "project-1",
      title: "Spring Boot & React Full-Stack E-Commerce",
      description:
        "Full-stack scalable e-commerce application built with Spring Boot backend REST APIs, PostgreSQL, and modern React & TypeScript user interface.",
      tags: ["Java", "Spring Boot", "React", "TypeScript", "PostgreSQL", "REST APIs"],
      githubUrl: "https://github.com/7Eshaan/springboot-ecommerce",
      liveUrl: "https://github.com/7Eshaan/springboot-ecommerce",
      featured: true,
      stats: [
        { label: "Backend", value: "Spring Boot" },
        { label: "Frontend", value: "React & TS" },
      ],
    },
    {
      id: "project-2",
      title: "Spring Boot Notification Microservice",
      description:
        "Event-driven notification service engineered in Java with Spring Boot to handle transactional alerts and message dispatching efficiently.",
      tags: ["Java", "Spring Boot", "REST APIs", "Microservices", "Docker"],
      githubUrl: "https://github.com/7Eshaan/notification-service",
      liveUrl: "https://github.com/7Eshaan/notification-service",
      featured: true,
      stats: [
        { label: "Architecture", value: "Microservices" },
        { label: "Language", value: "Java" },
      ],
    },
    {
      id: "project-3",
      title: "Job Application Tracker",
      description:
        "Productivity web application for developers and job seekers to monitor application stages, track interview pipelines, and manage status updates.",
      tags: ["TypeScript", "Next.js", "Node.js", "Tailwind CSS"],
      githubUrl: "https://github.com/7Eshaan/job-application-tracker",
      liveUrl: "https://github.com/7Eshaan/job-application-tracker",
      featured: true,
      stats: [
        { label: "Stack", value: "TypeScript" },
        { label: "Type", value: "Productivity App" },
      ],
    },
    {
      id: "project-4",
      title: "AI Webpage Summarizer Browser Extension",
      description:
        "Browser extension utility that extracts and summarizes long-form web articles and documentation directly in the browser viewport.",
      tags: ["JavaScript", "Chrome Extensions", "DOM APIs"],
      githubUrl: "https://github.com/7Eshaan/page-summary-extension",
      liveUrl: "https://github.com/7Eshaan/page-summary-extension",
      featured: false,
    },
  ],

  // ---------------------------------------------------------------------------------------
  // ⏳ TIMELINE / EXPERIENCE / EDUCATION (MODULAR PLACEHOLDER)
  // ---------------------------------------------------------------------------------------
  // As requested, the timeline is architected cleanly. You can enable it anytime simply
  // by toggling `enableTimeline: true` below!
  timeline: [
    {
      id: "edu-1",
      year: "2022 - 2026 (Expected)", // ✏️ EDIT HERE
      title: "Bachelor of Technology - Computer Science & Engineering",
      organization: "Vellore Institute of Technology, Bhopal",
      location: "Bhopal, India",
      description:
        "Focusing on Data Structures & Algorithms, Database Management Systems, Distributed Systems, Software Engineering, and Operating Systems.",
      skills: ["Java", "Data Structures", "Algorithms", "DBMS", "Operating Systems", "Computer Networks"],
      type: "education",
    },
    {
      id: "exp-1",
      year: "2024 - Present", // ✏️ EDIT HERE
      title: "Full-Stack Software Development Contributor",
      organization: "Open Source & Engineering Labs",
      location: "Remote",
      description:
        "Developing scalable backend APIs, containerizing microservices with Docker, and building interactive web applications with Next.js & TypeScript.",
      skills: ["Spring Boot", "Next.js", "Docker", "PostgreSQL", "TypeScript"],
      type: "experience",
    },
  ],

  // ---------------------------------------------------------------------------------------
  // ⚙️ FEATURE TOGGLES
  // ---------------------------------------------------------------------------------------
  features: {
    // Set to TRUE whenever you want the timeline progress section to show on the website!
    enableTimeline: false, // ✏️ CHANGE TO true TO SHOW TIMELINE SECTION
    enableInteractivePfpUpload: true, // Allows live browser photo upload/preview
    showGitHubLiveStats: true,
    showLeetCodeLiveStats: true,
  },
};
