import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          DEFAULT: "#21140E",
          deep: "#140D09",
          card: "#2A1A12",
          surface: "#22140D",
          border: "#4A3022",
          darker: "#140D09",
        },
        forest: {
          DEFAULT: "#294736",
          dark: "#1A2E22",
          deep: "#16241A",
          light: "#3A634C",
        },
        cream: {
          DEFAULT: "#F2E8D7",
          light: "#F5E8D7",
          muted: "#E2D3BE",
          secondary: "#C7B2A1",
        },
        copper: {
          DEFAULT: "#A96C40",
          light: "#C28B5E",
          hover: "#BB8459",
          dark: "#8C552E",
          border: "#B68E6D",
        },
        roasted: {
          red: "#8A3F35",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        script: ["var(--font-alex-brush)", "'Alex Brush'", "'Playfair Display'", "cursive"],
      },
      maxWidth: {
        "editorial": "1280px",
        "editorial-wide": "1360px",
      },
      boxShadow: {
        warm: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
        copper: "0 4px 20px -2px rgba(169, 108, 64, 0.25)",
        "copper-lg": "0 8px 30px -4px rgba(169, 108, 64, 0.35)",
        luxury: "0 24px 60px -12px rgba(0, 0, 0, 0.7)",
      },
      animation: {
        "steam-rise": "steamRise 4s ease-in-out infinite",
        "leaf-sway": "leafSway 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
