/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#8cba00',
        secondary: '#ff6600',
        black: '#000000',
        white: '#ffffff',
        input_search_bg: '#F2F2F2',
        error: '#ff4848',
        gray: '#DCDCDC',
        gray_bold: '#7D7D7D',
        border_color: '#ECECEC',
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
