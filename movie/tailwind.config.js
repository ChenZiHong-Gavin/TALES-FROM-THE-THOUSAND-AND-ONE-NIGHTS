/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/views/AIExperiment/ChatBot/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-white': '#ffffff2b',
        'dark-grey': '#202123',
        'light-grey': '#353740',
      },
    },
  },
  // 'postcss-import': {},
  plugins: [require('daisyui')],
};