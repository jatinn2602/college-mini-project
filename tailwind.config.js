/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        srgi: {
          primary: '#123B6D',
          'primary-dark': '#0B2545',
          'primary-light': '#1E4D8C',
          secondary: '#0F766E',
          'secondary-light': '#14B8A6',
          accent: '#F59E0B',
          'accent-hover': '#D97706',
          bg: '#F8FAFC',
          text: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 20px -2px rgba(18, 59, 109, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(18, 59, 109, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'modal': '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
