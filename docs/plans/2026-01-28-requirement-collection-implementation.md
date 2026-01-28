# Requirement Collection Flow Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor the waitlist requirement collection flow from a chat-like interface to a structured requirement gathering process with requirement cards and clear confirmation/submission flow.

**Architecture:** Component-based state management with three distinct phases (idle, collecting requirement, ready to submit). AI supports two modes: follow-up questions and requirement summarization. Requirements are confirmed one by one as cards, then batch submitted.

**Tech Stack:** Next.js 15, React 19, TypeScript, Framer Motion, Google Gemini AI, Notion API

---

## Task 1: Add ConfirmedRequirement Type

**Files:**
- Modify: `src/types/waitlist.ts`

**Step 1: Add ConfirmedRequirement type**

Add the new type after the Message type definition:

```typescript
export type ConfirmedRequirement = {
  id: string;
  summary: string; // AI-generated concise description
  timestamp: number;
};
```

**Step 2: Update AIResponse type**

Add optional summary field to AIResponse:

```typescript
export type AIResponse = {
  uiTree: any; // json-render tree structure
  summaryPoints: string[];
  shouldContinue: boolean;
  selectedOptions?: string[]; // For tracking user selections
  summary?: string; // For summarization mode
};
```

**Step 3: Update NotionSubmission type**

Replace summaryPoints with confirmedRequirements:

```typescript
export type NotionSubmission = {
  email: string;
  messages: Message[];
  confirmedRequirements: ConfirmedRequirement[]; // Changed from summaryPoints
};
```

**Step 4: Verify types compile**

Run: `pnpm run build`
Expected: No TypeScript errors related to waitlist types

**Step 5: Commit**

```bash
git add src/types/waitlist.ts
git commit -m "feat: add ConfirmedRequirement type and update waitlist types

- Add ConfirmedRequirement type for storing confirmed requirements
- Update AIResponse to support summarization mode
- Update NotionSubmission to use confirmedRequirements

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Create RequirementCard Component

**Files:**
- Create: `src/components/RequirementCard.tsx`

**Step 1: Create basic RequirementCard component**

```typescript
'use client'

import { motion } from 'framer-motion';
import type { ConfirmedRequirement } from '@/types/waitlist';

type RequirementCardProps = {
  requirement: ConfirmedRequirement;
  index: number;
};

export default function RequirementCard({ requirement, index }: RequirementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-border bg-surface/50 px-4 py-3"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-foreground/10 text-foreground text-xs font-semibold">
          {index + 1}
        </div>
        <p className="flex-1 text-sm text-foreground leading-relaxed">
          {requirement.summary}
        </p>
      </div>
    </motion.div>
  );
}
```

**Step 2: Verify component builds**

Run: `pnpm run build`
Expected: No TypeScript errors, component compiles successfully

**Step 3: Commit**

```bash
git add src/components/RequirementCard.tsx
git commit -m "feat: create RequirementCard component

Display confirmed requirements as numbered cards with animation.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Add Summarization AI Server Action

**Files:**
- Modify: `src/app/actions/waitlist.ts`

**Step 1: Add SUMMARIZATION_PROMPT constant**

Add after SYSTEM_PROMPT:

```typescript
const SUMMARIZATION_PROMPT = `你是 OwliaBot 的需求总结助手。

任务：根据用户与助手的对话历史，生成一个简洁的需求总结（1-2句话）。

要求：
1. 总结要包含关键信息：目标、资产、关键信息等
2. 简洁明了，不超过50字
3. 使用自然语言，不要使用标签格式

示例输入对话：
用户：我想追踪 Pendle 的活动
助手：请问目标资产是？
用户：任意资产都可以
助手：需要关注哪些关键信息？
用户：结束时间

示例输出：
"追踪 Pendle 的活动，目标资产：任意，关键信息：结束时间"

CRITICAL: 你必须返回这个 JSON 格式：
{
  "summary": "你生成的简洁需求总结"
}`;
```

**Step 2: Add summarizeRequirement function**

Add after submitUserMessage function:

