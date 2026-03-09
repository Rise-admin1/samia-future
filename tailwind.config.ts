import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        'grow-blue': '#2F76F6',
        'grow-green': '#85CF44',
        'grow-cyan': '#33C8DD',
        'grow-yellow': '#FFBD62',
      },
    },
  },
  plugins: [],
};

export default config;
