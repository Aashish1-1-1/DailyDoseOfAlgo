/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
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
        "jetbrains": ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

