/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-black': '#1C1D21',
        'custom-purple': '#581FE6',
        'custom-yellow': '#F5DA27',
      },
      textColor: {
        'secondary': '#838488',
        'custom-purple': '#581FE6',
      },
    },
  },
  plugins: [],
}