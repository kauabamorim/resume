"use client";

import { useEffect, useRef, useState } from "react";
import { cn, formatDate, truncate } from "@/lib/utils";
import { LANGUAGE_COLORS } from "@/lib/github";
import type { GitHubRepo } from "@/types";
import { Star, GitFork, ExternalLink, Github, Loader2 } from "lucide-react";

export default function ProjectsSection() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => { setRepos(d.repos ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const languages = ["all", ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean) as string[]))];

  const filtered = filter === "all" ? repos : repos.filter((r) => r.language === filter);

  const pinned = ["frontend-analyze", "backend-api-analyze", "dev-micro-sass", "NFTSwiftApp"];
  const sorted = [...filtered].sort((a, b) => {
    const aPin = pinned.indexOf(a.name);
    const bPin = pinned.indexOf(b.name);
    if (aPin !== -1 && bPin !== -1) return aPin - bPin;
    if (aPin !== -1) return -1;
    if (bPin !== -1) return 1;
    return b.stargazers_count - a.stargazers_count;
  });

  return (
    <section id="projects" ref={ref} className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className={cn("mb-12 transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">
            <span className="text-accent-2">03</span> — projetos
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Meu <span className="text-gradient">trabalho</span>
          </h2>
          <p className="text-muted mt-4 max-w-lg">
            Projetos do meu GitHub, carregados em tempo real via API.
          </p>
        </div>

        <div className={cn("flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-100", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setFilter(lang)}
              className={cn(
                "px-4 py-1.5 rounded-full font-mono text-xs border transition-all duration-200",
                filter === lang
                  ? "bg-accent text-bg border-accent"
                  : "border-border text-muted hover:border-accent/40 hover:text-text"
              )}
            >
              {lang === "all" ? "todos" : lang}
              {lang !== "all" && (
                <span
                  className="ml-1.5 w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: LANGUAGE_COLORS[lang] ?? "#8b949e" }}
                />
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map((repo, i) => {
              const isPinned = pinned.includes(repo.name);
              return (
                <div
                  key={repo.id}
                  className={cn(
                    "glass rounded-2xl p-5 border transition-all duration-500 flex flex-col group hover:-translate-y-1 hover:glow-blue",
                    isPinned ? "border-accent/30" : "border-border hover:border-accent/20",
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: `${Math.min(i * 60, 600)}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {isPinned && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                          pinned
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-muted hover:text-accent-2 transition-colors rounded-lg hover:bg-accent-2/10"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-muted hover:text-accent transition-colors rounded-lg hover:bg-accent/10"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  <h3 className="font-display font-semibold text-text mb-2 group-hover:text-accent transition-colors">
                    {repo.name}
                  </h3>

                  <p className="text-muted text-sm leading-relaxed flex-1 mb-4">
                    {repo.description ? truncate(repo.description, 90) : "Sem descrição"}
                  </p>

                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {repo.topics.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded-full bg-surface border border-border text-muted text-[10px] font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted pt-3 border-t border-border/50">
                    <div className="flex items-center gap-3">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? "#8b949e" }}
                          />
                          <span className="font-mono">{repo.language}</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3 h-3" />
                        {repo.forks_count}
                      </span>
                      <span className="font-mono text-[10px]">{formatDate(repo.updated_at)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className={cn("mt-10 text-center transition-all duration-700 delay-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <a
            href="https://github.com/kauabamorim?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-muted font-mono text-sm rounded-xl hover:border-accent/40 hover:text-accent transition-all duration-200"
          >
            <Github className="w-4 h-4" />
            ver todos no GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
