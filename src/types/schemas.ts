import { z } from 'zod';
import type { UITreeNode } from './building';

// UITreeNode schema (recursive definition)
export const UITreeNodeSchema: z.ZodType<UITreeNode> = z.lazy(() =>
  z.object({
    type: z.string(),
    props: z.record(z.string(), z.unknown()).optional(),
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
