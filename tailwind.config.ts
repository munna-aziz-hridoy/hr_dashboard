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
        primary: "#6c63ff",
        bodyColor: "#f9fafe",
        textColor: "#222943",
        textSecondColor: "#878787",
        menuActiveBg: "#6c63ff26",
      },
      boxShadow: {
        shadowUpSm:
          "rgba(108, 99, 255, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        shadowUp: "rgba(108, 99, 255, 0.4) 0px 30px 90px",
      },
    },
  },
  plugins: [],
};
export default config;
