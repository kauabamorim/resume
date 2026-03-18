import { NextResponse } from "next/server";
import { getGitHubRepos, getGitHubUser } from "@/lib/github";

export async function GET() {
  try {
    const [user, repos] = await Promise.all([getGitHubUser(), getGitHubRepos()]);
    return NextResponse.json({ user, repos });
  } catch {
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
