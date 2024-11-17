import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D3B66',
        secondary: '#FAA916',
        accent: '#F4D35E',
        dark: '#1E1E24',
      },
    },
  },
  plugins: [],
} satisfies Config;
