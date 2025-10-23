/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            // Headings - Create clear hierarchy
            h2: { 
              fontSize: '1.875rem', // 30px - larger than default
              marginTop: '2em',    // Space above heading
              marginBottom: '1em',  // Space below heading
              fontWeight: '600',    // Semi-bold for emphasis
              lineHeight: '1.3'     // Tighter line height for headings
            },
            h3: { 
              fontSize: '1.5rem',   // 24px - smaller than h2
              marginTop: '1.6em',   // Less space than h2
              marginBottom: '0.6em', // Less space than h2
              fontWeight: '600',
              lineHeight: '1.4'
            },
            // Paragraphs - Improve readability
            p: { 
              marginBottom: '1.25em', // Space between paragraphs
              lineHeight: '1.75',     // Increased line height for readability
              fontSize: '1.125rem'     // Slightly larger text (18px)
            },
            // Lists - Better spacing and indentation
            ul: { 
              marginTop: '1.25em', 
              marginBottom: '1.25em',
              paddingLeft: '1.5em'    // Proper indentation
            },
            ol: {
              marginTop: '1.25em',
              marginBottom: '1.25em', 
              paddingLeft: '1.5em'
            },
            li: { 
              marginTop: '0.5em', 
              marginBottom: '0.5em',
              lineHeight: '1.6'       // Good line height for list items
            },
            // Blockquotes - Visual distinction
            blockquote: { 
              borderLeftWidth: '4px',
              borderLeftColor: '#10b981', // Teal accent color
              paddingLeft: '1em',
              fontStyle: 'italic',
              backgroundColor: '#f9fafb', // Light background
              padding: '1em',
              borderRadius: '0.375rem'
            },
            // Links - Accessible and branded
            a: {
              color: '#2563eb',        // Blue color
              textDecoration: 'underline',
              '&:hover': {
                color: '#1d4ed8',      // Darker blue on hover
                textDecoration: 'none'
              }
            },
            // Strong text - Make bold text stand out
            strong: {
              fontWeight: '700',
              color: '#1f2937'          // Darker color for emphasis
            }
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
