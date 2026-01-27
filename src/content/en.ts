export const content = {
  lang: "en",
  nav: {
    why: "Why",
    signing: "Signing Model",
    execution: "Execution Flow",
    local: "Local-first",
    waitlist: "Waitlist",
  },
  hero: {
    title: "An autonomous crypto agent that never crosses your signing boundary.",
    subtitle:
      "Clawdbot is a crypto-native autonomous agent for on-chain operations, designed with explicit permissions, progressive signing, and local-first security.",
    emphasis: "Secure. Private. Controllable by design.",
    ctaPrimary: "Join the Waitlist",
    ctaSecondary: "Read the Architecture",
  },
  why: {
    title: "Why Clawdbot",
    subtitle: "Autonomy is useful only when boundaries are explicit.",
    items: [
      {
        title: "Crypto-native",
        body:
          "Built for on-chain workflows, wallets, and DeFi-native operations. Clawdbot understands transactions, signatures, and execution contexts as first-class primitives.",
        mechanism: "No abstraction over keys. No off-chain shadow execution.",
      },
      {
        title: "Autonomous",
        body:
          "Clawdbot executes tasks autonomously within clearly defined limits. Every action is derived from explicit intent and scoped permissions.",
        mechanism: "Autonomy without implicit authority.",
      },
      {
        title: "Secure",
        body:
          "A layered signing model separates intent, execution, and authority. High-risk actions require explicit user confirmation, while low-risk automation remains bounded and auditable.",
        mechanism: "No blind signing. No hidden escalation.",
      },
      {
        title: "Private",
        body:
          "Local-first by design. Private keys never leave your device. There is no hosted key custody and no centralized signing service.",
        mechanism: "You own the keys. You define the trust.",
      },
    ],
  },
  signing: {
    title: "A 3-tier signing model",
    subtitle: "Autonomy without blind trust.",
    description:
      "Clawdbot separates user intent, automated execution, and on-chain authority into three distinct signing layers. Each tier has a clear purpose, scope, and failure boundary.",
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
    title: "Execution Flow",
    steps: ["Intent", "Permission", "Execution", "Audit"],
    caption: "Every action follows an explicit signing path.",
  },
  local: {
    title: "Local-first by design",
    body: "Most agents ask for your keys. We never do.",
    bullets: [
      "Keys live on your device",
      "Sensitive operations run locally",
      "Remote execution is optional and explicit",
    ],
  },
  devices: {
    title: "Everywhere you work",
    body:
      "Operate securely from desktop, mobile, or web - without changing your trust assumptions.",
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
