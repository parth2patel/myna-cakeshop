// tailwind.config.js
module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './pages/*.{js,ts,jsx,tsx}',
    './components/*.{js,ts,jsx,tsx}'],
  //darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        '3xl': '10px -11px 10px rgba(229, 230, 233) inline',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}