/**
 * Tailwind configuration for Guiding Stars frontend
 * Adds a `primary` color based on #FF9148 and a few nearby shades.
 */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#fff6f2',
          100: '#ffeadf',
          200: '#ffd1b8',
          300: '#ffb889',
          400: '#ff9d60',
          500: '#FF9148', // base
          600: '#e66f32',
          700: '#bf4f21',
          800: '#993919',
          900: '#612210',
        },
      },
    },
  },
  plugins: [],
};
