/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#0b1c13',
          100: '#0f261a',
          200: '#133222',
          300: '#174029',
          400: '#1c5232',
          500: '#22623c',
          600: '#2a7547',
          700: '#348a55',
          800: '#42a466',
          900: '#56c07a',
        },
        vermilion: '#e34234',
        onyx: '#0a0a0a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"IM Fell English SC"', 'serif'], // gives a rustic accent
      },
      boxShadow: {
        moss: '0 0 20px rgba(35, 150, 85, 0.25)',
      },
    },
  },
  plugins: [],
};

