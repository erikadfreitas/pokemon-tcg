/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    fontSize: {
      '14': '14px',
      '24': '24px',
    },
    fontFamily: {
      'press-start': ['"Press Start 2P"', 'cursive'],
      'roboto': ['Roboto', 'sans'],
    },
  },
  plugins: [],
}

