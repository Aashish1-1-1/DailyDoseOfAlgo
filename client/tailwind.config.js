/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
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

