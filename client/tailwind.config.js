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
      }
    },
  },
  plugins: [],
}