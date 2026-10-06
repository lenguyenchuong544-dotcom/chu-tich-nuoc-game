/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cotton: "var(--color-cotton, #FFFDFE)",
        blush: {
          DEFAULT: "var(--color-blush, #FFE3EE)",
          deep: "var(--color-blush-deep, #FFD1E3)",
          surface: "var(--color-blush-surface, #FFF5F8)",
        },
        peony: {
          DEFAULT: "var(--color-peony, #FF7FB0)",
          hover: "#FF6BA3",
          700: "var(--color-peony-700, #B33D6E)",
        },
        sky: {
          DEFAULT: "var(--color-sky, #CFE8FF)",
          deep: "var(--color-sky-deep, #B6DCFE)",
          surface: "var(--color-sky-surface, #F2F8FF)",
        },
        cornflower: {
          DEFAULT: "var(--color-cornflower, #6FB4F2)",
          hover: "#5BA7EE",
          700: "var(--color-cornflower-700, #1A63A8)",
        },
        ink: {
          DEFAULT: "var(--color-ink, #2A2540)",
          muted: "var(--color-ink-muted, #68627D)",
          subtle: "#9A94AD",
        },
        // Semantic states
        correct: {
          DEFAULT: "var(--color-mint, #8EE3C8)",
          surface: "var(--color-mint-surface, #E8F8F2)",
          text: "var(--color-mint-text, #14634B)",
        },
        wrong: {
          DEFAULT: "var(--color-coral, #FF6B7F)",
          surface: "var(--color-coral-surface, #FFEBF0)",
          text: "var(--color-coral-text, #9B1B32)",
        },
        highlight: {
          DEFAULT: "var(--color-honey, #FFD27A)",
          surface: "var(--color-honey-surface, #FFF7E6)",
          text: "var(--color-honey-text, #7A4B00)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "18px",
        xl: "24px",
        "2xl": "32px",
        pill: "9999px",
      },
      boxShadow: {
        dossier: "0 12px 32px -8px rgba(255, 127, 176, 0.18), 0 4px 16px -2px rgba(111, 180, 242, 0.12), 0 0 0 1px rgba(42, 37, 64, 0.06)",
        "dossier-hover": "0 20px 40px -10px rgba(255, 127, 176, 0.25), 0 8px 24px -4px rgba(111, 180, 242, 0.18), 0 0 0 1px rgba(255, 127, 176, 0.3)",
        "dossier-crisis": "0 16px 36px -8px rgba(255, 107, 127, 0.3), 0 0 0 2px rgba(255, 107, 127, 0.45)",
        tactile: "0 3px 0 rgba(42, 37, 64, 0.08)",
        "tactile-pressed": "0 1px 0 rgba(42, 37, 64, 0.08)",
      },
    },
  },
  plugins: [],
};
