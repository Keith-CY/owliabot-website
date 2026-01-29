# 需求收集流程重构设计

**日期：** 2026-01-28
**状态：** 已批准
**目标：** 重构 Waitlist 需求收集流程，从混乱的聊天式交互改为结构化的需求沉淀流程

## 问题陈述

当前的需求收集流程存在以下问题：
1. 流程混乱，既像聊天又不是聊天
2. 输入框和发送按钮分离，用户体验差
3. 无法清晰地管理多个需求
4. 缺少明确的需求确认和提交节点

## 设计目标

实现一个清晰的需求收集流程：
1. 用户描述需求 → AI 追问完善 → 确认生成卡片
2. 支持收集多个需求
3. 所有需求卡片一次性提交
4. 不是聊天过程，而是需求沉淀过程

## 核心架构

### 状态管理

```typescript
// 已确认的需求对象
type ConfirmedRequirement = {
  id: string;
  summary: string; // AI 总结的简洁描述
  timestamp: number;
};

// 组件状态
const [confirmedRequirements, setConfirmedRequirements] = useState<ConfirmedRequirement[]>([]);
const [currentConversation, setCurrentConversation] = useState<Message[]>([]);
const [isInConversation, setIsInConversation] = useState(false);
```

### 三个核心阶段

**阶段 1：空闲状态**
- 无需求卡片，无对话
- 显示：输入框 + 发送按钮
- 用户输入需求 → 进入阶段 2

**阶段 2：收集当前需求**
- 对话进行中，AI 追问
- 显示：需求卡片（如有）+ 对话历史 + 输入框 + 发送 + 确认当前需求
- 点击"确认当前需求" → 生成卡片，清空对话

**阶段 3：可以提交**
- 有 ≥1 个需求卡片，对话为空
- 显示：需求卡片列表 + 输入框 + 发送 + 我希望 OwliaBot 实现这些功能
- 点击提交 → 发送到后端

## 用户交互流程

### 流程 A：添加第一个需求

1. 用户输入："我想追踪 Pendle 的活动"
2. 发送 → AI 追问（显示选项、文本等）
3. 用户继续补充或选择选项
4. 用户点击【确认当前需求】
5. → 调用 AI 生成需求总结
6. → 创建需求卡片（显示在顶部）
7. → 清空对话历史
8. → 输入框 placeholder 变为 "继续描述其他需求..."
9. → 显示【发送】+【我希望 OwliaBot 实现这些功能】

### 流程 B：添加更多需求

1. 用户输入新需求
2. 发送 → 重复流程 A 的步骤 2-9

### 流程 C：最终提交

1. 用户点击【我希望 OwliaBot 实现这些功能】
2. → 进入邮箱收集页面（现有的 SUMMARY 阶段）

## 按钮显示逻辑

按钮显示是互斥的：

**情况 1：对话进行中**
- 显示：【发送】+【确认当前需求】

**情况 2：有需求卡片 + 对话为空**
- 显示：【发送】+【我希望 OwliaBot 实现这些功能】

**情况 3：无需求卡片 + 对话为空（初始状态）**
- 显示：【发送】

```typescript
// 发送按钮：始终显示
// 第二个按钮的判断：
if (isInConversation) {
  // 显示【确认当前需求】
} else if (confirmedRequirements.length > 0) {
  // 显示【我希望 OwliaBot 实现这些功能】
}
```

## 组件结构

### 新增组件

**RequirementCard.tsx**
```typescript
type RequirementCardProps = {
  requirement: ConfirmedRequirement;
};
```
- 显示 AI 总结的需求描述
- 简洁的卡片样式
- 不可编辑、不可删除
- 可能包括序号

### 修改的组件

**Waitlist.tsx**
- 新增状态：`confirmedRequirements`、`isInConversation`
- 修改 `handleSendMessage`：判断是否是第一条消息来设置 `isInConversation = true`
- 新增 `handleConfirmRequirement`：调用 AI 生成总结，创建卡片，清空对话
- 修改按钮显示逻辑

