/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ecotone-green': '#4A7F24',
        'ecotone-green-light': '#5A9B2E',
        'ecotone-light': '#F8F9FA',
        'ecotone-dark': '#1A1C19',
      },
      fontFamily: {
        'sans': ['"Plus Jakarta Sans"', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
