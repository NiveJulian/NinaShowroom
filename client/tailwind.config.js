/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff2190',
        secondary: '#ff5eaf',
        tertiary: '#fe036a'
      },
      animation: {
        'fade-in': 'fadeIn 2s ease-in-out',
      },
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0, transform: 'scale(0.95)' },
        '100%': { opacity: 1, transform: 'scale(1)' },
      },
    },
  },
  plugins: [],
}