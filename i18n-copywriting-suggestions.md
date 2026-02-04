# OwliaBot Website i18n 文案优化建议

**审查时间**: 2026-02-04  
**审查者**: 小水 🦦  
**审查标准**: 专业性、地道性、流畅性、术语准确性、营销吸引力

---

## 🎯 整体评价

文案整体质量良好，技术术语使用准确，中英文表达基本专业。以下是具体的优化建议。

---

## 📝 建议改进清单

### 文件: src/content/zh.ts

#### 1. hero.subtitle
- **当前**: "一键部署你的加密原生 AI Agent，Skills 自由扩展，资产始终由你掌握。"
- **建议**: "一键部署加密原生 AI Agent，Skills 自由扩展，资产完全由你掌控。"
- **理由**: 
  - "你的" 略显冗余，去掉更简洁有力
  - "始终由你掌握" → "完全由你掌控" 更强调控制权，"掌控" 比 "掌握" 更符合资产安全的语境

#### 2. why.subtitle
- **当前**: "更简洁、更清晰的安全边界。"
- **建议**: "简洁清晰的安全边界。"
- **理由**: "更" 字暗示与其他产品比较，但此处应该是陈述自身特点，去掉更直接

#### 3. why.items[1].body
- **当前**: "社区共建插件生态，覆盖大部分链上链下场景。按需安装，即插即用。"
- **建议**: "社区共建插件生态，覆盖链上链下主流场景。按需安装，即插即用。"
- **理由**: "大部分" 语气不够自信，"主流场景" 更专业且有说服力

#### 4. architecture.body
- **当前**: "消息从你出发，经 OwliaBot 路由到 Skills 执行，密钥始终隔离在 Vault 中。"
- **建议**: "消息从你出发，经 OwliaBot 路由至 Skills 执行，密钥始终隔离在 Vault。"
- **理由**: 
  - "到" → "至" 更书面、专业
  - "Vault 中" → "Vault" 即可，Vault 本身就是容器概念

#### 5. skills.body
- **当前**: "模块化插件，覆盖真实加密场景。"
- **建议**: "模块化插件，覆盖真实 Crypto 场景。"
- **理由**: 保持与其他地方术语统一，"Crypto" 更专业且国际化

#### 6. security.local.title
- **当前**: "即使 Agent 被攻破，凭证依然安全"
- **建议**: "即使 Agent 被攻破，凭证仍然安全"
- **理由**: "依然" → "仍然" 更正式、专业

#### 7. building.body
- **当前**: "描述你最希望 OwliaBot 实现的功能，我们会优先实现。"
- **建议**: "告诉我们你最希望 OwliaBot 实现的功能，我们将优先开发。"
- **理由**: 
  - "描述" → "告诉我们" 更口语化、亲切
  - "会优先实现" → "将优先开发" 更有承诺感和行动力

---

### 文件: src/content/en.ts

#### 1. hero.subtitle
- **当前**: "One-click deployment of your crypto-native AI Agent. Skills freely extensible, assets always under your control."
- **建议**: "Deploy your crypto-native AI Agent with one click. Skills freely extensible. Assets always under your control."
- **理由**: 
  - 将长句拆分，节奏更清晰
  - "Deploy...with one click" 动词开头更有行动号召力

#### 2. why.items[0].body
- **当前**: "Secure crypto wallet built-in and ready to use. Supports transfers, signing, balance queries, and other on-chain operations. Your private keys always stay under your control."
- **建议**: "Secure crypto wallet built-in and ready to use right away. Supports transfers, signing, balance queries, and other on-chain operations. Your private keys never leave your control."
- **理由**:
  - "ready to use" → "ready to use right away" 增强即时性
  - "stay under your control" → "never leave your control" 更强调安全性

#### 3. why.items[3].mechanism
- **当前**: "Anytime, anywhere, at your fingertips."
- **建议**: "Anytime, anywhere, always ready."
- **理由**: "at your fingertips" 是俗语，"always ready" 更直接、专业

#### 4. architecture.body
- **当前**: "Messages flow from you, through OwliaBot to Skills. Keys stay isolated in the Vault."
- **建议**: "Messages flow from you through OwliaBot to Skills. Keys remain isolated in the Vault."
- **理由**:
  - 去掉多余逗号，流畅度更好
  - "stay" → "remain" 更正式

#### 5. skills.body
- **当前**: "Modular plugins covering real crypto scenarios."
- **建议**: "Modular plugins for real-world crypto scenarios."
- **理由**: "covering" → "for" 更简洁，"real-world" 比 "real" 更地道

#### 6. security.local.title
- **当前**: "Even if the Agent is compromised, your credentials remain safe"
- **建议**: "Even if the Agent is compromised, your credentials stay safe"
- **理由**: "remain" 和 "stay" 都可以，但 "stay" 更简洁，且与中文 "仍然" 对应

---

### 文件: src/content/skills-hub-zh.ts

