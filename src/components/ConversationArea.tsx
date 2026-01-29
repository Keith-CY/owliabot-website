'use client'

import { useState, useRef, useEffect } from 'react';
import type { Message as MessageType, UITreeNode } from '@/types/waitlist';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import { useWaitlist } from '@/contexts/WaitlistContext';

type ConversationAreaProps = {
  messages: MessageType[];
  uiTrees: UITreeNode[];
  isLoading: boolean;
  isInConversation: boolean;
  hasConfirmedRequirements: boolean;
  inputCopy: {
    placeholderInitial: string;
    placeholderFollowup: string;
    placeholderAdditional: string;
    send: string;
    confirmCurrent: string;
    complete: string;
  };
  onSendMessage: (message: string, selections?: string[]) => void;
  onConfirmRequirement: () => void;
  onComplete: () => void;
};

export default function ConversationArea({
  messages,
  uiTrees,
  isLoading,
  isInConversation,
  hasConfirmedRequirements,
  inputCopy,
  onSendMessage,
  onConfirmRequirement,
  onComplete,
}: ConversationAreaProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { selectedOptions } = useWaitlist();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      // Include selected options with the message
      const selections = Array.from(selectedOptions);
      onSendMessage(input.trim(), selections);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Messages */}
      {messages.length > 0 && (
        <div className="flex flex-col gap-3 max-h-96 overflow-y-auto px-2">
          {messages.map((message, index) => {
            // Calculate AI message index for uiTree lookup
            const aiMessageIndex = messages
              .slice(0, index + 1)
              .filter(m => m.role === 'assistant')
              .length - 1;
            const uiTree = message.role === 'assistant' && aiMessageIndex >= 0
              ? uiTrees[aiMessageIndex]
              : undefined;

            return (
              <Message
                key={`${message.timestamp}-${index}`}
                message={message}
                uiTree={uiTree}
              />
            );
          })}
          {isLoading && (
            <div className="flex justify-start">
              <TypingIndicator />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            !hasConfirmedRequirements && messages.length === 0
              ? inputCopy.placeholderInitial
              : isInConversation
                ? inputCopy.placeholderFollowup
                : inputCopy.placeholderAdditional
          }
          disabled={isLoading}
          rows={3}
          className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 disabled:opacity-50 resize-none"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex-1 rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {inputCopy.send}
          </button>

          {isInConversation && (
            <button
              type="button"
              onClick={onConfirmRequirement}
              disabled={isLoading || messages.length === 0}
              className="flex-1 rounded-full border-2 border-foreground px-6 py-2.5 text-sm font-semibold text-foreground transition hover:bg-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {inputCopy.confirmCurrent}
            </button>
          )}

          {!isInConversation && hasConfirmedRequirements && (
            <button
              type="button"
              onClick={onComplete}
              disabled={isLoading}
              className="flex-1 rounded-full border-2 border-foreground px-6 py-2.5 text-sm font-semibold text-foreground transition hover:bg-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {inputCopy.complete}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
