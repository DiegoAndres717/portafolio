/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: { 
      Montserrat: ["Monserrat", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        'fondo-home': "url('/https://www.dropbox.com/s/x9xf4s9o0qp081i/video-about.mp4?dl=1')",
        'video-about': "url('/video-about.mp4')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      textColor: {
        'primary':"#CC2D4A",
        'secondary':"#8FA206",
        'tertiary':"#61AEC9",
        'primary-font': '#1B2937',
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        primary: '#CC2D4A',
        secondary: '#8FA206',
        terciary: '#61AEC9',
        primary_font: '#1B2937',
      }),
      color: {
        red: '#e53e3e'
      },
      fontFamily: {
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif']
      },
      animation: {
        'bg-color': 'bg-color-animation 5s linear infinite',
      },
        screens: {
          'tablet': '640px',
          // => @media (min-width: 640px) { ... }
    
          'laptop': '1024px',
          // => @media (min-width: 1024px) { ... }
    
          'desktop': '1280px',
          // => @media (min-width: 1280px) { ... }
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        'card': 'repeat(2, minmax(100px, 1fr))',

        // Complex site-specific column configuration
        'footer': '200px minmax(900px, 1fr) 100px',
      },
      animation: {
        'waving-hand': 'wave 2s linear infinite',
      },

    },
    
  },
  plugins: [require("daisyui")]
}
