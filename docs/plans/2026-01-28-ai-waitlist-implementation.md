# AI-Driven Waitlist Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the waitlist section into an AI-driven conversational experience where users interact with Gemini to explore their requirements, which are then saved to Notion.

**Architecture:** Next.js Server Actions for backend logic, Gemini API for AI conversation, Notion API for data storage, React state management for UI flow, inline expansion pattern without modals.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion, @google/generative-ai, @notionhq/client

---

## Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install AI and Notion packages**

Run:
```bash
pnpm add @google/generative-ai @notionhq/client
```

Expected: Packages installed successfully, package.json and pnpm-lock.yaml updated

**Step 2: Verify installation**

Run:
```bash
pnpm list @google/generative-ai @notionhq/client
```

Expected: Both packages listed with versions

**Step 3: Commit dependency changes**

```bash
git add package.json pnpm-lock.yaml
git commit -m "deps: add google generative-ai and notion client

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 2: Create Type Definitions

**Files:**
- Create: `src/types/waitlist.ts`

**Step 1: Create types file with conversation types**

Create `src/types/waitlist.ts`:

```typescript
export type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

export type ConversationStage = 'EXPLORING' | 'SUMMARY' | 'EMAIL_INPUT' | 'SUCCESS';

export type ConversationState = {
  stage: ConversationStage;
  messages: Message[];
  summaryPoints: string[];
  isLoading: boolean;
  email: string;
};

export type AIResponse = {
  reply: string;
  summaryPoints: string[];
  shouldContinue: boolean;
};

export type NotionSubmission = {
  email: string;
  messages: Message[];
  summaryPoints: string[];
};
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
pnpm build
```

Expected: Build succeeds with no type errors

**Step 3: Commit types**

```bash
git add src/types/waitlist.ts
git commit -m "feat: add waitlist conversation type definitions

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 3: Create Server Actions - Gemini Integration

**Files:**
- Create: `src/app/actions/waitlist.ts`

**Step 1: Create server actions file with Gemini integration**

Create `src/app/actions/waitlist.ts`:

```typescript
'use server'

import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message, AIResponse } from '@/types/waitlist';

const SYSTEM_PROMPT = `你是 OwliaBot 的需求收集助手。你的目标是通过对话深入理解用户的真实需求。

指导原则：
- 每次回复必须包含：当前需求总结（1-3个要点）+ 一个具体的追问
- 追问要具体且有引导性，帮助用户思考使用场景、频率、约束条件等
- 当需求足够清晰时（通常2-3轮对话后），将 shouldContinue 设为 false
- 始终用中文回复

你必须返回有效的 JSON 格式：
{
  "reply": "你的文字回复（包含总结和追问）",
  "summaryPoints": ["要点1", "要点2", "要点3"],
  "shouldContinue": true
}`;

export async function submitUserMessage(
  messages: Message[],
  userInput: string
): Promise<AIResponse> {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });

    // Build conversation history
    const conversationHistory = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Add new user message
    conversationHistory.push({
      role: 'user',
      parts: [{ text: userInput }],
    });

    // Create chat with system instruction
    const chat = model.startChat({
      history: conversationHistory.slice(0, -1),
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await chat.sendMessage(userInput);
    const responseText = result.response.text();

    // Parse JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('AI response is not valid JSON');
    }

    const aiResponse: AIResponse = JSON.parse(jsonMatch[0]);
    return aiResponse;
  } catch (error) {
    console.error('Error in submitUserMessage:', error);
    throw new Error('Failed to get AI response');
  }
}
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
pnpm build
```

Expected: Build succeeds, no type errors

**Step 3: Commit Gemini integration**

```bash
git add src/app/actions/waitlist.ts
git commit -m "feat: add gemini AI integration for waitlist conversations

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 4: Add Notion Integration to Server Actions

**Files:**
- Modify: `src/app/actions/waitlist.ts`

**Step 1: Add Notion submission function**

Add to `src/app/actions/waitlist.ts`:

```typescript
import { Client } from '@notionhq/client';
import { NotionSubmission } from '@/types/waitlist';

