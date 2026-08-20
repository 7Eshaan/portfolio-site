# Eshaan Dogra - Monochrome Developer Portfolio

A developer portfolio built for **Eshaan Dogra** from **Vellore Institute of Technology, Bhopal**. Designed with a monochrome (Black & White) aesthetic, invert-on-hover interactions, an infinite conveyor belt tech stack showcase, live & customizable GitHub and LeetCode tracking sections, and an interactive profile picture viewer.

---

## ⚡ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Monochrome design system & custom animations)
- **Icons**: Lucide React + Custom Monochrome SVGs
- **Animation**: CSS Marquee Keyframes & Framer Motion transitions

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## ⚙️ Customization & Placeholder Guide

All personal data, links, projects, and feature flags are centralized in **`src/config/portfolio.ts`**. Every placeholder is marked with `// ✏️ EDIT HERE`.

### 1. Profile Information & College
Open `src/config/portfolio.ts` to update your bio, tagline, and location:
```typescript
personal: {
  name: "Eshaan Dogra",
  tagline: "Software Engineer & Full-Stack Architect",
  college: "Vellore Institute of Technology, Bhopal",
  degree: "B.Tech in Computer Science & Engineering",
  location: "Bhopal, India",
  about: "...",
  status: "Open to Software Engineering Internships & Opportunities",
  profileImage: "/images/avatar.svg",
}
```

### 2. Profile Picture (PFP)
- **Option A (Live Preview in Browser)**: Click the **"Upload Custom PFP"** button in the hero section to preview any image directly in the browser.
- **Option B (Permanent Placement)**: Save your photo file as `public/images/profile.jpg` or set `profileImage: "/images/your-photo.jpg"` in `src/config/portfolio.ts`. The frame uses `object-cover` and responsive constraints to handle square, portrait, or landscape photos cleanly.

### 3. GitHub Process & Live Stats
- **Config**: In `src/config/portfolio.ts`, update `socials.github`:
  ```typescript
  socials: {
    github: "https://github.com/YOUR_GITHUB_USERNAME",
  }
  ```
- **(Optional) Rate Limits**: To avoid GitHub API 60 req/hr limits, create a `.env.local` file:
  ```env
  GITHUB_TOKEN=ghp_yourPersonalAccessTokenHere
  ```
- **Fallback**: If the GitHub API is unreachable or rate-limited, high-fidelity fallback stats and repositories are automatically displayed.

### 4. LeetCode Problem Solving Progress
- **Config**: In `src/config/portfolio.ts`, update `socials.leetcode`:
  ```typescript
  socials: {
    leetcode: "https://leetcode.com/u/YOUR_LEETCODE_USERNAME",
  }
  ```
- The site automatically computes solved counts (Easy, Medium, Hard), acceptance rate, global ranking, badges, and streaks.

### 5. Conveyor Belt Tech Stack
All showcased technologies are defined in `techStack` inside `src/config/portfolio.ts`.
- **Technologies Included**: Java, Spring Boot, Next.js, Node.js, React, TypeScript, JavaScript, Docker, PostgreSQL, MongoDB, Git, Tailwind CSS, Redis, REST APIs, GraphQL, Linux, Python, Postman.
- **Interactions**: Infinite smooth marquee that pauses on hover and inverts colors when you hover over any item.

### 6. Projects Showcase
Add or edit your projects in the `projects` array in `src/config/portfolio.ts`:
```typescript
projects: [
  {
    id: "project-1",
    title: "Distributed Microservices E-Commerce Core",
    description: "High-performance backend ecosystem built with Java Spring Boot...",
    tags: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Docker", "Kafka"],
    githubUrl: "https://github.com/eshaandogra/microservices-backend",
    liveUrl: "https://ecommerce-demo.eshaandogra.dev",
    featured: true,
  },
  // ...
]
```

### 7. Enabling the Timeline / Experience Section
The timeline section is pre-architected and ready. Whenever you want to display it on the site, simply change the toggle flag in `src/config/portfolio.ts`:
```typescript
features: {
  enableTimeline: true, // 👈 Change from false to true
  ...
}
```

---

## 🎨 Theme & Aesthetic Features

- **Monochrome Noir Aesthetic**: Pure blacks (`#000000`), subtle dark zinc borders (`#27272a`), and high-contrast white text (`#ffffff`).
- **Invert on Hover**: Buttons, cards, tech stack pills, and project elements invert their colors when hovered over (black background becomes white with black text).
- **Responsive Layout**: Designed for mobile, tablet, and widescreen displays.

---

## 📁 File Structure

```
PortfolioSite/
├── public/
│   ├── images/
│   │   └── avatar.svg (Default avatar placeholder)
│   └── resume.pdf (Placeholder PDF resume)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── github/route.ts (Live GitHub API handler)
│   │   │   └── leetcode/route.ts (Live LeetCode API handler)
│   │   ├── globals.css (Monochrome styling & animations)
│   │   ├── layout.tsx (SEO Metadata & font setup)
│   │   └── page.tsx (Homepage assembly)
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── TechIcon.tsx
│   │   ├── sections/
│   │   │   ├── ContactSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── GitHubSection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── LeetCodeSection.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── TechStackMarquee.tsx
│   │   │   └── TimelineSection.tsx
│   │   └── CustomizationGuideModal.tsx
│   ├── config/
│   │   └── portfolio.ts (★ Central configuration hub)
│   ├── lib/
│   │   └── utils.ts
│   └── types/
│       └── portfolio.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── README.md
```
