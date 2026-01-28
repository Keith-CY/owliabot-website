'use client'

import { useState } from 'react';
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import ConversationArea from './ConversationArea';
import SummaryView from './SummaryView';
import SuccessView from './SuccessView';
import RequirementCard from './RequirementCard';
import { submitUserMessage, submitToNotion, summarizeRequirement } from '@/app/actions/waitlist';
import type { Message, ConversationStage, ConfirmedRequirement } from '@/types/waitlist';

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
  const [uiTrees, setUiTrees] = useState<any[]>([]);
  const [summaryPoints, setSummaryPoints] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmedRequirements, setConfirmedRequirements] = useState<ConfirmedRequirement[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Message[]>([]);
  const [isInConversation, setIsInConversation] = useState(false);

  const handleSendMessage = async (userInput: string, selections?: string[]) => {
    // Add user message with selections
    const userMessage: Message = {
      role: 'user',
      content: userInput,
      timestamp: Date.now(),
      selectedOptions: selections && selections.length > 0 ? selections : undefined,
    };

    const newConversation = [...currentConversation, userMessage];
    setCurrentConversation(newConversation);
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Set isInConversation to true after first message
    if (currentConversation.length === 0) {
      setIsInConversation(true);
    }

    try {
      console.log('[Waitlist] Calling submitUserMessage with:', { messages: newConversation, userInput, selections });
      const aiResponse = await submitUserMessage(newConversation, userInput, selections);
      console.log('[Waitlist] AI response received:', aiResponse);

      // Add AI message
      const aiMessage: Message = {
        role: 'assistant',
        content: JSON.stringify(aiResponse.summaryPoints),
        timestamp: Date.now(),
      };

      setCurrentConversation((prev) => [...prev, aiMessage]);
      setMessages((prev) => [...prev, aiMessage]);
      setUiTrees((prev) => [...prev, aiResponse.uiTree]);
      setSummaryPoints(aiResponse.summaryPoints);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: '抱歉，发生了错误。请稍后再试。',
        timestamp: Date.now(),
      };
      setCurrentConversation((prev) => [...prev, errorMessage]);
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmRequirement = async () => {
    if (currentConversation.length === 0) return;

    setIsLoading(true);
    try {
      // Get AI summary of the conversation
      const summary = await summarizeRequirement(currentConversation);

      // Create confirmed requirement
      const newRequirement: ConfirmedRequirement = {
        id: `req-${Date.now()}`,
        summary,
        timestamp: Date.now(),
      };

      // Add to confirmed requirements
      setConfirmedRequirements((prev) => [...prev, newRequirement]);

      // Clear current conversation
      setCurrentConversation([]);
      setIsInConversation(false);
    } catch (error) {
      console.error('Error confirming requirement:', error);
      alert('确认需求失败，请稍后再试。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    // If in conversation, prevent completion
    if (isInConversation) {
      alert('请先确认当前需求');
      return;
    }

    // If no confirmed requirements, prevent completion
    if (confirmedRequirements.length === 0) {
      alert('请至少添加一个需求');
      return;
    }

    setStage('SUMMARY');
  };

  const handleEmailSubmit = async (email: string) => {
    setIsLoading(true);
    try {
      await submitToNotion({
        email,
        messages,
        confirmedRequirements,
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
        id="building"
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
              {waitlist.privacy && (
                <p className="text-pretty text-xs text-foreground/60">
                  {waitlist.privacy}
                </p>
              )}
              {waitlist.note && (
                <p className="text-pretty text-xs text-foreground/60">
                  {waitlist.note}
                </p>
              )}

              {confirmedRequirements.length > 0 && (
                <div className="flex flex-col gap-2">
                  {confirmedRequirements.map((req, index) => (
                    <RequirementCard
                      key={req.id}
                      requirement={req}
                      index={index}
                    />
                  ))}
                </div>
              )}

              <ConversationArea
                messages={currentConversation}
                uiTrees={uiTrees}
                isLoading={isLoading}
                isInConversation={isInConversation}
                hasConfirmedRequirements={confirmedRequirements.length > 0}
                onSendMessage={handleSendMessage}
                onConfirmRequirement={handleConfirmRequirement}
                onComplete={handleComplete}
              />
            </>
          )}

          {stage === 'SUMMARY' && (
            <SummaryView
              confirmedRequirements={confirmedRequirements}
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
