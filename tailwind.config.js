/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: ['./app/**/*.{js,jsx,ts,tsx}', './ui/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#FFFFFF',
        primary: '#007F3D',
        'primary-container': '#D8F8D2',
        'on-surface-variant': '#4F5B53',
      },
      fontFamily: {
        'label-bold': ['System'],
      },
      fontWeight: {
        'label-bold': '700',
      },
      boxShadow: {
        lg: '0 -4px 12px rgb(0 0 0 / 0.14)',
      },
    },
  },
  plugins: [],
}
