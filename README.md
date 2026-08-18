# Samiul Islam — portfolio site

A hand-written static site. **No build step, no dependencies, no framework.**
You can open `index.html` by double-clicking it and the whole site works.

---

## How to add content

Everything lives in **`js/content.js`**. That is the only file you edit.

### Add a GIF or video to an existing feature

1. Drop the file into `assets/<project-id>/` — e.g. `assets/kingdom-of-the-cosmos/horde-steering.gif`
2. Find that feature in `js/content.js` and add one object to its `media` array:

```js
media: [
  { type: 'gif',
    src: 'assets/kingdom-of-the-cosmos/horde-steering.gif',
    weight: '3.2 MB',
    caption: 'Flow-field steering with 200+ agents.' }
]
```

That's it. Reload the page.

### Media types

| `type` | Behaviour | Fields |
|---|---|---|
| `gif` | Click-to-play. Never auto-downloads. | `src`, `weight` (shown on the button), optional `poster` |
| `mp4` | `preload="none"` — costs nothing until played | `src`, `poster` |
| `youtube` | Click-to-load facade, `youtube-nocookie.com` | `src` = the bare video id, e.g. `o-SxnOoPk84` |
| `image` | Plain lazy-loaded still | `src` |

`caption` is optional on all of them and doubles as the alt text.

### Add a new feature section

Add an object to that project's `features` array:

```js
{
  title: 'Name of the system',
  tags: ['A*', 'Burst'],              // small mono chips under the title
  body: [
    'One paragraph per string. <strong>Bold</strong>, <em>italic</em>, ' +
    '<code>Type.Method()</code> and <a href="...">links</a> all work.'
  ],
  media: []
}
```

### Add a whole new project

Copy any object in `PROJECTS`, change the `id`, and create `assets/<new-id>/`.
Nothing else needs touching — both `index.html` and `project.html` render
straight from the array, and the project automatically appears in the grid on
the home page and in the "Other projects" strip on every other project page.

Useful fields: `featured: true` adds the accent bar on the card.
`statusTone` accepts `'accent'` (green — shipped), `'amber'` (in development),
or `'violet'` (prototype / coming soon).

### Other editable blocks

Further down `js/content.js`: `SITE` (name, blurb, contact, the four headline
facts), `SKILLS`, `EXPERIENCE`, `EDUCATION`, `ACHIEVEMENTS`.

---

## Local preview

Double-click `index.html`. That works because content is loaded via
`<script src>` rather than `fetch()` — a `fetch()` of a JSON file would be
blocked by CORS on `file://` and would force you to run a web server just to
look at your own site.

---

## Publishing to GitHub Pages (free)

1. Create an **empty** repository on github.com.
   - Name it **`<your-username>.github.io`** to serve at `https://<your-username>.github.io`
   - Any other name serves at `https://<your-username>.github.io/<repo-name>`
2. From this folder:

```bash
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git branch -M main
git push -u origin main
```

3. In the repo: **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**
4. Live in about a minute.

`.nojekyll` is already present, which stops GitHub from running the content
through Jekyll (which would ignore any folder beginning with an underscore).

---

## Notes on weight

The `assets/` folder is about **48 MB**, almost all of it GIFs pulled out of the
original PowerPoint. That is well inside GitHub's limits, and nothing loads
until clicked — but the GIFs are far larger than they need to be.

If you ever install [ffmpeg](https://ffmpeg.org/), converting them to MP4 cuts
that ~29 MB of GIF down to roughly 3–5 MB with better image quality:

```bash
ffmpeg -i input.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" output.mp4
```

Then change `type: 'gif'` to `type: 'mp4'` for that entry and drop the `weight`
field. Not urgent — the site is fast as it stands because nothing auto-loads.

---

## File map

```
index.html        home page shell
project.html      one template for every project, driven by ?id=<project-id>
css/site.css      all styling; every colour is a token in the :root block
js/content.js     ← ALL CONTENT LIVES HERE
js/render.js      renders content.js into the DOM; you rarely need to touch it
assets/           media, one folder per project
resume/           the PDF linked from the nav and hero
.nojekyll         disables Jekyll processing on GitHub Pages
```
