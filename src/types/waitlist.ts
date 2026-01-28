export type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  selectedOptions?: string[]; // For user messages with checkbox selections
};

export type ConfirmedRequirement = {
  id: string;
  summary: string; // AI-generated concise description
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
  summary?: string; // For summarization mode
};

export type NotionSubmission = {
  email: string;
  messages: Message[];
  confirmedRequirements: ConfirmedRequirement[]; // Changed from summaryPoints
};
