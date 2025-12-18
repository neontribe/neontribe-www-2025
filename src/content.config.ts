import { defineCollection, z } from 'astro:content';

export const caseStudiesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    customer: z.string().optional(),
    projectName: z.string().optional(),
    categories: z.array(z.string()).default([]),
    statistic: z.string().optional(),
    heroImage: image().optional(),
    heroImageAlt: z.string().optional(),
    heroImageLandscape: z.boolean().default(false),
    cardImage: image().optional(),
    tags: z.array(z.string()).default([]),
    date: z.string().optional(),
    quote: z.string().optional(),
    quoteAuthor: z.string().optional(),
    quoteOrganisation: z.string().optional(),
    quoteAvatar: image().optional(),
    challenges: z.string().optional(),
    howWeHelped: z.array(z.string()).optional(),
    isMicro: z.boolean().default(false),
  }),
});

export const collections = {
  'case-studies': caseStudiesCollection,
};
