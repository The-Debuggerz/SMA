/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        '80per': '80%',
      },
      colors: {
        'google-clr': '#4285f4',
      },
    },
  },
  plugins: [],
};
