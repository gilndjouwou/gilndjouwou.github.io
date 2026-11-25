# Gil Ndjouwou

Personal portfolio built with Astro.

## Start locally

```sh
bun install
bun run dev
```

## Customize

Your name, links and site URL live in `src/consts.ts`, and the introduction is in `src/content/intro.mdx`.

## Add an article manually (without Copilot)

1. Choose a short, lowercase slug, using hyphens between words (for example, `new-project`).
2. Create `src/content/notes/new-project.mdx`. The filename becomes the article slug and URL: `/<category>/new-project/` (for example, `/portfolio/new-project/`). The category is selected in the frontmatter below.
3. Create the matching image folder `src/content/notes/assets/new-project/`. Put the article's images in this folder. Use descriptive filenames without spaces, such as `preview.webp` and `detail-01.jpg`.
4. Add frontmatter at the very top of the MDX file. Replace the example values:

   ```yaml
   ---
   title: "New Project"
   description: "A short summary of the article."
   category: portfolio
   pubDate: 2026-11-25
   position: 7
   published: false
   previewImage: ./assets/new-project/preview.webp
   ---
   ```

   `category` must be one of `portfolio`, `blog`, `work-in-progress`, or `shelved-ideas`; each category has its own page. To move an existing article, change only its `category` frontmatter value (for example, `category: blog`). The article will then appear on that category's page and its URL will use the new category: `/blog/article-slug/`. Use a real date in `YYYY-MM-DD` format; the date validator checks it when you start the dev server or build. Set `published: false` while drafting: drafts appear locally in development but are excluded from the production site. Change it to `true` when the article is ready. `position` is optional and controls its ordering within the category. `displayDate` is optional if you want a custom visible date label; `pubDate` remains the actual date used for sorting. Blog dates display as `January 13th 2020`, and blog articles show an estimated reading time rounded up at 200 words per minute.

5. Set `previewImage` to the image path relative to the MDX file. This is the image shown when hovering the article link on the homepage. Use an image inside the matching `assets/<slug>/` folder, and make sure the path and filename match exactly. If you do not want a hover image, omit `previewImage`.
6. Import images near the top of the MDX file, below the frontmatter. Use `PhotoGallery` for article images; putting one gallery component after each paragraph lets you add text between images:

   ```mdx
   import PhotoGallery from '@/components/PhotoGallery.astro';
   import preview from './assets/new-project/preview.webp';
   import detail from './assets/new-project/detail-01.jpg';

   ## First section

   Introductory text goes here.

   <PhotoGallery images={[{ src: preview, alt: 'Description of the project image' }]} />

   Add more text here.

   <PhotoGallery images={[{ src: detail, alt: 'Description of the detail image' }]} />
   ```

   Each image needs a meaningful `alt` description. For a single image outside the gallery, you can use Astro's `<Image>` component instead:

   ```mdx
   import { Image } from 'astro:assets';
   import hero from './assets/new-project/preview.webp';

   <Image src={hero} alt="Description of the project image" />
   ```

To check your work, run `bun run dev`, open the category page and the homepage, and verify the article, its images, and its hover preview. Run `bun run build` before publishing; this validates dates and the Astro build. For an animated APNG in a `PhotoGallery`, add `preserveAnimation: true` to that image's object. The homepage hover preview is optimized as WebP, so use a static image for `previewImage` if you need to preserve the original animation elsewhere.

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
