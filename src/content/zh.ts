export const content = {
  lang: "zh",
  nav: {
    about: "关于 OwliaBot",
    skillsHub: "Skills Hub",
  },
  hero: {
    title: "🦉 OwliaBot，专为 Crypto 用户设计的 OpenClaw 🦞",
    subtitle:
      "一键部署你的加密原生 AI Agent，Skills 自由扩展，资产始终由你掌握。",
    badge: "OwliaBot",
    status: "已完成设计与文档，正在实现。",
    emphasis: "安全、隐私、可控，皆为设计的一部分。",
    ctaPrimary: "共建 OwliaBot",
    ctaPrimaryHref: "/zh/skills-hub",
    ctaSecondary: "阅读架构说明",
    ctaSecondaryHref: "http://docs.owlia.bot/zh",
  },
  why: {
    eyebrow: "设计原则",
    title: "为什么选择 OwliaBot",
    subtitle: "更简洁、更清晰的安全边界。", 
    items: [
      {
        title: "内置加密钱包",
        body:
          "自带安全钱包，开箱即用。支持转账、签名、余额查询等链上操作，私钥始终由你掌控。",
        mechanism: "你的密钥，你的控制。",
      },
      {
        title: "模块化 Skills",
        body:
          "社区共建插件生态，覆盖大部分链上链下场景。按需安装，即插即用。",
        mechanism: "一个 Skill 解决一个场景。",
      },
      {
        title: "Owlia Vault",
        body:
          "私钥与敏感凭证存储在独立隔离进程中，Agent 永远无法直接读取。",
        mechanism: "能用，但看不到。",
      },
      {
        title: "一键部署",
        body:
          "快速完成安装，支持服务器、本地以及移动端运行。通过 Telegram、Discord 等随时下达指令。",
        mechanism: "随时随地，触手可及。",
      },
    ],
  },
  architecture: {
    title: "架构总览",
    subtitle: "保持极简",
    body:
      "消息从你出发，经 OwliaBot 路由到 Skills 执行，密钥始终隔离在 Vault 中。",
    flowLabel: "核心流程",
    flow: ["Channels", "Gateway", "Agent Runtime", "Skills", "Owlia Vault"],
    diagram: {
      user: "用户",
      bot: "OwliaBot",
      skillsLabel: "Skills",
      vaultLabel: "Owlia Vault",
      skills: [
        "Health Factor 守护",
        "资产概览",
        "执行引擎",
        "Uniswap V3 LP 管理",
        "再融资路由",
      ],
      vault: ["加密钱包", "API Key"],
    },
    footer: "",
  },
  skills: {
    title: "Skills 系统",
    subtitle: "OwliaBot 能为你做什么？",
    body:
      "模块化插件，覆盖真实加密场景。",
    cards: [
      {
        title: "资产一目了然",
        body:
          "连接多个钱包地址和交易所 API，OwliaBot 自动汇总你的持仓，按需或定时向你汇报资产状况。",
        meta: "多链 + 交易所",
      },
      {
        title: "DeFi 风险守护",
        body:
          "持续监控你在 Aave、Compound 等平台的借贷仓位，清算前及时预警，并可自动补仓或还款，帮你守住仓位。",
        meta: "自动防护",
      },
      {
        title: "策略执行引擎",
        body:
          "从 MACD 信号到 Delta 对冲杠杆。定义你的策略、回测验证、让 OwliaBot 带着风控和审计记录自动执行交易。",
        meta: "信号 → 执行 → 报告",
      },
    ],
    footer: "社区 Skills 持续增长中。安装所需的，或构建你自己的。",
    exploreMore: "探索全部 Skills",
  },
  security: {
    eyebrow: "安全存储",
    title: "Owlia Vault",
    subtitle: "敏感凭证与 Agent 完全隔离。",
    description:
      "私钥与 API Key 存储在独立进程中，Agent 只能通过受控接口操作。",
    status: "",
    tiers: [
      {
        title: "Crypto Wallet",
        body: "通过 Vault 发起转账、查余额等链上操作，全程不接触原始密钥。",
        keyword: "链上操作",
      },
      {
        title: "API Key 保险箱",
        body: "交易所与平台凭证安全托管，Agent 按需调用，无法导出。",
        keyword: "平台接入",
      },
    ],
    footer: "",
    local: {
      title: "即使 Agent 被攻破，凭证依然安全",
      body: "凭证始终在你掌控之中。",
      bullets: [
        "隔离进程加密存储",
        "受控接口单向调用",
        "攻破 Agent ≠ 泄露密钥",
      ],
    },
  },
  building: {
    eyebrow: "一起共建",
    title: "你希望 OwliaBot 帮你做什么？",
    body: "描述你最希望 OwliaBot 实现的功能，我们会优先实现。",
    privacy: "我们永远不会索要你的私钥，无需连接钱包。",
    note: "",
    prompts: {
      noticeMultiple: "检测到多个需求，我们先确认第一个。",
      noticeQueued: "检测到新的需求，已加入待确认队列，将在当前需求确认后继续。",
      refineHint: "如需补充当前需求细节，请继续输入",
      unclearFallback: "请确认这是补充当前需求，还是新需求？",
      confirmError: "确认需求失败，请稍后再试。",
      confirmRequired: "请先确认当前需求",
      requireAtLeastOne: "请至少添加一个需求",
    },
    input: {
      placeholderInitial: "向 OwliaBot 描述你的需求...",
      placeholderFollowup: "继续补充需求详情...",
      placeholderAdditional: "继续描述其他需求...",
      send: "发送",
      confirmCurrent: "确认当前需求",
      complete: "我希望 OwliaBot 实现这些功能",
    },
    summary: {
      title: "你的需求总结：",
      back: "返回补充",
      emailLabel: "请留下你的邮箱，我们会尽快联系你：",
      emailPlaceholder: "your@email.com",
      submit: "提交",
      submitting: "提交中...",
    },
    success: {
      title: "提交成功！",
      body: "感谢你的反馈。我们已经收到你的需求，会尽快通过邮箱与你联系。",
      note: "我们永远不会索要你的私钥。",
    },
  },
  userScenarios: {
    eyebrow: "应用场景",
    title: "用户场景",
    subtitle: "OwliaBot 为不同用户群体提供专属解决方案",
    cards: [
      {
        title: "Crypto 个人用户",
        icon: "User",
        body: "管理多链资产、实时监控 DeFi 仓位健康度、自动化执行链上策略。OwliaBot 是你的个人加密助手，帮你把握市场机会、规避风险。",
      },
      {
        title: "智能运营",
        icon: "Sparkles",
        body: "自动化运营 Twitter 账号和社群平台，智能监控关键账户动态、自动回复互动、定时发布内容。通过 AI 分析用户反馈，优化运营策略，提升社群活跃度和品牌影响力。",
      },
    ],
  },
  partners: {
    eyebrow: "生态合作",
    title: "合作伙伴",
    subtitle: "与行业领先者共建 Web3 未来",
  },
  footer: {
    note: "私钥永不离开你的设备。没有例外。",
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
        label: "地址监控",
        messages: [
          { role: "user", content: "监控地址 0x123...xyz 的安全状态" },
          { role: "assistant", content: "好的，我会持续监控该地址的链上风险。\n当出现异常或需要你处理时，我会第一时间提醒你。" },
          { role: "assistant", content: "⚠️ 检测到风险\nWBTC / USDC 仓位健康度已低于 1.05\n该仓位接近清算阈值", type: "alert" },
          { role: "assistant", content: "建议操作：", actions: ["补充抵押资产", "偿还部分借款", "👉 立即前往处理"] },
        ],
      },
      {
        id: "social",
        label: "X 监控",
        messages: [
          { role: "user", content: "帮我监控这个 X 账户：@example_xyz" },
          { role: "assistant", content: "已开始监控该账户。\n我会在出现重要动态时为你总结并提醒。" },
          { role: "assistant", content: "📢 新动态提醒\n该账户刚发布了一条新推文，内容涉及：", type: "info" },
          { role: "assistant", content: "新 DeFi 项目合作\n流动性计划调整\n预计发布时间为下周" },
          { role: "assistant", content: "需要我帮你进一步分析吗？" },
        ],
      },
      {
        id: "yield",
        label: "机会发现",
        messages: [
          { role: "user", content: "帮我找一些稳健的高收益理财机会" },
          { role: "assistant", content: "明白，我会基于当前链上数据为你筛选可行的收益方案。" },
          { role: "assistant", content: "💡 发现潜在收益机会\n协议：Aave\n资产：USDC\n当前年化收益约 6.8%\n风险等级：中低", type: "success" },
          { role: "assistant", content: "是否需要我持续跟踪，或在条件变化时提醒你？" },
        ],
      },
    ],
  },
} as const;
