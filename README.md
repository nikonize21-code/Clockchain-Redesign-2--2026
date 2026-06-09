# Clockchain — GitHub Update (drop-in)

These are the **4 changed files** for the merged site, named and laid out exactly as
they sit in your repo (homepage = **`index.html`**). Replace the matching files at the
**repo root** and commit.

```
index.html        ← homepage  (the working copy calls this "Clockchain - Merged.html")
styles.css
globe.js
tweaks-app.jsx
```

No binary assets changed (`app.js`, `tweaks-panel.jsx`, `blog-base.css`, `blog/`, and
`assets/` are untouched).

## Suggested commit message

```
Use bright Clockchain green site-wide + green/layout/globe polish

- Default accent is the bright logo green #00CC00 (darker #0A9D44 and emerald
  #0A9D6E still selectable via Tweaks); globe + hero "prove." follow the accent
- Unify all greens to one --accent token (drop stray #2d7a4f / #3ee07f hardcodes)
- Bump saved-tweaks storage key so the new default applies to returning visitors
- Fix ticker Block Height value not turning green (compound-class selector)
- Align hero intro copy to the section rail without shifting the globe
- Collision-avoidant globe city labels (no more overlap)
- Footer logo links to top; cache-bust styles.css v8 / globe.js v5
```

## What changed
- **Globe sized down ~15%** (camera distance `3.22 → 3.79`; labels track it).
- **Brand green** is now the **bright Clockchain logo green `#00CC00`** site-wide,
  driven by a single `--accent` token. The hero "prove." word and the globe wireframe
  follow it. A darker `#0A9D44` and emerald `#0A9D6E` remain in **Tweaks → Accent**.
- **Tweak reset:** the saved-tweaks storage key was bumped so the new bright default
  shows for returning visitors (and you).
- **Ticker** "Block Height" value now renders green (selector fix).
- **Hero** intro copy aligned to the section rail; globe keeps the full right side.
- **Globe** city labels no longer overlap (collision avoidance added).
- **Footer logo** links back to top.
- Cache-bust: `styles.css?v=8`, `globe.js?v=4`.
