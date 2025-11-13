import { defineCollection, z } from 'astro:content';

export const caseStudiesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    customer: z.string().optional(),
    categories: z.array(z.string()).default([]),
    statistic: z.string().optional(),
    heroImage: image().optional(),
    heroImageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    date: z.string().optional(),
    quote: z.string().optional(),
    quoteAuthor: z.string().optional(),
    quoteOrganisation: z.string().optional(),
    quoteAvatar: image().optional(),
  }),
});

export const collections = {
  'case-studies': caseStudiesCollection,
};
