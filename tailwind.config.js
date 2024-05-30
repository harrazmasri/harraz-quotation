/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {},
    screens: {
      'sm': '0px',
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
  },
  },
  plugins: [],
}

