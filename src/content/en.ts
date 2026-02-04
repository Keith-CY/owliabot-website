export const content = {
  lang: "en",
  nav: {
    about: "About OwliaBot",
    skillsHub: "Skills Hub",
  },
  hero: {
    title: "An autonomous crypto agent that never crosses your signing boundary.",
    subtitle:
      "OwliaBot is a self-hosted, crypto-native agent for on-chain operations,\nwith minimal dependencies, extensible skills, and local-first security.",
    badge: "Owlia Vault",
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
        title: "Owlia Vault",
        body:
          "All sensitive credentials are stored in an isolated system process, inaccessible to the Agent. Private keys and API keys are called through controlled interfaces.",
        mechanism: "The Agent can use them, but never see the raw credentials.",
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
      "Messages flow in through Channels, get routed by the Gateway, processed by the Agent, and executed through Skills. Owlia Vault keeps your keys isolated throughout.",
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
    footer: "Core stays minimal. Capabilities grow through Skills.",
  },
  skills: {
    title: "Skills system",
    subtitle: "What can OwliaBot do for you?",
    body:
      "OwliaBot extends its capabilities through Skills — modular plugins that cover real crypto scenarios. From portfolio tracking to automated DeFi strategies, each skill is designed for practical, everyday use.",
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
      "Owlia Vault stores private keys, API keys, and other sensitive credentials in an isolated system process. The Agent never has direct access — all operations go through a controlled local interface.",
    status: "Continuously hardening...",
    tiers: [
      {
        title: "Crypto Wallet",
        body: "Encrypted private keys live in an isolated environment. The Agent initiates transfers and balance queries through the Vault — without ever touching the raw keys.",
        keyword: "On-chain",
      },
      {
        title: "API Key Safe",
        body: "Store your exchange and platform API keys in the Vault. The Agent calls them through a controlled interface — it can never export or read the raw credentials.",
        keyword: "Platform Access",
      },
    ],
    footer: "",
    local: {
      title: "The Agent can use them, but never see them",
      body: "Your credentials stay under your control. Owlia Vault ensures AI never directly touches your sensitive information.",
      bullets: [
        "Private keys & API keys encrypted in an isolated process",
        "Agent can only operate through controlled interfaces",
        "Even if the Agent is compromised, your credentials remain safe",
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
