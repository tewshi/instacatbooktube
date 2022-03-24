module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      valid: '#D3F8DB',
      failed: '#CC8862',
      textValid: '#62CC6D',
      disabled: '#858585',
      white: '#FFFFFF'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
