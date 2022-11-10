/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        '10vh': '10%',
        '80vh': '80%',
      },
    },
  },
  plugins: [],
};
