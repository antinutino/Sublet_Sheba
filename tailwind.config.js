/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        grow: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
      },
    },
      animation: {
        grow: 'grow 5s linear infinite',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

