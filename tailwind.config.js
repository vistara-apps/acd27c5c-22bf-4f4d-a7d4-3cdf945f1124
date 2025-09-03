/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(240, 5%, 15%)',
        text: 'hsl(0, 0%, 95%)',
        accent: 'hsl(40, 100%, 50%)',
        primary: 'hsl(200, 100%, 40%)',
        surface: 'hsl(240, 5%, 20%)',
        'secondary-text': 'hsl(0, 0%, 70%)'
      },
      borderRadius: {
        'lg': '16px',
        'md': '10px',
        'sm': '6px'
      },
      spacing: {
        'lg': '20px',
        'md': '12px',
        'sm': '8px'
      },
      boxShadow: {
        'card': '0 8px 24px hsla(240, 5%, 0%, 0.12)',
        'overlay': '0 4px 30px hsla(240, 5%, 0%, 0.3)'
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.22,1,0.36,1)',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px hsl(200, 100%, 40%)' },
          '50%': { boxShadow: '0 0 40px hsl(200, 100%, 40%), 0 0 60px hsl(200, 100%, 40%)' }
        }
      }
    }
  },
  plugins: []
};
