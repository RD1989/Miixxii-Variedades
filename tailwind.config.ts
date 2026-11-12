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
        brand: {
          primary: "#0A0A0A",
          primaryLight: "#1F1F1F",
          primaryHover: "#2A2A2A",
          dark: "#050505",
          darkMain: "#121212",
          backgroundSoft: "#FAFAFA",
          backgroundAlt: "#F4F4F5",
          cardBorder: "#E4E4E7",
          whatsapp: "#25D366",
          whatsappDark: "#1EBE5D",
        },
      },
      fontFamily: {
        brand: ["var(--font-cinzel)", "Georgia", "serif"],
        serif: ["var(--font-cinzel)", "Didot", "Bodoni MT", "Georgia", "serif"],
        script: ["var(--font-dancing)", "cursive"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        card: "0 2px 14px 0 rgba(0, 0, 0, 0.04)",
        float: "0 10px 30px -4px rgba(0, 0, 0, 0.22)",
        luxury: "0 20px 45px -10px rgba(0, 0, 0, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
