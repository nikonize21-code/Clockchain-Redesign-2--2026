/* Clockchain merged — Tweaks app (applies variant/accent/type/density to the page) */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "variant": "daylight",
  "accent": "forest",
  "displayFont": "grotesk",
  "bodyFont": "inter",
  "density": "comfortable"
}/*EDITMODE-END*/;

function applyTweaks(t){
  const root = document.documentElement;
  // variant: daylight / eclipse / hybrid
  if (t.variant === 'hybrid') {
    root.setAttribute('data-variant', 'daylight');
    root.setAttribute('data-hybrid', '1');
  } else {
    root.setAttribute('data-variant', t.variant);
    root.removeAttribute('data-hybrid');
  }
  root.setAttribute('data-accent', t.accent);
  root.setAttribute('data-font', t.displayFont);
  root.setAttribute('data-bodyfont', t.bodyFont);
  root.setAttribute('data-density', t.density);
  try { localStorage.setItem('clockchain-merged-tweaks', JSON.stringify({
    variant: t.variant,
    accent: t.accent, displayFont: t.displayFont, bodyFont: t.bodyFont, density: t.density
  })); } catch(e){}
  if (typeof window.__recolorGlobe === 'function') {
    // let CSS vars settle, then recolor the three.js materials
    requestAnimationFrame(() => requestAnimationFrame(window.__recolorGlobe));
  }
}

function readInitial(){
  const root = document.documentElement;
  return Object.assign({}, TWEAK_DEFAULTS, {
    variant: root.getAttribute('data-hybrid') ? 'hybrid' : (root.getAttribute('data-variant') || TWEAK_DEFAULTS.variant),
    accent: root.getAttribute('data-accent') || TWEAK_DEFAULTS.accent,
    displayFont: root.getAttribute('data-font') || TWEAK_DEFAULTS.displayFont,
    bodyFont: root.getAttribute('data-bodyfont') || TWEAK_DEFAULTS.bodyFont,
    density: root.getAttribute('data-density') || TWEAK_DEFAULTS.density
  });
}

function TweaksApp(){
  const [t, setTweak] = useTweaks(readInitial());
  React.useEffect(() => { applyTweaks(t); }, [t]);
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Visual direction" />
      <TweakRadio label="Variant" value={t.variant}
        options={['daylight','eclipse','hybrid']}
        onChange={(v)=>setTweak('variant', v)} />
      <TweakColor label="Accent" value={t.accent === 'forest' ? '#2d7a4f' : t.accent === 'bright' ? '#00c000' : '#0a9d6e'}
        options={['#2d7a4f','#00c000','#0a9d6e']}
        onChange={(hex)=>setTweak('accent', hex === '#2d7a4f' ? 'forest' : hex === '#00c000' ? 'bright' : 'emerald')} />

      <TweakSection label="Typography" />
      <TweakRadio label="Headlines" value={t.displayFont}
        options={['grotesk','inter']}
        onChange={(v)=>setTweak('displayFont', v)} />
      <TweakRadio label="Body" value={t.bodyFont}
        options={['inter','grotesk']}
        onChange={(v)=>setTweak('bodyFont', v)} />

      <TweakSection label="Spacing" />
      <TweakRadio label="Density" value={t.density}
        options={['compact','comfortable','airy']}
        onChange={(v)=>setTweak('density', v)} />
    </TweaksPanel>
  );
}

if (!window.__EMBED) {
  ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<TweaksApp />);
}
