"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const roles = [
  "Full Stack Developer",
  "TypeScript Engineer",
  "Node.js Developer",
  "React & Next.js Dev",
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-2/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <div className="flex items-center gap-2 mb-6 opacity-0 animate-[fadeUp_0.6s_ease_0.1s_forwards]">
            <span className="w-2 h-2 rounded-full bg-accent-2 animate-pulse" />
            <span className="font-mono text-xs text-muted tracking-widest uppercase">
              available for work
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-none mb-4 opacity-0 animate-[fadeUp_0.6s_ease_0.2s_forwards]">
            Kauã
            <br />
            <span className="text-gradient">Berman</span>
            <br />
            Amorim
          </h1>

          <div className="h-8 mb-6 opacity-0 animate-[fadeUp_0.6s_ease_0.3s_forwards]">
            <span className="font-mono text-accent text-lg">
              {displayed}
              <span className="animate-blink">|</span>
            </span>
          </div>

          <p className="text-muted leading-relaxed max-w-md mb-8 opacity-0 animate-[fadeUp_0.6s_ease_0.4s_forwards]">
            Estudante de Análise e Desenvolvimento de Sistemas na{" "}
            <span className="text-text">Unisociesc</span>, Blumenau — SC. Construo
            aplicações web modernas com foco em performance e experiência de usuário.
          </p>

          <div className="flex flex-wrap gap-3 opacity-0 animate-[fadeUp_0.6s_ease_0.5s_forwards]">
            <a
              href="#projects"
              className="px-6 py-3 bg-accent text-bg font-display font-semibold rounded-lg hover:bg-accent/90 transition-colors duration-200"
            >
              Ver projetos
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-border text-muted font-display font-semibold rounded-lg hover:border-accent/40 hover:text-text transition-all duration-200"
            >
              Entrar em contato
            </a>
          </div>

          <div className="flex items-center gap-6 mt-10 opacity-0 animate-[fadeUp_0.6s_ease_0.6s_forwards]">
            {[
              { label: "23", sub: "repositórios" },
              { label: "11", sub: "seguidores" },
              { label: "TypeScript", sub: "stack principal" },
            ].map(({ label, sub }) => (
              <div key={sub} className="text-center">
                <p className="font-display font-bold text-xl text-gradient">{label}</p>
                <p className="font-mono text-xs text-muted mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center opacity-0 animate-[fadeUp_0.6s_ease_0.3s_forwards]">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-accent-2/20 rounded-full blur-2xl scale-110" />
            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-border glow-blue">
              <Image
                src="https://avatars.githubusercontent.com/u/77868006?v=4"
                alt="Kauã Berman Amorim"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-3 -right-3 glass px-4 py-2 rounded-xl border border-border">
              <p className="font-mono text-xs text-accent-2">{"{ coding }"}</p>
            </div>
            <div className="absolute -top-3 -left-3 glass px-3 py-1.5 rounded-lg border border-border">
              <p className="font-mono text-xs text-accent">TS + Node.js</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-[fadeUp_0.6s_ease_1s_forwards]">
        <a href="#skills" className="flex flex-col items-center gap-1 text-muted hover:text-text transition-colors">
          <span className="font-mono text-xs tracking-widest">scroll</span>
          <span className="text-lg animate-bounce">↓</span>
        </a>
      </div>
    </section>
  );
}
