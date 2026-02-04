# i18n 术语一致性全面检查

**检查时间**: 2026-02-04 19:30  
**检查范围**: 所有 i18n 文件的术语统一性

---

## 📊 核心术语对照表

| 中文术语 | 英文术语 | 使用位置 | 状态 |
|---------|---------|---------|------|
| 加密钱包 | Crypto Wallet | why.items, architecture.diagram, security.tiers | ✅ 已统一 |
| 钱包地址 | wallet address(es) | skills, skills-hub | ✅ 正确 |
| API Key | API Key | 各处 | ✅ 保留英文（技术术语） |
| Agent | Agent | 各处 | ✅ 保留英文（技术术语） |
| Skills | Skills | 各处 | ✅ 保留英文（产品术语） |
| Skill | Skill | 各处 | ✅ 保留英文（产品术语） |
| Owlia Vault | Owlia Vault | 各处 | ✅ 保留英文（产品名） |
| Vault | Vault | security 部分 | ✅ 保留英文 |
| OwliaBot | OwliaBot | 各处 | ✅ 产品名 |
| OpenClaw | OpenClaw | hero | ✅ 产品名 |
| Channels | Channels | architecture | ✅ 保留英文（技术术语） |
| Gateway | Gateway | architecture | ✅ 保留英文（技术术语） |

---

## ✅ 已修复的问题

### 1. 加密钱包术语统一
- ✅ `zh.ts` `security.tiers[0].title`: "Crypto Wallet" → "加密钱包"
- ✅ `zh.ts` `why.items[0].body`: "自带安全钱包" → "内置安全的加密钱包"
- ✅ `en.ts` `why.items[0].body`: "Secure wallet" → "Secure crypto wallet"

---

## 🔍 深度扫描结果

### 检查 1: 中文文件中的英文残留

运行命令查找中文字段中的长英文单词：
```bash
grep -E "title:|body:|subtitle:|description:|mechanism:|keyword:" src/content/zh.ts | grep -E "[A-Za-z]{4,}"
```

**发现的英文保留（均为合理的技术/产品术语）**:
- ✅ OwliaBot - 产品名
- ✅ Crypto - 行业通用词
- ✅ OpenClaw - 产品名
- ✅ Skills / Skill - 产品特定术语
- ✅ Owlia Vault - 产品功能名
- ✅ Agent - 技术术语
- ✅ API Key - 技术术语
- ✅ Channels, Gateway, Agent Runtime - 架构层名称

### 检查 2: 专有名词翻译一致性

#### "加密钱包" / "Crypto Wallet"
| 位置 | 中文 | 英文 | 状态 |
|------|------|------|------|
| why.items[0].title | 内置加密钱包 | Built-in Crypto Wallet | ✅ |
| why.items[0].body | 内置安全的加密钱包 | Secure crypto wallet | ✅ |
| architecture.diagram.vault[0] | 加密钱包 | Crypto Wallet | ✅ |
| security.tiers[0].title | 加密钱包 | Crypto Wallet | ✅ |

#### "API Key"
| 位置 | 中文 | 英文 | 状态 |
|------|------|------|------|
| architecture.diagram.vault[1] | API Key | API Key | ✅ |
| security.description | API Key | API keys | ✅ |
| security.tiers[1].title | API Key 保险箱 | API Key Safe | ✅ |

#### "Skills / Skill"
| 位置 | 中文 | 英文 | 状态 |
|------|------|------|------|
| nav.skillsHub | Skills Hub | Skills Hub | ✅ |
| why.items[1].title | 模块化 Skills | Modular Skills | ✅ |
| why.items[1].mechanism | 一个 Skill 解决一个场景 | One Skill solves one scenario | ✅ |
| architecture.flow[3] | Skills | Skills | ✅ |
| skills.title | Skills 系统 | Skills system | ✅ |

#### "Owlia Vault"
| 位置 | 中文 | 英文 | 状态 |
|------|------|------|------|
| why.items[2].title | Owlia Vault | Owlia Vault | ✅ |
| architecture.flow[4] | Owlia Vault | Owlia Vault | ✅ |
| security.title | Owlia Vault | Owlia Vault | ✅ |

### 检查 3: 关键短语的翻译对照

| 中文 | 英文 | 位置 | 状态 |
|------|------|------|------|
| 开箱即用 | ready to use | why.items[0] | ✅ |
| 链上操作 | on-chain operations | why.items[0], security | ✅ |
| 私钥始终由你掌控 | Your private keys always stay under your control | why.items[0] | ✅ |
| 你的密钥，你的控制 | Your keys, your control | why.items[0].mechanism | ✅ |
| 能用，但看不到 | Can use, but never see | why.items[2].mechanism | ✅ |
| 随时随地，触手可及 | Anytime, anywhere, at your fingertips | why.items[3].mechanism | ✅ |
| 隔离进程加密存储 | Encrypted in an isolated process | security.local.bullets | ✅ |
| 受控接口单向调用 | One-way controlled interface | security.local.bullets | ✅ |
| 攻破 Agent ≠ 泄露密钥 | Compromised Agent ≠ leaked keys | security.local.bullets | ✅ |

---

## 📋 术语使用原则总结

### ✅ 保留英文的场景
1. **产品名称**: OwliaBot, OpenClaw, Owlia Vault
2. **技术术语**: Agent, API Key, Skills/Skill, Vault
3. **架构层名**: Channels, Gateway, Agent Runtime
4. **行业通用词**: Crypto（在中文技术文档中常见）

### ✅ 需要翻译的场景
1. **产品功能描述**: 所有 body, description, subtitle 文本
2. **用户可见标题**: 除了包含产品名的 title
3. **操作说明**: 所有 prompts, input 相关文本

### ✅ 术语统一规则
1. 同一概念在同一上下文中保持术语一致
2. 首次出现使用完整术语，后续可简化
3. 专有名词（如"钱包地址"）不拆分翻译

---

## 🎯 最终检查结果

### 必须修复的问题: 0
✅ 所有必须修复的问题已解决

### 已优化的改进: 3
1. ✅ 中文 `security.tiers[0].title` 翻译为中文
2. ✅ 中文 `why.items[0].body` 术语统一
3. ✅ 英文 `why.items[0].body` 术语统一

### 术语使用一致性: ✅ 优秀
- 产品名称: 统一保留英文
- 技术术语: 合理保留英文
- 功能描述: 完整翻译
- 关键短语: 准确对应

---

## 📝 补充建议

### 未来维护建议
1. 创建术语表文档，明确哪些术语保留英文
2. 在添加新内容时参考现有术语对照
3. 定期运行 i18n 一致性检查

### 可选优化（非必须）
- 考虑是否将 "Skills" 翻译为"技能"（目前保留英文更专业）
- 考虑是否将 "Agent" 翻译为"代理"（目前保留英文更准确）

**结论**: 所有关键术语已统一，翻译质量良好，无重大问题 ✅
