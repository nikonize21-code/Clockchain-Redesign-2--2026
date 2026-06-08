# Clockchain — Merged site (for GitHub)

This is the **complete, self-contained new merged Clockchain website**, ready to
commit. Every asset it needs is included and all links are wired for this folder
layout, so it runs as-is (open `index.html`, or drop the whole folder into your repo).

> Note: this is the **merged** site only. Your previous (root `index.html`) site
> was left untouched.

## Folder structure

```
index.html                     ← homepage
styles.css                     ← site styles (incl. NYC video hero + nav)
app.js                         ← nav scroll, reveal-on-scroll, ticker, modal
globe.js                       ← hero/intro globe visual
tweaks-panel.jsx               ← optional in-page Tweaks panel (see note)
tweaks-app.jsx                 ← optional in-page Tweaks panel (see note)
blog-base.css                  ← base styles for the blog article
blog/
  brief-history-of-time.html   ← linked from the Blog section
assets/
  favicon-32.png, favicon-512.png, apple-touch-icon.png
  clockchain-logo-full.png
  newyork-timelapse.mp4        ← hero background video (6.7 MB)
  media/                       ← press/media logos & thumbnails
  blog/                        ← blog article + listing images
```

## What changed this session

1. **Hero background video** — New York day-to-night timelapse loop replaces the
   static skyline. Light statement text + scrim for legibility.
2. **Nav adapts over the video** — links turn light (and the X icon becomes white)
   while over the hero, then revert to dark once you scroll onto the page.
3. **Removed the "Press coverage" pill** from the Media subhead.
4. **Renamed the blog heading** to **"Clockchain Blog"**.
5. **Removed the media-card coverage tags** ("Featured coverage", "Exchange
   coverage", "Press release"). The "Latest release" tag on the press lead stays.

## Two things worth knowing

- **`blog-base.css` vs `styles.css`** — the homepage uses `styles.css`; the blog
  article uses `blog-base.css`. They're kept separate on purpose (the article was
  authored against its own base tokens). Both are included.
- **Tweaks panel** — `tweaks-panel.jsx` / `tweaks-app.jsx` power the optional
  in-page tweak controls and load React/Babel at the bottom of `index.html`. They
  don't show unless toggled, so they're harmless in production — but if you'd like
  a leaner build, say the word and I'll strip them (remove the 5 script tags + the
  `#tweaks-root` div + the two `.jsx` files).

## Suggested commit message

```
New merged Clockchain site: NYC video hero + News/Media + blog tidy-up

- Hero: NYC day-to-night timelapse background video, nav adapts over it
- Remove "Press coverage" pill from Media subhead
- Rename blog heading to "Clockchain Blog"
- Remove media-card coverage tags (keep "Latest release")
```
