'use server'

import { GoogleGenerativeAI } from '@google/generative-ai';
import { Client } from '@notionhq/client';
import { Message, AIResponse, NotionSubmission } from '@/types/waitlist';

const SYSTEM_PROMPT = `你是 OwliaBot 的需求收集助手。你的目标是快速理解用户的真实需求。

工作流程：
1. 第一次回复：将用户输入总结成1-3个需求要点，然后提供3-5个相关的多选项，让用户勾选感兴趣的功能
2. 后续回复：根据用户的选择和补充，询问"还有其他需求吗？"
3. 不要过度追问细节，保持简洁高效

可用组件：
- Text: 显示文本消息
- CheckboxGroup: 多选框组（options 数组包含 id 和 label）
- Question: 显示问题

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
      { "type": "Question", "props": { "text": "还有其他需求吗？" } }
    ]
  },
  "summaryPoints": ["要点1", "要点2"],
  "shouldContinue": true
}`;


export async function submitUserMessage(
  messages: Message[],
  userInput: string,
  selections?: string[]
): Promise<AIResponse> {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
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

    // Include selections in current message
    let currentInput = userInput;
    if (selections && selections.length > 0) {
      currentInput += `\n\n[用户选择了: ${selections.join(', ')}]`;
    }

    const result = await chat.sendMessage(currentInput);
    const responseText = result.response.text();

    // Log the raw response for debugging
    console.log('AI raw response:', responseText);

    // Try to extract JSON from response (handle markdown code blocks)
    let jsonText = responseText.trim();

    // Remove markdown code blocks if present
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
    }

    // Try to find JSON object
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Failed to find JSON in response:', responseText);
      throw new Error('AI response is not valid JSON');
    }

    const aiResponse: AIResponse = JSON.parse(jsonMatch[0]);
    return aiResponse;
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
