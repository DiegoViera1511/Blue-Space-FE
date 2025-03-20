/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-mask-tb': 'linear-gradient(to bottom , transparent 0%, white 30%, white 70%, transparent 100%)',
      },
    },
  },
  plugins: [],
}

