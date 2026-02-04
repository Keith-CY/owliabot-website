export const content = {
  lang: "en",
  nav: {
    about: "About OwliaBot",
    skillsHub: "Skills Hub",
  },
  hero: {
    title: "An autonomous crypto agent that never crosses your signing boundary.",
    subtitle:
      "A self-hosted, crypto-native AI agent — minimal dependencies, extensible skills, local-first.",
    badge: "OwliaBot",
    status: "Designed and documented. Implementation in progress.",
    emphasis: "Secure. Private. Controllable by design.",
    ctaPrimary: "Co-build OwliaBot",
    ctaSecondary: "Read the Architecture",
    ctaSecondaryHref: "http://docs.owlia.bot/",
  },
  why: {
    eyebrow: "Design Principles",
    title: "Why OwliaBot",
    subtitle: "Autonomy works only with explicit boundaries.",
    items: [
      {
        title: "Crypto-native",
        body:
          "Natively understands on-chain transactions and signing flows — no middleware translation needed.",
        mechanism: "No abstraction over keys. No off-chain shadow execution.",
      },
      {
        title: "Self-hosted",
        body:
          "Runs fully on your own machine or server. No hosted agents, no remote custody, no hidden dependencies.",
        mechanism: "Local-first by default. Remote optional by choice.",
      },
      {
        title: "Owlia Vault",
        body:
          "Credentials stored in an isolated process. The Agent calls them through controlled interfaces — never sees the raw keys.",
        mechanism: "Can use, but never see.",
      },
      {
        title: "Extensible",
        body:
          "Capabilities grow through Skills — modular plugins covering crypto and on-chain scenarios.",
        mechanism: "Skills define tools, permissions, and security levels.",
      },
    ],
  },
  architecture: {
    title: "Architecture overview",
    subtitle: "Built to stay small",
    body:
      "Messages flow from you, through OwliaBot to Skills. Keys stay isolated in the Vault.",
    flowLabel: "Core flow",
    flow: ["Channels", "Gateway", "Agent Runtime", "Skills", "Owlia Vault"],
    layers: [
      {
        label: "Channels",
        items: ["Telegram", "Discord"],
        description: "Entry points",
      },
      {
        label: "Gateway",
        items: ["Routing", "Sessions", "Policy"],
        description: "Message routing & session management",
      },
      {
        label: "Agent Runtime",
        items: ["Context", "LLM", "Tools"],
        description: "Decision-making & tool orchestration",
      },
      {
        label: "Skills",
        items: ["DeFi", "Portfolio", "Monitoring"],
        description: "Extensible capability modules",
      },
      {
        label: "Owlia Vault",
        items: ["Keys", "Credentials", "Audit"],
        description: "Isolated credential storage",
      },
    ],
    footer: "",
    diagram: {
      user: "You",
      bot: "OwliaBot",
      skillsLabel: "Skills",
      vaultLabel: "Owlia Vault",
      skills: [
        "Health Factor Guardian",
        "Portfolio Overview",
        "Execution Engine",
        "Uniswap V3 LP Manager",
        "Refinance Router",
      ],
      vault: ["Crypto Wallet", "API Key"],
    },
  },
  skills: {
    title: "Skills system",
    subtitle: "What can OwliaBot do for you?",
    body:
      "Modular plugins covering real crypto scenarios.",
    cards: [
      {
        title: "Portfolio at a glance",
        body:
          "Connect multiple wallet addresses and exchange APIs. OwliaBot aggregates your holdings and reports your portfolio status on demand or on a schedule.",
        meta: "Multi-chain + CEX",
      },
      {
        title: "DeFi risk guardian",
        body:
          "Monitor your lending positions across Aave, Compound, and more. Get alerts before liquidation and let OwliaBot auto-repay or add collateral to keep you safe.",
        meta: "Automated protection",
      },
      {
        title: "Strategy execution",
        body:
          "From MACD signals to delta-hedged leverage — define your strategy, backtest it, and let OwliaBot execute trades with built-in risk controls and audit trails.",
        meta: "Signal → Execution → Report",
      },
    ],
    footer: "Community-built skills keep growing. Install what you need, or build your own.",
    exploreMore: "Explore all Skills",
  },
  security: {
    eyebrow: "Secure Storage",
    title: "Owlia Vault",
    subtitle: "Your credentials, isolated from the Agent.",
    description:
      "Private keys and API keys stored in an isolated process. The Agent can only operate through controlled interfaces.",
    status: "",
    tiers: [
      {
        title: "Crypto Wallet",
        body: "Initiate transfers and balance queries through the Vault — without ever touching the raw keys.",
        keyword: "On-chain",
      },
      {
        title: "API Key Safe",
        body: "Exchange and platform credentials securely managed. The Agent calls on demand — can never export.",
        keyword: "Platform Access",
      },
    ],
    footer: "",
    local: {
      title: "Even if the Agent is compromised, your credentials remain safe",
      body: "Your credentials stay under your control.",
      bullets: [
        "Encrypted in an isolated process",
        "One-way controlled interface",
        "Compromised Agent ≠ leaked keys",
      ],
    },
  },
  building: {
    eyebrow: "Co-build",
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
      back: "Back",
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
