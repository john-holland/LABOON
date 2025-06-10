/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'text-glow': 'text-glow 1s ease-in-out infinite alternate',
        'slide-in': 'slide-in 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-in',
      },
      keyframes: {
        'text-glow': {
          '0%': { textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073' },
          '100%': { textShadow: '0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 