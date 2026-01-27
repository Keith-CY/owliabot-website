# OwliaBot Landing Page (Next.js SSG) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a bilingual (EN/ZH) Next.js App Router landing page with static export, Three.js WebGL shader hero, Framer Motion animations, and a Tally waitlist embed.

**Architecture:** Next.js App Router with `output: "export"`, routes for `/`, `/en`, `/zh`, shared components, and content split into `src/content/en.ts` + `src/content/zh.ts`. Three.js shader renders behind the hero section only. Framer Motion handles minimal staggered reveals.

**Tech Stack:** Next.js (App Router), Tailwind CSS, Three.js, Framer Motion, static export, Bun.

---

### Task 1: Initialize Next.js App Router project (static export + Tailwind)

**Files:**
- Create: `package.json` (via create-next-app)
- Create: `app/` (via create-next-app)
- Create: `tailwind.config.ts` (via create-next-app)
- Create: `postcss.config.mjs` (via create-next-app)
- Modify: `next.config.js`

**Step 1: Scaffold project**
Run: `npx create-next-app@latest . --ts --eslint --app --use-npm --tailwind --src-dir --import-alias "@/*"`
Expected: Next.js App Router project created in repo root.

**Step 2: Enable static export**
Edit `next.config.js`:
```js
const nextConfig = {
  output: "export",
};

module.exports = nextConfig;
```

**Step 3: Run dev server sanity check**
Run: `bun run dev`
Expected: Dev server starts without errors.

**Step 4: Commit**
```bash
git add package.json package-lock.json next.config.js app src
git commit -m "chore: scaffold next.js app router project"
```

---

### Task 2: Add dependencies (Three.js + Framer Motion)

**Files:**
- Modify: `package.json`

**Step 1: Install deps**
Run: `bun add three framer-motion`
Expected: Dependencies added to package.json/bun.lockb.

**Step 2: Verify build**
Run: `bun run build`
Expected: Build succeeds.

**Step 3: Commit**
```bash
git add package.json bun.lockb
git commit -m "chore: add three and framer-motion"
```

---

### Task 3: Add logo asset

**Files:**
- Create: `public/owliabot.png`

**Step 1: Copy logo**
Copy from `/Users/ChenYu/Downloads/owliabot.png` → `public/owliabot.png`.

**Step 2: Commit**
```bash
git add public/owliabot.png
git commit -m "chore: add owliabot logo"
```

---

### Task 4: Create content files (EN/ZH)

**Files:**
- Create: `src/content/en.ts`
- Create: `src/content/zh.ts`

**Step 1: Write EN content module**
```ts
export const content = {
  lang: "en",
  nav: { why: "Why", security: "Security", architecture: "Architecture", waitlist: "Waitlist" },
  hero: {
    title: "A crypto-native clawdbot for autonomous operation — secure and private by design.",
    subtitle: "Self-hosted AI agent for crypto ops, accessible on mobile, desktop, and web.",
    ctaPrimary: "Join the Waitlist",
    ctaSecondary: "View GitHub",
  },
  pillars: [
    { title: "Crypto-native", body: "Built for on-chain workflows, wallets, and DeFi-native operations." },
    { title: "Autonomous", body: "Agentic execution with clear boundaries and human control." },
    { title: "Secure", body: "Layered signing model with strict permissioning and auditability." },
    { title: "Private", body: "Local-first by design. Keys never leave your device." },
  ],
  security: {
    title: "3‑tier signing model",
    items: [
      { title: "Tier 1: Companion App", body: "User-confirmed signing for any high-value action." },
      { title: "Tier 2: Session Keys", body: "Low-risk automation with limits and rotation." },
      { title: "Tier 3: Smart Wallet", body: "Granular permissions for advanced strategies." },
    ],
  },
  devices: {
    title: "Everywhere you work",
    body: "Mobile, desktop, and web access for fast, secure ops.",
  },
  architecture: {
    title: "Local-first by design",
    items: [
      { title: "Local-first", body: "Sensitive ops stay on your device." },
      { title: "Minimal deps", body: "Small surface area, easy audits." },
      { title: "Auditable", body: "Transparent, inspectable workflows." },
    ],
  },
  waitlist: {
    title: "Join the waitlist",
    body: "Be first in line for early access and private beta updates.",
    privacy: "We will never ask for your private keys.",
  },
  footer: {
    note: "Private keys never leave your device.",
  },
  links: {
    github: "https://github.com/owliabot/owliabot",
  },
};
```

