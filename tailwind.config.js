/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'paperBg': "url('/bg.png')",
      },
      fontFamily: {
        'nerko': ['"Nerko One"']
      }
    },
  },
  plugins: [],
}

