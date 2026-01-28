export const content = {
  lang: "zh",
  nav: {
    why: "为什么 OwliaBot",
    architecture: "架构总览",
    skills: "Skills 系统",
    security: "安全账户",
    waitlist: "共建 OwliaBot",
  },
  hero: {
    title: "一个永远不会越过签名边界的加密自治 AI Agent。",
    subtitle:
      "OwliaBot 是一个自托管的加密原生 AI Agent，面向链上操作，\n依赖极简、Skills 可扩展、本地优先安全。",
    badge: "三层签名模型",
    status: "已完成设计与文档，正在实现。",
    emphasis: "安全、隐私、可控，皆为设计的一部分。",
    ctaPrimary: "加入候补名单",
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
        title: "安全账户",
        body:
          "将用户意图、自动执行与链上权限分为三个独立签名层级。每一层都有明确用途、范围与失败边界。",
        mechanism: "每一层只拥有完成自身职责所需的最小权限。",
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
    subtitle: "组合式扩展",
    body:
      "Skills 是工作区中的 JavaScript 模块，定义工具、参数与安全等级，无需修改核心代码。",
    cards: [
      {
        title: "JS 模块格式",
        body: "每个 Skill 是一个目录，包含 package.json 与 index.js。",
        meta: "支持热重载",
      },
      {
        title: "安全等级",
        body: "每个工具声明 read / write / sign 的安全级别。",
        meta: "权限显式",
      },
      {
        title: "内置 Skills",
        body: "crypto-price（CoinGecko）与 crypto-balance（Alchemy）。",
        meta: "查询余额需 ALCHEMY_API_KEY",
      },
    ],
    footer: "无需扩大核心体积即可安装或自建 Skills。",
  },
  security: {
    eyebrow: "安全账户",
    title: "三层签名模型",
    subtitle: "自治不等于盲目信任。",
    description:
      "OwliaBot 将用户意图、自动执行与链上权限分为三个独立签名层级。每一层都有明确用途、范围与失败边界。",
    status: "规划中：已完成设计，正在实现。",
    tiers: [
      {
        title: "第一层：伴侣 App",
        body: "任何高价值或敏感操作都需用户确认签名，明确表达意图。",
        keyword: "显式同意",
      },
      {
        title: "第二层：会话密钥",
        body: "用于低风险自动化的短时密钥，权限严格受限并自动轮换。",
        keyword: "受限执行",
      },
      {
        title: "第三层：智能钱包",
        body: "链上策略约束高级操作。可做什么由钱包定义，而不是 AI Agent。",
        keyword: "强制授权",
      },
    ],
    footer: "AI Agent 永远不会获得超过你明确授权的权力。",
    local: {
      title: "私钥始终由你掌控",
      body: "大多数 AI Agent 需要私钥托管，OwliaBot 不需要。",
      bullets: [
        "私钥只属于你，无需托管给 Agent",
        "低风险自动化，仅本地执行并严格受限",
        "链上高级策略，完全受合约限制",
      ],
    },
  },
  waitlist: {
    eyebrow: "你不是用户，是共建者",
    title: "你希望 OwliaBot 帮你做什么？",
    body: "描述你最希望 OwliaBot 实现的功能，我们会优先实现。",
    privacy: "我们永远不会索要你的私钥，无需连接钱包。",
    note: "",
  },
  footer: {
    note: "私钥永不离开你的设备。没有例外。",
  },
  links: {
    github: "https://github.com/owliabot/owliabot",
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
