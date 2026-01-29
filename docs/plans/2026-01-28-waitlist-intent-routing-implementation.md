# Waitlist Intent Routing Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement full intent routing (refine/new/unclear), multi-requirement auto-splitting, and accurate requirement card summaries.

**Architecture:** Add structured model outputs (`intentType`, `clarifyQuestion`, `requirements[]`) and a client-side requirement queue. Route AI responses based on `intentType`, preserving selected options across refinements and auto-advancing through multi-requirement queues.

**Tech Stack:** Next.js (React), TypeScript, Vitest + @testing-library/react, Zod (optional for schema validation).

### Task 1: Add test tooling

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

**Step 1: Write the failing test**

No code test yet. Add a minimal sanity test to confirm test runner is wired.

Create `src/test/sanity.test.ts`:
```ts
import { describe, it, expect } from 'vitest';

describe('sanity', () => {
  it('runs vitest', () => {
    expect(true).toBe(true);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL because `test` script and Vitest are not configured.

**Step 3: Write minimal implementation**

Update `package.json` scripts:
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

Install dev deps (documented in code review step, executed during implementation):
- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `jsdom`

Create `vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

Create `src/test/setup.ts`:
```ts
import '@testing-library/jest-dom';
```

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS

**Step 5: Commit**

```bash
git add package.json vitest.config.ts src/test/setup.ts src/test/sanity.test.ts
git commit -m "test: add vitest setup"
```

### Task 2: Add typed AI response contract

**Files:**
- Modify: `src/types/waitlist.ts`

**Step 1: Write the failing test**

Create `src/test/ai-response.test.ts` to assert the new fields exist on a sample AI response:
```ts
import { describe, it, expect } from 'vitest';
import type { AIResponse } from '@/types/waitlist';

describe('AIResponse typing', () => {
  it('accepts intentType and requirements', () => {
    const sample: AIResponse = {
      uiTree: { type: 'root', children: [] },
      summaryPoints: [],
      shouldContinue: true,
      intentType: 'refine',
      requirements: [],
    };
    expect(sample.intentType).toBe('refine');
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/test/ai-response.test.ts`
Expected: Type error for missing `intentType` and `requirements` on `AIResponse`.

**Step 3: Write minimal implementation**

Update `AIResponse`:
```ts
export type AIResponse = {
  uiTree: any;
  summaryPoints: string[];
  shouldContinue: boolean;
  selectedOptions?: string[];
  summary?: string;
  intentType?: 'refine' | 'new' | 'unclear';
  clarifyQuestion?: string;
  requirements?: Array<{
    title: string;
    summary: string;
  }>;
};
```

**Step 4: Run test to verify it passes**

Run: `npm test -- src/test/ai-response.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/types/waitlist.ts src/test/ai-response.test.ts
git commit -m "types: extend AIResponse for intent routing"
```

### Task 3: Update SYSTEM_PROMPT for structured intent routing + multi-requirements

**Files:**
- Modify: `src/app/actions/waitlist.ts`

**Step 1: Write the failing test**

Create `src/test/prompt-contract.test.ts` to assert the prompt string contains required fields:
```ts
import { describe, it, expect } from 'vitest';
import { SYSTEM_PROMPT } from '@/app/actions/waitlist';

describe('SYSTEM_PROMPT contract', () => {
  it('mentions intentType and requirements', () => {
    expect(SYSTEM_PROMPT).toContain('intentType');
    expect(SYSTEM_PROMPT).toContain('requirements');
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/test/prompt-contract.test.ts`
Expected: FAIL because the prompt is not exported and lacks terms.

**Step 3: Write minimal implementation**

Export `SYSTEM_PROMPT` and update with:
- Structured output contract: `intentType`, `clarifyQuestion`, `requirements`.
- Explicit handling of multi-requirements in first user message.
- X-platform constraint.
- “unclear” must return clarification question, not options.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/test/prompt-contract.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/app/actions/waitlist.ts src/test/prompt-contract.test.ts
git commit -m "prompt: add intent routing and multi-requirement contract"
```

### Task 4: Add requirement queue + intent routing state machine

**Files:**
- Create: `src/lib/waitlist/intent.ts`
- Modify: `src/components/Waitlist.tsx`
- Modify: `src/components/ConversationArea.tsx` (if needed for UI hints)

**Step 1: Write the failing test**

Create `src/test/intent-reducer.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { reduceIntentState, initialIntentState } from '@/lib/waitlist/intent';

