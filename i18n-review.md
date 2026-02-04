# OwliaBot Website i18n 校验报告

**校验时间**: 2026-02-04  
**校验标准**: 以中文版本为准  
**检查范围**: `src/content/zh.ts` vs `src/content/en.ts`

---

## ❌ 发现的主要问题

### 1. **hero.title** - 内容完全不同

**中文 (标准)**:
```
🦉 OwliaBot，专为 Crypto 用户设计的 OpenClaw 🦞
```

**英文 (当前)**:
```
An autonomous crypto agent that never crosses your signing boundary.
```

**问题**: 英文完全没有反映中文的含义，缺少 OpenClaw 的概念和 emoji
**建议**: 
```
🦉 OwliaBot, an OpenClaw 🦞 designed for Crypto users
```

---

### 2. **hero.subtitle** - 内容不完全对应

**中文 (标准)**:
```
一键部署你的加密原生 AI Agent，链上操作、Skills 可扩展、资产安全由你掌控。
```

**英文 (当前)**:
```
A self-hosted, crypto-native AI agent — minimal dependencies, extensible skills, local-first.
```

**问题**: 
- 缺少"一键部署"概念
- 缺少"链上操作"
- 缺少"资产安全由你掌控"
- "minimal dependencies" 和 "local-first" 是新增内容，中文未提及

**建议**:
```
One-click deployment of your crypto-native AI Agent — on-chain operations, extensible Skills, asset security under your control.
```

---

### 3. **why.subtitle** - 表达意思不同

**中文 (标准)**:
```
更简洁、更清晰的安全边界。
```

**英文 (当前)**:
```
Autonomy works only with explicit boundaries.
```

**问题**: 英文强调"自主性需要明确边界"，而中文强调"简洁清晰的边界"，重点不同

**建议**:
```
Simpler, clearer security boundaries.
```

---

### 4. **why.items[]** - 结构和内容完全不同

#### 中文 (标准) 有4个特性:
1. **内置加密钱包** - 自带安全钱包，开箱即用...
2. **模块化 Skills** - 社区共建插件生态...
3. **Owlia Vault** - 私钥与敏感凭证存储在独立隔离进程中...
4. **一键部署** - 快速完成安装，支持服务器、本地以及移动端运行...

#### 英文 (当前) 也有4个特性，但完全不同:
1. **Crypto-native** - Natively understands on-chain transactions...
2. **Self-hosted** - Runs fully on your own machine...
3. **Owlia Vault** - Credentials stored in an isolated process...
4. **Extensible** - Capabilities grow through Skills...

**问题**: 
- 英文的 "Crypto-native" 和 "Self-hosted" 在中文版本中不存在
- 中文的 "内置加密钱包" 和 "一键部署" 在英文版本中不存在
- 只有 "Owlia Vault" 内容基本对应
- 顺序和重点完全不同

**建议**: 需要统一这两个版本的结构和内容，建议以中文为准重写英文版本

---

### 5. **architecture.diagram** - 缺少关键字段

**中文 (标准)** 包含完整的 diagram 对象:
```typescript
diagram: {
  user: "用户",
  bot: "OwliaBot",
  skillsLabel: "Skills",
  vaultLabel: "Owlia Vault",
  skills: [...],
  vault: [...]
}
```

**英文 (当前)** 同样包含 diagram，内容基本对应 ✅

---

### 6. **building.summary.back** - 翻译不够准确

**中文 (标准)**:
```
返回补充
```

**英文 (当前)**:
```
Back
```

**问题**: "返回补充" 的意思是"回去补充更多内容"，不只是简单的"返回"

**建议**:
```
Back to add more
```
或
```
Add more details
```

---

### 7. **hero_illustration.scenarios** - 内容基本对应 ✅

检查了三个场景 (security, social, yield)，英文翻译基本准确，无明显问题。

---

## ✅ 检查通过的部分

以下部分英文翻译准确，无问题:
- `nav.*` - 导航项
- `hero.badge`, `hero.status`, `hero.emphasis`, `hero.ctaPrimary`, `hero.ctaSecondary`
- `why.eyebrow`, `why.title` ✅
- `architecture.title`, `architecture.subtitle`, `architecture.body`, `architecture.flowLabel`, `architecture.flow[]`
- `architecture.layers[]` - 所有层级描述准确
- `skills.title`, `skills.subtitle`, `skills.body`, `skills.footer`, `skills.exploreMore`
- `skills.cards[]` - 三个卡片内容准确
- `security.*` - 安全相关内容全部准确
- `building.eyebrow`, `building.title`, `building.body`, `building.privacy`
- `building.prompts.*` - 所有提示语准确
- `building.input.*` - 输入提示准确
- `building.summary.*` - 除了 `back` 其他都准确
- `building.success.*` - 成功页面准确
- `footer.*` - 页脚准确
- `links.*` - 链接准确
- `hero_illustration.scenarios[]` - 场景对话准确

---

## 📋 优先修复建议

### 高优先级 (影响核心信息传达):
1. ❌ **hero.title** - 完全不同，需重写
2. ❌ **hero.subtitle** - 缺失关键信息
3. ❌ **why.items[]** - 结构完全不同，需统一

### 中优先级 (影响用户理解):
4. ⚠️ **why.subtitle** - 意思偏差
5. ⚠️ **building.summary.back** - 翻译不够准确

---

## 🔍 Skills Hub 检查结果

检查了 `src/content/skills-hub-zh.ts` 和 `src/content/skills-hub-en.ts`:

✅ **Skills Hub 翻译质量良好**，所有10个技能的翻译都准确对应，无明显问题。

---

## 📝 总结

- **检查文件**: 4个文件 (zh.ts, en.ts, skills-hub-zh.ts, skills-hub-en.ts)
- **发现问题**: 5处主要不一致
- **严重程度**: 3处高优先级，2处中优先级
- **整体评估**: Skills Hub 部分翻译质量好，主页面 (zh.ts/en.ts) 需要重点修复 `hero` 和 `why` 部分

---

## 🛠️ 建议修复方案

创建一个修复 PR，统一以下内容:
1. 将 `why.items[]` 统一为中文版本的4个特性
2. 修正 `hero.title` 和 `hero.subtitle` 使其准确反映中文含义
3. 调整 `why.subtitle` 使其与中文对应
4. 优化 `building.summary.back` 的翻译

需要我生成修复后的代码吗？
