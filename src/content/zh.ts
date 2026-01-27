export const content = {
  lang: "zh",
  nav: {
    why: "为什么",
    signing: "签名模型",
    execution: "执行流程",
    local: "本地优先",
    waitlist: "候补名单",
  },
  hero: {
    title: "一个永远不会越过签名边界的加密自治代理。",
    subtitle:
      "OwliaBot 是一个加密原生的自治代理，面向链上操作。\n采用明确权限、分层签名与本地优先的安全设计。",
    emphasis: "安全、隐私、可控，皆为设计的一部分。",
    ctaPrimary: "加入候补名单",
    ctaSecondary: "阅读架构说明",
  },
  why: {
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
        title: "自治",
        body:
          "OwliaBot 在清晰边界内自动执行任务。每一次动作都来自明确意图与受限权限。",
        mechanism: "自治不等于隐式授权。",
      },
      {
        title: "安全",
        body:
          "分层签名模型将意图、执行与权限分离。高风险操作需用户确认，低风险自动化仍可审计且受限。",
        mechanism: "无盲签。无隐藏权限升级。",
      },
      {
        title: "隐私",
        body:
          "本地优先。私钥永不离开设备，不存在托管密钥或中心化签名服务。",
        mechanism: "你拥有密钥，也定义信任。",
      },
    ],
  },
  signing: {
    title: "三层签名模型",
    subtitle: "自治不等于盲目信任。",
    description:
      "OwliaBot 将用户意图、自动执行与链上权限分为三个独立签名层级。每一层都有明确用途、范围与失败边界。",
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
    title: "执行流程",
    steps: ["意图", "授权", "执行", "审计"],
    caption: "每一次动作都有明确的签名路径。",
  },
  local: {
    title: "本地优先的设计",
    body: "大多数代理需要密钥托管，OwliaBot 不需要。",
    bullets: [
      "密钥只存在于你的设备",
      "敏感操作在本地执行",
      "远程执行可选且显式授权",
    ],
  },
  devices: {
    title: "随时随地",
    body:
      "无论桌面、移动端还是 Web，都能在不改变信任假设的前提下安全使用。",
  },
  waitlist: {
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
