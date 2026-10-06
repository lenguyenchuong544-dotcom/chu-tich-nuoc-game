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
        presidential: {
          gold: "#d4af37",
          goldLight: "#fde047",
          goldDark: "#996515",
          red: "#991b1b",
          redBright: "#dc2626",
          navy: "#0f172a",
          dark: "#0a0f1d",
          card: "#131b2e",
          border: "#24324f",
          accent: "#38bdf8",
        },
      },
      fontFamily: {
        serif: ["Lora", "Merriweather", "Georgia", "serif"],
        sans: ["'Be Vietnam Pro'", "Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slight": "bounceSlight 2s infinite",
      },
      keyframes: {
        bounceSlight: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
    },
  },
  plugins: [],
};
