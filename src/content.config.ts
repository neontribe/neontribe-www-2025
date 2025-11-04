import { defineCollection, z } from 'astro:content';

export const caseStudiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    customer: z.string().optional(),
  }),
});

export const collections = {
  'case-studies': caseStudiesCollection,
};
