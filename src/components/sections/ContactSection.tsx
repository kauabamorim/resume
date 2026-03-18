"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Mail, Linkedin, Github, Instagram, ExternalLink, Send, CheckCircle2 } from "lucide-react";

const socials = [
  {
    name: "Email",
    handle: "kauabamorim@outlook.com",
    href: "mailto:kauabamorim@outlook.com",
    icon: Mail,
    color: "#58a6ff",
  },
  {
    name: "LinkedIn",
    handle: "kauã-berman-amorim",
    href: "https://www.linkedin.com/in/kau%C3%A3-berman-amorim/",
    icon: Linkedin,
    color: "#0a66c2",
  },
  {
    name: "GitHub",
    handle: "@kauabamorim",
    href: "https://github.com/kauabamorim",
    icon: Github,
    color: "#e6edf3",
  },
  {
    name: "Instagram",
    handle: "@amorimmkb",
    href: "https://www.instagram.com/amorimmkb/",
    icon: Instagram,
    color: "#e4405f",
  },
];

export default function ContactSection() {
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  };

  return (
    <section id="contact" ref={ref} className="py-32 relative">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className={cn("mb-16 transition-all duration-700", visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-3">
            <span className="text-accent-2">04</span> — contato
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Vamos <span className="text-gradient">conversar</span>
          </h2>
          <p className="text-muted mt-4 max-w-md">
            Aberto a oportunidades de trabalho, freelas e colaborações. Me manda uma mensagem!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className={cn("transition-all duration-700 delay-100", visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8")}>
            <div className="space-y-3 mb-10">
              {socials.map(({ name, handle, href, icon: Icon, color }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 glass border border-border rounded-xl hover:border-accent/30 transition-all duration-200 group"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center border border-border"
                    style={{ backgroundColor: `${color}18` }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-text text-sm">{name}</p>
                    <p className="font-mono text-xs text-muted">{handle}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted ml-auto group-hover:text-accent transition-colors" />
                </a>
              ))}
            </div>

            <div className="glass border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-accent-2 animate-pulse" />
                <span className="font-mono text-xs text-muted">status</span>
              </div>
              <p className="font-display font-semibold text-text">Disponível para trabalho</p>
              <p className="font-mono text-xs text-muted mt-1">Blumenau, SC — Brasil 🇧🇷</p>
            </div>
          </div>

          <div className={cn("transition-all duration-700 delay-200", visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8")}>
            {status === "sent" ? (
              <div className="glass border border-accent-2/30 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 text-center h-full">
                <CheckCircle2 className="w-12 h-12 text-accent-2" />
                <h3 className="font-display text-xl font-bold text-text">Mensagem enviada!</h3>
                <p className="text-muted text-sm">Obrigado por entrar em contato. Responderei em breve.</p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}
                  className="font-mono text-xs text-accent hover:underline"
                >
                  enviar outra
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass border border-border rounded-2xl p-6 space-y-4">
                <div>
                  <label className="block font-mono text-xs text-muted mb-2 tracking-widest">NOME</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text font-body text-sm focus:outline-none focus:border-accent/50 focus:bg-surface/80 transition-all placeholder:text-muted/40"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-muted mb-2 tracking-widest">EMAIL</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text font-body text-sm focus:outline-none focus:border-accent/50 focus:bg-surface/80 transition-all placeholder:text-muted/40"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-muted mb-2 tracking-widest">MENSAGEM</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text font-body text-sm focus:outline-none focus:border-accent/50 focus:bg-surface/80 transition-all resize-none placeholder:text-muted/40"
                    placeholder="Olá Kauã, gostaria de conversar sobre..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-3 rounded-xl font-display font-semibold text-sm transition-all duration-200",
                    status === "sending"
                      ? "bg-accent/50 text-bg/70 cursor-not-allowed"
                      : "bg-accent text-bg hover:bg-accent/90"
                  )}
                >
                  {status === "sending" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar mensagem
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
