const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: ['0.75rem', '1.125rem'],
      sm: ['0.875rem', '1.25rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.125rem', '1.75rem'],
      xl: ['1.25rem', '1.875rem'],
      '2xl': ['1.5rem', '2rem']
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
}
