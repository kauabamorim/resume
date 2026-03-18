import type { GitHubRepo, GitHubUser } from "@/types";

const BASE = "https://api.github.com";
const USERNAME = "kauabamorim";

const headers = {
  Accept: "application/vnd.github.v3+json",
  ...(process.env.GITHUB_TOKEN && {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }),
};

export async function getGitHubUser(): Promise<GitHubUser> {
  const res = await fetch(`${BASE}/users/${USERNAME}`, {
    headers,
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch GitHub user");
  return res.json();
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${BASE}/users/${USERNAME}/repos?sort=updated&per_page=100`,
    { headers, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch GitHub repos");
  const repos: GitHubRepo[] = await res.json();
  return repos
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
}

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Swift: "#F05138",
  Dart: "#00B4AB",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
};