export async function submitToNotion(data: NotionSubmission): Promise<void> {
  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });

    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID! },
      properties: {
        Email: {
          title: [
            {
              text: {
                content: data.email,
              },
            },
          ],
        },
        'Submitted At': {
          date: {
            start: new Date().toISOString(),
          },
        },
        Requirements: {
          rich_text: [
            {
              text: {
                content: data.summaryPoints.map((point, i) => `${i + 1}. ${point}`).join('\n\n'),
              },
            },
          ],
        },
        Conversation: {
          rich_text: [
            {
              text: {
                content: JSON.stringify(data.messages, null, 2),
              },
            },
          ],
        },
        'Summary Points Count': {
          number: data.summaryPoints.length,
        },
        Status: {
          select: {
            name: 'New',
          },
        },
      },
    });
  } catch (error) {
    console.error('Error submitting to Notion:', error);
    throw new Error('Failed to submit to Notion');
  }
}
```

**Step 2: Verify TypeScript compiles**

Run:
```bash
pnpm build
```

Expected: Build succeeds

**Step 3: Commit Notion integration**

```bash
git add src/app/actions/waitlist.ts
git commit -m "feat: add notion integration for waitlist submissions

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 5: Create TypingIndicator Component

**Files:**
- Create: `src/components/TypingIndicator.tsx`

**Step 1: Create typing indicator component**

Create `src/components/TypingIndicator.tsx`:

```typescript
export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm text-foreground/60">
      <span>OwliaBot 正在思考</span>
      <div className="flex gap-1">
        <span className="animate-bounce [animation-delay:-0.3s]">.</span>
        <span className="animate-bounce [animation-delay:-0.15s]">.</span>
        <span className="animate-bounce">.</span>
      </div>
    </div>
  );
}
```

**Step 2: Verify component renders**

Run:
```bash
pnpm build
```

Expected: Build succeeds

**Step 3: Commit typing indicator**

```bash
git add src/components/TypingIndicator.tsx
git commit -m "feat: add typing indicator component

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 6: Create Message Component

**Files:**
- Create: `src/components/Message.tsx`

**Step 1: Create message display component**

Create `src/components/Message.tsx`:

```typescript
'use client'

import { motion } from 'framer-motion';
import type { Message as MessageType } from '@/types/waitlist';

type MessageProps = {
  message: MessageType;
};

export default function Message({ message }: MessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-foreground text-background'
            : 'bg-surface border border-border text-foreground'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </motion.div>
  );
}
```

**Step 2: Verify component compiles**

Run:
```bash
pnpm build
```

Expected: Build succeeds

**Step 3: Commit message component**

```bash
git add src/components/Message.tsx
git commit -m "feat: add message display component with animations

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 7: Create ConversationArea Component

**Files:**
- Create: `src/components/ConversationArea.tsx`

**Step 1: Create conversation area with message list and input**

Create `src/components/ConversationArea.tsx`:

```typescript
'use client'

import { useState, useRef, useEffect } from 'react';
import type { Message as MessageType } from '@/types/waitlist';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

type ConversationAreaProps = {
  messages: MessageType[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onComplete: () => void;
  showCompleteButton: boolean;
};

export default function ConversationArea({
  messages,
  isLoading,
  onSendMessage,
  onComplete,
  showCompleteButton,
}: ConversationAreaProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Auto-focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Messages */}
      {messages.length > 0 && (
        <div className="flex flex-col gap-3 max-h-96 overflow-y-auto px-2">
          {messages.map((message, index) => (
            <Message key={`${message.timestamp}-${index}`} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <TypingIndicator />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={messages.length === 0 ? "你希望 OwliaBot 帮你实现什么样的功能？" : "继续描述你的需求..."}
          disabled={isLoading}
          rows={3}
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 disabled:opacity-50 resize-none"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex-1 rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            发送
          </button>

          {showCompleteButton && (
            <button
              type="button"
              onClick={onComplete}
              disabled={isLoading}
              className="flex-1 rounded-full border-2 border-foreground px-6 py-2.5 text-sm font-semibold text-foreground transition hover:bg-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              我希望 OwliaBot 帮我实现这些内容
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
```

**Step 2: Verify component compiles**

Run:
```bash
pnpm build
```

Expected: Build succeeds

**Step 3: Commit conversation area**

```bash
git add src/components/ConversationArea.tsx
git commit -m "feat: add conversation area with message list and input

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 8: Create SummaryView Component

**Files:**
- Create: `src/components/SummaryView.tsx`

**Step 1: Create summary and email input view**

Create `src/components/SummaryView.tsx`:

```typescript
'use client'

