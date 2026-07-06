import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          bg:      '#050A15',
          surface: '#0A1628',
          deep:    '#03070F',
          border:  '#1A3A5C',
        },
        accent: {
          green:     '#00FF88',
          blue:      '#00B4D8',
          greenGlow: 'rgba(0,255,136,0.12)',
          blueGlow:  'rgba(0,180,216,0.12)',
          amber:     '#F0A500',
        },
        ink: {
          primary: '#E2E8F0',
          muted:   '#64748B',
          dim:     '#334155',
        },
        // Preserved for BootSequence.tsx — do not remove
        terminal: {
          bg:      '#0D0D0D',
          text:    '#E0E0E0',
          accent:  '#00FF88',
          muted:   '#6A9955',
          error:   '#FF5555',
          amber:   '#F0A500',
          border:  '#1E1E1E',
          surface: '#111111',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
