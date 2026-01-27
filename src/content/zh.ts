export const content = {
  lang: "zh",
  nav: {
    why: "为什么",
    architecture: "架构",
    skills: "技能系统",
    signing: "签名模型",
    execution: "执行流程",
    local: "本地优先",
    waitlist: "候补名单",
  },
  hero: {
    title: "一个永远不会越过签名边界的加密自治代理。",
    subtitle:
      "OwliaBot 是一个自托管的加密原生代理，面向链上操作，\n依赖极简、Skills 可扩展、本地优先安全。",
    badge: "三层签名模型",
    status: "已完成设计与文档，正在实现。",
    emphasis: "安全、隐私、可控，皆为设计的一部分。",
    ctaPrimary: "加入候补名单",
    ctaSecondary: "阅读架构说明",
  },
  why: {
    eyebrow: "原则",
    title: "为什么选择 OwliaBot",
    subtitle: "只有边界清晰的自治才有意义——否则只是盲目执行。",
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
          "完全运行在你自己的机器或服务器上。无托管代理、无远程密钥、无隐藏依赖。",
        mechanism: "本地优先，远程可选。",
      },
      {
        title: "最小攻击面",
        body:
          "更少依赖、更少通道、更少攻击路径。仅支持 Telegram 与 Discord，核心保持极简。",
        mechanism: "依赖 <30，无原生模块，无浏览器自动化。",
      },
      {
        title: "可扩展",
        body:
          "能力通过 Skills 扩展：工作区里的 JavaScript 模块，热重载，不改核心。",
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
  signing: {
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
        body: "链上策略约束高级操作。可做什么由钱包定义，而不是代理。",
        keyword: "强制授权",
      },
    ],
    footer: "代理永远不会获得超过你明确授权的权力。",
  },
  execution: {
    eyebrow: "执行",
    title: "执行流程",
    steps: ["意图", "授权", "执行", "审计"],
    caption: "每一次动作都有明确的签名路径。",
    note: "当前版本聚焦不涉及签名的操作。",
  },
  local: {
    eyebrow: "本地优先",
    title: "本地优先的设计",
    body: "大多数代理需要密钥托管，OwliaBot 不需要。",
    bullets: [
      "密钥只存在于你的设备",
      "敏感操作在本地执行",
      "远程执行可选且显式授权",
    ],
  },
  devices: {
    eyebrow: "通道",
    title: "随时随地",
    body:
      "无论桌面、移动端还是 Web，都能安全使用——Telegram 与 Discord 先行，更多通道规划中。",
  },
  waitlist: {
    eyebrow: "早期体验",
    title: "加入候补名单",
    body: "第一时间获取早期体验与内测更新。",
    privacy: "我们永远不会索要你的私钥。",
    note: "无需连接钱包。",
  },
  footer: {
    note: "私钥永不离开你的设备。没有例外。",
  },
  links: {
    github: "https://github.com/owliabot/owliabot",
  },
} as const;
