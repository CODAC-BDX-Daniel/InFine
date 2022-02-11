module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./component/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        RedPrimary: {
          1: '#A3232B',
        },
        BluePrimary: {
          1: '#263B46',
        },
        GrayPrimary: {
          1: '#F5F5F5',
        },
        YellowPrimary:{
          1: '#D7C998'
        },
        backgroundImage: {
          'bordeaux.background': "url('/public/bordeaux.background.jpg')",
        },
      },
    },
  },
  plugins: [],
}
