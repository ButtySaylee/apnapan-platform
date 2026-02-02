/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'sans-serif']
      },
      colors: {
        brand: {
          teal: '#1abc9c',
          blue: '#3498db',
          purple: '#9b59b6'
        }
      }
    }
  },
  plugins: []
};
