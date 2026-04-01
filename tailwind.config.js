module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f3f0ec',
        sage: '#6f826b',
        sage2: '#7e9078',
        deep: '#184a10',
        ink: '#0b0f0a',
      },
      borderRadius: {
        panel: '22px',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.10)',
      },
      fontFamily: {
        sixtyfour: ['Sixtyfour', 'system-ui', 'sans-serif'],
        workbench: ['Workbench', 'system-ui', 'sans-serif'],
        jersey10: ['Jersey 10', 'system-ui', 'sans-serif'],
        jersey25: ['Jersey 25', 'system-ui', 'sans-serif'],
        pixelify: ['Pixelify Sans', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wideish: '0.22em',
      },
    },
  },
  plugins: [],
}
