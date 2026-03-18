"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const skillCategories = [
  {
    category: "Frontend",
    icon: "◈",
    color: "#58a6ff",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "ShadCN UI", "Framer Motion"],
  },
  {
    category: "Backend",
    icon: "⬡",
    color: "#3fb950",
    skills: ["Node.js", "Express", "Fastify", "REST APIs", "GraphQL", "Prisma ORM"],
  },
  {
    category: "Banco de Dados",
    icon: "◉",
    color: "#f78166",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"],
  },
  {
    category: "Cloud & DevOps",
    icon: "◎",
    color: "#d2a8ff",
    skills: ["AWS", "AWS Amplify", "Vercel", "Docker", "GitHub Actions", "CI/CD"],
  },
  {
    category: "Mobile",
    icon: "◇",
    color: "#ffa657",
    skills: ["Swift", "SwiftUI", "Flutter", "Dart"],
  },
  {
    category: "Ferramentas",
    icon: "◆",
    color: "#79c0ff",
    skills: ["VSCode", "DataGrip", "Git", "Zod", "Axios", "JWT"],
  },
];

export default function SkillsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className={cn("mb-16 transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">
            <span className="text-accent-2">02</span> — tecnologias
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            O que eu <span className="text-gradient">domino</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.category}
              className={cn(
                "glass rounded-2xl p-6 border border-border hover:border-accent/30 transition-all duration-500 group cursor-default",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl" style={{ color: cat.color }}>{cat.icon}</span>
                <h3 className="font-display font-semibold text-text">{cat.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-surface border border-border text-muted text-xs font-mono group-hover:border-border/80 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={cn(
          "mt-16 glass rounded-2xl p-8 border border-border transition-all duration-700 delay-500",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
            <span className="text-accent">→</span> stack favorita
          </p>
          <div className="flex flex-wrap items-center gap-3 font-mono text-sm">
            {[
              { name: "TypeScript", color: "#3178c6" },
              { name: "+", color: "#8b949e" },
              { name: "Node.js", color: "#3fb950" },
              { name: "+", color: "#8b949e" },
              { name: "Next.js", color: "#e6edf3" },
              { name: "+", color: "#8b949e" },
              { name: "Prisma", color: "#58a6ff" },
              { name: "+", color: "#8b949e" },
              { name: "PostgreSQL", color: "#336791" },
            ].map(({ name, color }, i) => (
              <span key={i} style={{ color }} className="font-semibold">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
