/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef0f7',
          100: '#cdd2e8',
          200: '#aab3d9',
          300: '#7a88c3',
          400: '#5062ae',
          DEFAULT: '#2C3E6B',
          600: '#253561',
          700: '#1e2b55',
          800: '#172248',
          900: '#101838',
        },
        gold: {
          50:  '#fdf8ec',
          100: '#f8ecc8',
          200: '#f2dea0',
          300: '#ebcc70',
          400: '#e3bb4a',
          DEFAULT: '#C9A84C',
          600: '#b08f35',
          700: '#95782a',
          800: '#7a6121',
          900: '#5f4b18',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
    },
  },
  plugins: [],
}
