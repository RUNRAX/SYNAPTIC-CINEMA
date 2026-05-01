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
        black: 'var(--black)',
        cream: 'var(--cream)',
        'cream-2': 'var(--cream-2)',
        gray: 'var(--gray)',
        mid: 'var(--mid)',
        accent: 'var(--accent)',
        red: 'var(--red)',
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
