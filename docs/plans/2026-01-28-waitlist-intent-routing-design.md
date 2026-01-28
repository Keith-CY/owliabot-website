# Waitlist Intent Routing (Refine vs New) Design

## Goal
Make the waitlist assistant reliably decide whether a new user message refines the current requirement or starts a new one. When uncertain, ask a clarification question instead of guessing.

## Current Pain Points
- New text is implicitly merged with prior selections, creating “and/or” ambiguity.
- Model can drift across platforms (e.g., X vs account monitoring).
- UI doesn’t distinguish “refine” vs “new,” so the user’s intent boundary is unclear.

## Approach (Recommended)
Use a structured input bundle and a structured AI output:
- Input bundle includes: initial user intent, currently selected options, and the new user message.
- Output includes an explicit `intentType`:
  - `refine`: message clarifies or adds detail to the current requirement
  - `new`: message indicates a distinct requirement
  - `unclear`: model cannot confidently decide; ask a clarification question

## Data Flow
1. Client sends user input + current selections.
2. Server action builds a structured prompt:
   - `[BaseIntent]` first user message in the active requirement
   - `[SelectedOptions]` user’s checked options (labels)
   - `[NewInput]` current message
3. Model returns JSON with:
   - `intentType`
   - `uiTree`
   - `summaryPoints`
   - optional `clarifyQuestion` (when `unclear`)
4. Client branches:
   - `refine`: keep current requirement; render follow-up options/confirmation
   - `new`: start a new requirement card (or ask for confirmation if desired)
   - `unclear`: render the clarification question; do not change requirement state

## Prompt Contract (Server)
Add these rules to `SYSTEM_PROMPT`:
- “X 账户” means the social platform X (Twitter), not wallet or transaction accounts.
- Options must stay on the same platform as user input.
- Avoid irrelevant categories (e.g., balances/transactions for X).
- Always output `intentType` and only ask clarifying question when `intentType = unclear`.

## UI/UX Behavior
- Keep selections checked through follow-up messages.
- Show “补充当前需求” hint for refine; show a clarification question for unclear.
- Optionally prompt the user when a new requirement is detected:
  “检测到新需求，是否开启新需求卡片？”
- If the first user message contains multiple requirements, auto-split and queue them:
  - Show: “检测到多个需求，我们按顺序确认。”
  - Enter the first requirement flow immediately.
  - On confirm, auto-advance to the next requirement without needing the user to retype.

## Edge Cases
- No selections but clear refinement: allow `refine`.
- Conflicting platforms (Telegram vs X): prefer `unclear` and ask user to confirm.
- Multiple high-level selections: allow `unclear` to ask the user to separate needs.
- First message with multiple intents: output `requirements[]` and seed the pending queue.

## Implementation Touchpoints
- `src/app/actions/waitlist.ts`: update `SYSTEM_PROMPT` and `AIResponse` type.
- `src/components/Waitlist.tsx`: branch by `intentType`.
- `src/components/Message.tsx`: render clarify question if present.
- `src/types/waitlist.ts`: extend AI response typing.
- `src/contexts/WaitlistContext.tsx`: optional queue for pending requirements.

## Verification (Manual)
- Send base intent “监控 Telegram” → expect Telegram-only options.
- Select options, add “监控关键词” → expect `refine`.
- Add “监控 X 账户” → expect `unclear` or `new`.
