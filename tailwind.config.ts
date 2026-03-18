import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        bg: "#080c10",
        surface: "#0d1117",
        border: "#1c2333",
        accent: "#58a6ff",
        "accent-2": "#3fb950",
        muted: "#8b949e",
        text: "#e6edf3",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "slide-in": "slideIn 0.8s ease forwards",
        glow: "glow 3s ease-in-out infinite alternate",
        "blink": "blink 1s step-end infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-32px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        glow: {
          from: { "text-shadow": "0 0 10px #58a6ff44" },
          to: { "text-shadow": "0 0 30px #58a6ff88, 0 0 60px #58a6ff44" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
