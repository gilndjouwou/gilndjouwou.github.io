export const CATEGORY_SLUGS = [
  'portfolio',
  'work-in-progress',
  'blog',
  'shelved-ideas',
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export const CATEGORY_LABELS: Record<CategorySlug, string> = {
  portfolio: 'Selected Works',
  blog: 'Blog',
  'work-in-progress': 'Work in progress',
  'shelved-ideas': 'Forever Shelved',
};

export const CATEGORIES = CATEGORY_SLUGS.map((slug) => ({
  slug,
  title: CATEGORY_LABELS[slug],
}));
