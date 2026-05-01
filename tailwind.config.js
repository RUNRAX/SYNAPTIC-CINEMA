/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#0A0A0A',
        cream: '#F2EDE3',
        'cream-2': '#E8E2D4',
        gray: '#B8B3A8',
        mid: '#6B6660',
        accent: '#C8FF00',
        red: '#FF2D2D',
      },
      fontFamily: {
        display: ['var(--font-bebas-neue)', 'sans-serif'],
        body: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      animation: {
        ticker: 'ticker 30s linear infinite',
        scanline: 'scanline 4s linear infinite',
        pulse: 'pulse 1.5s ease-in-out infinite',
        glitch: 'glitch1 0.3s steps(1) forwards',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
