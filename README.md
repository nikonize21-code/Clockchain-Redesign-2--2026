# Clockchain — GitHub Update (drop-in)

These are the **4 changed files** for the merged site, named and laid out exactly as
they sit in your repo (the `clockchain-merged-site` / GitHub structure where the
homepage is **`index.html`**). Replace the matching files at the **repo root** and commit.

```
index.html        ← homepage  (was "Clockchain - Merged.html" in the working copy)
styles.css
globe.js
tweaks-app.jsx
```

> Note on naming: in the project the working file is **`merged/Clockchain - Merged.html`**,
> but the committed repo file is **`index.html`**. They are the same page — this package
> uses the repo name (`index.html`) so it drops straight in. No other files changed
> (`app.js`, `tweaks-panel.jsx`, `blog-base.css`, `blog/`, and `assets/` are untouched).

## Suggested commit message

```
Refine brand green + fix globe labels, hero alignment, footer logo link

- Unify all greens to one --accent token; default to refined #0A9D44
  (logo #00CC00 + emerald #0A9D6E selectable via Tweaks); globe follows accent
- Fix ticker Block Height value not turning green (compound-class selector)
- Align hero intro copy to the section rail without shifting the globe
- Add collision avoidance to globe city labels (no more overlap)
- Footer logo links to top; cache-bust styles.css v8 / globe.js v4
```

## What changed
- **Brand green** unified to one `--accent` token; default is a slightly darker,
  more legible green `#0A9D44`. Exact logo green `#00CC00` and emerald `#0A9D6E`
  remain in **Tweaks → Accent**. Globe wireframe follows the accent.
- **Ticker** "Block Height" value now renders green (selector fix).
- **Hero** intro copy aligned to the section rail; globe keeps the full right side.
- **Globe** city labels no longer overlap (collision avoidance added).
- **Footer logo** links back to top.
- Cache-bust: `styles.css?v=8`, `globe.js?v=4`.
