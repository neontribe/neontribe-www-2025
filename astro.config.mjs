import {defineConfig} from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import remarkGfm from 'remark-gfm';
import rehypeExternalLinks from 'rehype-external-links';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://www.neontribe.co.uk',
    integrations: [react(), mdx(), sitemap()],
    redirects: {
        '/our-work': '/case-studies',
        '/the-tribe': '/how-we-work',
        '/contact-us': '/talk-to-us',
        '/blog': 'https://www.dxw.com/author/cap-harry-harold/',
        '/new-philanthropy-capital-case-study': '/case-studies/npc',
        '/mind-of-my-own-case-study': '/case-studies/momo',
        '/alexandra-rose-charity-case-study': '/case-studies/arc',
        '/infosecurity-at-neontribe-case-study': '/case-studies/infosecurity',
        '/ncs-realchat-ai': '/case-studies/ncs-realchat-ai',
        '/place2be-case-study' : '/case-studies/place2be'
    },
    markdown: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            [rehypeExternalLinks, {target: '_blank', rel: ['noopener', 'noreferrer']}],
        ],
    },
    vite: {
        plugins: [tailwindcss()]
    }
});