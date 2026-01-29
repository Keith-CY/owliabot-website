# P0 Bugs Fix Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 4 critical P0 bugs: Notion char limit, PII logging, AI validation, ThemeScript error handling

**Architecture:** Minimal changes to existing code - add Zod validation layer, move Notion conversation to page content, remove debug logs, add error handling to theme script

**Tech Stack:** Next.js 16, TypeScript, Zod (existing), Notion API, Google Gemini API

---

## Task 1: Create Zod Validation Schemas

**Files:**
- Create: `src/types/schemas.ts`

**Step 1: Create schemas file with UITreeNode schema**

```typescript
import { z } from 'zod';

// UITreeNode schema (recursive definition)
const UITreeNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    type: z.string(),
    props: z.record(z.unknown()).optional(),
    children: z.array(UITreeNodeSchema).optional(),
    key: z.union([z.string(), z.number()]).optional(),
  })
);

// AIResponse schema
export const AIResponseSchema = z.object({
  uiTree: UITreeNodeSchema,
  summaryPoints: z.array(z.string()),
  shouldContinue: z.boolean(),
  selectedOptions: z.array(z.string()).optional(),
  summary: z.string().optional(),
  intentType: z.enum(['refine', 'new', 'unclear']).optional(),
  clarifyQuestion: z.string().optional(),
  requirements: z.array(z.object({
    title: z.string(),
    summary: z.string(),
  })).optional(),
});

// Summarization response schema
export const SummarizationResponseSchema = z.object({
  summary: z.string().min(1, 'Summary cannot be empty'),
});
```

**Step 2: Verify file compiles**

Run: `npm run build`
Expected: No TypeScript errors

**Step 3: Commit schemas**

```bash
git add src/types/schemas.ts
git commit -m "feat: add Zod validation schemas for AI responses

- Add UITreeNodeSchema for recursive UI tree validation
- Add AIResponseSchema for AI response validation
- Add SummarizationResponseSchema for summary validation

Addresses P0 bug: missing runtime validation"
```

---

## Task 2: Add AI Response Validation

**Files:**
- Modify: `src/app/actions/waitlist.ts:1-10` (imports)
- Modify: `src/app/actions/waitlist.ts:136-151` (submitUserMessage)
- Modify: `src/app/actions/waitlist.ts:189-203` (summarizeRequirement)

**Step 1: Add import for Zod and schemas**

At the top of `src/app/actions/waitlist.ts`, add after existing imports:

```typescript
import { z } from 'zod';
import { AIResponseSchema, SummarizationResponseSchema } from '@/types/schemas';
```

**Step 2: Update submitUserMessage validation**

Replace lines 136-151 with:

```typescript
    const responseText = result.response.text();
    try {
      const parsed = JSON.parse(responseText);
      const aiResponse = AIResponseSchema.parse(parsed);
      return aiResponse;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('AI response validation failed:', error.errors);
        throw new Error(`Invalid AI response format: ${error.errors[0].message}`);
      }
      console.error('Failed to parse AI response:', responseText, error);
      throw new Error('AI response is not valid JSON');
    }
```

**Step 3: Update summarizeRequirement validation**

Replace lines 189-203 with:

```typescript
    const responseText = result.response.text();
    try {
      const parsed = JSON.parse(responseText);
      const validated = SummarizationResponseSchema.parse(parsed);
      return validated.summary;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Summary validation failed:', error.errors);
      }
      console.error('Error in summarizeRequirement:', error);
      // Fallback: use first user message
      const firstUserMessage = messages.find(m => m.role === 'user');
      return firstUserMessage?.content || '需求总结失败';
    }
```

**Step 4: Verify compilation**

Run: `npm run build`
Expected: No TypeScript errors

**Step 5: Commit AI validation**

```bash
git add src/app/actions/waitlist.ts
git commit -m "feat: add Zod validation for AI responses

- Validate AIResponse with runtime type checking
- Validate summarization response format
- Provide clear error messages for validation failures
- Maintain fallback behavior for summarization

Addresses P0 bug: missing AI response validation"
```

