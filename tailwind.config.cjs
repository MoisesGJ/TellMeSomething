/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        responsive: ['clamp(1.5rem, 5vw, 3rem)', '1.5'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
