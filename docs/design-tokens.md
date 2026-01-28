# OwliaBot Landing Page — Style Guide (v1)

Purpose: Keep the landing page visually consistent and conversion‑focused (primary goal: **Join the Waitlist**). This guide codifies the current “Nuvion‑adjacent” aesthetic: calm, premium, minimal, crypto‑infra tone.

Audience: Designers + engineers.

---

## 1) Brand Voice & Copy Rules

**Tone**
- Calm, technical, non‑marketing. Prefer declarative statements.
- Avoid hype, jargon inflation, or speculative promises.

**Copy Principles**
- Lead with boundaries, autonomy, and security.
- One dominant message per section.
- CTA copy always action‑oriented; avoid “learn more” as primary.

**Primary CTA**
- Default: **Join the Waitlist**
- Location: hero + nav

**Secondary CTA**
- Default: **Read the Architecture**
- Always visually subordinate to the primary CTA.

---

## 2) Typography

**Families**
- Heading: `Space Grotesk` (weights 500/600/700)
- Body: `IBM Plex Sans` (weights 400/500/600/700)

**Hero Type Ramp**
- H1: `3.4rem` (desktop), `5xl` (tablet), `4xl` (mobile)
- H1 line-height: `1.1`
- H1 max-width: `36rem`
- H1 weight: `500`

**Body**
- Base: `16px`
- Subhead (hero): `text-foreground/70` and sentence‑style (not list fragments)

**Caps/Tracking**
- Pill labels: `uppercase`, tracking `0.22em` (badge) / `0.18em` (strapline)
- Strapline opacity: `0.45–0.5` (kept behind CTAs)

---

## 3) Color System

**Dark Theme (default)**
- `--color-bg`: `#07080a`
- `--color-fg`: `#f2f4f7`
- `--color-surface`: `rgba(255,255,255,0.04)`
- `--color-surface-strong`: `rgba(255,255,255,0.06)`
- `--color-border`: `rgba(255,255,255,0.08)`
- `--color-accent`: `#6a5cff`
- `--color-stage`: `#07080a`

**Light Theme**
- `--color-bg`: `#f6f7fa`
- `--color-fg`: `#0b0d12`
- `--color-surface`: `rgba(0,0,0,0.03)`
- `--color-surface-strong`: `rgba(0,0,0,0.05)`
- `--color-border`: `rgba(0,0,0,0.08)`
- `--color-accent`: `#5b5cff`
- `--color-stage`: `#eef0f6`

**Shader Palette**
- `--shader-base`: `7 8 10` (dark)
- `--shader-glow`: `36 38 54` (dark)
- `--shader-hero-base`: `14 16 26` (dark)
- `--shader-hero-accent`: `118 106 240` (dark)

(See `src/app/globals.css` for light equivalents.)

---

## 4) Radii Ladder

- Pill (nav, badge, buttons): `999px`
- Card outer: `32px`
- Card inner: `26px`
- Module card: `18px`
- Inner panels: `14px`

Keep the ladder consistent across new components.

---

## 5) Surfaces, Borders, Shadows

**Border Target**
- Quiet lines only: `rgba(255,255,255,0.08–0.12)` (dark)
- Avoid hard “strokes.”

**Surface Rule**
- Use translucent surfaces: `bg-surface/40–70` + `backdrop-blur`
- Inner highlight: `inset 0 1px 0 rgba(255,255,255,0.2–0.35)`

**Shadow Rule**
- Wide + faint, never “boxy.”
- Example: `0 8px 20px rgba(4,6,10,0.10)`

---

## 6) Components

### 6.1 Nav Pill
- Floating pill, glass surface, minimal shadow.
- Link opacity: default `~55%`, hover `~85%`.
- Separator between link cluster and controls.
- CTA right‑aligned within pill.

### 6.2 Badge Pill
- Subtle dot prefix; no bright color.
- Height: compact (status chip, not button).

### 6.3 Primary CTA
- Fill: foreground on background
- Shadow: soft + inset highlight
- Hover: slight lift and brighter highlight (160–200ms)

### 6.4 Secondary CTA
- Border opacity reduced; fill subtle.
- Never competes with primary.

### 6.5 Hero Preview Card
- Outer rim is quiet; border does less work.
- Inner glow + soft inset shadow.
- Steps row is inside the preview so the card reads “complete.”

### 6.6 Interior UI Ghosting
- Not uniform: one “hero” module 10% stronger; rest subdued.
- Avoid too many outlined rectangles; imply panels instead.

---

## 7) Motion & Interaction

**Hover timing**
- Buttons: `160–200ms` ease
- Nav links: opacity only

**Shader drift**
- `plume-drift`: 26s
- `plume-drift-alt`: 21s
- `drift-slow`: 22s
- `drift-medium`: 18s
- `drift-soft`: 26s
- `noise-drift`: 18s

**Reduced Motion**
- Respect `prefers-reduced-motion` (Shader components do so).

---

## 8) Atmosphere & Shader Layering

- Background: WebGL shader + vignette + asymmetric plume.
- Noise film at ~5% opacity for texture (`public/noise.svg`).
- Plume should be perceptible only on pause (never “loud”).

---

## 9) Light/Dark Theme Rules

- Default: system.
- Light theme should preserve contrast hierarchy (no inverted “glow”).
- Accent remains the same hue family; don’t introduce new neon colors.

---

## 10) Accessibility

- Maintain AA contrast for body text.
- Provide focus visibility (use default browser outline or custom).
- Reduce motion in shaders for users with reduced motion preference.

---

## 11) Implementation Notes (Source of Truth)

- CSS tokens live in: `src/app/globals.css`
- Hero layout & effects: `src/components/Hero.tsx`
- Shader code: `src/components/ShaderBackdrop.tsx`, `src/components/ShaderHero.tsx`
- Nav styles: `src/components/Header.tsx`

---

## 12) Release Checklist (per page update)

- [ ] H1 remains dominant and readable across breakpoints
- [ ] Primary CTA dominates secondary
- [ ] Hero preview card fully visible in default viewport
- [ ] Borders remain subtle (no loud outlines)
- [ ] Light/Dark system still respects the same hierarchy
- [ ] Motion remains calm (no fast or jerky drift)

