// ============================================================
// Tailwind CDN theme config — ink/gold/parchment premium palette
// ============================================================
tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          display: ['"Noto Serif Bengali"', '"Fraunces"', 'serif'],
          ui: ['"Hind Siliguri"', '"Inter"', 'sans-serif'],
        },
        colors: {
          ink: { 950:'#0A0D18', 900:'#0F1220', 800:'#171B2E', 700:'#20263D', 600:'#2B324D' },
          parchment: { 100:'#F7F3E8', 200:'#EDEAE0', 300:'#D9D4C4', 400:'#9CA3C4' },
          gold: { 300:'#E8C77E', 400:'#D4A857', 500:'#C1943F', 600:'#A67A2E' },
        },
        boxShadow: {
          glow: '0 0 40px -8px rgba(212, 168, 87, 0.35)',
          card: '0 4px 24px -4px rgba(0,0,0,0.45)',
        },
        animation: {
          'fade-in': 'fadeIn 0.4s ease-out',
          'rise': 'rise 0.5s ease-out',
        },
        keyframes: {
          fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
          rise: { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        },
      },
    },
  }
