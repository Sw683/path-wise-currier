/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcdbff',
          300: '#8ec4ff',
          400: '#58a1ff',
          500: '#2f7eff',
          600: '#195df5',
          700: '#1247e1',
          800: '#143bb6',
          900: '#16368f',
          950: '#112257',
        },
        saffron: {
          500: '#FF9933',
          600: '#E67E22',
        },
        emerald: {
          500: '#138808',
          600: '#0E6B05',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
