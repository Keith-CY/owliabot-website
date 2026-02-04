'use client'

import { useEffect, useState } from 'react';
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import ConversationArea from './ConversationArea';
import BuildingSummary from './BuildingSummary';
import BuildingSuccess from './BuildingSuccess';
import RequirementCard from './RequirementCard';
import { submitUserMessage, submitToNotion, summarizeRequirement } from '@/app/actions/waitlist';
import type { Message, ConversationStage, ConfirmedRequirement, UITreeNode } from '@/types/building';
import { BuildingProvider, useBuilding } from '@/contexts/BuildingContext';

type BuildingProps = {
  lang: "en" | "zh";
  building: {
    eyebrow: string;
    title: string;
    body: string;
    privacy: string;
    note: string;
    prompts: {
      noticeMultiple: string;
      noticeQueued: string;
      refineHint: string;
      unclearFallback: string;
      confirmError: string;
      confirmRequired: string;
      requireAtLeastOne: string;
    };
    input: {
      placeholderInitial: string;
      placeholderFollowup: string;
      placeholderAdditional: string;
      send: string;
      confirmCurrent: string;
      complete: string;
    };
    summary: {
      title: string;
      back: string;
      telegramLabel: string;
      telegramPlaceholder: string;
      submit: string;
      submitting: string;
    };
    success: {
      title: string;
      body: string;
      note: string;
    };
  };
};

type PendingRequirement = {
  title: string;
  summary: string;
};

