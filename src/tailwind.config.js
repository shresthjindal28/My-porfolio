/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
const module = {};
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffcd00", // Yellow
        secondary: "#E63946", // Red
        accent: "#6c63ff", // Purple
        dark: {
          100: "#ccd6f6",
          200: "#a8b2d1",
          300: "#8892b0",
          400: "#495670",
          500: "#233554",
          600: "#112240",
          700: "#0a192f",
          800: "#080e1b",
          900: "#020c1b",
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
        display: ['Rubik Vinyl', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
      },
    },
  },
  plugins: [],
}
