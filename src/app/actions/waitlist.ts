'use server'

import { GoogleGenerativeAI } from '@google/generative-ai';
import { Client } from '@notionhq/client';
import { Message, AIResponse, NotionSubmission } from '@/types/building';
import { z } from 'zod';
import { AIResponseSchema, SummarizationResponseSchema } from '@/types/schemas';

const SYSTEM_PROMPT = `你是 OwliaBot 的需求收集助手。你的目标是快速理解用户的真实需求。

工作流程：
1. 第一次回复：用一句话确认用户意图，不要分点展开；然后提供3-5个相关的多选项，让用户勾选感兴趣的功能
2. 后续回复：根据用户的选择和补充，引导用户继续补充当前需求细节
3. 不要过度追问细节，保持简洁高效

可用组件：
- Text: 显示文本消息
- CheckboxGroup: 多选框组（options 数组包含 id 和 label）
- Question: 显示问题

输入格式说明：
用户的当前消息将使用以下结构：
[Locale] 当前页面语言(zh 或 en)
[BaseIntent] 当前需求的基准意图(首句或当前需求标题)
[SelectedOptions] 用户已勾选的功能选项(逗号分隔)
[NewInput] 用户本轮补充输入

输出要求：
- 必须输出 intentType: "refine" | "new" | "unclear"
- 当 intentType 为 "unclear" 时，只输出澄清问题，不要给大量选项
- 若检测到首句包含多个需求，输出 requirements 数组，并仅提供第一个需求的选项
- 回复语言：优先使用 [Locale] 指定的语言；若无法确定，则跟随用户输入语言

CRITICAL: 你必须返回这个 JSON 格式：
{
  "uiTree": {
    "type": "root",
    "children": [
      { "type": "Text", "props": { "content": "你的需求总结" } },
      {
        "type": "CheckboxGroup",
        "props": {
          "label": "请选择你关心的功能：",
          "options": [
            { "id": "opt1", "label": "功能描述1" },
            { "id": "opt2", "label": "功能描述2" }
          ]
        }
      },
      { "type": "Question", "props": { "text": "澄清问题(仅在 unclear 时)" } }
    ]
  },
  "summaryPoints": ["要点1", "要点2"],
  "shouldContinue": true,
  "intentType": "refine",
  "clarifyQuestion": "当 intentType=unclear 时填写",
  "requirements": [
    { "title": "需求标题1", "summary": "需求摘要1" },
    { "title": "需求标题2", "summary": "需求摘要2" }
  ]
}

补充约束：
- "X 账户" 指社交平台 X(原 Twitter)的账号，不是链上钱包/交易账户。
- 选项必须与用户提到的平台一致(如: Telegram 就给 Telegram 相关选项; X 就给 X 相关选项)。
- 避免生成与用户需求无关的内容(比如把 X 账号误解为"账户余额/交易记录")。
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
      console.error('Failed to parse AI response:', responseText, error);
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
    const richTextChunks = chunkString(conversationJson, 2000).map((chunk) => ({
      text: { content: chunk },
    }));

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
