/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'brand-amethyst': '#4B00E7',
        'brand-turquoise': '#48E9CE',
        'bg-dark': '#090909',
        'bg-light': '#F5F5F5',
        'text-light': '#FFFFFF',
        'text-dark': '#090909',
        'text-darker': '#090909',
        'neutral-grey': '#D9D9D9',
      },
      fontFamily: {
        'heading': ['Mulish', 'sans-serif'],
        'body': ['Mulish', 'sans-serif'],
        'sans': ['Mulish', 'sans-serif'], // default
      },
      fontSize: {
        'xs': ['0.75rem', '1.0'],
        'sm': ['0.875rem', '1.0'],
        'base': ['1.125rem', '1.0'], 
        'lg': ['1.25rem', '1.0'],
        'xl': ['1.5rem', '1.0'], 
        '2xl': ['1.75rem', '1.0'], 
        'heading': ['1.75rem', '1.0'], 
        'link': ['1.25rem', '1.0'], 
      },
      maxWidth: {
        'container': '1200px',
      },
      spacing: {
        'gutter': '32px',
        'mobile': '24px',
        'desktop': '80px',
      },
      lineHeight: {
        'tight': '1.2',
        'normal': '1.5',
        'relaxed': '1.75',
      },
    },
  },
  plugins: [],
}
