import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Fira Sans",
          "sans-serif",
        ],
      },
      colors: {
        primary: "#56b5b5",
        "gray-light": "#e6e6e6",
        "gray-dark": "#a3a3a3",
      },
    },
  },
  plugins: [],
} satisfies Config;
