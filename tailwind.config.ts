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
          primary: "#C8105D",
          primaryLight: "#D81B60",
          primaryHover: "#A8084A",
          burgundyDark: "#6B0833",
          burgundyMain: "#9E0B4B",
          backgroundSoft: "#FDF4F7",
          backgroundAlt: "#FBE9F0",
          cardBorder: "#F3D6E2",
          whatsapp: "#25D366",
          whatsappDark: "#1EBE5D",
        },
      },
      fontFamily: {
        brand: ["var(--font-cinzel)", "serif"],
        script: ["var(--font-dancing)", "cursive"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(200, 16, 93, 0.08)",
        card: "0 2px 12px 0 rgba(107, 8, 51, 0.06)",
        float: "0 10px 30px -4px rgba(200, 16, 93, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
