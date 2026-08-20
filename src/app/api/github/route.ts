import { NextRequest, NextResponse } from "next/server";
import { GitHubStatsData } from "@/types/portfolio";
import { extractUsername } from "@/lib/utils";
import { portfolioConfig } from "@/config/portfolio";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawUsername = searchParams.get("username") || portfolioConfig.socials.github;
  const username = extractUsername(rawUsername, "github") || "7Eshaan";

  try {
    const headers: Record<string, string> = {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    // Attempt live fetch from GitHub API
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 600 },
    });

    if (userRes.ok) {
      const userData = await userRes.json();
      const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos?sort=pushed&direction=desc&per_page=30`,
        { headers, next: { revalidate: 600 } }
      );

      let reposData: any[] = [];
      if (reposRes.ok) {
        reposData = await reposRes.json();
      }

      let totalStars = 0;
      let totalForks = 0;
      const languageCounts: Record<string, number> = {};

      reposData.forEach((repo) => {
        totalStars += repo.stargazers_count || 0;
        totalForks += repo.forks_count || 0;
        if (repo.language) {
          languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
        }
      });

      const totalLangs = Object.values(languageCounts).reduce((a, b) => a + b, 0);
      const languageColors: Record<string, string> = {
        TypeScript: "#3178c6",
        JavaScript: "#f1e05a",
        Java: "#b07219",
        HTML: "#e34c26",
        CSS: "#563d7c",
        Python: "#3572A5",
        EJS: "#a91e50",
      };

      const topLanguages = Object.entries(languageCounts)
        .map(([name, count]) => ({
          name,
          percentage: totalLangs > 0 ? Math.round((count / totalLangs) * 100) : 0,
          color: languageColors[name] || "#ffffff",
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 5);

      const recentRepos = reposData.slice(0, 4).map((repo) => ({
        name: repo.name,
        description: repo.description || "Public repository and full-stack software project.",
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        language: repo.language || "TypeScript",
        url: repo.html_url,
        updatedAt: repo.pushed_at || repo.updated_at,
      }));

      const result: GitHubStatsData = {
        username: userData.login || username,
        name: userData.name || portfolioConfig.personal.name,
        avatarUrl: userData.avatar_url || "https://github.com/7Eshaan.png",
        bio: userData.bio || "Full-Stack Developer | VIT Bhopal",
        publicRepos: userData.public_repos ?? 8,
        followers: userData.followers ?? 1,
        following: userData.following ?? 1,
        totalStars,
        totalForks,
        topLanguages: topLanguages.length > 0 ? topLanguages : [
          { name: "TypeScript", percentage: 38, color: "#3178c6" },
          { name: "JavaScript", percentage: 25, color: "#f1e05a" },
          { name: "Java", percentage: 25, color: "#b07219" },
          { name: "HTML / EJS", percentage: 12, color: "#e34c26" },
        ],
        recentRepos: recentRepos.length > 0 ? recentRepos : [
          {
            name: "springboot-ecommerce",
            description: "Full-stack ecommerce app built with Spring Boot and React",
            stars: 0,
            forks: 0,
            language: "TypeScript",
            url: `https://github.com/${username}/springboot-ecommerce`,
            updatedAt: "Recent",
          },
          {
            name: "notification-service",
            description: "A simple notification service made using springboot",
            stars: 0,
            forks: 0,
            language: "Java",
            url: `https://github.com/${username}/notification-service`,
            updatedAt: "Recent",
          },
          {
            name: "job-application-tracker",
            description: "A job application tracker....",
            stars: 0,
            forks: 0,
            language: "TypeScript",
            url: `https://github.com/${username}/job-application-tracker`,
            updatedAt: "Recent",
          },
          {
            name: "page-summary-extension",
            description: "A browser extension that summarizes a webpage",
            stars: 0,
            forks: 0,
            language: "JavaScript",
            url: `https://github.com/${username}/page-summary-extension`,
            updatedAt: "Recent",
          },
        ],
      };

      return NextResponse.json(result);
    }

    throw new Error("GitHub API rate limit or error");
  } catch (error) {
    // Exact Real Profile Stats for 7Eshaan
    const exactProfileData: GitHubStatsData = {
      username: username || "7Eshaan",
      name: portfolioConfig.personal.name,
      avatarUrl: "https://github.com/7Eshaan.png",
      bio: "Full-Stack Developer | VIT Bhopal",
      publicRepos: 8,
      followers: 1,
      following: 1,
      totalStars: 0,
      totalForks: 0,
      topLanguages: [
        { name: "TypeScript", percentage: 38, color: "#3178c6" },
        { name: "JavaScript", percentage: 25, color: "#f1e05a" },
        { name: "Java", percentage: 25, color: "#b07219" },
        { name: "HTML / EJS", percentage: 12, color: "#e34c26" },
      ],
      recentRepos: [
        {
          name: "springboot-ecommerce",
          description: "Full-stack ecommerce app built with Spring Boot and React",
          stars: 0,
          forks: 0,
          language: "TypeScript",
          url: `https://github.com/${username}/springboot-ecommerce`,
          updatedAt: "Recent",
        },
        {
          name: "notification-service",
          description: "A simple notification service made using springboot",
          stars: 0,
          forks: 0,
          language: "Java",
          url: `https://github.com/${username}/notification-service`,
          updatedAt: "Recent",
        },
        {
          name: "job-application-tracker",
          description: "A job application tracker....",
          stars: 0,
          forks: 0,
          language: "TypeScript",
          url: `https://github.com/${username}/job-application-tracker`,
          updatedAt: "Recent",
        },
        {
          name: "page-summary-extension",
          description: "A browser extension that summarizes a webpage",
          stars: 0,
          forks: 0,
          language: "JavaScript",
          url: `https://github.com/${username}/page-summary-extension`,
          updatedAt: "Recent",
        },
      ],
    };

    return NextResponse.json(exactProfileData);
  }
}
