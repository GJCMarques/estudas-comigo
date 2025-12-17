/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#8A5A3C',
        secondary: '#F2B734',
        'lux-black': '#1a1a1a',
        'lux-white': '#fafafa',
        'primary-dark': '#6B4430',
        'secondary-light': '#FFD95A',
      },
      fontFamily: {
        heading: ['Nunito', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
        logo: ['"Saira Stencil One"', 'cursive'],
      },
    },
  },
  plugins: [],
}