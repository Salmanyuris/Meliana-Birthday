/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          50: '#FFF5FA',
          100: '#FFE9F5',
          200: '#FFDDEE',
          300: '#FFD1DC',
          400: '#FFB6C1',
          500: '#FF69B4',
          600: '#FCE4EC',
          rose: '#E91E63',
          purple: '#E1BEE7',
          gold: '#FFD700',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
        handwriting: ['Dancing Script', 'cursive'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'sway': 'sway 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      boxShadow: {
        'glow': '0 0 25px rgba(255, 105, 180, 0.4)',
        'glow-lg': '0 0 45px rgba(255, 182, 193, 0.6)',
        'glass': '0 8px 32px 0 rgba(255, 182, 193, 0.25)',
      }
    },
  },
  plugins: [],
}
