# Gil Ndjouwou

Personal portfolio built with Astro.

## Start locally

```sh
bun install
bun run dev
```

## Customize

Your name, links and site URL live in `src/consts.ts`, and the introduction is in `src/content/intro.mdx`.

Articles are MDX files in `src/content/notes`. Set their `category` to `portfolio`, `blog`, `work-in-progress`, or `shelved-ideas`. Set `pubDate` manually in `YYYY-MM-DD` format; Blog dates display as `January 13th 2020`. For a custom visible date label (for example, a project span), set `displayDate: "2016 - 2026"`; `pubDate` remains the underlying date. Blog articles also show an estimated reading time, rounded up at 200 words per minute. Use the optional `position` field to control the order within a category. Each category has its own page and articles are linked under that category.

For images specific to an article, use a folder named after its slug inside `src/content/notes/assets`. For example, an image for `ad-clean.mdx` can live at `src/content/notes/assets/ad-clean/hero.webp`. Import it in the MDX file so Astro can optimize it:

```mdx
import { Image } from 'astro:assets';
import hero from './assets/ad-clean/hero.webp';

<Image src={hero} alt="AD Clean project image" />
```

For images shared across the site, use `public/images` and reference them with a root-relative URL such as `/images/portrait.webp`. For local videos, put files in `public/videos/<article-slug>` and use the video component in an MDX article:

```mdx
import Video from '@/components/Video.astro';

<Video src="/videos/ad-clean/project.mp4" title="AD Clean project film" />
```

Embeds are supported for YouTube, Vimeo, and Instagram:

```mdx
import Embed from '@/components/Embed.astro';

<Embed provider="youtube" id="VIDEO_ID" title="Project film on YouTube" />
<Embed provider="vimeo" id="123456789" title="Project film on Vimeo" />
<Embed provider="instagram" id="p/SHORTCODE" title="Project post on Instagram" />
```

## Scripts

```sh
bun run note:create "Title" "Description" "2020-01-13"   # draft blog post with chosen date
bun run portrait:create photo.jpg           # dithered portrait, macOS
bun run image:dither photo.jpg              # dithered image for a note
```
