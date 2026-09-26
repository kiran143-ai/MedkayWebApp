export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EEF2FA',
          100: '#D6DFF2',
          300: '#8FA3D1',
          500: '#1E3F8A',
          700: '#0B2A6B',
          900: '#061A45',
        },
        teal: {
          50: '#EAF6F5',
          100: '#CDEBE8',
          200: '#9FD7D2',
          300: '#6CC2BB',
          400: '#34A9A2',
          500: '#0E8A86',
          600: '#0B7672',
          700: '#08605D',
          800: '#064C4A',
          900: '#053B39',
        },
        ink: {
          DEFAULT: '#0F1B2D',
          muted: '#526071',
          subtle: '#8491A1',
        },
        line: '#E4EAF0',
        canvas: '#F5F8FA',
        success: { 50: '#EAF7EF', 500: '#2BA160', 600: '#1F8A4C', 700: '#176B3B' },
        warning: { 50: '#FEF5E7', 500: '#E08A00', 600: '#B26A00', 700: '#8A5200' },
        danger: { 50: '#FDECEC', 500: '#DC4B3E', 600: '#C0392B', 700: '#992D22' },
        info: { 50: '#EAF1FB', 500: '#3B7DD8', 600: '#2463B8', 700: '#1B4D8F' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,27,45,0.04), 0 1px 3px rgba(15,27,45,0.03)',
        pop: '0 16px 40px -12px rgba(6,26,69,0.22), 0 2px 6px rgba(6,26,69,0.06)',
      },
    },
  },
};
