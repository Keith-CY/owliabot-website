# OwliaBot Landing Page Design (SSG)

## Summary
A single-page landing site for OwliaBot built with Next.js App Router and static export. The page targets crypto power users and the crypto+AI vanguard, with a bold Y2K plastic visual language, a Three.js WebGL shader hero backdrop, and a waitlist embed via Tally. English is the default root route, with explicit /en and /zh routes for i18n.

## Goals
- Drive waitlist sign-ups (primary CTA).
- Position OwliaBot as crypto-native, autonomous, secure, and private.
- Signal multi-device access (mobile, desktop, web).
- Maintain a self-hosted, audit-friendly, security-first vibe.

## Non-goals
- Product documentation or deep technical docs.
- On-page pricing or purchase flow.
- Runtime backend (static export only).

## Audience
- Crypto power users and self-hosters.
- “Crypto + AI vanguard” early adopters.

## Key Messaging
- Hero line (EN): "A crypto-native clawdbot for autonomous operation — secure and private by design."
- Supporting line (EN): "Self-hosted AI agent for crypto ops, accessible on mobile, desktop, and web."
- Pillars: Crypto-native, Autonomous, Secure, Private.

## Information Architecture (Single Page)
1. Header: Logo, minimal nav, language toggle, CTA.
2. Hero: Headline, subhead, CTAs, WebGL shader backdrop.
3. Pillars: 4 cards (Crypto-native / Autonomous / Secure / Private).
4. Security Model: Simplified 3-tier strip (Companion App / Session Keys / Smart Wallet).
5. Multi-device: Device grid + short copy.
6. Architecture: Local-first, minimal dependencies, auditable.
7. Waitlist: Tally embed (primary CTA).
8. Footer: Privacy reminder + links.

## i18n Routing (Static Export)
- `/` renders English by default.
- `/en` explicit English route.
- `/zh` Chinese route.
- Shared layout/components; content split into `src/content/en.ts` and `src/content/zh.ts`.

## Visual System
- Style: Y2K plastic, glossy/translucent surfaces, rounded geometry.
- No CSS gradients; use solid base colors with subtle noise textures.
- Palette derived from logo (purple/blue) for accents and focus states.
- Typography: Space Grotesk (headers) + IBM Plex Sans (body).
- Logo appears in header only.

## Motion & Interaction
- Framer Motion for page-load staggers and subtle hover lifts.
- Minimal, purposeful animation (no excessive micro-motion).

## Shader (Hero Background)
- Three.js WebGL canvas on a single plane with custom fragment shader.
- Low-intensity organic motion (ripples/lensing) to evoke plastic sheen.
- Clamped opacity with a subtle vignette mask for readability.
- Throttle or reduce FPS on low-power devices; pause when offscreen.

## Waitlist Embed
- Tally form: https://tally.so/r/kdN1Mo
- Full-width embed with short privacy reassurance.

## Accessibility & Performance
- High contrast text on dark surfaces.
- Reduced-motion preference respected for Framer Motion and shader.
- Shader resolution capped to avoid GPU overuse on mobile.

## Tech Stack
- Next.js App Router, static export (`output: "export"`).
- Three.js for WebGL shader.
- Framer Motion for animations.

## Open Questions (None)
All key decisions validated for implementation.
