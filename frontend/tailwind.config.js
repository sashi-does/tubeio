/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Make sure the content path covers your project
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(240, 5%, 84%)',
      },
    },
  },
  plugins: [],
};
