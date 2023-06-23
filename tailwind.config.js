/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: '',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    colors: {
      primary: '#ffffff',
      secondary: '#052448',
      tertiary: '#2063B1',
      accent: '#2063B1',
      button: '#052448',
      buttonHover: '#2063B1',
      inputFocus: '#fafafa',
      link: '#ffffff',
      linkHover: '#2063B1',
      black: '#000000',
      white: '#ffffff',
      red: '#ff0000',
    },
    fontFamily: {
      primary: ['Roboto', 'sans-serif'],
      secondary: ['Merriweather', 'serif'],
      // Overriding fontFamily to use @next/font loaded families
      mono: 'var(--font-mono)',
      sans: 'var(--font-sans)',
      serif: 'var(--font-serif)',
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: '#ffffff',
          secondary: '#052448',
          tertiary: '#2063B1',
        },
      },
    ],
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('daisyui'),
  ],
}
