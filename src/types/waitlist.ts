export type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

export type ConversationStage = 'EXPLORING' | 'SUMMARY' | 'EMAIL_INPUT' | 'SUCCESS';

export type ConversationState = {
  stage: ConversationStage;
  messages: Message[];
  summaryPoints: string[];
  isLoading: boolean;
  email: string;
};

export type AIResponse = {
  reply: string;
  summaryPoints: string[];
  shouldContinue: boolean;
};

export type NotionSubmission = {
  email: string;
  messages: Message[];
  summaryPoints: string[];
};
