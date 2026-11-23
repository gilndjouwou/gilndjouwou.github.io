import { join } from 'node:path';

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-|-$/g, '');
}

const [title = 'A new title', description = 'A new description', pubDate] = Bun.argv.slice(2);

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

if (!pubDate || !isValidDate(pubDate)) {
  throw new Error('Provide a publication date as YYYY-MM-DD, for example "2020-01-13".');
}

const slug = createSlug(title);

// JSON strings are valid YAML, so a title with a colon or quotes doesn't break the frontmatter
const frontmatter = `---
title: ${JSON.stringify(title)}
pubDate: ${pubDate}
description: ${JSON.stringify(description)}
category: blog
slug: ${slug}
published: false
previewImage: ./assets/${slug}/img.jpg
---

## Subtitle
Content goes here...
`;

const filename = `${slug}.mdx`;
const filepath = join(import.meta.dir, '..', 'src', 'content', 'notes', filename);
const file = Bun.file(filepath);

if (await file.exists()) {
  console.log('The draft note already exists, please use it');
} else {
  await file.write(frontmatter);

  console.log([
    `Created new post: ${filename}`,
    `Path: ${filepath}`,
    `Slug: ${slug}`,
    `Published: false (change to true when ready)`
  ].join('\n'));
}
