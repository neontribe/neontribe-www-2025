/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    screens: {
      'sm': '640px',   // Mobile landscape
      'md': '768px',   // Tablet portrait
      'lg': '1024px',  // Tablet landscape / Small desktop
      'xl': '1280px',  // Desktop
      '2xl': '1512px', // Large desktop (Figma design width)
    },
    extend: {
      colors: {
        'brand-amethyst': '#4B00E7',
        'brand-turquoise': '#48E9CE',
        'bg-dark': '#090909',
        'bg-light': '#F5F5F5',
        'text-light': '#FFFFFF',
        'text-dark': '#374151',
        'text-darker': '#1f2937',
        'neutral-grey': '#D9D9D9',
      },
      fontFamily: {
        'heading': ['Mulish', 'sans-serif'],
        'body': ['Mulish', 'sans-serif'],
        'sans': ['Mulish', 'sans-serif'], // default
      },
      fontSize: {
        'xs': ['0.75rem', '1.5'],      /* 12px - Small labels, captions */
        'sm': ['0.875rem', '1.5'],     /* 14px - Secondary text */
        'base': ['1.125rem', '1.5'],   /* 18px - Body text (WCAG compliant) */
        'lg': ['1.25rem', '1.5'],      /* 20px - Links, buttons */
        'xl': ['1.5rem', '1.5'],       /* 24px - Subheadings */
        '2xl': ['1.75rem', '1.2'],     /* 28px - Small headings (h3, h4) */
        '3xl': ['2rem', '1.2'],        /* 32px - Medium headings (h2) */
        '4xl': ['2.5rem', '1.2'],      /* 40px - Large headings (h1) */
        '5xl': ['3rem', '1.2'],        /* 48px - Hero headings (mobile) */
        '6xl': ['3.75rem', '1.2'],     /* 60px - Hero headings (desktop) */
      },
      maxWidth: {
        'container': '1200px',      // Max content width from Figma
        'frame': '1512px',          // Desktop frame width from Figma
      },
      spacing: {
        'gutter': '32px',           // Space between columns
        'mobile': '24px',           // Mobile padding
        'desktop': '80px',          // Desktop padding/outer margins
        'tap-target': '44px',       // Minimum tap target size
      },
      lineHeight: {
        'tight': '1.2',
        'normal': '1.5',
        'relaxed': '1.75',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))', // 12-column grid system
      },
      gap: {
        'gutter': '32px',           // Grid gap between columns
      },
    },
  },
  plugins: [],
}
