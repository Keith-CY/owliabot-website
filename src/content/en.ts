export const content = {
  lang: "en",
  nav: {
    why: "Why",
    architecture: "Architecture",
    skills: "Skills",
    signing: "Signing Model",
    execution: "Execution Flow",
    local: "Local-first",
    waitlist: "Waitlist",
  },
  hero: {
    title: "An autonomous crypto agent that never crosses your signing boundary.",
    subtitle:
      "OwliaBot is a self-hosted, crypto-native agent for on-chain operations.\nMinimal dependencies. Extensible skills. Local-first security.",
    badge: "Signing model planned",
    status: "Designed and documented. Implementation in progress.",
    emphasis: "Secure. Private. Controllable by design.",
    ctaPrimary: "Join the Waitlist",
    ctaSecondary: "Read the Architecture",
  },
  why: {
    eyebrow: "Principles",
    title: "Why OwliaBot",
    subtitle:
      "Autonomy is useful only when boundaries are explicit — otherwise it is just blind execution.",
    items: [
      {
        title: "Crypto-native",
        body:
          "Built for on-chain workflows, wallets, and DeFi-native operations. OwliaBot understands transactions, signatures, and execution contexts as first-class primitives.",
        mechanism: "No abstraction over keys. No off-chain shadow execution.",
      },
      {
        title: "Self-hosted",
        body:
          "Runs fully on your own machine or server. No hosted agents, no remote custody, and no hidden infrastructure dependencies.",
        mechanism: "Local-first by default. Remote optional by choice.",
      },
      {
        title: "Minimal surface",
        body:
          "Fewer dependencies, fewer channels, fewer attack paths. Designed for Telegram + Discord first, with the core kept intentionally small.",
        mechanism: "<30 deps. No native modules. No browser automation.",
      },
      {
        title: "Extensible",
        body:
          "Capabilities scale through Skills: JavaScript modules loaded from your workspace, hot-reloaded without touching core code.",
        mechanism: "Skills define tools, permissions, and security levels.",
      },
    ],
  },
  architecture: {
    title: "Architecture overview",
    subtitle: "Built to stay small",
    body:
      "OwliaBot keeps the core minimal and local-first, then extends outward through Skills. Channels can expand, but the core remains deliberate and auditable.",
    flowLabel: "Core flow",
    flow: ["Gateway", "Telegram / Discord", "Agent Runtime", "Skills", "Signer"],
    bullets: [
      "Telegram + Discord are first-class entry points.",
      "Agent runtime builds context, calls tools, and returns responses.",
      "Signer remains isolated from the bot process.",
    ],
    note: "Additional channels are planned without expanding the core surface.",
  },
  skills: {
    title: "Skills system",
    subtitle: "Composable by design",
    body:
      "Skills are JavaScript modules living in your workspace. They define tools, parameters, and security levels without modifying core code.",
    cards: [
      {
        title: "JS module format",
        body:
          "Each skill is a directory with a package.json and an index.js implementation.",
        meta: "Hot reload supported",
      },
      {
        title: "Security levels",
        body:
          "Every tool declares its security tier: read, write, or sign.",
        meta: "Explicit permissions",
      },
      {
        title: "Built-in skills",
        body:
          "crypto-price (CoinGecko) and crypto-balance (Alchemy).",
        meta: "ALCHEMY_API_KEY required for balance",
      },
    ],
    footer: "Install more skills or write your own without expanding the core surface.",
  },
  signing: {
    title: "A 3-tier signing model",
    subtitle: "Autonomy without blind trust.",
    description:
      "OwliaBot separates user intent, automated execution, and on-chain authority into three distinct signing layers. Each tier has a clear purpose, scope, and failure boundary.",
    status: "Planned. Designed but not yet implemented.",
    tiers: [
      {
        title: "Tier 1: Companion App",
        body: "User-confirmed signing for any high-value or sensitive action. This is where intent is explicitly approved.",
        keyword: "Explicit consent",
      },
      {
        title: "Tier 2: Session Keys",
        body: "Scoped, time-limited keys for low-risk automation. Permissions are tightly bounded and automatically rotated.",
        keyword: "Scoped execution",
      },
      {
        title: "Tier 3: Smart Wallet",
        body: "On-chain policy enforcement for advanced strategies. The wallet defines what is possible - not the agent.",
        keyword: "Enforced authority",
      },
    ],
    footer:
      "The agent never gains more authority than you explicitly grant.",
  },
  execution: {
    eyebrow: "Execution",
    title: "Execution Flow",
    steps: ["Intent", "Permission", "Execution", "Audit"],
    caption: "Every action follows an explicit signing path.",
    note: "Current release focuses on non-signing operations.",
  },
  local: {
    eyebrow: "Local-first",
    title: "Local-first by design",
    body: "Most agents require key custody. OwliaBot does not.",
    bullets: [
      "Keys live on your device",
      "Sensitive operations run locally",
      "Remote execution is optional and explicit",
    ],
  },
  devices: {
    eyebrow: "Channels",
    title: "Everywhere you work",
    body:
      "Operate securely from desktop, mobile, or web - Telegram and Discord first, more channels planned.",
  },
  waitlist: {
    eyebrow: "Early access",
    title: "Join the waitlist",
    body: "Be first in line for early access and private beta updates.",
    privacy: "We will never ask for your private keys.",
    note: "No wallet connection required.",
  },
  footer: {
    note: "Private keys never leave your device. No exceptions.",
  },
  links: {
    github: "https://github.com/owliabot/owliabot",
  },
} as const;
