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
          400: "rgb(192, 132, 250)",
          500: "rgb(168, 85, 247)",
          600: "rgb(147, 51, 234)",
          700: "rgb(126, 34, 206)",
          900: "rgb(55, 48, 163)",
        },
        pink: {
          400: "rgb(244, 114, 182)",
          500: "rgb(236, 72, 153)",
          600: "rgb(219, 39, 119)",
        },
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        'xl': '20px',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(168, 85, 247, 0.5)',
        'glow-pink': '0 0 30px rgba(236, 72, 153, 0.5)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};
