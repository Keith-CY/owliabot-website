# Crypto 术语全局统一方案

**问题**: 中文文件中 "加密" 和 "Crypto" 混用，需要统一标准

**统一原则**: 
- 凡是指 Cryptocurrency/Crypto 行业、资产、场景时，统一使用 **Crypto**
- 只有指加密技术（encryption）时，才使用 "加密"

---

## 📊 当前使用情况分析

### src/content/zh.ts - 需要修改的地方

| 行号 | 位置 | 当前 | 建议 | 理由 |
|------|------|------|------|------|
| 8 | hero.title | Crypto 用户 | ✅ 保持 | 已正确使用 Crypto |
| 10 | hero.subtitle | **加密原生** | **Crypto 原生** | 指 crypto-native，应用 Crypto |
| 25 | why.items[0].title | **内置加密钱包** | **内置 Crypto 钱包** | 指加密货币钱包 |
| 27 | why.items[0].body | **内置安全的加密钱包** | **内置安全的 Crypto 钱包** | 同上 |
| 68 | architecture.diagram.vault[0] | **加密钱包** | **Crypto 钱包** | 同上 |
| 76 | skills.body | 真实 Crypto 场景 | ✅ 保持 | 已正确使用 Crypto |
| 109 | security.tiers[0].title | **加密钱包** | **Crypto 钱包** | 同上 |
| 124 | security.local.bullets[0] | 隔离进程加密存储 | ✅ 保持 | 这里指 encryption，不改 |
| 173 | personas[0].title | Crypto 个人用户 | ✅ 保持 | 已正确使用 Crypto |
| 175 | personas[0].body | **个人加密助手** | **个人 Crypto 助手** | 指 crypto assistant |

**需要修改**: 7处  
**已正确**: 3处  
**不需要改**: 1处（encryption）

---

## ✏️ 具体修改建议

### 1. hero.subtitle (行10)
```typescript
// 修改前
subtitle: "一键部署加密原生 AI Agent，Skills 自由扩展，资产完全由你掌控。",

// 修改后
subtitle: "一键部署 Crypto 原生 AI Agent，Skills 自由扩展，资产完全由你掌控。",
```

### 2. why.items[0].title (行25)
```typescript
// 修改前
title: "内置加密钱包",

// 修改后
title: "内置 Crypto 钱包",
```

### 3. why.items[0].body (行27)
```typescript
// 修改前
body: "内置安全的加密钱包，开箱即用。支持转账、签名、余额查询等链上操作，私钥始终由你掌控。",

// 修改后
body: "内置安全的 Crypto 钱包，开箱即用。支持转账、签名、余额查询等链上操作，私钥始终由你掌控。",
```

### 4. architecture.diagram.vault[0] (行68)
```typescript
// 修改前
vault: ["加密钱包", "API Key"],

// 修改后
vault: ["Crypto 钱包", "API Key"],
```

### 5. security.tiers[0].title (行109)
```typescript
// 修改前
title: "加密钱包",

// 修改后
title: "Crypto 钱包",
```

### 6. personas[0].body (行175)
```typescript
// 修改前
body: "管理多链资产、实时监控 DeFi 仓位健康度、自动化执行链上策略。OwliaBot 是你的个人加密助手，帮你把握市场机会、规避风险。",

// 修改后
body: "管理多链资产、实时监控 DeFi 仓位健康度、自动化执行链上策略。OwliaBot 是你的个人 Crypto 助手，帮你把握市场机会、规避风险。",
```

---

## 🔍 不需要修改的地方

### security.local.bullets[0] (行124)
```typescript
// 保持不变 ✅
"隔离进程加密存储"  // 这里的"加密"指 encryption（加密技术），不是 Crypto
```

---

## 📋 统一后的术语表

| 中文术语 | 英文术语 | 使用场景 |
|---------|---------|---------|
| Crypto 用户 | Crypto users | 指加密货币用户 |
| Crypto 原生 | crypto-native | 指专为加密货币设计 |
| Crypto 钱包 | Crypto Wallet | 指加密货币钱包 |
| Crypto 场景 | crypto scenarios | 指加密货币应用场景 |
| Crypto 助手 | Crypto assistant | 指加密货币领域助手 |
| 加密存储 | encrypted storage | 指加密技术，保持使用"加密" |

---

## 🎯 统一的好处

1. **术语一致性**: 全站统一使用 Crypto，避免混淆
2. **专业度提升**: Crypto 是行业标准术语，更专业
3. **国际化友好**: Crypto 是国际通用词，便于理解
4. **区分明确**: 与加密技术（encryption）区分开

---

## ⚠️ 注意事项

- "加密" 只在指代加密技术（encryption、encrypted）时使用
- "Crypto" 所有指代加密货币、区块链相关场景时使用
- 保持 Crypto 首字母大写

---

## 📝 执行建议

修改顺序：
1. 先修改主页（zh.ts）的 7 处
2. 确认无遗漏
3. 提交一次性修改，commit message: `refine(i18n): unify crypto terminology across zh content`
