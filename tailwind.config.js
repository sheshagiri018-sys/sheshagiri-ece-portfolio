/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['Bebas Neue', 'cursive'],
        syne: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        cinzel: ['Cinzel', 'serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        void: '#000000',
        abyss: '#03070F',
        cosmos: '#060D1A',
        nebula: '#0A1628',
        electric: '#00B8FF',
        plasma: '#00FFFF',
        aurora: '#7B2FFF',
        nova: '#FF6B2B',
        gold: '#FFB800',
        stellar: '#C8E6FF',
        signal: '#00FF88',
      },
    },
  },
  plugins: [],
}
