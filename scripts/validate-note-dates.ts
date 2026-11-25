import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const notesDirectory = join(import.meta.dir, '..', 'src', 'content', 'notes');

async function getMarkdownFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return getMarkdownFiles(path);
      return entry.isFile() && /\.mdx?$/.test(entry.name) ? [path] : [];
    }),
  );

  return nestedFiles.flat();
}

function isValidDate(value: string): boolean {
  if (/^\d{4}$/.test(value)) return true;

  const match = /^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/.exec(value);
  if (!match || Number.isNaN(new Date(value).valueOf())) return false;

  const [, year, month, day] = match;
  const monthNumber = Number(month);
  const dayNumber = Number(day);
  const daysInMonth = new Date(Date.UTC(Number(year), monthNumber, 0)).getUTCDate();

  return monthNumber >= 1 && monthNumber <= 12 && dayNumber >= 1 && dayNumber <= daysInMonth;
}

const errors: string[] = [];

for (const path of await getMarkdownFiles(notesDirectory)) {
  const content = await readFile(path, 'utf8');
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
  if (!frontmatter) continue;

  frontmatter.split(/\r?\n/).forEach((line, index) => {
    const match = /^(pubDate|updatedDate):\s*(.*?)\s*$/.exec(line);
    if (!match) return;

    const rawValue = match[2];
    const value =
      (rawValue.startsWith('"') && rawValue.endsWith('"')) ||
      (rawValue.startsWith("'") && rawValue.endsWith("'"))
        ? rawValue.slice(1, -1)
        : rawValue;

    if (!isValidDate(value)) {
      errors.push(
        `${relative(process.cwd(), path)}:${index + 2}: ${match[1]} must be a valid calendar date (received "${value}")`,
      );
    }
  });
}

if (errors.length > 0) {
  console.error(`Invalid note dates:\n${errors.join('\n')}`);
  process.exitCode = 1;
}
