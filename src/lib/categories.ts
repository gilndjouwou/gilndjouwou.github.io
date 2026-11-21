export const CATEGORY_SLUGS = [
  'portfolio',
  'work-in-progress',
  'blog',
  'museum-of-the-unfinished',
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export const CATEGORY_LABELS: Record<CategorySlug, string> = {
  portfolio: 'Portfolio',
  blog: 'Blog',
  'work-in-progress': 'Work in progress',
  'museum-of-the-unfinished': 'Museum of the unfinished',
};

export const CATEGORIES = CATEGORY_SLUGS.map((slug) => ({
  slug,
  title: CATEGORY_LABELS[slug],
}));
