const WORDS_PER_MINUTE = 200;

function getReadingTime(body: string | undefined): number {
  if (body === undefined) {
    throw new Error('Cannot estimate reading time because the article body is missing.');
  }

  const text = body
    .replace(/^\s*import\s+.+;?\s*$/gm, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, ' ');
  const wordCount = text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu)?.length ?? 0;

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export { getReadingTime };
