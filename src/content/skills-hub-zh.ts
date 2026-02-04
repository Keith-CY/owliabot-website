export const skillsHub = {
  lang: "zh",
  title: "Skills Hub",
  subtitle: "探索 OwliaBot 的全部能力",
  description:
    "每个 Skill 都是 OwliaBot 可以为你运行的模块化能力。浏览真实场景 — 从资产总览到自动化 DeFi 策略。",
  backLabel: "← 返回首页",
  categories: {
    monitoring: "监控与洞察",
    defi: "DeFi 策略",
    trading: "交易与执行",
  },
  skills: [
    {
      id: "001",
      title: "资产总览",
      category: "monitoring",
      tagline: "所有资产，一目了然",
      description:
        "连接多条链上的钱包地址和交易所只读 API，OwliaBot 自动汇总你的持仓，按需或定时给你统一的资产视图。",
      scenario:
        "\"看看我的资产\" → OwliaBot 返回所有钱包和交易所的仓位明细，附带总资产和配置比例。",
    },
    {
      id: "002",
      title: "趋势发射",
      category: "trading",
      tagline: "发现热点，一键发币",
      description:
        "OwliaBot 监控 X/Twitter 的热门叙事，帮你在 Solana 上通过 trends.fun 一键发币 — 从生成素材到链上部署，全程对话完成。",
      scenario:
        "\"今天有什么热点？\" → OwliaBot 展示过滤后的趋势 → \"发第2个，代号 XYZ，初始买入 0.5 SOL\" → 代币部署 + 初始买入完成。",
    },
    {
      id: "003",
      title: "对冲套利工具",
      category: "trading",
      tagline: "半自动化 Delta 中性套利",
      description:
        "在 CEX 和 DEX 之间运行对冲套利策略。OwliaBot 监控价差和资金费率机会，在你设定的参数内自动下双边对冲单，实时追踪收益。",
      scenario:
        "设定价差阈值和仓位上限 → OwliaBot 发现 ETH 0.3% 资金费套利 → 开现货多 + 永续空 → 监控并在达标时平仓。",
    },
    {
      id: "004",
      title: "Euler Delta 对冲",
      category: "defi",
      tagline: "杠杆收益 + 自动对冲",
      description:
        "在 Euler (Base) 上运行 weETH 杠杆收益策略，同时通过 Binance ETH 永续空单保持 Delta 中性。根据收益、资金费和风险约束自动调整杠杆和对冲比例。",
      scenario:
        "\"启动 Euler Delta 对冲策略，最高3倍杠杆\" → OwliaBot 开仓、监控健康度、每日再平衡对冲、资金费超过收益时自动停止。",
    },
    {
      id: "005",
      title: "健康度守护",
      category: "defi",
      tagline: "再也不用担心清算",
      description:
        "持续监控你在 Aave、Compound 等协议的借贷仓位。当健康度接近危险区间时，OwliaBot 自动还款或补充抵押，帮你守住仓位。",
      scenario:
        "健康度降至 1.15 → OwliaBot 预警 → 到达 1.08 时自动偿还 20% 债务 → 发送确认及最新健康度。",
    },
    {
      id: "006",
      title: "利率搬家",
      category: "defi",
      tagline: "永远拿到最优借贷利率",
      description:
        "OwliaBot 监控多个借贷平台的存借利率。发现更优利率时，自动迁移你的仓位 — 综合考虑 gas 成本、滑点和激励。",
      scenario:
        "你在 Aave 的 USDC 借款利率升至 5.2% → Compound 只要 3.8% → OwliaBot 计算扣除 gas 后的净收益 → 一笔交易完成迁移。",
    },
    {
      id: "007",
      title: "借币生息",
      category: "defi",
      tagline: "让闲置抵押品产生收益",
      description:
        "用稳定币作抵押，借出目标资产投入跨协议收益场景。OwliaBot 管理整个循环 — 当套利空间消失时自动退出。",
      scenario:
        "存入 USDC → 以 2.1% 借出 ETH → 质押到 Lido 获 3.4% → 净收益 +1.3% → OwliaBot 监控，利差翻转时自动平仓。",
    },
    {
      id: "008",
      title: "Uniswap V3 LP 管理",
      category: "defi",
      tagline: "自动化集中流动性管理",
      description:
        "OwliaBot 管理你的 Uniswap V3 LP 仓位：监控价格区间、收取手续费、复投收益、价格偏离时自动再平衡。可选 Delta 对冲降低方向性风险。",
      scenario:
        "\"管理我的 ETH/USDC LP，±5% 区间\" → OwliaBot 每12小时收取手续费并复投 → 价格偏离区间 → 撤出、设新区间、通知你。",
    },
    {
      id: "009",
      title: "执行引擎",
      category: "trading",
      tagline: "从信号到交易，全自动",
      description:
        "通用的策略执行层。接收信号、校验参数、执行风控、拆单下单、监控成交、完整审计记录 — 适配任意交易策略。",
      scenario:
        "策略产出 BUY 信号 → 执行引擎检查风控限制 → 拆为3笔订单 → 监控成交 → 全程记录 → 返回执行摘要。",
    },
    {
      id: "010",
      title: "MACD 策略",
      category: "trading",
      tagline: "经典信号 + 专业回测",
      description:
        "标准化 MACD 交易策略，生成可执行信号并输出专业回测报告。接入执行引擎即可实现全自动交易。",
      scenario:
        "\"回测 ETH/USDT 4小时 MACD\" → OwliaBot 运行回测 → 展示夏普比率、胜率、最大回撤 → \"不错，上线\" → 按你的风控设置自动交易。",
    },
  ],
} as const;
