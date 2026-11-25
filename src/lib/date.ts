const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' });
const blogDateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

function formatDate(date: Date): string {
  return dateFormat.format(date);
}

function formatBlogDate(date: Date): string {
  const parts = blogDateFormat.formatToParts(date);
  const month = parts.find((part) => part.type === 'month')?.value;
  const dayText = parts.find((part) => part.type === 'day')?.value;
  const year = parts.find((part) => part.type === 'year')?.value;

  if (!month || !dayText || !year) {
    throw new Error(`Unable to format blog publication date: ${date.toISOString()}`);
  }

  const day = Number(dayText);
  const remainder = day % 100;
  const suffix =
    remainder >= 11 && remainder <= 13
      ? 'th'
      : day % 10 === 1
        ? 'st'
        : day % 10 === 2
          ? 'nd'
          : day % 10 === 3
            ? 'rd'
            : 'th';

  return `${month} ${day}${suffix} ${year}`;
}

function formatBlogMonthYear(date: Date): string {
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${month}-${date.getUTCFullYear()}`;
}

export { formatBlogDate, formatBlogMonthYear, formatDate };