---

## Task 3: Remove PII Logging

**Files:**
- Modify: `src/app/actions/waitlist.ts:207-286` (submitToNotion function)

**Step 1: Remove debug logs from submitToNotion**

Delete lines 208-214, 224, 226, 274:

Before:
```typescript
export async function submitToNotion(data: NotionSubmission): Promise<void> {
  console.log('=== submitToNotion called ===');
  console.log('Email:', data.email);
  console.log('Confirmed requirements:', data.confirmedRequirements.length);
  console.log('Messages count:', data.messages.length);
  console.log('NOTION_API_KEY exists:', !!process.env.NOTION_API_KEY);
  console.log('NOTION_DATABASE_ID:', process.env.NOTION_DATABASE_ID);

  try {
    // ...
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    console.log('Notion client created');

    console.log('Creating page in database...');
    await notion.pages.create({
      // ...
    });
    console.log('Page created successfully in Notion');
```

After:
```typescript
export async function submitToNotion(data: NotionSubmission): Promise<void> {
  try {
    if (!process.env.NOTION_API_KEY) {
      throw new Error('NOTION_API_KEY is not configured');
    }
    if (!process.env.NOTION_DATABASE_ID) {
      throw new Error('NOTION_DATABASE_ID is not configured');
    }

    const notion = new Client({ auth: process.env.NOTION_API_KEY });

    await notion.pages.create({
      // ...
    });
```

**Step 2: Simplify error logging**

Replace lines 276-284 with:

```typescript
  } catch (error) {
    console.error('Error submitting to Notion:', error instanceof Error ? error.message : 'Unknown error');
    throw new Error(`Failed to submit to Notion: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
```

**Step 3: Verify compilation**

Run: `npm run build`
Expected: No TypeScript errors

**Step 4: Commit PII logging removal**

```bash
git add src/app/actions/waitlist.ts
git commit -m "fix: remove PII logging from production code

- Remove email address logging
- Remove configuration logging
- Remove detailed error stack traces
- Keep only essential error messages

Addresses P0 bug: PII data leakage in logs"
```

---

## Task 4: Fix Notion 2000 Character Limit

**Files:**
- Modify: `src/app/actions/waitlist.ts:227-273` (notion.pages.create call)

**Step 1: Update Notion API call structure**

Replace the `notion.pages.create` call (lines 227-273) with:

```typescript
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
                content: data.confirmedRequirements
                  .map((req, i) => `${i + 1}. ${req.summary}`)
                  .join('\n\n')
                  .slice(0, 2000),
              },
            },
          ],
        },
        'Summary Points Count': {
          number: data.confirmedRequirements.length,
        },
        Status: {
          select: {
            name: 'New',
          },
        },
      },
      children: [
        {
          object: 'block',
          type: 'heading_2',
          heading_2: {
            rich_text: [{ text: { content: 'Conversation History' } }],
          },
        },
        {
          object: 'block',
          type: 'code',
          code: {
            rich_text: [
              {
                text: {
                  content: JSON.stringify(data.messages, null, 2),
                },
              },
            ],
            language: 'json',
          },
        },
      ],
    });
```

**Step 2: Verify compilation**

Run: `npm run build`
Expected: No TypeScript errors

**Step 3: Commit Notion fix**

```bash
git add src/app/actions/waitlist.ts
git commit -m "fix: move conversation to Notion page content to avoid 2000 char limit

- Move conversation from properties.Conversation to children blocks
- Use code block for JSON formatting in page content
- Add safe truncation to Requirements field
- Maintain all essential data in properties

