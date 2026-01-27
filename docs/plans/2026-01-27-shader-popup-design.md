# Shader Popup Layer — Design

Date: 2026-01-27
Owner: Codex
Status: Draft (validated in chat)

## Goal
Add a “pop-up” shader layer behind the hero preview card. It should feel like an upper-right cresting glow, be visually subordinate to the main hero shader, and integrate with existing shader tokens and motion rules.

## Scope
- New WebGL shader component: `ShaderPopup`.
- Place within the hero preview card stack in `src/components/Hero.tsx`.
- Respect theme tokens and reduced-motion behavior.

Non-goals:
- Global/background shader changes.
- Pointer interaction or heavy motion.

## Design Summary
- **Placement:** Inside the hero preview card container, clipped by the card’s rounded corners and `overflow-hidden`.
- **Bias:** Upper-right, so it reads as a cresting glow behind the card.
- **Scale:** Medium aura (~160% of inner card size).
- **Layering:** Between existing `ShaderHero` and card content. `pointer-events-none`.
- **Look:** Slower movement, stronger vignette, tighter falloff. Alpha lower than hero shader.

## Component Architecture
- **New file:** `src/components/ShaderPopup.tsx`.
- **Tech:** Three.js `Scene` + `OrthographicCamera` + `PlaneGeometry` + `ShaderMaterial`.
- **Uniforms:**
  - `u_time`, `u_resolution`
  - `u_base`, `u_accent` (optionally `u_glow` if needed)
- **Colors:** Use CSS tokens (`--shader-hero-base`, `--shader-hero-accent`, `--shader-glow`) via `getComputedStyle`.
- **Theme updates:** `MutationObserver` on `document.documentElement` for `class`/`style` changes.

## Placement & Masking
- Wrap in an absolutely positioned container within the hero preview card.
- Apply a radial fade (CSS mask or gradient overlay) to soften edges.
- Use existing border radius + `overflow-hidden` to clip the canvas.

## Motion & Performance
- Respect `prefers-reduced-motion`:
  - Reduced: render once at `u_time = 0`.
  - Default: gentle animation loop with low speed.
- Pixel ratio capped at 2 (same as other shaders).
- Dispose geometry/material/renderer on unmount.

## Error Handling
- Guard against missing mount element.
- Optionally wrap WebGL renderer init in `try/catch` to silently skip if WebGL unavailable.

## Testing (TDD)
- Add a minimal render test that asserts `Hero` contains the new shader container and that it is positioned/hidden appropriately (class names).
- Use the existing test runner in the repo (determine before implementing).
- Write the test first and confirm it fails before writing implementation code.

## A11y
- `aria-hidden="true"` on the shader container.
- `pointer-events-none` to avoid interaction conflicts.

## Files Touched
- `src/components/ShaderPopup.tsx` (new)
- `src/components/Hero.tsx` (add layer)
- Tests (location TBD)

## Acceptance Criteria
- Pop-up shader visible behind hero preview card, biased upper-right.
- Appears as soft, cresting glow (not competing with hero shader).
- Theming updates correctly on light/dark toggle.
- Reduced motion renders static frame.
- No layout shifts or pointer interference.
