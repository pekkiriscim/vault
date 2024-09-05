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
      },
      boxShadow: {
        md: '0px 2px 4px -2px rgba(24, 24, 27, 0.06), 0px 4px 8px -2px rgba(24, 24, 27, 0.10)'
      },
      typography: {
        DEFAULT: {
          css: {
            'blockquote p:first-of-type::before': false,
            'blockquote p:first-of-type::after': false
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
