export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  image?: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export interface TechItem {
  name: string;
  category: "Language" | "Framework" | "Database" | "DevOps & Tools" | "Architecture";
  iconName: string; // Used for rendering custom SVG or Lucide
  experienceLevel?: "Proficient" | "Advanced" | "Intermediate";
}

export interface SocialLinks {
  github: string;
  leetcode: string;
  linkedin: string;
  x?: string;
  email: string;
  resume: string;
}

export interface GitHubStatsData {
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  topLanguages: { name: string; percentage: number; color: string }[];
  recentRepos: {
    name: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    url: string;
    updatedAt: string;
  }[];
}

export interface LeetCodeStatsData {
  username: string;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints?: number;
  reputation?: number;
  streakDays?: number;
  badgesCount?: number;
  recentSubmissions?: {
    title: string;
    titleSlug: string;
    timestamp: string;
    statusDisplay: string;
    lang: string;
  }[];
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  location?: string;
  description: string;
  skills: string[];
  type: "education" | "experience" | "achievement";
}

export interface PortfolioConfig {
  personal: {
    name: string;
    tagline: string;
    college: string;
    degree: string;
    location: string;
    about: string;
    status: string;
    profileImage: string;
  };
  socials: SocialLinks;
  techStack: TechItem[];
  projects: Project[];
  timeline: TimelineItem[];
  features: {
    enableTimeline: boolean; // Set to true whenever you want to display the timeline section
    enableInteractivePfpUpload: boolean;
    showGitHubLiveStats: boolean;
    showLeetCodeLiveStats: boolean;
  };
}
