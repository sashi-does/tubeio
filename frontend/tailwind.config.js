/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-blue': {
          DEFAULT: '#162142', // Main shade
          600: '#0F1A34', // Darker shade for hover
          400: '#2A3664', // Lighter shade for icons
        },
      },
    },
  },
  plugins: [],
};