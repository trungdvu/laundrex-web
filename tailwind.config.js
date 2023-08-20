/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

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
      backgroundColor: {
        base: 'white',
        'base-inverted': 'black',
        main: '#f7f9f9',
        inverted: '',
        secondary: '#eff3f4',
        'secondary-inverted': '',
        hover: 'rgba(0,0,0,0.05)',
        'hover-inverted': '',
        'hover-secondary': 'rgba(15,20,25,0.1)',
        'hover-secondary-inverted': '',
        tertiary: '#0f141a',
        'tertiary-inverted': '',
        quaternary: '#eafaff',
        'quaternary-inverted': '',
        backdrop: 'rgba(0,0,0,0.4)',
        'backdrop-inverted': '',
        'border-main': '#eff3f4',
        'border-main-inverted': '',
        placeholder: '#cfd9de',
        'placeholder-inverted': '',
      },
      textColor: {
        main: '#0f141a',
        inverted: '',
        secondary: '#536471',
        'secondary-inverted': '',
      },
      borderColor: {
        main: '#eff3f4',
        inverted: '',
      },
      colors: {
        brand: {
          main: '#1d9bf0',
          inverted: '#1a8cd8',
        },
        error: {
          main: '#f4212e',
          inverted: '',
        },
        disabled: {
          main: '#87898c',
          inverted: '',
        },
      },
      animation: {
        'spin-fast': 'spin 0.4s linear infinite',
      },
      transitionDuration: {
        fast: '75ms',
        normal: '200ms',
      },
      boxShadow: {
        normal:
          'rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px',
        inverted:
          'rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px',
      },
      fontSize: {
        sm: '0.8125rem',
        base: '0.9375rem',
        lg: '1.0625rem',
        '2xl': '1.625rem',
        '3xl': '1.9375rem',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('autoprefixer')],
};
