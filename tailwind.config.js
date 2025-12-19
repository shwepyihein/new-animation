/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    // Dynamic color classes for random color generation
    {
      pattern:
        /(from|to|via|text|bg|border)-(amber|orange|yellow|lime|green|emerald|teal|cyan|blue|indigo|violet|purple|fuchsia|pink|rose|red)-(100|200|300|400|500|600|700|800|900)(\/\d+)?/,
      variants: ['dark', 'group-hover'],
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
