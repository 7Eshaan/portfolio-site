import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractUsername(urlOrUsername: string, platform: "github" | "leetcode"): string {
  if (!urlOrUsername) return "";
  const cleaned = urlOrUsername.trim();
  if (platform === "github") {
    // Handle https://github.com/username or github.com/username or username
    const match = cleaned.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9-_]+)/i);
    return match ? match[1] : cleaned.replace(/^@/, "");
  }
  if (platform === "leetcode") {
    // Handle https://leetcode.com/u/username or https://leetcode.com/username or username
    const match = cleaned.match(/(?:https?:\/\/)?(?:www\.)?leetcode\.com\/(?:u\/)?([a-zA-Z0-9-_]+)/i);
    return match ? match[1] : cleaned.replace(/^@/, "");
  }
  return cleaned;
}
