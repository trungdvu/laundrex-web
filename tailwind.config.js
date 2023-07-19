/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        brand: {
          main: '#1d9bf0',
          dark: '#1a8cd8',
        },
        grey: {
          main: '#71767b',
          light: '#e7e9ea',
          dark: '#2f3336',
          darker: '#0f1419',
        },
        base: {
          main: '#16181c',
          light: '#212327',
          lighter: '#eff3f4',
        },
      },
      animation: {
        'spin-fast': 'spin 0.4s linear infinite',
      },
      transitionDuration: {
        fast: '75ms',
        main: '200ms',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('autoprefixer')],
};
