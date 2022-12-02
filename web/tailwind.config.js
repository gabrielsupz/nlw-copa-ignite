/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },

      backgroundImage: {
        app: 'url(/app-bg.png)'
      },
      colors: {
        blackButton: {
          500: '#09090A'
        },
        yellow: {
          500: '#F7DD43',
          600: '#FCDD27'
        },
        ignite: {
          500: '#129E57'
        },
        gray: {
          100: '#E1E1E6',
          300: '#808099',
          600: '#323238',
          800: '#202024',
          900: '#121214'
        }
      }
    }
  },
  plugins: []
}
