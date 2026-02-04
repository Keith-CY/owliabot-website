# 加密钱包 (Crypto Wallet) 翻译一致性检查

**检查时间**: 2026-02-04 19:27  
**检查范围**: 所有 i18n 文件中的 "钱包" / "wallet" 相关术语

---

## 🔍 发现的不一致问题

### 1. ❌ 中文 `security.tiers[0].title` - 未翻译

**当前**:
```typescript
{
  title: "Crypto Wallet",  // ❌ 英文未翻译
  body: "通过 Vault 发起转账、查余额等链上操作，全程不接触原始密钥。",
  keyword: "链上操作",
}
```

**应该**:
```typescript
{
  title: "加密钱包",  // ✅ 统一为中文
  body: "通过 Vault 发起转账、查余额等链上操作，全程不接触原始密钥。",
  keyword: "链上操作",
}
```

**优先级**: 🔴 高（完全未翻译）

---

### 2. ⚠️ 中文 `why.items[0].body` - 术语不一致

**当前**:
```typescript
{
  title: "内置加密钱包",  // ✅ 使用"加密钱包"
  body: "自带安全钱包，开箱即用。...",  // ⚠️ 只用"钱包"
}
```

**建议** (统一术语):
```typescript
{
  title: "内置加密钱包",
  body: "内置安全的加密钱包，开箱即用。...",  // ✅ 统一为"加密钱包"
}
```

**优先级**: 🟡 中（术语不统一，但语义清晰）

---

### 3. ⚠️ 英文 `why.items[0].body` - 可选优化

**当前**:
```typescript
{
  title: "Built-in Crypto Wallet",  // ✅ 使用"Crypto Wallet"
  body: "Secure wallet built-in and ready to use. ...",  // ⚠️ 只用"wallet"
}
```

**建议** (可选，保持一致):
```typescript
{
  title: "Built-in Crypto Wallet",
  body: "Secure crypto wallet built-in and ready to use. ...",  // ✅ 统一
}
```

**优先级**: 🟢 低（英文中在相同上下文中省略 "crypto" 是可接受的）

---

## ✅ 已正确使用的地方

### 中文 (zh.ts)
- `why.items[0].title`: "内置加密钱包" ✅
- `architecture.diagram.vault`: ["加密钱包", "API Key"] ✅
- `skills.cards[0].body`: "连接多个钱包地址" ✅ (专有名词)
- `building.privacy`: "无需连接钱包" ✅ (泛指钱包连接)

### 英文 (en.ts)
- `why.items[0].title`: "Built-in Crypto Wallet" ✅
- `architecture.diagram.vault`: ["Crypto Wallet", "API Key"] ✅
- `security.tiers[0].title`: "Crypto Wallet" ✅
- `skills.cards[0].body`: "wallet addresses" ✅ (专有名词)
- `building.privacy`: "No wallet connection" ✅ (泛指)

### Skills Hub 文件
- 所有 "钱包地址" / "wallet addresses" 使用正确 ✅
- 所有泛指"钱包"的地方使用正确 ✅

---

## 📋 统一标准建议

### 术语使用原则

1. **产品特性名称** → 使用完整术语
   - 中文: "加密钱包" / "内置加密钱包"
   - 英文: "Crypto Wallet" / "Built-in Crypto Wallet"

2. **专有名词** → 简化表达
   - 中文: "钱包地址"（不说"加密钱包地址"）
   - 英文: "wallet address"（不说"crypto wallet address"）

3. **泛指操作** → 使用通用词
   - 中文: "连接钱包"、"无需连接钱包"
   - 英文: "wallet connection"、"No wallet connection"

4. **同一段落内** → 首次完整，后续可简化
   - ✅ "内置加密钱包...这个钱包..."
   - ✅ "Built-in Crypto Wallet...the wallet..."

---

## 🛠️ 修复优先级

### 必须修复 (P0)
1. ❌ `zh.ts` → `security.tiers[0].title`: "Crypto Wallet" → "加密钱包"

### 建议修复 (P1)
2. ⚠️ `zh.ts` → `why.items[0].body`: "自带安全钱包" → "内置安全的加密钱包"
3. ⚠️ `en.ts` → `why.items[0].body`: "Secure wallet" → "Secure crypto wallet"

---

## 📝 全局术语一致性检查结果

| 位置 | 中文 | 英文 | 状态 |
|------|------|------|------|
| why.items[0].title | 内置加密钱包 | Built-in Crypto Wallet | ✅ |
| why.items[0].body | 自带安全钱包 | Secure wallet | ⚠️ 不一致 |
| architecture.diagram.vault | 加密钱包 | Crypto Wallet | ✅ |
| security.tiers[0].title | Crypto Wallet | Crypto Wallet | ❌ 中文未翻译 |
| skills.cards[0] | 钱包地址 | wallet addresses | ✅ |
| building.privacy | 钱包 | wallet | ✅ |

---

## 总结

- **检查项**: 6个主要位置
- **必须修复**: 1处 (security.tiers 未翻译)
- **建议优化**: 2处 (why.items 术语统一)
- **已正确**: 3处

所有 skills-hub 文件使用正确 ✅