Addresses P0 bug: Notion 2000 character limit causing submission failures"
```

---

## Task 5: Fix ThemeScript Empty Catch Block

**Files:**
- Modify: `src/components/ThemeScript.tsx:5-30` (script content)

**Step 1: Update ThemeScript with error handling**

Replace the entire script content in `ThemeScript.tsx`:

```typescript
export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function() {
  try {
    const cookie = document.cookie.split('; ').find((row) => row.startsWith('theme='));
    const value = cookie ? decodeURIComponent(cookie.split('=')[1]) : 'system';
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolved = value === 'system' ? (systemDark ? 'dark' : 'light') : value;
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
    root.style.colorScheme = resolved;
  } catch (error) {
    console.error('Failed to apply theme from cookie:', error);

    try {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const fallbackTheme = systemDark ? 'dark' : 'light';
      document.documentElement.classList.add(fallbackTheme);
      document.documentElement.style.colorScheme = fallbackTheme;
    } catch (fallbackError) {
      console.error('Failed to apply fallback theme:', fallbackError);
    }
  }
})();
        `,
      }}
    />
  );
}
```

**Step 2: Verify compilation**

Run: `npm run build`
Expected: No TypeScript errors

**Step 3: Test in browser**

1. Run: `npm run dev`
2. Open browser and check console for errors
3. Test theme switching works
4. Test in incognito/privacy mode (cookie access restricted)

Expected: Theme loads correctly, errors logged to console if issues occur

**Step 4: Commit ThemeScript fix**

```bash
git add src/components/ThemeScript.tsx
git commit -m "fix: add error handling and fallback to ThemeScript

- Log theme loading errors to console
- Add fallback to system preference if cookie fails
- Add nested error handling for fallback
- Maintain user experience even when cookie access fails

Addresses P0 bug: empty catch block hiding theme errors"
```

---

## Task 6: Verification and Testing

**Step 1: Run full build**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 2: Run linting**

Run: `npm run lint`
Expected: No linting errors (or only pre-existing ones)

**Step 3: Manual testing checklist**

1. **Test Notion submission**:
   - Navigate to building section
   - Submit a form with 5+ conversation rounds
   - Check that submission succeeds
   - Verify in Notion that conversation appears in page content

2. **Test AI validation**:
   - Submit messages and verify normal flow works
   - Check console for validation error logs (should be none in normal use)

3. **Test theme loading**:
   - Refresh page and check theme loads
   - Switch theme and verify it persists
   - Check console for theme errors (should be none)
   - Test in incognito mode

4. **Check logs**:
   - Verify no PII appears in console
   - Verify only error messages are logged

**Step 4: Create verification commit**

If any issues found, fix them and commit. If all tests pass:

```bash
git add -A
git commit -m "test: verify all P0 bug fixes

- Notion submissions working with long conversations
- AI validation functioning correctly
- PII logging removed
- ThemeScript errors handled gracefully

All 4 P0 bugs verified fixed"
```

---

## Task 7: Update Design Document Status

**Files:**
- Modify: `docs/plans/2026-01-29-p0-bugs-fix.md:4`

**Step 1: Update status in design doc**

Change line 4 from:
```markdown
**状态**: 已批准，待实施
```

To:
```markdown
**状态**: ✅ 已实施并验证
```

**Step 2: Commit documentation update**

```bash
git add docs/plans/2026-01-29-p0-bugs-fix.md
git commit -m "docs: mark P0 bugs fix as implemented

All 4 P0 bugs have been fixed and verified:
- Notion 2000 char limit resolved
- PII logging removed
- AI validation added
- ThemeScript error handling improved"
```

---

## Summary

**Files Created:**
- `src/types/schemas.ts` - Zod validation schemas

**Files Modified:**
- `src/app/actions/waitlist.ts` - AI validation, PII removal, Notion fix
- `src/components/ThemeScript.tsx` - Error handling
- `docs/plans/2026-01-29-p0-bugs-fix.md` - Status update

**Total Commits:** 7

**Testing Required:**
- Build verification
- Lint check
- Manual testing of all 4 fixes
- Notion submission with long conversations
- Theme loading in various scenarios

**Time Estimate:** 2-3 hours total
