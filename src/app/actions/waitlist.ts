'use server'

import { GoogleGenerativeAI } from '@google/generative-ai';
import { Client } from '@notionhq/client';
import { Message, AIResponse, NotionSubmission } from '@/types/waitlist';

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
      model: "gemini-2.5-flash-lite",
      systemInstruction: SYSTEM_PROMPT,
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

    // Create chat with history
    const chat = model.startChat({
      history: conversationHistory,
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
