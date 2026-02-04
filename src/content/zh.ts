export const content = {
  lang: "zh",
  nav: {
    why: "为什么 OwliaBot",
    architecture: "架构总览",
    skills: "Skills 系统",
    security: "Owlia Vault",
    building: "共建 OwliaBot",
  },
  hero: {
    title: "一个永远不会越过签名边界的加密自治 AI Agent。",
    subtitle:
      "OwliaBot 是一个自托管的加密原生 AI Agent，面向链上操作，\n依赖极简、Skills 可扩展、本地优先安全。",
    badge: "Owlia Vault",
    status: "已完成设计与文档，正在实现。",
    emphasis: "安全、隐私、可控，皆为设计的一部分。",
    ctaPrimary: "共建 OwliaBot",
    ctaSecondary: "阅读架构说明",
  },
  why: {
    eyebrow: "原则",
    title: "为什么选择 OwliaBot",
    subtitle: "只有边界清晰的自治才有意义。否则，只是盲目执行。",
    items: [
      {
        title: "加密原生",
        body:
          "为链上工作流、钱包与 DeFi 操作而生。OwliaBot 将交易、签名与执行上下文视为一等原语。",
        mechanism: "不对密钥做抽象，不做链下影子执行。",
      },
      {
        title: "自托管",
        body:
          "完全运行在你自己的机器或服务器上。无托管 AI Agent 无远程密钥 无隐藏依赖。",
        mechanism: "本地优先，远程可选。",
      },
      {
        title: "Owlia Vault",
        body:
          "所有敏感凭证存储在隔离的系统进程中，Agent 无法直接读取。私钥、API Key 等信息通过受控接口安全调用。",
        mechanism: "Agent 能用，但看不到原始凭证。",
      },
      {
        title: "可扩展",
        body:
          "能力通过 Skills 扩展。部分 Skills 专为加密与链上场景设计，适配交易、资产、合约与链上数据。",
        mechanism: "Skills 定义工具、权限与安全等级。",
      },
    ],
  },
  architecture: {
    title: "架构总览",
    subtitle: "保持极简",
    body:
      "OwliaBot 核心保持极简与本地优先，再通过 Skills 向外扩展。通道可以扩展，但核心保持可审计。",
    flowLabel: "核心流程",
    flow: ["Gateway", "Telegram / Discord", "Agent Runtime", "Skills", "Signer"],
    bullets: [
      "Telegram 与 Discord 是首要入口。",
      "运行时构建上下文、调用工具并返回结果。",
      "签名能力与 Bot 进程隔离。",
    ],
    note: "更多通道规划中，但核心表面积保持最小。",
  },
  skills: {
    title: "Skills 系统",
    subtitle: "OwliaBot 能为你做什么？",
    body:
      "OwliaBot 通过 Skills 扩展能力 — 模块化插件覆盖真实的加密场景。从资产总览到自动化 DeFi 策略，每个 Skill 都面向实际使用而设计。",
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
          "从 MACD 信号到 Delta 对冲杠杆 — 定义你的策略、回测验证、让 OwliaBot 带着风控和审计记录自动执行交易。",
        meta: "信号 → 执行 → 报告",
      },
    ],
    footer: "社区 Skills 持续增长中。安装所需的，或构建你自己的。",
    exploreMore: "探索全部 Skills",
  },
  security: {
    eyebrow: "安全架构",
    title: "Owlia Vault",
    subtitle: "敏感凭证与 Agent 完全隔离。",
    description:
      "Owlia Vault 将私钥、API Key 等敏感信息存储在独立的系统进程中，Agent 无法直接读取。所有操作通过受控的本地接口完成。",
    status: "持续加固中...",
    tiers: [
      {
        title: "Crypto Wallet",
        body: "加密私钥存储在隔离环境中，Agent 通过 Vault 发起转账、查询余额等链上操作，全程不接触原始密钥。",
        keyword: "链上操作",
      },
      {
        title: "API Key 保险箱",
        body: "将交易所、平台的 API Key 存入 Vault，Agent 通过受控接口调用，无法导出或直接读取原始凭证。",
        keyword: "平台接入",
      },
    ],
    footer: "",
    local: {
      title: "Agent 能用，但看不到",
      body: "你的凭证始终在你掌控之中。Owlia Vault 确保 AI 永远不会直接接触你的敏感信息。",
      bullets: [
        "私钥与 API Key 加密存储在隔离进程中",
        "Agent 只能通过受控接口发起操作",
        "即使 Agent 被攻破，凭证依然安全",
      ],
    },
  },
  building: {
    eyebrow: "你不是用户，是共建者",
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