import { useState } from 'react';

type SummaryViewProps = {
  summaryPoints: string[];
  onSubmit: (email: string) => void;
  isLoading: boolean;
};

export default function SummaryView({
  summaryPoints,
  onSubmit,
  isLoading,
}: SummaryViewProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && !isLoading) {
      onSubmit(email.trim());
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Summary Points */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-foreground">
          你的需求总结：
        </h3>
        <ul className="flex flex-col gap-2">
          {summaryPoints.map((point, index) => (
            <li
              key={index}
              className="flex gap-3 text-sm text-foreground/80"
            >
              <span className="font-semibold text-foreground">{index + 1}.</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Email Input */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="email" className="text-sm font-semibold text-foreground">
          请留下你的邮箱，我们会尽快联系你：
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          disabled={isLoading}
          className="w-full rounded-full border border-border bg-background px-6 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!email.trim() || isLoading}
          className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '提交中...' : '提交'}
        </button>
      </form>
    </div>
  );
}
```

**Step 2: Verify component compiles**

Run:
```bash
pnpm build
```

Expected: Build succeeds

**Step 3: Commit summary view**

```bash
git add src/components/SummaryView.tsx
git commit -m "feat: add summary view with email input

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 9: Create SuccessView Component

**Files:**
- Create: `src/components/SuccessView.tsx`

**Step 1: Create success message component**

Create `src/components/SuccessView.tsx`:

```typescript
'use client'

import { motion } from 'framer-motion';

export default function SuccessView() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-4 py-8 text-center"
    >
      <div className="text-4xl">✓</div>
      <h3 className="text-xl font-semibold text-foreground">
        提交成功！
      </h3>
      <p className="text-sm text-foreground/70 max-w-md">
        感谢你的反馈。我们已经收到你的需求，会尽快通过邮箱与你联系。
      </p>
      <p className="text-xs text-foreground/60 mt-4">
        我们永远不会索要你的私钥。
      </p>
    </motion.div>
  );
}
```

**Step 2: Verify component compiles**

Run:
```bash
pnpm build
```

Expected: Build succeeds

**Step 3: Commit success view**

```bash
git add src/components/SuccessView.tsx
git commit -m "feat: add success view component

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 10: Refactor Waitlist Component - Add State Management

**Files:**
- Modify: `src/components/Waitlist.tsx`

**Step 1: Convert to client component with state**

Replace entire content of `src/components/Waitlist.tsx`:

```typescript
'use client'

import { useState } from 'react';
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import ConversationArea from './ConversationArea';
import SummaryView from './SummaryView';
import SuccessView from './SuccessView';
import { submitUserMessage, submitToNotion } from '@/app/actions/waitlist';
import type { Message, ConversationStage } from '@/types/waitlist';

type WaitlistProps = {
  waitlist: {
    eyebrow: string;
    title: string;
    body: string;
    privacy: string;
    note: string;
  };
};

export default function Waitlist({ waitlist }: WaitlistProps) {
  const [stage, setStage] = useState<ConversationStage>('EXPLORING');
  const [messages, setMessages] = useState<Message[]>([]);
  const [summaryPoints, setSummaryPoints] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);

  const handleSendMessage = async (userInput: string) => {
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: userInput,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await submitUserMessage(messages, userInput);

      // Add AI message
      const aiMessage: Message = {
        role: 'assistant',
        content: aiResponse.reply,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setSummaryPoints(aiResponse.summaryPoints);

      // Show complete button if AI signals ready
      if (!aiResponse.shouldContinue) {
        setShowCompleteButton(true);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: Message = {
        role: 'assistant',
        content: '抱歉，发生了错误。请稍后再试。',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    setStage('SUMMARY');
  };

  const handleEmailSubmit = async (email: string) => {
    setIsLoading(true);
    try {
      await submitToNotion({
        email,
        messages,
        summaryPoints,
      });
      setStage('SUCCESS');
    } catch (error) {
      console.error('Error submitting to Notion:', error);
      alert('提交失败，请稍后再试。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Reveal>
      <section
        id="waitlist"
        className="rounded-[34px] border border-border bg-surface/70 px-8 py-12 shadow-[0_14px_32px_rgba(4,6,10,0.16),_inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur dark:shadow-[0_14px_32px_rgba(4,6,10,0.22),_inset_0_1px_0_rgba(255,255,255,0.14)]"
      >
        <div className="flex flex-col gap-6">
          <SectionHeader
            eyebrow={waitlist.eyebrow}
            title={waitlist.title}
            subtitle={waitlist.body}
          />

          {stage === 'EXPLORING' && (
            <>
              <p className="text-pretty text-sm font-semibold text-foreground">
                {waitlist.privacy}
              </p>
              <p className="text-pretty text-xs text-foreground/60">
                {waitlist.note}
              </p>
              <ConversationArea
                messages={messages}
                isLoading={isLoading}
                onSendMessage={handleSendMessage}
                onComplete={handleComplete}
                showCompleteButton={showCompleteButton}
              />
            </>
          )}

          {stage === 'SUMMARY' && (
            <SummaryView
              summaryPoints={summaryPoints}
              onSubmit={handleEmailSubmit}
              isLoading={isLoading}
            />
          )}

          {stage === 'SUCCESS' && <SuccessView />}
        </div>
      </section>
    </Reveal>
  );
}
```

**Step 2: Verify component compiles**

Run:
```bash
pnpm build
```

Expected: Build succeeds

**Step 3: Commit refactored waitlist**

```bash
git add src/components/Waitlist.tsx
git commit -m "feat: refactor waitlist to AI-driven conversation flow

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 11: Create Environment Variables Template

**Files:**
- Create: `.env.local.example`

**Step 1: Create env template file**

Create `.env.local.example`:

```bash
# Gemini AI API Key
# Get from: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Notion Integration
# Get from: https://www.notion.so/my-integrations
NOTION_API_KEY=your_notion_integration_token_here
NOTION_DATABASE_ID=your_notion_database_id_here
```

**Step 2: Add to gitignore if needed**

Run:
```bash
grep -q ".env.local" .gitignore || echo ".env.local" >> .gitignore
```

Expected: .env.local is in .gitignore

**Step 3: Commit env template**

```bash
git add .env.local.example .gitignore
git commit -m "docs: add environment variables template

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## Task 12: Update Content Types for Bilingual Support

**Files:**
- Modify: `src/content/en.ts`
- Modify: `src/content/zh.ts`

**Step 1: Verify current content structure**

Content already has waitlist section. No changes needed for now.

**Step 2: Skip this task**

The existing content structure already supports the waitlist section.

---

## Task 13: Final Build and Verification

**Files:**
- N/A (verification step)

**Step 1: Run full build**

Run:
```bash
pnpm build
```

Expected: Build completes successfully with no errors

**Step 2: Check for TypeScript errors**

Run:
```bash
pnpm tsc --noEmit
```

Expected: No type errors

**Step 3: Verify all files are committed**

Run:
```bash
git status
```

Expected: Working tree clean or only .env.local uncommitted

---

## Post-Implementation Setup (Manual)

**User must complete these steps:**

1. **Create Notion Database:**
   - Go to Notion and create a new database
   - Add properties:
     - Email (Title field, type: Title)
     - Submitted At (type: Date)
     - Requirements (type: Text)
     - Conversation (type: Text)
     - Summary Points Count (type: Number)
     - Status (type: Select, options: New, Contacted, Completed)
   - Get the database ID from the URL
   - Create integration at notion.so/my-integrations
   - Share database with the integration

2. **Get API Keys:**
   - Gemini: https://aistudio.google.com/app/apikey
   - Notion: https://www.notion.so/my-integrations

3. **Configure Environment:**
   - Copy `.env.local.example` to `.env.local`
   - Fill in the API keys and database ID

4. **Test Locally:**
   - Run `pnpm dev`
   - Navigate to waitlist section
   - Test conversation flow
   - Verify Notion submission

---

## Success Criteria

- ✓ Dependencies installed successfully
- ✓ All TypeScript types defined
- ✓ Server actions created for Gemini and Notion
- ✓ UI components built and styled
- ✓ Waitlist component refactored with state management
- ✓ Build completes without errors
- ✓ Environment variables documented

**Next Steps:** User sets up Notion database, adds API keys, and tests the full flow.