**Step 2: Write ZH content module**
```ts
export const content = {
  lang: "zh",
  nav: { why: "为什么", security: "安全模型", architecture: "架构", waitlist: "候补名单" },
  hero: {
    title: "面向加密世界的 clawdbot，自动化执行——安全与隐私为先。",
    subtitle: "自托管 AI 助手，覆盖移动端、桌面端与 Web。",
    ctaPrimary: "加入候补名单",
    ctaSecondary: "查看 GitHub",
  },
  pillars: [
    { title: "加密原生", body: "为链上工作流、钱包与 DeFi 场景而生。" },
    { title: "自动化", body: "可控的智能执行与清晰边界。" },
    { title: "安全", body: "分层签名与权限控制。" },
    { title: "隐私", body: "本地优先，私钥不出设备。" },
  ],
  security: {
    title: "三层签名模型",
    items: [
      { title: "第一层：伴侣 App", body: "高价值操作需用户确认签名。" },
      { title: "第二层：会话密钥", body: "低风险自动化，限额与轮换。" },
      { title: "第三层：智能钱包", body: "高级策略的细粒度权限。" },
    ],
  },
  devices: {
    title: "随时随地",
    body: "移动端、桌面端与 Web 全覆盖。",
  },
  architecture: {
    title: "本地优先的架构",
    items: [
      { title: "Local-first", body: "敏感操作留在本地。" },
      { title: "最小依赖", body: "攻击面更小，更易审计。" },
      { title: "可审计", body: "流程透明，代码可查。" },
    ],
  },
  waitlist: {
    title: "加入候补名单",
    body: "抢先体验早期版本与私密内测更新。",
    privacy: "我们永远不会索要你的私钥。",
  },
  footer: {
    note: "私钥永不离开你的设备。",
  },
  links: {
    github: "https://github.com/owliabot/owliabot",
  },
};
```

**Step 3: Commit**
```bash
git add src/content/en.ts src/content/zh.ts
git commit -m "feat: add en/zh content modules"
```

---

### Task 5: Create shared layout and sections

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Create: `src/app/en/page.tsx`
- Create: `src/app/zh/page.tsx`
- Create: `src/components/*` (Header, Hero, Pillars, Security, Devices, Architecture, Waitlist, Footer)
- Modify: `src/app/globals.css`

**Step 1: Implement layout**
Set up global fonts, base colors, and layout shell. Configure Tailwind theme + base styles in `src/app/globals.css`.

**Step 2: Build shared page component**
Create a `LandingPage` component that accepts `content` and renders all sections.

**Step 3: Create EN/ZN routes**
- `/` and `/en` use EN content
- `/zh` uses ZH content

**Step 4: Commit**
```bash
git add src/app src/components src/app/globals.css
git commit -m "feat: build landing page layout and sections"
```

---

### Task 6: Add Three.js shader hero background

**Files:**
- Create: `src/components/ShaderHero.tsx`
- Modify: `src/components/Hero.tsx`

**Step 1: Implement ShaderHero**
Add a Three.js canvas with a plane + custom fragment shader. Respect prefers-reduced-motion.

**Step 2: Integrate into Hero**
Render shader behind hero copy, clamped opacity, avoid text overlap.

**Step 3: Commit**
```bash
git add src/components/ShaderHero.tsx src/components/Hero.tsx
git commit -m "feat: add three.js shader hero"
```

---

### Task 7: Add Framer Motion animations

**Files:**
- Modify: `src/components/*`

**Step 1: Add page-load stagger**
Apply subtle stagger to hero and section items.

**Step 2: Respect reduced motion**
Ensure reduced motion disables animation.

**Step 3: Commit**
```bash
git add src/components
git commit -m "feat: add framer motion transitions"
```

---

### Task 8: Embed Tally waitlist

**Files:**
- Modify: `src/components/Waitlist.tsx`

**Step 1: Embed iframe**
Use Tally embed for `https://tally.so/r/kdN1Mo`.

**Step 2: Commit**
```bash
git add src/components/Waitlist.tsx
git commit -m "feat: embed tally waitlist"
```

---

### Task 9: Final polish and static export verification

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Run build + export**
Run: `bun run build`
Expected: Static export succeeds.

**Step 2: Preview export locally**
Run: `npx serve out`
Expected: Site renders at `/`, `/en`, `/zh`.

**Step 3: Commit**
```bash
git add src/app/globals.css
git commit -m "chore: polish styles and verify export"
```
