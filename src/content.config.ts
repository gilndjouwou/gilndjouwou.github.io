import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORY_SLUGS } from '@/lib/categories';

function isValidDateString(value: string): boolean {
  if (/^\d{4}$/.test(value)) return true;

  const match = /^(\d{4})-(\d{2})-(\d{2})(?:$|T)/.exec(value);
  if (!match || Number.isNaN(new Date(value).valueOf())) return false;

  const [, year, month, day] = match;
  const monthNumber = Number(month);
  const dayNumber = Number(day);
  const daysInMonth = new Date(Date.UTC(Number(year), monthNumber, 0)).getUTCDate();

  return monthNumber >= 1 && monthNumber <= 12 && dayNumber >= 1 && dayNumber <= daysInMonth;
}

const contentDate = z
  .union([
    z.date(),
    z.string().refine(isValidDateString, 'Expected a valid calendar date'),
  ])
  .transform((value) => (value instanceof Date ? value : new Date(value)));

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
    pubDate: contentDate,
    displayDate: z.string().optional(),
    position: z.number().int().optional(),
    updatedDate: contentDate.optional(),
    previewImage: z.string().nullable().optional(),
    published: z.boolean().default(false),
    archived: z.boolean().default(false),
  }),
});

export const collections = { notes };
