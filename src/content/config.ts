import { defineCollection, z } from 'astro:content';

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    customer: z.string(),
    categories: z.string(),
    statistic: z.string().optional(),
    image: z.string().optional(),
    problem: z.string(),
    introduction: z.string(),
    challenge: z.string(),
    result: z.string(),
    conclusion: z.string().optional(),
  }),
});

export const collections = {
  'case-studies': caseStudies,
};
