export const content = {
  lang: "en",
  nav: { why: "Why", security: "Security", architecture: "Architecture", waitlist: "Waitlist" },
  hero: {
    title: "A crypto-native clawdbot for autonomous operation - secure and private by design.",
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
    title: "3-tier signing model",
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
} as const;