```typescript
export async function summarizeRequirement(
  messages: Message[]
): Promise<string> {
  console.log('=== summarizeRequirement called ===');
  console.log('Messages to summarize:', messages.length);

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      systemInstruction: SUMMARIZATION_PROMPT,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 256,
        responseMimeType: "application/json",
      },
    });

    // Build conversation history for summarization
    const conversationHistory = messages.map(msg => {
      let content = msg.content;
      if (msg.role === 'user' && msg.selectedOptions && msg.selectedOptions.length > 0) {
        content += `\n\n[用户选择了: ${msg.selectedOptions.join(', ')}]`;
      }
      return {
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: content }],
      };
    });

    console.log('Sending summarization request to Gemini...');
    const result = await model.generateContent({
      contents: conversationHistory,
    });

    const responseText = result.response.text();
    console.log('AI summarization response:', responseText);

    // Parse JSON response
    let jsonText = responseText.trim();
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
    }

    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Failed to find JSON in response:', responseText);
      // Fallback: use first user message
      const firstUserMessage = messages.find(m => m.role === 'user');
      return firstUserMessage?.content || '需求总结失败';
    }

    const parsed = JSON.parse(jsonMatch[0]);
    console.log('Summary generated:', parsed.summary);
    return parsed.summary;
  } catch (error) {
    console.error('Error in summarizeRequirement:', error);
    // Fallback: use first user message
    const firstUserMessage = messages.find(m => m.role === 'user');
    return firstUserMessage?.content || '需求总结失败';
  }
}
```

**Step 3: Verify function compiles**

Run: `pnpm run build`
Expected: No TypeScript errors

**Step 4: Commit**

