/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          600: "rgb(147, 51, 234)",
          700: "rgb(126, 34, 206)",
        },
      },
    },
  },
  plugins: [],
};
