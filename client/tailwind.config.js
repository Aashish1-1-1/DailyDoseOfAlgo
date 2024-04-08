/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    letterSpacing: {
      tightest: '-.075em',
      tighter: '-.05em',
      tight: '-.025em',
      normal: '0',
      wide: '.025em',
      wider: '.05em',
      widest: '.1em',
    },
    extend: {
      fontFamily: {
        "poppins": ['Poppins', 'sans-serif'],
        "playfair": ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'hero-image': "url('/assets/Background.png')",
      }
    },
  },
  plugins: [],
}

