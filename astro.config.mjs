// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import remarkGfm from 'remark-gfm';
import rehypeExternalLinks from 'rehype-external-links';


export default defineConfig({
  site: 'https://neontribe.co.uk',
  integrations: [react(), mdx()],
  redirects: {
    '/our-work/[...slug]': '/case-studies/[...slug]',
    '/the-tribe/[...slug]': '/how-we-work/[...slug]',
    '/contact-us': '/talk-to-us',
    '/new-philanthropy-capital-case-study': '/case-studies/npc',
    '/mind-of-my-own-case-study': '/case-studies/momo',
    '/alexandra-rose-charity-case-study': '/case-studies/arc',
    '/infosecurity-at-neontribe-case-study': '/case-studies/infosecurity',
  },
  markdown: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    ],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});