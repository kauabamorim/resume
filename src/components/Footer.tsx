export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-lg">
            <span className="text-gradient">kb</span>
            <span className="text-muted">.</span>
          </span>
          <span className="text-muted text-sm font-mono">— Kauã Berman Amorim</span>
        </div>

        <p className="font-mono text-xs text-muted text-center">
          Construído com{" "}
          <span className="text-accent">Next.js 15</span>
          {" · "}
          <span className="text-accent">TypeScript</span>
          {" · "}
          <span className="text-accent">Tailwind CSS</span>
        </p>

        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} — Blumenau, SC
        </p>
      </div>
    </footer>
  );
}
