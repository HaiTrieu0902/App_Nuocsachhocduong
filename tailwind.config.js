/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#0E8449',
        primary_regular: '#18DC7A',
        primary_light: '#74EAAF',

        warning: '#977a40',
        warning_regular: '#fbcb6a',
        warning_light: '#fde0a6',

        infomation: '#2a225e',
        infomation_regular: '#0d6cf2',
        infomation_light: '#89c7ff',

        error: '#92291C',
        error_regular: '#F4442F',
        error_light: '#F77C6D',

        text_color: '#191f33',
        text_color_regular: '#767e94',
        text_color_light: '#e9eaf0',

        black: '#000000',
        white: '#ffffff',

        stroke_bg: '#f5f5f5',
        modal_bg: '#7f7f7f',
        transparent: 'transparent',
        overlay: 'rgba(0, 0, 0, 0.5)',
      },
      spacing: {
        base: 12,
        md: 16,
        lg: 24,
      },
      screens: {},
    },
  },
  plugins: [],
};
