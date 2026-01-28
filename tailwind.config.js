/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        AppFont: ["AppFont", "system-ui", "sans-serif"]
      }
    },
  },
  plugins: [],
};

