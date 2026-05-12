/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#faf7f2',
          sand: '#f0ebe3',
          ink: '#1c1917',
          muted: '#57534e',
          accent: '#b45309',
          'accent-soft': '#d97706',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Karla', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(28, 25, 23, 0.08)',
        lift: '0 12px 40px -12px rgba(28, 25, 23, 0.12)',
      },
      maxWidth: {
        content: '72rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.65s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
