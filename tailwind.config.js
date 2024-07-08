/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#34D399",
        secondary: "#FBBF24",
        accent: "#F87171",
      },
    },
  },
  plugins: [],
};
