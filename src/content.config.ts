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
  }),
});

export const collections = {
  'case-studies': caseStudiesCollection,
};
