import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1B1918",
          soft: "#2A2724",
        },
        parchment: {
          DEFAULT: "#FAF7F2",
          dim: "#F1ECE3",
        },
        brass: {
          DEFAULT: "#B8935F",
          light: "#D8B98A",
          dark: "#8F6E43",
        },
        burgundy: {
          DEFAULT: "#6B2737",
          light: "#8C3A4C",
          dark: "#4A1826",
        },
        sage: {
          DEFAULT: "#7A8B76",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        card: "0.9rem",
      },
      boxShadow: {
        ticket: "0 1px 2px rgba(27,25,24,0.06), 0 8px 24px rgba(27,25,24,0.08)",
        "ticket-hover": "0 2px 4px rgba(27,25,24,0.08), 0 16px 40px rgba(27,25,24,0.14)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
export default config;
