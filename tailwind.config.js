/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0FDF4',
          100: '#E8F2EA',
          200: '#C7E4CE',
          300: '#86CD99',
          400: '#34D399',
          500: '#22c55e',
          600: '#267653',
          700: '#1e6043',
          800: '#174D3A', // Primary deep green from spec
          900: '#0F3427',
          950: '#071F17',
        },
        surface: {
          light: '#FAFBF8',
          card: '#FFFFFF',
          subtle: '#F3F5F1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(23, 77, 58, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 10px 30px -4px rgba(23, 77, 58, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
