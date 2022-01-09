module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [require('tailwind-scrollbar'), require('@tailwindcss/forms')],
  theme: {
    extend: {
      colors: {
        uphold: {
          main: '#49cc68',
          paper: '#f5f9fc',
          title: '#091135',
          text: '#3d4b5c',
          muted: '#9aa7b5',
        },
      },
      maxWidth: {
        container: '34rem',
      },
    },
  },
};
