import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_SLUGS } from '@/lib/categories';

// A `slug` in frontmatter overrides the entry id, which is the note's URL
const notes = defineCollection({
  loader: glob({
    base: './src/content/notes',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(CATEGORY_SLUGS),
    pubDate: z.coerce.date(),
    displayDate: z.string().optional(),
    position: z.number().int().optional(),
    updatedDate: z.coerce.date().optional(),
    published: z.boolean().default(false),
    archived: z.boolean().default(false),
  }),
});

export const collections = { notes };
