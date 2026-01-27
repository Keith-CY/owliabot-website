# OwliaBot Landing — Docs Sync (Vision-First) Design

Date: 2026-01-27

## Goal
Align the landing page with the OwliaBot docs (https://docs.owlia.bot/zh/) while keeping a vision-first stance. Clearly label planned features (e.g., signing model and channel expansion) without undermining the product’s positioning.

## Context from Docs
- Self-hosted, local-first; private keys never enter the bot process.
- Minimal dependencies (<30), no native modules, no browser automation.
- Channels intentionally limited to Telegram + Discord (lower attack surface).
- Skills system uses JS modules in `workspace/skills` with hot reload.
- Skill security levels: read/write/sign.
- Built-in skills: crypto-price (CoinGecko), crypto-balance (Alchemy key).
- Model failover supported via multiple providers in `config.yaml`.
- 3-tier signing model is designed but not implemented.

## Information Architecture (Proposed)
1. Hero (vision-first) + “Planned” micro-tag for signing claims
2. Why (pillars updated to match docs)
3. Architecture Overview (new)
4. Skills System (new)
5. 3-tier Signing Model (status: planned)
6. Execution Flow (aligned with docs flow)
7. Local-first (keys never leave device)
8. Devices / Channels (Telegram + Discord first; more planned)
9. Waitlist

## Content Adjustments
- Hero: add badge + status line (“Designed and documented; not yet shipped”).
- Why: shift to self-hosted, minimal surface, skills extensibility.
- Architecture overview: gateway → channels → agent runtime → skills → signer.
- Skills: JS module format, hot reload, security levels; mention built-ins.
- Signing model: keep tiers; add planned status line.
- Devices: keep “every device” framing, add “Telegram/Discord first; more planned.”

## Data Model Changes
Extend `LandingPageContent` with:
- `hero.badge`, `hero.status`
- `architecture` section
- `skills` section
- `signing.status`

## Components
Add:
- `ArchitectureOverview.tsx`
- `SkillsSection.tsx`

Update:
- `Hero.tsx` to render badge/status
- `SigningModel.tsx` to show status line + new anchor
- `LandingPage.tsx` layout + new sections
- `Header.tsx` nav labels/anchors

## Status & Honesty
Use small, explicit labels: “Planned” or “In development” wherever features aren’t shipped yet, especially signing and channel expansion.

## Validation
- Ensure both EN/ZN copy updated.
- Verify anchors and nav jump targets.
- Confirm copy aligns with docs and avoids over-claiming.
