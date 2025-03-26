/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/views/**/*.njk",
    "./public/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB', // Blue color
          dark: '#1D4ED8',
          light: '#60A5FA',
        },
        secondary: {
          DEFAULT: '#10B981', // Green
          dark: '#059669',
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#1F2937',
        }
      },
      spacing: {
        '80': '20rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
      height: {
        'screen-90': '90vh',
      },
      width: {
        '80': '20rem',
      },
      minHeight: {
        '80': '20rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    }
  },
  plugins: [],
}
