/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        charcoal: '#0D0D0D',
        metal: '#171717',
        ivory: '#D8D1C2',
        cream: '#F1EBDD',
        silver: '#A8A39A',
        gray: '#77736D',
        bronze: '#8A6E52',
        graphite: '#2A2825',
        champagne: '#E7DCC3',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'metal-sheen':
          'linear-gradient(135deg, #77736D 0%, #D8D1C2 25%, #F1EBDD 45%, #8A6E52 60%, #2A2825 80%)',
      },
    },
  },
  plugins: [],
}
