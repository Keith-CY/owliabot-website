export const content = {
  lang: "en",
  nav: {
    why: "Why OwliaBot",
    architecture: "Architecture",
    skills: "Skills",
    security: "Secure Accounts",
    building: "Co-build OwliaBot",
  },
  hero: {
    title: "An autonomous crypto agent that never crosses your signing boundary.",
    subtitle:
      "OwliaBot is a self-hosted, crypto-native agent for on-chain operations,\nwith minimal dependencies, extensible skills, and local-first security.",
    badge: "Three-tier signing model",
    status: "Designed and documented. Implementation in progress.",
    emphasis: "Secure. Private. Controllable by design.",
    ctaPrimary: "Co-build OwliaBot",
    ctaSecondary: "Read the Architecture",
  },
  why: {
    eyebrow: "Principles",
    title: "Why OwliaBot",
    subtitle:
      "Autonomy is useful only when boundaries are explicit. Otherwise, it is just blind execution.",
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
        title: "Secure Accounts",
        body:
          "Separates user intent, automated execution, and on-chain authority into three distinct signing layers. Each layer has a clear purpose, scope, and failure boundary.",
        mechanism: "Each layer holds only the minimum authority needed for its role.",
      },
      {
        title: "Extensible",
        body:
          "Capabilities scale through Skills. Some Skills are purpose-built for crypto and on-chain scenarios, supporting transactions, assets, contracts, and on-chain data.",
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
  security: {
    eyebrow: "Secure Accounts",
    title: "Three-tier Signing Model",
    subtitle: "Autonomy without blind trust.",
    description:
      "OwliaBot separates user intent, automated execution, and on-chain authority into three distinct signing layers. Each tier has a clear purpose, scope, and failure boundary.",
    status: "Planned: Designed and documented. Implementation in progress.",
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
        body: "On-chain policy enforcement for advanced strategies. The wallet defines what is possible - not the AI agent.",
        keyword: "Enforced authority",
      },
    ],
    footer:
      "The AI agent never gains more authority than you explicitly grant.",
    local: {
      title: "Private keys remain under your control",
      body: "Most AI agents require private key custody. OwliaBot does not.",
      bullets: [
        "Private keys belong to you, never delegated to the agent",
        "Low-risk automation runs locally with strict bounds",
        "On-chain strategies fully constrained by contracts",
      ],
    },
  },
  building: {
    eyebrow: "You are not a user, you are a co-builder",
    title: "What do you want OwliaBot to do?",
    body: "Describe the features you want most, and we will prioritize them.",
    privacy: "We will never ask for your private keys. No wallet connection required.",
    note: "",
    prompts: {
      noticeMultiple: "Multiple requirements detected. We'll confirm the first one.",
      noticeQueued: "New requirement detected and queued. We'll continue after confirming the current one.",
      refineHint: "Add more details for the current requirement if needed.",
      unclearFallback: "Is this a refinement of the current requirement or a new one?",
      confirmError: "Failed to confirm requirement. Please try again later.",
      confirmRequired: "Please confirm the current requirement first.",
      requireAtLeastOne: "Please add at least one requirement.",
    },
    input: {
      placeholderInitial: "Tell OwliaBot what you need...",
      placeholderFollowup: "Add more requirement details...",
      placeholderAdditional: "Describe another requirement...",
      send: "Send",
      confirmCurrent: "Confirm current requirement",
      complete: "I want OwliaBot to build these",
    },
    summary: {
      title: "Your requirements summary:",
      emailLabel: "Leave your email and we will reach out soon:",
      emailPlaceholder: "your@email.com",
      submit: "Submit",
      submitting: "Submitting...",
    },
    success: {
      title: "Submitted!",
      body: "Thanks for your feedback. We received your requirements and will contact you by email.",
      note: "We will never ask for your private keys.",
    },
  },
  footer: {
    note: "Private keys never leave your device. No exceptions.",
    signature: "OwliaBot made with ❤️ · 2026",
  },
  links: {
    github: "https://github.com/owliabot/owliabot",
    x: "https://x.com/OwliaBot",
  },
  hero_illustration: {
    scenarios: [
      {
        id: "security",
        label: "Address Security",
        messages: [
          { role: "user", content: "Monitor security status of 0x123...xyz" },
          { role: "assistant", content: "OK, I will monitor on-chain risks for this address.\nI will alert you immediately if any anomalies occur." },
          { role: "assistant", content: "⚠️ Risk Detected\nWBTC / USDC health factor below 1.05\nApproaching liquidation threshold", type: "alert" },
          { role: "assistant", content: "Suggested Actions:", actions: ["Add Collateral", "Repay Debt", "👉 Handle Immediately"] },
        ],
      },
      {
        id: "social",
        label: "X Monitor",
        messages: [
          { role: "user", content: "Monitor this X account: @example_xyz" },
          { role: "assistant", content: "Monitoring started.\nI will summarize and alert you on important updates." },
          { role: "assistant", content: "📢 New Update Alert\nThe account just posted a tweet regarding:", type: "info" },
          { role: "assistant", content: "New DeFi Partnership\nLiquidity Plan Adjustment\nExpected launch next week" },
          { role: "assistant", content: "Do you need further analysis?" },
        ],
      },
      {
        id: "yield",
        label: "Yield Discovery",
        messages: [
          { role: "user", content: "Find stable high-yield opportunities" },
          { role: "assistant", content: "Understood. Screening for viable yield strategies based on on-chain data." },
          { role: "assistant", content: "💡 Opportunity Found\nProtocol: Aave\nAsset: USDC\nCurrent APY: ~6.8%\nRisk Level: Low-Mid", type: "success" },
          { role: "assistant", content: "Should I track this or alert you on changes?" },
        ],
      },
    ],
  },
} as const;
