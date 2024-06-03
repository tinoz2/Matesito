/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#dee2e6",
        secondary: "#3B82F6",
        third: "#a3b3ce",
        fourth: "#999"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

