export const skillsHub = {
  lang: "en",
  title: "Skills Hub",
  subtitle: "Explore what OwliaBot can do",
  description:
    "Each Skill is a modular capability that OwliaBot can run for you. Browse real-world scenarios — from portfolio tracking to automated DeFi strategies. You can also create your own Skills tailored to your needs.",
  createSkillCTA: "Have a Skill idea?",
  categories: {
    monitoring: "Monitoring & Insights",
    defi: "DeFi Strategies",
    trading: "Trading & Execution",
  },
  skills: [
    {
      id: "001",
      title: "Portfolio Overview",
      category: "monitoring",
      tagline: "See all your assets in one place",
      description:
        "Connect multiple wallet addresses across chains and exchange read-only APIs. OwliaBot aggregates your holdings and gives you a unified portfolio view on demand or on a schedule.",
      scenario:
        "\"Show me my portfolio\" → OwliaBot returns a breakdown of all your positions across wallets and exchanges, with total value and allocation percentages.",
    },
    {
      id: "002",
      title: "Launch Trends",
      category: "trading",
      tagline: "Spot trends, launch tokens in one click",
      description:
        "OwliaBot monitors X/Twitter for trending narratives and helps you launch tokens on Solana via trends.fun. From generating metadata to executing the on-chain deployment, all through a conversation.",
      scenario:
        "\"What's trending today?\" → OwliaBot shows filtered hot topics → \"Launch #2 with symbol XYZ, buy 0.5 SOL\" → Token deployed and initial purchase done.",
    },
    {
      id: "003",
      title: "Hedge Arbitrage Tools",
      category: "trading",
      tagline: "Semi-automated delta-neutral arbitrage",
      description:
        "Run hedged arbitrage strategies across CEX and DEX. OwliaBot monitors spread and funding rate opportunities, places paired orders within your parameters, and tracks P&L in real time.",
      scenario:
        "Set your spread threshold and position limits → OwliaBot finds a 0.3% funding arb on ETH → Opens long spot + short perp → Monitors and closes when target reached.",
    },
    {
      id: "004",
      title: "Euler Delta Hedge",
      category: "defi",
      tagline: "Leveraged yield with automatic hedging",
      description:
        "Run a leveraged weETH yield strategy on Euler (Base) while OwliaBot maintains a delta-neutral position through Binance ETH perpetual shorts. Auto-adjusts leverage and hedge ratio based on yield, funding costs, and risk constraints.",
      scenario:
        "\"Start delta-hedged strategy on Euler, max 3x leverage\" → OwliaBot opens positions, monitors health factor, rebalances hedge daily, and stops if funding cost exceeds yield.",
    },
    {
      id: "005",
      title: "Health Factor Guardian",
      category: "defi",
      tagline: "Never get liquidated again",
      description:
        "Continuously monitors your lending positions on Aave, Compound, and other protocols. When your health factor approaches danger, OwliaBot auto-repays debt or adds collateral to keep you safe.",
      scenario:
        "Health factor drops to 1.15 → OwliaBot alerts you → If it hits 1.08, auto-repays 20% of debt → Sends confirmation with new health factor.",
    },
    {
      id: "006",
      title: "Refinance Router",
      category: "defi",
      tagline: "Always get the best lending rate",
      description:
        "OwliaBot monitors borrow/supply rates across lending platforms. When a better deal appears, it migrates your position automatically, factoring in gas costs, slippage, and incentives.",
      scenario:
        "Your USDC borrow rate on Aave rises to 5.2% → Compound offers 3.8% → OwliaBot calculates net savings after gas → Migrates your debt in one tx.",
    },
    {
      id: "007",
      title: "Borrow-to-Earn",
      category: "defi",
      tagline: "Turn idle collateral into yield",
      description:
        "Use stablecoins as collateral, borrow target assets, and deploy them into yield opportunities across protocols. OwliaBot manages the full loop and auto-exits when the carry trade no longer makes sense.",
      scenario:
        "Deposit USDC → Borrow ETH at 2.1% → Stake in Lido at 3.4% → Net carry +1.3% → OwliaBot monitors and unwinds if rate flips negative.",
    },
    {
      id: "008",
      title: "Uniswap V3 LP Manager",
      category: "defi",
      tagline: "Automated concentrated liquidity management",
      description:
        "OwliaBot manages your Uniswap V3 LP positions: monitors price ranges, collects fees, compounds earnings, and rebalances when price moves out of range. Optional delta hedge to reduce directional risk.",
      scenario:
        "\"Manage my ETH/USDC LP, ±5% range\" → OwliaBot collects fees every 12h, auto-compounds → Price drifts out of range → Withdraws, sets new range, and notifies you.",
    },
    {
      id: "009",
      title: "Execution Engine",
      category: "trading",
      tagline: "From signal to trade, fully automated",
      description:
        "A universal execution layer for any trading strategy. Receives signals, validates parameters, enforces risk limits, splits and places orders, monitors fills, and keeps a complete audit trail.",
      scenario:
        "Strategy generates a BUY signal → Execution Engine checks risk limits → Splits into 3 orders → Monitors fills → Logs everything → Reports back with execution summary.",
    },
    {
      id: "010",
      title: "MACD Strategy",
      category: "trading",
      tagline: "Classic signals with professional backtesting",
      description:
        "A standardized MACD trading strategy that generates executable signals and professional backtest reports. Plug it into the Execution Engine for fully automated trading.",
      scenario:
        "\"Backtest MACD on ETH/USDT 4h\" → OwliaBot runs backtest → Shows Sharpe, win rate, max drawdown → \"Looks good, go live\" → Auto-trades with your risk settings.",
    },
  ],
} as const;
