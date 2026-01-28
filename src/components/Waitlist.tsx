'use client'

import { useState } from 'react';
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import ConversationArea from './ConversationArea';
import SummaryView from './SummaryView';
import SuccessView from './SuccessView';
import { submitUserMessage, submitToNotion } from '@/app/actions/waitlist';
import type { Message, ConversationStage } from '@/types/waitlist';

type WaitlistProps = {
  waitlist: {
    eyebrow: string;
    title: string;
    body: string;
    privacy: string;
    note: string;
  };
};

export default function Waitlist({ waitlist }: WaitlistProps) {
  const [stage, setStage] = useState<ConversationStage>('EXPLORING');
  const [messages, setMessages] = useState<Message[]>([]);
  const [summaryPoints, setSummaryPoints] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);

  const handleSendMessage = async (userInput: string) => {
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: userInput,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await submitUserMessage(messages, userInput);

      // Add AI message
      const aiMessage: Message = {
        role: 'assistant',
        content: aiResponse.reply,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setSummaryPoints(aiResponse.summaryPoints);

      // Show complete button if AI signals ready
      if (!aiResponse.shouldContinue) {
        setShowCompleteButton(true);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: Message = {
        role: 'assistant',
        content: '抱歉，发生了错误。请稍后再试。',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    setStage('SUMMARY');
  };

  const handleEmailSubmit = async (email: string) => {
    setIsLoading(true);
    try {
      await submitToNotion({
        email,
        messages,
        summaryPoints,
      });
      setStage('SUCCESS');
    } catch (error) {
      console.error('Error submitting to Notion:', error);
      alert('提交失败，请稍后再试。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Reveal>
      <section
        id="waitlist"
        className="rounded-[34px] border border-border bg-surface/70 px-8 py-12 shadow-[0_10px_24px_rgba(4,6,10,0.06),_inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur dark:shadow-[0_10px_24px_rgba(4,6,10,0.12),_inset_0_1px_0_rgba(255,255,255,0.14)]"
      >
        <div className="flex flex-col gap-6">
          <SectionHeader
            eyebrow={waitlist.eyebrow}
            title={waitlist.title}
            subtitle={waitlist.body}
            withDecoration={false}
          />

          {stage === 'EXPLORING' && (
            <>
              <p className="text-pretty text-sm font-semibold text-foreground">
                {waitlist.privacy}
              </p>
              <p className="text-pretty text-xs text-foreground/60">
                {waitlist.note}
              </p>
              <ConversationArea
                messages={messages}
                isLoading={isLoading}
                onSendMessage={handleSendMessage}
                onComplete={handleComplete}
                showCompleteButton={showCompleteButton}
              />
            </>
          )}

          {stage === 'SUMMARY' && (
            <SummaryView
              summaryPoints={summaryPoints}
              onSubmit={handleEmailSubmit}
              isLoading={isLoading}
            />
          )}

          {stage === 'SUCCESS' && <SuccessView />}
        </div>
      </section>
    </Reveal>
  );
}
