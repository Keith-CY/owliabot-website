'use server'

import { GoogleGenerativeAI } from '@google/generative-ai';
import { Client } from '@notionhq/client';
import { Message, AIResponse, NotionSubmission } from '@/types/building';
import { z } from 'zod';
import { AIResponseSchema, SummarizationResponseSchema } from '@/types/schemas';

const SYSTEM_PROMPT = `你是 OwliaBot 的需求收集助手。你的目标是用 2-3 轮问答，快速理解用户需求的「目标→流程→结果」，并产出 1-2 句话的结构化描述。

## 你要搞清楚的三件事（核心）
1. **目标**：用户想实现什么？
2. **流程**：数据从哪来？经过什么处理？
3. **结果**：最终输出是什么？（通知/交易/记录）

## 你不需要问的（配置参数，部署时再填）
- 具体监控哪些账号/地址（这是配置）
- 具体阈值是多少（这是配置）
- 具体用哪个 API（这是实现细节）

## 工作流程（严格 2-3 轮）
1) **第 1 轮**：大胆猜测用户 80% 的需求，用一句话总结，然后问 2-3 个关键问题（聚焦目标/流程/结果，不问配置）
2) **第 2 轮**：根据回答补全理解，如果已经清楚就直接输出最终描述（shouldContinue: false）；如果还差关键信息，最多再问 1-2 个问题
3) **第 3 轮（最后）**：无论如何都要输出最终描述，设置 shouldContinue: false

## 最终输出格式（1-2 句话，类似 skill 描述）
示例：
- "监控 Twitter 大 V 和热点词，检查 Pump.fun 是否有对应代币，有则 Telegram 通知"
- "监控借贷仓位健康度，接近清算时自动还款或补仓"
- "追踪指定 X 账号的 DeFi 相关推文，实时 Telegram 推送"

## 可用组件
- Text: 显示文本消息
- Question: 显示问题（不要超过 3 个）

## 输入格式
[Locale] 页面语言
[BaseIntent] 需求基准意图
[SelectedOptions] 忽略
[NewInput] 用户本轮输入
[Round] 当前轮次（1/2/3）

## 输出 JSON（必须）
{
  "uiTree": {
    "type": "root",
    "children": [
      { "type": "Text", "props": { "content": "需求总结" } },
      { "type": "Question", "props": { "text": "问题（仅在 shouldContinue: true 时）" } }
    ]
  },
  "summaryPoints": ["最终 1-2 句话结构化描述"],
  "shouldContinue": false,
  "intentType": "refine",
  "requirements": []
}

## 关键规则
- 第 3 轮必须 shouldContinue: false
- 不要问配置参数（具体账号/阈值/地址）
- 需求已清楚时立即结束，不要为了凑轮次继续问
- 回复语言跟随 [Locale]
`;

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



export async function submitUserMessage(
  messages: Message[],
  userInput: string
): Promise<AIResponse> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        responseMimeType: "application/json",
      },
    });

    // Build conversation history
    const conversationHistory = messages.map(msg => {
      let content = msg.content;
      // Include selected options in user messages
      if (msg.role === 'user' && msg.selectedOptions && msg.selectedOptions.length > 0) {
        content += `\n\n[用户选择了: ${msg.selectedOptions.join(', ')}]`;
      }
      return {
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: content }],
      };
    });

    // Create chat with history
    const chat = model.startChat({
      history: conversationHistory,
    });

    const currentInput = userInput;
    const result = await chat.sendMessage(currentInput);

    const responseText = result.response.text();
    try {
      const parsed = JSON.parse(responseText);
      const aiResponse = AIResponseSchema.parse(parsed);
      return aiResponse;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('AI response validation failed:', error.issues);
        throw new Error(`Invalid AI response format: ${error.issues[0].message}`);
      }
      console.error('Failed to parse AI response:', {
        error,
        responseLength: responseText?.length ?? 0,
      });
      throw new Error('AI response is not valid JSON');
    }
  } catch (error) {
    console.error('Error in submitUserMessage:', error);
    // Log more details for debugging
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw new Error(`Failed to get AI response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function summarizeRequirement(
  messages: Message[]
): Promise<string> {
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

    const result = await model.generateContent({
      contents: conversationHistory,
    });

    const responseText = result.response.text();
    try {
      const parsed = JSON.parse(responseText);
      const validated = SummarizationResponseSchema.parse(parsed);
      return validated.summary;
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Summary validation failed:', error.issues);
      }
      console.error('Error in summarizeRequirement:', error);
      // Fallback: use first user message
      const firstUserMessage = messages.find(m => m.role === 'user');
      return firstUserMessage?.content || '需求总结失败';
    }
  } catch (error) {
    console.error('Error in summarizeRequirement:', error);
    // Fallback: use first user message
    const firstUserMessage = messages.find(m => m.role === 'user');
    return firstUserMessage?.content || '需求总结失败';
  }
}

function chunkString(str: string, size: number): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size));
  }
  return chunks;
}

export async function submitToNotion(data: NotionSubmission): Promise<void> {
  try {
    if (!process.env.NOTION_API_KEY) {
      throw new Error('NOTION_API_KEY is not configured');
    }
    if (!process.env.NOTION_DATABASE_ID) {
      throw new Error('NOTION_DATABASE_ID is not configured');
    }

    const notion = new Client({ auth: process.env.NOTION_API_KEY });

    const conversationJson = JSON.stringify(data.messages, null, 2);
    let richTextChunks = chunkString(conversationJson, 2000).map((chunk) => ({
      text: { content: chunk },
    }));

    const MAX_CHUNKS = 100;
    if (richTextChunks.length > MAX_CHUNKS) {
      richTextChunks = richTextChunks.slice(0, MAX_CHUNKS - 1);
      richTextChunks.push({ text: { content: '\n\n...[Conversation truncated due to length]' } });
    }

    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID! },
      properties: {
        'Telegram ID': {
          title: [
            {
              text: {
                content: data.telegramId,
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
            rich_text: richTextChunks,
            language: 'json',
          },
        },
      ],
    });
  } catch (error) {
    console.error('Error submitting to Notion:', error instanceof Error ? error.message : 'Unknown error');
    throw new Error(`Failed to submit to Notion: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