**ConversationArea.tsx**
- 接收新 props：`isInConversation`、`confirmedRequirements`
- 调整按钮显示逻辑
- 新增【确认当前需求】按钮的回调
- 输入框和发送按钮合并到一行

### 布局结构

```
<Waitlist>
  {confirmedRequirements.map(req => <RequirementCard />)}
  <ConversationArea>
    {messages.map(msg => <Message />)}
    <InputArea /> {/* 输入框和发送按钮在一行 */}
    <ButtonArea /> {/* 动态按钮 */}
  </ConversationArea>
</Waitlist>
```

## AI 交互设计

### 两种模式

**模式 1：追问模式（现有）**
- 用户输入需求 → AI 追问细节
- 返回 `uiTree`（包含选项、问题等）
- `shouldContinue: true`

**模式 2：总结模式（新增）**
- 用户点击【确认当前需求】→ 调用 AI 总结
- 输入：完整的对话历史
- 输出：1-2 句话的需求总结
- 返回格式：
```typescript
{
  summary: "追踪 Pendle 的活动，目标资产：任意，关键信息：结束时间",
  shouldContinue: false
}
```

### 数据流

**添加需求流程：**
```
用户输入
  → submitUserMessage (追问模式)
  → AI 返回 uiTree
  → 显示对话
  → 用户点击【确认当前需求】
  → confirmRequirement (总结模式)
  → AI 返回 summary
  → 创建 RequirementCard
  → 清空 currentConversation
```

**最终提交流程：**
```
用户点击【我希望 OwliaBot 实现这些功能】
  → 进入 SUMMARY 阶段
  → 显示所有 confirmedRequirements
  → submitToNotion（需要修改，包含 confirmedRequirements）
```

## 边界情况处理

### 1. 用户在对话中直接点击【我希望 OwliaBot 实现这些功能】
- 不应该发生（按钮互斥）
- 如果发生：提示用户先确认当前需求

### 2. 用户没有输入任何内容就点击【确认当前需求】
- 如果对话为空：禁用按钮
- 如果对话不为空：允许确认

### 3. AI 总结失败
- 降级方案：使用用户的第一条输入作为需求描述
- 显示错误提示，但不阻断流程

### 4. 用户提交时没有任何需求卡片
- 理论上不会发生（按钮显示逻辑）
- 防御性编程：检查 `confirmedRequirements.length > 0`

## 优化细节

### 输入框 Placeholder

```typescript
const placeholder =
  confirmedRequirements.length === 0 && currentConversation.length === 0
    ? "描述你想追踪的活动、代币或事件..."
    : isInConversation
    ? "继续补充需求详情..."
    : "继续描述其他需求...";
```

### Notion 提交格式调整

原来提交 `summaryPoints`，现在改为提交 `confirmedRequirements`：

```typescript
Requirements: {
  rich_text: [
    {
      text: {
        content: confirmedRequirements
          .map((req, i) => `${i + 1}. ${req.summary}`)
          .join('\n\n')
      }
    }
  ]
}
```

## 实现优先级

1. **P0（核心流程）**
   - 状态管理重构
   - 按钮显示逻辑
   - 确认需求功能
   - RequirementCard 组件

2. **P1（AI 支持）**
   - AI 总结模式
   - 对话清空逻辑
   - Notion 提交格式调整

3. **P2（体验优化）**
   - Placeholder 动态显示
   - 边界情况处理
   - 错误提示优化

## 技术风险

1. **AI 总结质量**：可能生成不准确的总结
   - 缓解：提供降级方案，使用用户第一条输入

2. **状态管理复杂度**：多个状态需要同步
   - 缓解：使用清晰的状态机模型

3. **向后兼容性**：现有数据结构可能需要迁移
   - 缓解：保持 Notion 提交格式兼容

## 成功指标

1. 用户能清晰区分"当前需求"和"已确认需求"
2. 用户能成功提交多个需求
3. AI 总结准确率 > 80%
4. 无混乱的 UI 状态（按钮冲突等）