describe('intent reducer', () => {
  it('queues multiple requirements and advances on confirm', () => {
    const state = initialIntentState();
    const withQueue = reduceIntentState(state, {
      type: 'AI_RESPONSE',
      response: {
        intentType: 'new',
        requirements: [
          { title: 'Req A', summary: 'A' },
          { title: 'Req B', summary: 'B' },
        ],
      },
    });
    expect(withQueue.pending.length).toBe(2);

    const afterConfirm = reduceIntentState(withQueue, { type: 'CONFIRM' });
    expect(afterConfirm.pending.length).toBe(1);
    expect(afterConfirm.active?.title).toBe('Req B');
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/test/intent-reducer.test.ts`
Expected: FAIL because reducer does not exist.

**Step 3: Write minimal implementation**

Implement a small reducer in `src/lib/waitlist/intent.ts`:
- `initialIntentState()`
- `reduceIntentState(state, action)`
- Maintain `{ active, pending, mode }`
- Handle `AI_RESPONSE`, `CONFIRM`

**Step 4: Run test to verify it passes**

Run: `npm test -- src/test/intent-reducer.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/waitlist/intent.ts src/test/intent-reducer.test.ts
git commit -m "state: add intent reducer for requirement queue"
```

### Task 5: Wire intent routing in Waitlist

**Files:**
- Modify: `src/components/Waitlist.tsx`
- Modify: `src/types/waitlist.ts`

**Step 1: Write the failing test**

Create `src/test/waitlist-routing.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import Waitlist from '@/components/Waitlist';

test('renders clarify question on unclear intent', async () => {
  // In the implementation, mock the server action to return intentType=unclear
  // Expect the clarify question to render in the UI.
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/test/waitlist-routing.test.tsx`
Expected: FAIL due to missing mocks and behavior.

**Step 3: Write minimal implementation**

Update `Waitlist.tsx` to:
- Track `baseIntent` for current requirement
- Include `[BaseIntent]`, `[SelectedOptions]`, `[NewInput]` in the user input
- Branch on `intentType`:
  - `refine`: keep active requirement
  - `new`: push into pending queue and optionally auto-advance
  - `unclear`: render clarification question, do not alter queue
- On confirm: store current requirement summary, then auto-advance to next pending requirement

**Step 4: Run test to verify it passes**

Run: `npm test -- src/test/waitlist-routing.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/Waitlist.tsx src/test/waitlist-routing.test.tsx
git commit -m "ui: route intent and handle requirement queue"
```

### Task 6: Update Message rendering for clarify questions

**Files:**
- Modify: `src/components/Message.tsx`

**Step 1: Write the failing test**

Create `src/test/message-clarify.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react';
import Message from '@/components/Message';

test('renders clarify question from uiTree', () => {
  const uiTree = {
    type: 'root',
    children: [{ type: 'Question', props: { text: 'Clarify?' } }],
  };
  render(<Message message={{ role: 'assistant', content: '', timestamp: 1 }} uiTree={uiTree} />);
  expect(screen.getByText('Clarify?')).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/test/message-clarify.test.tsx`
Expected: FAIL if Question is not shown.

**Step 3: Write minimal implementation**

Ensure `Message.tsx` renders `Question` components when present in `uiTree`.

**Step 4: Run test to verify it passes**

Run: `npm test -- src/test/message-clarify.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/Message.tsx src/test/message-clarify.test.tsx
git commit -m "ui: render clarify question"
```

### Task 7: Manual verification

**Steps:**
1. Start dev server: `npm run dev`
2. Enter: “监控 Telegram 和 监控 X 账户”
3. Expect: “检测到多个需求，按顺序确认”
4. Confirm requirement 1, observe auto-advance to requirement 2
5. Enter conflicting input (Telegram vs X) and confirm `unclear` behavior

**Commit:**
```bash
git add .
git commit -m "docs: note manual verification steps"
```
