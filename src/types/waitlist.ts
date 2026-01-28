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
  uiTree: any; // json-render tree structure
  summaryPoints: string[];
  shouldContinue: boolean;
  selectedOptions?: string[]; // For tracking user selections
};

export type NotionSubmission = {
  email: string;
  messages: Message[];
  summaryPoints: string[];
};
