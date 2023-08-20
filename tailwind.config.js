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
        'base-normal': 'white',
        'base-inverted': 'black',
        normal: '#f7f9f9',
        inverted: '',
        'secondary-normal': '#eff3f4',
        'secondary-inverted': '',
        'hover-normal': 'rgba(0,0,0,0.05)',
        'hover-inverted': '',
        'hover-secondary-normal': 'rgba(15,20,25,0.1)',
        'hover-secondary-inverted': '',
        'tertiary-normal': '#0f141a',
        'tertiary-inverted': '',
        'quaternary-normal': '#eafaff',
        'quaternary-inverted': '',
        'backdrop-normal': 'rgba(0,0,0,0.4)',
        'backdrop-inverted': '',
        'border-normal': '#eff3f4',
        'border-inverted': '',
        placeholder: '#cfd9de',
        'placeholder-inverted': '',
      },
      textColor: {
        normal: '#0f141a',
        inverted: '',
        'secondary-normal': '#536471',
        'secondary-inverted': '',
      },
      borderColor: {
        normal: '#eff3f4',
        'normal-inverted': '',
      },
      colors: {
        brand: {
          normal: '#1d9bf0',
          inverted: '#1a8cd8',
        },
        error: {
          normal: '#f4212e',
          inverted: '',
        },
        disabled: {
          normal: '#87898c',
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
