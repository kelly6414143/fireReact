module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    width: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
      '50': '50px',
      '100': '100px'
     },
     height: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
      '50': '50px',
      '100': '100px'
     },
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
      '50': '50px',
      '100': '100px'
     },
     maxWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
     },
     fontSize: {
      sm: ['12px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
    },
    inset:{
      '0': '0',
      '1': '4px',
      '2' : '8px',
      '1/2': '50%',
      'full': '100%'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
