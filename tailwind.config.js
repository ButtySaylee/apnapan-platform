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
          teal: '#0d7377',
          blue: '#1a3558',
          purple: '#4a6fa5'
        }
      }
    }
  },
  plugins: []
};
