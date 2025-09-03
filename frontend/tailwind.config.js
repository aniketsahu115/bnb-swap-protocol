/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bnb-yellow': '#F0B90B',
        'bnb-dark': '#1E1E1E',
      }
    },
  },
  plugins: [],
}