function BuildingInner({ building, lang }: BuildingProps) {
  const [stage, setStage] = useState<ConversationStage>('EXPLORING');
  const [messages, setMessages] = useState<Message[]>([]);
  const [uiTrees, setUiTrees] = useState<UITreeNode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmedRequirements, setConfirmedRequirements] = useState<ConfirmedRequirement[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Message[]>([]);
  const [isInConversation, setIsInConversation] = useState(false);
  const [baseIntent, setBaseIntent] = useState<string | null>(null);
  const [pendingRequirements, setPendingRequirements] = useState<PendingRequirement[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const { clearSelections } = useBuilding();
  const prompts = building.prompts;
  const storageKey = 'owliabot:building-cache';
  const removeLabel = lang === 'zh' ? '删除需求' : 'Remove requirement';

  useEffect(() => {
    try {
      const cached = localStorage.getItem(storageKey);
      if (!cached) return;
      const parsed = JSON.parse(cached);
      if (!parsed || typeof parsed !== 'object') return;
      if (Array.isArray(parsed.confirmedRequirements)) {
        setConfirmedRequirements(parsed.confirmedRequirements as ConfirmedRequirement[]);
      }
      if (Array.isArray(parsed.messages)) {
        setMessages(parsed.messages as Message[]);
      }
      if (Array.isArray(parsed.currentConversation)) {
        setCurrentConversation(parsed.currentConversation as Message[]);
      }
      if (Array.isArray(parsed.uiTrees)) {
        setUiTrees(parsed.uiTrees as UITreeNode[]);
      }
      if (Array.isArray(parsed.pendingRequirements)) {
        setPendingRequirements(parsed.pendingRequirements as PendingRequirement[]);
      }
      if (typeof parsed.baseIntent === 'string' || parsed.baseIntent === null) {
        setBaseIntent(parsed.baseIntent as string | null);
      }
      if (typeof parsed.isInConversation === 'boolean') {
        setIsInConversation(parsed.isInConversation);
      }
      if (parsed.stage === 'EXPLORING' || parsed.stage === 'SUMMARY' || parsed.stage === 'EMAIL_INPUT') {
        setStage(parsed.stage as ConversationStage);
      }
    } catch (error) {
      console.warn('Failed to load cached building state:', error);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (stage === 'SUCCESS') {
        localStorage.removeItem(storageKey);
        return;
      }
      const payload = {
        stage,
        messages,
        uiTrees,
        confirmedRequirements,
        currentConversation,
        isInConversation,
        baseIntent,
        pendingRequirements,
      };
      localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch (error) {
      console.warn('Failed to cache building state:', error);
    }
  }, [
    stage,
    messages,
    uiTrees,
    confirmedRequirements,
    currentConversation,
    isInConversation,
    baseIntent,
    pendingRequirements,
    isHydrated,
  ]);

  const sanitizeUiTree = (
    uiTree: UITreeNode | undefined,
    intentType: string,
    clarifyQuestion?: string
  ) => {
    if (!uiTree?.children) return uiTree;
    // Keep AI-generated questions as-is (no longer overriding with refineHint)
    // Only add clarifyQuestion if unclear and no questions exist
    const hasQuestion = uiTree.children.some((child) => child.type === 'Question');
    if (intentType === 'unclear' && !hasQuestion && clarifyQuestion) {
      return {
        ...uiTree,
        children: [
          ...uiTree.children,
          {
            type: 'Question',
            props: { text: clarifyQuestion },
          },
        ],
      };
    }
    return uiTree;
  };

  const buildStructuredInput = (base: string, newInput: string, locale: "en" | "zh", round: number) => {
    return `[Locale] ${locale}\n[BaseIntent] ${base}\n[SelectedOptions] 忽略\n[NewInput] ${newInput}\n[Round] ${round}`;
  };

  const handleSendMessage = async (
    userInput: string,
    baseIntentOverride?: string,
    forceNewConversation = false,
    allowSplit = true
  ) => {
    const activeBaseIntent = baseIntentOverride ?? baseIntent ?? userInput;
    const userMessage: Message = {
      role: 'user',
      content: userInput,
      timestamp: Date.now(),
    };

    const isNewConversation = forceNewConversation || currentConversation.length === 0;
    const newConversation = isNewConversation ? [userMessage] : [...currentConversation, userMessage];
    setCurrentConversation(newConversation);
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Set isInConversation to true after first message
    if (isNewConversation) {
      setIsInConversation(true);
      setBaseIntent(activeBaseIntent);
    }

    try {
      // Calculate round number (count of user messages in this conversation)
      const round = newConversation.filter(m => m.role === 'user').length;
      const structuredInput = buildStructuredInput(activeBaseIntent, userInput, lang, round);
      const aiResponse = await submitUserMessage(newConversation, structuredInput);

      const intentType = aiResponse.intentType ?? 'refine';
      const requirements = aiResponse.requirements ?? [];
      if (isNewConversation && allowSplit && requirements.length > 0) {
        const [first, ...rest] = requirements;
        if (rest.length > 0) {
          setPendingRequirements(rest);
          const firstText = first?.summary || first?.title || userInput;
          setBaseIntent(firstText);
          const noticeText = prompts.noticeMultiple;
          const noticeUiTree: UITreeNode = {
            type: 'root',
            children: [{ type: 'Text', props: { content: noticeText } }],
          };
          const noticeMessage: Message = {
            role: 'assistant',
            content: noticeText,
            timestamp: Date.now(),
          };
          setCurrentConversation((prev) => [...prev, noticeMessage]);
          setMessages((prev) => [...prev, noticeMessage]);
          setUiTrees((prev) => [...prev, noticeUiTree]);
          const followupInput = buildStructuredInput(firstText, firstText, lang, 1);
          const followupResponse = await submitUserMessage(newConversation, followupInput);
          const followupIntent = followupResponse.intentType ?? 'refine';
          const followupUiTree = sanitizeUiTree(
            followupResponse.uiTree,
            followupIntent,
            followupResponse.clarifyQuestion
          );
          const followupMessage: Message = {
            role: 'assistant',
            content: JSON.stringify(followupResponse.summaryPoints ?? []),
            timestamp: Date.now(),
          };
          setCurrentConversation((prev) => [...prev, followupMessage]);
          setMessages((prev) => [...prev, followupMessage]);
          if (followupUiTree) {
            setUiTrees((prev) => [...prev, followupUiTree]);
          }
          return;
        }
        if (first?.summary || first?.title) {
          setBaseIntent(first.summary || first.title);
        }
      }

      if (intentType === 'new' && isInConversation) {
        const queuedRequirements = requirements.length > 0
          ? requirements
          : [{ title: userInput, summary: userInput }];
        setPendingRequirements((prev) => [...prev, ...queuedRequirements]);
        setCurrentConversation((prev) => prev.slice(0, -1));
        const queuedText = prompts.noticeQueued;
          const queuedUiTree: UITreeNode = {
            type: 'root',
            children: [{ type: 'Text', props: { content: queuedText } }],
          };
        const queuedMessage: Message = {
          role: 'assistant',
          content: queuedText,
          timestamp: Date.now(),
        };
        setCurrentConversation((prev) => [...prev, queuedMessage]);
        setMessages((prev) => [...prev, queuedMessage]);
        setUiTrees((prev) => [...prev, queuedUiTree]);
        return;
      }

      const sanitizedUiTree = sanitizeUiTree(
        aiResponse.uiTree,
        intentType,
        aiResponse.clarifyQuestion
      );

      // Add AI message
      const aiMessage: Message = {
        role: 'assistant',
        content: JSON.stringify(aiResponse.summaryPoints),
        timestamp: Date.now(),
      };

      setCurrentConversation((prev) => [...prev, aiMessage]);
      setMessages((prev) => [...prev, aiMessage]);
      if (sanitizedUiTree) {
        setUiTrees((prev) => [...prev, sanitizedUiTree]);
      }
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
    let nextRequirementSeed: string | null = null;
    try {
      // Always use AI summarization (no more checkbox selections)
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
      setUiTrees([]);
      setIsInConversation(false);
      clearSelections();

      if (pendingRequirements.length > 0) {
        const [next, ...rest] = pendingRequirements;
        setPendingRequirements(rest);
        nextRequirementSeed = next.summary || next.title;
      } else {
        setBaseIntent(null);
      }
    } catch (error) {
      console.error('Error confirming requirement:', error);
      alert(prompts.confirmError);
    } finally {
      setIsLoading(false);
      if (nextRequirementSeed) {
        handleSendMessage(nextRequirementSeed, nextRequirementSeed, true, false);
      }
    }
  };

  const handleComplete = () => {
    // If in conversation, prevent completion
    if (isInConversation) {
      alert(prompts.confirmRequired);
      return;
    }

    // If no confirmed requirements, prevent completion
    if (confirmedRequirements.length === 0) {
      alert(prompts.requireAtLeastOne);
      return;
    }

    setStage('SUMMARY');
  };

  const handleTelegramSubmit = async (telegramId: string) => {
    setIsLoading(true);
    try {
      await submitToNotion({
        telegramId,
        messages,
        confirmedRequirements,
      });
      try {
        localStorage.removeItem(storageKey);
      } catch (error) {
        console.warn('Failed to clear cached building state:', error);
      }
      setConfirmedRequirements([]);
      setMessages([]);
      setCurrentConversation([]);
      setUiTrees([]);
      setPendingRequirements([]);
      setBaseIntent(null);
      setIsInConversation(false);
      setStage('SUCCESS');
    } catch (error) {
      console.error('Error submitting to Notion:', error);
      alert('提交失败，请稍后再试。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToConversation = () => {
    setStage('EXPLORING');
  };

  const handleRemoveRequirement = (id: string) => {
    setConfirmedRequirements((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <Reveal>
      <section
        id="building"
        className="scroll-mt-24 rounded-[34px] border border-border bg-surface/70 px-8 py-12 shadow-[0_10px_24px_rgba(4,6,10,0.06),_inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur dark:shadow-[0_10px_24px_rgba(4,6,10,0.12),_inset_0_1px_0_rgba(255,255,255,0.14)] sm:scroll-mt-28"
      >
        <div className="flex flex-col gap-6">
          <SectionHeader
            eyebrow={building.eyebrow}
            title={building.title}
            subtitle={building.body}
            withDecoration={false}
          />

          {stage === 'EXPLORING' && (
            <>
              {building.privacy && (
                <p className="text-pretty text-xs text-foreground/60">
                  {building.privacy}
                </p>
              )}
              {building.note && (
                <p className="text-pretty text-xs text-foreground/60">
                  {building.note}
                </p>
              )}

              {confirmedRequirements.length > 0 && (
                <div className="flex flex-col gap-2">
                  {confirmedRequirements.map((req, index) => (
                    <RequirementCard
                      key={req.id}
                      requirement={req}
                      index={index}
                      onRemove={handleRemoveRequirement}
                      removeLabel={removeLabel}
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
                inputCopy={building.input}
                onSendMessage={handleSendMessage}
                onConfirmRequirement={handleConfirmRequirement}
                onComplete={handleComplete}
              />
            </>
          )}

          {stage === 'SUMMARY' && (
            <BuildingSummary
              confirmedRequirements={confirmedRequirements}
              copy={building.summary}
              onBack={handleBackToConversation}
              onSubmit={handleTelegramSubmit}
              isLoading={isLoading}
            />
          )}

          {stage === 'SUCCESS' && <BuildingSuccess copy={building.success} />}
        </div>
      </section>
    </Reveal>
  );
}

export default function Building(props: BuildingProps) {
  return (
    <BuildingProvider>
      <BuildingInner {...props} />
    </BuildingProvider>
  );
}
