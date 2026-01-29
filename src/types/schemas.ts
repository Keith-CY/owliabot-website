import { z } from 'zod';
import type { UITreeNode } from './building';

const nullToUndefined = (value: unknown) => (value === null ? undefined : value);
const optionalString = z.preprocess(nullToUndefined, z.string().optional());
const optionalStringArray = z.preprocess(nullToUndefined, z.array(z.string()).optional());
const optionalIntentType = z.preprocess(nullToUndefined, z.enum(['refine', 'new', 'unclear']).optional());
const summaryPointsSchema = z.preprocess(
  (value) => (value === null || value === undefined ? [] : value),
  z.array(z.string())
);

// UITreeNode schema (recursive definition)
export const UITreeNodeSchema: z.ZodType<UITreeNode> = z.lazy(() =>
  z.object({
    type: z.string(),
    props: z.preprocess(nullToUndefined, z.record(z.string(), z.unknown()).optional()),
    children: z.preprocess(nullToUndefined, z.array(UITreeNodeSchema).optional()),
    key: z.preprocess(nullToUndefined, z.union([z.string(), z.number()]).optional()),
  })
);

// AIResponse schema
export const AIResponseSchema = z.object({
  uiTree: UITreeNodeSchema,
  summaryPoints: summaryPointsSchema,
  shouldContinue: z.boolean(),
  selectedOptions: optionalStringArray,
  summary: optionalString,
  intentType: optionalIntentType,
  clarifyQuestion: optionalString,
  requirements: z.preprocess(nullToUndefined, z.array(z.object({
    title: z.string(),
    summary: z.string(),
  })).optional()),
});

// Summarization response schema
export const SummarizationResponseSchema = z.object({
  summary: z.string().min(1, 'Summary cannot be empty'),
});
