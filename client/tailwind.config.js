// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      '1': '#101010',
      '2': '#e2e8f0',
      '3': '#5f6063',
      '4': '#262626',
      slate: {
        50: '#f8fafc',
        100: '#f1f5f9',
        300: '#cbd5e1',
        400: '#94a3b8',
      },
    },
    fontFamily: {
      'ui-font': ['ui-sans-serif', 'system-ui']
    },
    extend: {},
  },
  plugins: [],
}