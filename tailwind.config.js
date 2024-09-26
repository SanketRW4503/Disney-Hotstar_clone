/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'custom-inset': '100px -100px 102px 20px rgba(0,0,0,1) inset',
        'custom-outset': '100px -100px 102px 20px rgba(0,0,0,1) '
      },
      colors:{
          'text-theme':'#8f98b2',
          'loginbg':'#16181f'
      }
      ,
    },
  },
  plugins: [],
}

