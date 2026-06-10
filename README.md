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

---

## Latest update — brand green, globe labels, hero alignment

Files touched: `index.html`, `styles.css`, `globe.js`, `tweaks-app.jsx`.

- **Brand green unified.** All green text/UI flows through one `--accent` token
  (removed the stray forest `#2d7a4f` and mint `#3ee07f` hardcodes). Default accent is
  the **bright Clockchain logo green `#00CC00`**; a darker refined green `#0A9D44` and a
  deeper emerald `#0A9D6E` remain selectable in **Tweaks → Accent**. The globe wireframe
  and the hero "prove." word follow the active accent.
- **Tweak reset.** Bumped the saved-tweaks storage key (`clockchain-merged-tweaks` →
  `…-v2`) so the bright default takes effect for returning visitors.
- **Ticker fix.** "Block Height" value now correctly renders in the accent green
  (selector `.ticker-val .accent` → `.ticker-val.accent`).
- **Hero alignment.** Intro copy now shares the same left rail as the section headers;
  the offset is `margin-left` on the copy column only, so the globe keeps the full
  right side at every viewport width (no shift/clip/white gap).
- **Globe labels.** Rewrote the city-label renderer with collision avoidance, so
  overlapping same-region labels (e.g. US zones) spread into a tidy column.
- **Footer logo** links back to `#top`.
- **Globe sized down ~15%** (camera distance `3.22 → 3.79`; the label overlay tracks it).
- **CTA card** restyled from dark to the light/white card style to match the other cards.
- Cache-busted `styles.css` (v9) and `globe.js` (v5).

Suggested commit message:

```
Refine brand green + fix globe labels, hero alignment, footer logo link

- Unify all greens to one --accent token; default to bright logo green #00CC00
  (darker #0A9D44 + emerald #0A9D6E selectable via Tweaks); globe + hero "prove." follow accent
- Fix ticker Block Height value not turning green (compound-class selector)
- Align hero intro copy to the section rail without shifting the globe
- Add collision avoidance to globe city labels (no more overlap)
- Footer logo links to top; cache-bust styles.css v9 / globe.js v5; CTA card to light style
```

---

## Latest update — accessibility + spacing

Files touched: `index.html`, `styles.css`.

- **Skip link (WCAG 2.4.1 Bypass Blocks).** Added a "Skip to main content" link as the
  first focusable element in `<body>`. It's parked fully off-screen and slides into view
  only on keyboard focus (not `display:none`/`visibility:hidden`, so it stays in the tab
  order). Targets `<main id="main-content" tabindex="-1">`; the nav logo and footer
  "back to top" links now point at `#main-content`.
- **Social links labelled + brand-coloured.** Every social/contact link has a descriptive
  `aria-label` ("Clockchain on Telegram / Discord / X (formerly Twitter)", "Email Clockchain
  at …") instead of a bare platform name, and each is its own named `<nav>` landmark. The
  decorative icon SVGs are `aria-hidden`. Brand-colour CSS now matches on a label substring
  so the colours survive the new wording (Telegram blue, Discord purple, X black/white).
- **Tighter section rhythm.** Reduced the section-padding tokens
  (`--band` `clamp(96px,11vw,168px)` → `clamp(72px,8vw,120px)`; `--band-sm` likewise),
  trimming ~30% of the whitespace between sections. Compact/Airy density tweaks rebalanced
  around the new baseline.
- Cache-busted `styles.css` (v13).

Suggested commit message:

```
A11y + spacing: skip link, labelled social nav, tighter section rhythm

- Add WCAG 2.4.1 skip-to-main-content link (off-screen until keyboard focus)
- Descriptive aria-labels on all social/contact links + aria-hidden icons;
  brand-colour CSS matches on label substring so colours persist
- Reduce section-padding tokens ~30% (--band / --band-sm); rebalance density presets
- Cache-bust styles.css v13
```