```bash
git add src/app/actions/waitlist.ts
git commit -m "feat: add AI summarization server action

Add summarizeRequirement function that uses Gemini AI to generate
concise requirement summaries from conversation history. Includes
fallback to first user message if AI fails.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Update ConversationArea Props and Button Logic

**Files:**
- Modify: `src/components/ConversationArea.tsx`

**Step 1: Update ConversationAreaProps type**

Replace the existing ConversationAreaProps:

```typescript
type ConversationAreaProps = {
  messages: MessageType[];
  uiTrees: any[];
  isLoading: boolean;
  isInConversation: boolean;
  hasConfirmedRequirements: boolean;
  onSendMessage: (message: string, selections?: string[]) => void;
  onConfirmRequirement: () => void;
  onComplete: () => void;
};
```

**Step 2: Update ConversationAreaInner signature**

Replace the function signature:

```typescript
function ConversationAreaInner({
  messages,
  uiTrees,
  isLoading,
  isInConversation,
  hasConfirmedRequirements,
  onSendMessage,
  onConfirmRequirement,
  onComplete,
}: ConversationAreaProps) {
```

**Step 3: Update button rendering logic**

Replace the button section (around line 103-122):

```typescript
<div className="flex gap-2">
  <button
    type="submit"
    disabled={!input.trim() || isLoading}
    className="flex-1 rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    发送
  </button>

  {isInConversation && (
    <button
      type="button"
      onClick={onConfirmRequirement}
      disabled={isLoading || messages.length === 0}
      className="flex-1 rounded-full border-2 border-foreground px-6 py-2.5 text-sm font-semibold text-foreground transition hover:bg-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      确认当前需求
    </button>
  )}

  {!isInConversation && hasConfirmedRequirements && (
    <button
      type="button"
      onClick={onComplete}
      disabled={isLoading}
      className="flex-1 rounded-full border-2 border-foreground px-6 py-2.5 text-sm font-semibold text-foreground transition hover:bg-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      我希望 OwliaBot 实现这些功能
    </button>
  )}
</div>
```

**Step 4: Update placeholder logic**

Replace the placeholder (around line 97):

```typescript
placeholder={
  !hasConfirmedRequirements && messages.length === 0
    ? "描述你想追踪的活动、代币或事件..."
    : isInConversation
    ? "继续补充需求详情..."
    : "继续描述其他需求..."
}
```

**Step 5: Verify component compiles**

Run: `pnpm run build`
Expected: TypeScript errors about missing props in Waitlist.tsx (expected, will fix next)

**Step 6: Commit**

```bash
git add src/components/ConversationArea.tsx
git commit -m "feat: update ConversationArea with new button logic

- Add isInConversation and hasConfirmedRequirements props
- Implement mutually exclusive button display logic
- Add onConfirmRequirement callback
- Update placeholder based on conversation state

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 5: Refactor Waitlist Component State Management

**Files:**
- Modify: `src/components/Waitlist.tsx`

**Step 1: Add new state variables**

Add after existing state declarations (around line 23-28):

```typescript
const [confirmedRequirements, setConfirmedRequirements] = useState<ConfirmedRequirement[]>([]);
const [currentConversation, setCurrentConversation] = useState<Message[]>([]);
const [isInConversation, setIsInConversation] = useState(false);
```

**Step 2: Import RequirementCard and summarizeRequirement**

Add to imports at top:

```typescript
import RequirementCard from './RequirementCard';
import { submitUserMessage, submitToNotion, summarizeRequirement } from '@/app/actions/waitlist';
import type { Message, ConversationStage, ConfirmedRequirement } from '@/types/waitlist';
```

**Step 3: Update handleSendMessage**

Replace handleSendMessage function:

```typescript
const handleSendMessage = async (userInput: string, selections?: string[]) => {
  // Add user message with selections
  const userMessage: Message = {
    role: 'user',
    content: userInput,
    timestamp: Date.now(),
    selectedOptions: selections && selections.length > 0 ? selections : undefined,
  };

  const newConversation = [...currentConversation, userMessage];
  setCurrentConversation(newConversation);
  setMessages((prev) => [...prev, userMessage]);
  setIsLoading(true);

  // Set isInConversation to true after first message
  if (currentConversation.length === 0) {
    setIsInConversation(true);
  }

  try {
    console.log('[Waitlist] Calling submitUserMessage with:', { messages: newConversation, userInput, selections });
    const aiResponse = await submitUserMessage(messages, userInput, selections);
    console.log('[Waitlist] AI response received:', aiResponse);

    // Add AI message
    const aiMessage: Message = {
      role: 'assistant',
      content: JSON.stringify(aiResponse.summaryPoints),
      timestamp: Date.now(),
    };

    setCurrentConversation((prev) => [...prev, aiMessage]);
    setMessages((prev) => [...prev, aiMessage]);
    setUiTrees((prev) => [...prev, aiResponse.uiTree]);
    setSummaryPoints(aiResponse.summaryPoints);
  } catch (error) {
    console.error('Error sending message:', error);
    const errorMessage: Message = {
      role: 'assistant',
      content: '抱歉，发生了错误。请稍后再试。',
      timestamp: Date.now(),
    };
    setCurrentConversation((prev) => [...prev, errorMessage]);
    setMessages((prev) => [...prev, errorMessage]);
  } finally {
    setIsLoading(false);
  }
};
```

**Step 4: Add handleConfirmRequirement function**

Add after handleSendMessage:

```typescript
const handleConfirmRequirement = async () => {
  if (currentConversation.length === 0) return;

  setIsLoading(true);
  try {
    // Get AI summary of the conversation
    const summary = await summarizeRequirement(currentConversation);

    // Create confirmed requirement
    const newRequirement: ConfirmedRequirement = {
      id: `req-${Date.now()}`,
      summary,
      timestamp: Date.now(),
    };

    // Add to confirmed requirements
    setConfirmedRequirements((prev) => [...prev, newRequirement]);

    // Clear current conversation
    setCurrentConversation([]);
    setIsInConversation(false);
  } catch (error) {
    console.error('Error confirming requirement:', error);
    alert('确认需求失败，请稍后再试。');
  } finally {
    setIsLoading(false);
  }
};
```

**Step 5: Update handleComplete function**

Replace handleComplete:

```typescript
const handleComplete = () => {
  // If in conversation, prevent completion
  if (isInConversation) {
    alert('请先确认当前需求');
    return;
  }

  // If no confirmed requirements, prevent completion
  if (confirmedRequirements.length === 0) {
    alert('请至少添加一个需求');
    return;
  }

  setStage('SUMMARY');
};
```

**Step 6: Update handleEmailSubmit**

Replace handleEmailSubmit:

```typescript
const handleEmailSubmit = async (email: string) => {
  setIsLoading(true);
  try {
    await submitToNotion({
      email,
      messages,
      confirmedRequirements,
    });
    setStage('SUCCESS');
  } catch (error) {
    console.error('Error submitting to Notion:', error);
    alert('提交失败，请稍后再试。');
  } finally {
    setIsLoading(false);
  }
};
```

**Step 7: Update JSX to render RequirementCards**

Replace the EXPLORING stage JSX (around line 112-132):

```typescript
{stage === 'EXPLORING' && (
  <>
    {waitlist.privacy && (
      <p className="text-pretty text-xs text-foreground/60">
        {waitlist.privacy}
      </p>
    )}
    {waitlist.note && (
      <p className="text-pretty text-xs text-foreground/60">
        {waitlist.note}
      </p>
    )}

    {confirmedRequirements.length > 0 && (
      <div className="flex flex-col gap-2">
        {confirmedRequirements.map((req, index) => (
          <RequirementCard
            key={req.id}
            requirement={req}
            index={index}
          />
        ))}
      </div>
    )}

    <ConversationArea
      messages={currentConversation}
      uiTrees={uiTrees}
      isLoading={isLoading}
      isInConversation={isInConversation}
      hasConfirmedRequirements={confirmedRequirements.length > 0}
      onSendMessage={handleSendMessage}
      onConfirmRequirement={handleConfirmRequirement}
      onComplete={handleComplete}
    />
  </>
)}
```

**Step 8: Verify component compiles**

Run: `pnpm run build`
Expected: No TypeScript errors

**Step 9: Commit**

```bash
git add src/components/Waitlist.tsx
git commit -m "feat: refactor Waitlist with new state management

- Add confirmedRequirements, currentConversation, isInConversation state
- Update handleSendMessage to track conversation state
- Add handleConfirmRequirement to create requirement cards
- Update handleComplete with validation
- Render RequirementCard components
- Pass new props to ConversationArea

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 6: Update SummaryView Component

**Files:**
- Modify: `src/components/SummaryView.tsx`

**Step 1: Read current SummaryView**

Read: `src/components/SummaryView.tsx`

**Step 2: Update SummaryView props**

Replace SummaryViewProps type:

```typescript
type SummaryViewProps = {
  confirmedRequirements: ConfirmedRequirement[];
  onSubmit: (email: string) => void;
  isLoading: boolean;
};
```

**Step 3: Import ConfirmedRequirement type**

Update imports:

```typescript
import type { ConfirmedRequirement } from '@/types/waitlist';
```

**Step 4: Update component to use confirmedRequirements**

Replace the component function signature and requirements rendering:

```typescript
export default function SummaryView({
  confirmedRequirements,
  onSubmit,
  isLoading
}: SummaryViewProps) {
  // ... existing state ...

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-border bg-surface/30 p-6">
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          你的需求总结
        </h3>
        <ul className="space-y-3">
          {confirmedRequirements.map((req, index) => (
            <li key={req.id} className="flex gap-3 text-sm text-foreground/80">
              <span className="font-semibold">{index + 1}.</span>
              <span>{req.summary}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ... rest of existing JSX ... */}
    </div>
  );
}
```

**Step 5: Update Waitlist to pass confirmedRequirements**

In Waitlist.tsx, update SummaryView usage:

```typescript
{stage === 'SUMMARY' && (
  <SummaryView
    confirmedRequirements={confirmedRequirements}
    onSubmit={handleEmailSubmit}
    isLoading={isLoading}
  />
)}
```

**Step 6: Verify components compile**

Run: `pnpm run build`
Expected: No TypeScript errors

**Step 7: Commit**

```bash
git add src/components/SummaryView.tsx src/components/Waitlist.tsx
git commit -m "feat: update SummaryView to use confirmedRequirements

Replace summaryPoints with confirmedRequirements in SummaryView.
Update Waitlist to pass confirmedRequirements to SummaryView.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 7: Update Notion Submission Format

**Files:**
- Modify: `src/app/actions/waitlist.ts`

**Step 8: Update submitToNotion function**

Update the Requirements field in submitToNotion (around line 176-184):

```typescript
Requirements: {
  rich_text: [
    {
      text: {
        content: data.confirmedRequirements
          .map((req, i) => `${i + 1}. ${req.summary}`)
          .join('\n\n'),
      },
    },
  ],
},
```

**Step 2: Update Summary Points Count field**

Update the field (around line 194-196):

```typescript
'Summary Points Count': {
  number: data.confirmedRequirements.length,
},
```

**Step 3: Verify function compiles**

Run: `pnpm run build`
Expected: No TypeScript errors

**Step 4: Commit**

```bash
git add src/app/actions/waitlist.ts
git commit -m "feat: update Notion submission to use confirmedRequirements

Replace summaryPoints with confirmedRequirements in Notion submission.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 8: Manual Testing

**Files:**
- Test: All modified components

**Step 1: Start dev server**

Run: `pnpm run dev`
Expected: Server starts on localhost:3000

**Step 2: Test initial state**

1. Navigate to waitlist section
2. Verify: Only input box and "发送" button visible
3. Verify: Placeholder is "描述你想追踪的活动、代币或事件..."

**Step 3: Test first requirement flow**

1. Type "我想追踪 Pendle 的活动"
2. Click "发送"
3. Verify: AI responds with questions/options
4. Verify: "确认当前需求" button appears
5. Answer AI questions
6. Click "确认当前需求"
7. Verify: Requirement card appears at top
8. Verify: Conversation clears
9. Verify: "我希望 OwliaBot 实现这些功能" button appears

**Step 4: Test adding second requirement**

1. Type another requirement
2. Verify: Placeholder is "继续描述其他需求..."
3. Send and confirm requirement
4. Verify: Second card appears

**Step 5: Test final submission**

1. Click "我希望 OwliaBot 实现这些功能"
2. Verify: Summary page shows all requirements
3. Enter email and submit
4. Verify: Success page appears

**Step 6: Test edge cases**

1. Try clicking "确认当前需求" with empty conversation
2. Verify: Button is disabled
3. Test AI summarization failure (disconnect network)
4. Verify: Fallback to first message works

**Step 7: Document results**

Create: `docs/testing/2026-01-28-requirement-flow-manual-test.md`

Document all test results, screenshots, and issues found.

**Step 8: Commit test documentation**

```bash
git add docs/testing/2026-01-28-requirement-flow-manual-test.md
git commit -m "docs: add manual testing results for requirement flow

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 9: Fix Any Issues Found in Testing

**Files:**
- Modify: Any files with bugs discovered in testing

**Step 1: Review test documentation**

Read: `docs/testing/2026-01-28-requirement-flow-manual-test.md`

**Step 2: Fix each issue found**

For each issue:
1. Identify root cause
2. Implement fix
3. Test fix manually
4. Commit fix with descriptive message

**Step 3: Re-run full test suite**

Repeat Task 8 tests to verify all issues resolved.

**Step 4: Commit final fixes**

```bash
git add [modified files]
git commit -m "fix: resolve issues found in manual testing

[Description of issues fixed]

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 10: Final Build and Verification

**Files:**
- All project files

**Step 1: Clean build**

Run: `rm -rf .next && pnpm run build`
Expected: Build completes successfully with no errors

**Step 2: Run production build locally**

Run: `pnpm run start`
Expected: Production server starts successfully

**Step 3: Test production build**

Repeat key tests from Task 8 on production build.
Verify: All functionality works in production mode.

**Step 4: Check for console errors**

1. Open browser DevTools
2. Navigate through full flow
3. Verify: No console errors or warnings

**Step 5: Final commit**

```bash
git add .
git commit -m "chore: final verification of requirement collection redesign

All tests passing, production build verified.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Success Criteria

- [ ] Users can add multiple requirements with AI assistance
- [ ] Requirements are confirmed as cards one by one
- [ ] Conversation clears after each requirement confirmation
- [ ] Buttons display correctly based on state (mutually exclusive)
- [ ] All requirements submit together to Notion
- [ ] AI summarization works with fallback
- [ ] No TypeScript errors
- [ ] Production build successful
- [ ] All manual tests pass

## Notes

- This plan follows TDD principles where applicable
- Each task is small and focused (2-5 minutes)
- Frequent commits after each logical unit
- Manual testing is emphasized due to AI integration
- Edge cases and error handling included throughout
