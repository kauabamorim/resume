import type { Metadata } from "next";
import { getGitHubRepos } from "@/lib/github";
import { LANGUAGE_COLORS } from "@/lib/github";
import { formatDate, truncate } from "@/lib/utils";
import { Star, GitFork, ExternalLink, Github, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projetos — Kauã Berman Amorim",
  description: "Todos os repositórios públicos de Kauã Berman Amorim no GitHub.",
};

export default async function ProjectsPage() {
  const repos = await getGitHubRepos();

  return (
    <main className="min-h-screen grid-bg">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-3 h-3" />
            voltar ao início
          </Link>
          <h1 className="font-display text-5xl font-bold mb-4">
            Todos os <span className="text-gradient">projetos</span>
          </h1>
          <p className="text-muted font-mono text-sm">
            {repos.length} repositórios públicos · atualizado via GitHub API
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="glass border border-border rounded-2xl p-5 flex flex-col hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display font-semibold text-text group-hover:text-accent transition-colors truncate mr-2">
                  {repo.name}
                </h3>
                <div className="flex items-center gap-1 shrink-0">
                  {repo.homepage && (
                    <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="p-1.5 text-muted hover:text-accent-2 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-muted hover:text-accent transition-colors">
                    <Github className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <p className="text-muted text-sm leading-relaxed flex-1 mb-4">
                {repo.description ? truncate(repo.description, 80) : "Sem descrição"}
              </p>

              {repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {repo.topics.slice(0, 4).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-surface border border-border text-muted text-[10px] font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-muted pt-3 border-t border-border/50">
                <div>
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? "#8b949e" }} />
                      <span className="font-mono">{repo.language}</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3" />{repo.stargazers_count}</span>
                  <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{repo.forks_count}</span>
                  <span className="font-mono text-[10px]">{formatDate(repo.updated_at)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
