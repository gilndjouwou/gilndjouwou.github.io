import { getCollection } from 'astro:content';
import type { CategorySlug } from '@/lib/categories';

async function getNotes(category?: CategorySlug) {
  // Drafts are only visible in dev
  const notes = await getCollection(
    'notes',
    ({ data }) =>
      !data.archived &&
      (data.published || import.meta.env.DEV) &&
      (!category || data.category === category),
  );

  return notes.sort((a, b) => {
    if (a.data.position === undefined && b.data.position !== undefined) return -1;
    if (a.data.position !== undefined && b.data.position === undefined) return 1;
    if (a.data.position !== undefined && b.data.position !== undefined) {
      return a.data.position - b.data.position;
    }

    return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
  });
}

export { getNotes };
