# BrainByte

A cinematic, 3D quiz-platform landing page. React 18 + Vite + TypeScript + Tailwind CSS,
with Three.js / React Three Fiber for the liquid-metal scene and Framer Motion for the
scroll-driven choreography.

## Run it

This was built in a sandbox without internet access, so dependencies haven't been
installed or built here — do that on your machine:

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## What's inside

```
src/
  components/
    Navbar.tsx           — liquid-glass navbar, morphs on scroll
    BrainByteLogo.tsx     — original SVG logo, hover animation
    Hero.tsx               — full-screen hero, scroll-linked 3D + type reveal
    LiquidMetalScene.tsx   — R3F scene: distorted metallic blob, rings, glass panels
    WorldSection.tsx       — orbiting content fragments around a metallic sphere
    FeatureSection.tsx     — editorial 4-panel feature layout
    QuizPreview.tsx        — sample question UI used inside Quiz Arena
    TiltCard.tsx           — reusable cursor-tilt wrapper (disabled on touch)
    LiquidGlassPanel.tsx   — reusable frosted/liquid-glass surface
    HowItWorks.tsx         — 3-step cinematic scroll section
    FinalCTA.tsx           — closing section with an approaching metallic orb
    Footer.tsx
  hooks.ts                — usePrefersReducedMotion, useIsMobile
  App.tsx
  index.css               — palette, liquid-glass utility classes, grain overlay
```

## Notes

- Color palette is intentionally restricted to warm neutrals (ivory, cream, silver,
  bronze, graphite) — no blue/cyan anywhere, per the brief.
- `LiquidMetalScene` checks for WebGL support and falls back to a static gradient if
  it's unavailable, so the page never breaks.
- `prefers-reduced-motion` disables the shader's continuous motion and the entrance
  stagger; scroll-linked transforms remain (they're driven by user scrolling, not
  autoplaying animation).
- On small screens, `TiltCard`'s cursor tilt is disabled and the R3F scene renders at a
  lower device-pixel ratio; sections that used a 6-column CSS grid stack to one column.
- Fonts (Fraunces for display type, Inter for body) load from Google Fonts in
  `index.html` — swap for self-hosted files if you need to work offline.
