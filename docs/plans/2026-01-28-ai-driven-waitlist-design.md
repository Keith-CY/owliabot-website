# AI-Driven Waitlist Design

**Date:** 2026-01-28
**Status:** Design Complete - Ready for Implementation

## Overview

Transform the current waitlist from a simple third-party form redirect into an AI-driven conversational experience that explores user needs through natural dialogue. Users interact directly on the landing page, with AI helping uncover their real requirements through targeted follow-up questions.

## Design Decisions

- **AI Provider:** Gemini API (gemini-2.0-flash-exp)
- **Storage:** Notion API (direct integration)
- **UI Pattern:** Inline expansion within waitlist section (no modal)
- **Loading State:** Typing animation indicator
- **Architecture:** Next.js Server Actions + AI SDK

## Architecture

### Component Hierarchy

```
<Waitlist>
  ├─ <SectionHeader> (existing)
  ├─ <ConversationArea>
  │   ├─ <MessageList>
  │   │   ├─ <Message role="user" />
  │   │   ├─ <Message role="assistant" />
  │   │   └─ <TypingIndicator />
  │   └─ <InputArea>
  │       ├─ <textarea>
  │       └─ <button> "我希望 OwliaBot 帮我实现这些内容"
  ├─ <SummaryView>
  │   ├─ <SummaryPointsList>
  │   └─ <EmailInput>
  └─ <SuccessView>
```

### Server Actions Layer

**File:** `app/actions/waitlist.ts`

```typescript
'use server'

// Submit user message, call Gemini, return AI response
export async function submitUserMessage(
  messages: Message[],
  userInput: string
): Promise<AIResponse>

// Submit final data to Notion
export async function submitToNotion(data: {
  email: string;
  messages: Message[];
  summaryPoints: string[];
}): Promise<void>
```

## Conversation Flow

### Stage 1: Exploring (EXPLORING)

- User enters initial requirement
- AI responds with 1-3 summary points + follow-up question
- Example: "我理解你希望 OwliaBot 能够：1) 自动监控 DeFi 收益率；2) 在收益率变化时通知你。请问你更关注哪些协议？"

### Stage 2: Continuous Dialogue (EXPLORING)

- User can answer, clarify, or add more context
- AI accumulates summary points with each turn
- AI sets `shouldContinue: false` when requirements are clear enough
- When ready, AI suggests: "看起来需求已经比较清楚了，你可以点击下方按钮完成提交"

### Stage 3: Summary Confirmation (SUMMARY)

- User clicks "我希望 OwliaBot 帮我实现这些内容"
- Display formatted list of all collected requirement points
- Show email input field

### Stage 4: Submission (SUBMITTING → SUCCESS)

- User enters email and confirms
- Call `submitToNotion()` to save data
- Display success message

## State Management

### TypeScript Types

```typescript
type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

type ConversationState = {
  stage: 'EXPLORING' | 'SUMMARY' | 'EMAIL_INPUT' | 'SUCCESS';
  messages: Message[];
  summaryPoints: string[];
  isLoading: boolean;
  email: string;
};

type AIResponse = {
  reply: string;
  summaryPoints: string[];
  shouldContinue: boolean;
};
```

## AI Integration (Gemini)

### System Prompt

```
You are OwliaBot's requirement collection assistant. Your goal is to deeply understand
user needs through conversation.

Guidelines:
- Each response must include: current requirement summary (1-3 points) + one specific follow-up question
- Ask about scenarios, frequency, constraints, and edge cases
- When requirements are clear (typically after 2-3 turns), signal completion
- Always respond in Chinese (match user's language)

Return format (JSON):
{
  "reply": "Your text response with summary and follow-up question",
  "summaryPoints": ["point 1", "point 2", "point 3"],
  "shouldContinue": true
}
```

### API Implementation

```typescript
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  systemInstruction: SYSTEM_PROMPT
});

const result = await model.generateContent({
  contents: conversationHistory
});

const response = JSON.parse(result.response.text());
```

## Notion Integration

### Database Schema

| Property | Type | Description |
|----------|------|-------------|
| Email | Email | User email (title field) |
| Submitted At | Date | Submission timestamp |
| Requirements | Rich Text | Formatted requirement points (multi-line) |
| Conversation | Rich Text | Full conversation history (JSON) |
| Summary Points Count | Number | Number of requirement points |
| Status | Select | Processing status (New / Contacted / Completed) |

### Implementation

```typescript
const notion = new Client({ auth: process.env.NOTION_API_KEY });

await notion.pages.create({
  parent: { database_id: process.env.NOTION_DATABASE_ID! },
  properties: {
    Email: { email: data.email },
    'Submitted At': { date: { start: new Date().toISOString() } },
    Requirements: {
      rich_text: [{ text: { content: data.summaryPoints.join('\n\n') } }]
    },
    Conversation: {
      rich_text: [{ text: { content: JSON.stringify(data.messages, null, 2) } }]
    },
    'Summary Points Count': { number: data.summaryPoints.length },
    Status: { select: { name: 'New' } }
  }
});
```

## UI Design

### Key Components

**TypingIndicator**
- Three-dot animation
- Text: "OwliaBot 正在思考..."
- CSS-based animation (no extra dependencies)

**Message**
- User messages: right-aligned, light background
- AI messages: left-aligned, with OwliaBot avatar, darker background
- Fade-in animation using `framer-motion`

**Styling**
- Consistent with existing waitlist section (rounded-[34px], shadows, backdrop-blur)
- Conversation area: `max-h-96` with scroll
- Input: auto-focus, Enter to send (Shift+Enter for newline)

### Responsive Design

- Mobile: reduced padding, adjusted font sizes
- Desktop: maintain current styling

## Environment Variables

Add to `.env.local`:

```bash
GEMINI_API_KEY=your_gemini_api_key
NOTION_API_KEY=your_notion_integration_token
NOTION_DATABASE_ID=your_notion_database_id
```

## Dependencies to Add

```bash
pnpm add @google/generative-ai @notionhq/client
```

## Implementation Steps

1. **Setup & Dependencies**
   - Install `@google/generative-ai` and `@notionhq/client`
   - Create `.env.local` with required API keys
   - Create Notion database with defined schema

2. **Server Actions**
   - Create `app/actions/waitlist.ts`
   - Implement `submitUserMessage()` with Gemini integration
   - Implement `submitToNotion()` with error handling

3. **UI Components**
   - Create `TypingIndicator.tsx`
   - Create `Message.tsx` with role-based styling
   - Create `ConversationArea.tsx` for message list and input

4. **Main Component Refactor**
   - Update `Waitlist.tsx` to use conversation state
   - Implement stage transitions
   - Add email input and success views

5. **Testing & Polish**
   - Test full conversation flow
   - Verify Notion integration
   - Add error handling for API failures
   - Polish animations and transitions

## Success Criteria

- User can have natural conversation with AI
- AI successfully explores and summarizes user requirements
- Data is correctly saved to Notion with all fields
- UI is responsive and maintains design consistency
- Error states are handled gracefully