#### 1. skills[0].description
- **当前**: "连接多条链上的钱包地址和交易所只读 API，OwliaBot 自动汇总你的持仓，按需或定时给你统一的资产视图。"
- **建议**: "连接多链钱包地址和交易所只读 API，OwliaBot 自动汇总你的持仓，按需或定时提供统一的资产视图。"
- **理由**: 
  - "多条链上的" → "多链" 更简洁专业
  - "给你" → "提供" 更正式

#### 2. skills[1].tagline
- **当前**: "发现热点，一键发币"
- **建议**: "捕捉热点，一键发币"
- **理由**: "捕捉" 比 "发现" 更有主动性和行动感

#### 3. skills[3].description
- **当前**: "在 Euler (Base) 上运行 weETH 杠杆收益策略，同时通过 Binance ETH 永续空单保持 Delta 中性。根据收益、资金费和风险约束自动调整杠杆和对冲比例。"
- **建议**: "在 Euler (Base) 上运行 weETH 杠杆收益策略，同时通过 Binance ETH 永续空单保持 Delta 中性。根据收益、资金费率和风险约束自动调整杠杆和对冲比例。"
- **理由**: "资金费" → "资金费率" 术语更完整准确

#### 4. skills[5].title
- **当前**: "利率搬家"
- **建议**: "利率迁移"
- **理由**: "搬家" 过于口语化，"迁移" 更专业

#### 5. skills[7].description
- **当前**: "OwliaBot 管理你的 Uniswap V3 LP 仓位：监控价格区间、收取手续费、复投收益、价格偏离时自动再平衡。可选 Delta 对冲降低方向性风险。"
- **建议**: "OwliaBot 管理你的 Uniswap V3 LP 仓位：监控价格区间、自动收取手续费、复投收益、价格偏离时再平衡。可选 Delta 对冲降低方向性风险。"
- **理由**: "收取手续费" → "自动收取手续费" 强调自动化优势

---

### 文件: src/content/skills-hub-en.ts

#### 1. skills[1].tagline
- **当前**: "Spot trends, launch tokens in one click"
- **建议**: "Catch trends, launch tokens instantly"
- **理由**: 
  - "Spot" → "Catch" 更有行动力
  - "in one click" → "instantly" 更强调速度

#### 2. skills[3].description
- **当前**: "Run a leveraged weETH yield strategy on Euler (Base) while OwliaBot maintains a delta-neutral position through Binance ETH perpetual shorts. Auto-adjusts leverage and hedge ratio based on yield, funding costs, and risk constraints."
- **建议**: "Run a leveraged weETH yield strategy on Euler (Base) while OwliaBot maintains a delta-neutral position through Binance ETH perpetual shorts. Automatically adjusts leverage and hedge ratio based on yield, funding rates, and risk constraints."
- **理由**: 
  - "Auto-adjusts" → "Automatically adjusts" 更正式
  - "funding costs" → "funding rates" 术语统一

#### 3. skills[5].title
- **当前**: "Refinance Router"
- **建议**: "Rate Migration"
- **理由**: 与中文 "利率迁移" 对应，"Refinance" 更多指房贷再融资，不够准确

#### 4. skills[7].description
- **当前**: "OwliaBot manages your Uniswap V3 LP positions: monitors price ranges, collects fees, compounds earnings, and rebalances when price moves out of range. Optional delta hedge to reduce directional risk."
- **建议**: "OwliaBot manages your Uniswap V3 LP positions: monitors price ranges, auto-collects fees, compounds earnings, and rebalances when price moves out of range. Optional delta hedge to reduce directional risk."
- **理由**: "collects fees" → "auto-collects fees" 强调自动化

---

## 📊 优化优先级

### 🔴 高优先级 (影响专业性和准确性)
1. zh skills[3].description - "资金费" → "资金费率"
2. zh skills[5].title - "利率搬家" → "利率迁移"
3. en skills[3].description - "funding costs" → "funding rates"
4. en skills[5].title - "Refinance Router" → "Rate Migration"

### 🟡 中优先级 (提升文案质量)
5. zh hero.subtitle - 简化和强化
6. zh building.body - 增强行动力
7. en hero.subtitle - 改善节奏
8. zh/en skills-hub 多处小优化

### 🟢 低优先级 (微调)
9. zh why.subtitle - 去掉 "更"
10. zh architecture.body - 用词优化
11. en security.local.title - 词汇选择

---

## ✨ 整体文案风格建议

### 中文
- ✅ 保持简洁有力，避免冗余词汇
- ✅ 专业术语统一（如 Crypto、Agent、Skills）
- ✅ 强调"控制权"和"安全"核心价值
- ⚠️ 部分口语化表达需要专业化（如"搬家"）

### 英文
- ✅ 动词开头增强行动号召力
- ✅ 短句优于长句，节奏更清晰
- ✅ 避免俗语，保持专业tone
- ⚠️ 部分术语需要统一（funding rates）

---

## 📝 后续建议

1. **创建术语表**: 统一所有关键术语的翻译和使用
2. **A/B 测试**: 对关键 CTA 文案进行测试
3. **定期review**: 随产品演进更新文案
4. **用户反馈**: 收集实际用户对文案的理解和反馈

---

**总评**: 文案质量整体优秀，建议优先修改术语准确性相关的4处，其他为锦上添花的优化 ✨
