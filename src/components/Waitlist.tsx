'use client'

import { useState } from 'react';
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import ConversationArea from './ConversationArea';
import SummaryView from './SummaryView';
import SuccessView from './SuccessView';
import RequirementCard from './RequirementCard';
import { submitUserMessage, submitToNotion, summarizeRequirement } from '@/app/actions/waitlist';
import type { Message, ConversationStage, ConfirmedRequirement, UITreeNode } from '@/types/waitlist';
import { WaitlistProvider, useWaitlist } from '@/contexts/WaitlistContext';

type WaitlistProps = {
  lang: "en" | "zh";
  waitlist: {
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
      emailLabel: string;
      emailPlaceholder: string;
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

function WaitlistInner({ waitlist, lang }: WaitlistProps) {
  const [stage, setStage] = useState<ConversationStage>('EXPLORING');
  const [messages, setMessages] = useState<Message[]>([]);
  const [uiTrees, setUiTrees] = useState<UITreeNode[]>([]);
  const [summaryPoints, setSummaryPoints] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmedRequirements, setConfirmedRequirements] = useState<ConfirmedRequirement[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Message[]>([]);
  const [isInConversation, setIsInConversation] = useState(false);
  const [baseIntent, setBaseIntent] = useState<string | null>(null);
  const [pendingRequirements, setPendingRequirements] = useState<PendingRequirement[]>([]);
  const { clearSelections, selectedOptions } = useWaitlist();
  const prompts = waitlist.prompts;

  const sanitizeUiTree = (
    uiTree: UITreeNode | undefined,
    intentType: string,
    clarifyQuestion?: string
  ) => {
    if (!uiTree?.children) return uiTree;
    const mappedChildren = uiTree.children.map((child) => {
      if (child.type !== 'Question') return child;
      const childProps =
        child.props && typeof child.props === 'object'
          ? (child.props as Record<string, unknown>)
          : {};
      if (intentType === 'unclear') {
        return {
          ...child,
          props: {
            ...childProps,
            text: clarifyQuestion || childProps.text,
          },
        };
      }
      return {
        ...child,
        props: {
          ...childProps,
          text: prompts.refineHint,
        },
      };
    });
    const hasQuestion = mappedChildren.some((child) => child.type === 'Question');
    if (intentType === 'unclear' && !hasQuestion) {
      mappedChildren.push({
        type: 'Question',
        props: {
          text: clarifyQuestion || prompts.unclearFallback,
        },
      });
    }
    return {
      ...uiTree,
      children: mappedChildren,
    };
  };

  const buildStructuredInput = (base: string, selections: string[], newInput: string, locale: "en" | "zh") => {
    const emptySelection = locale === "zh" ? "无" : "none";
    const selectedText = selections.length > 0 ? selections.join(', ') : emptySelection;
    return `[Locale] ${locale}\n[BaseIntent] ${base}\n[SelectedOptions] ${selectedText}\n[NewInput] ${newInput}`;
  };

  const handleSendMessage = async (
    userInput: string,
    selections: string[] = [],
    baseIntentOverride?: string,
    forceNewConversation = false,
    allowSplit = true
  ) => {
    console.log('[Waitlist] handleSendMessage invoked:', {
      userInput,
      selections,
      currentConversationLength: currentConversation.length,
      currentConversationLastRole: currentConversation.at(-1)?.role,
    });
    const activeBaseIntent = baseIntentOverride ?? baseIntent ?? userInput;
    // Add user message with selections
    const userMessage: Message = {
      role: 'user',
      content: userInput,
      timestamp: Date.now(),
      selectedOptions: selections && selections.length > 0 ? selections : undefined,
    };

    const isNewConversation = forceNewConversation || currentConversation.length === 0;
    const newConversation = isNewConversation ? [userMessage] : [...currentConversation, userMessage];
    console.log('[Waitlist] newConversation prepared:', {
      newConversationLength: newConversation.length,
      newConversationRoles: newConversation.map((m) => m.role),
    });
    setCurrentConversation(newConversation);
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Set isInConversation to true after first message
    if (isNewConversation) {
      setIsInConversation(true);
      setBaseIntent(activeBaseIntent);
    }

    try {
      const structuredInput = buildStructuredInput(activeBaseIntent, selections, userInput, lang);
      console.log('[Waitlist] Calling submitUserMessage with:', { messages: newConversation, userInput, selections });
      const aiResponse = await submitUserMessage(newConversation, structuredInput);
      console.log('[Waitlist] AI response received:', aiResponse);

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
          setSummaryPoints([]);
          const followupInput = buildStructuredInput(firstText, selections, firstText, lang);
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
          setSummaryPoints(followupResponse.summaryPoints ?? []);
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
        setSummaryPoints([]);
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

    console.log('[Waitlist] handleConfirmRequirement invoked:', {
      currentConversationLength: currentConversation.length,
      currentConversationRoles: currentConversation.map((m) => m.role),
      currentConversationLastRole: currentConversation.at(-1)?.role,
    });
    setIsLoading(true);
    let nextRequirementSeed: string | null = null;
    try {
      const selectedLabels = Array.from(
        new Set(
          [
            ...Array.from(selectedOptions),
            ...currentConversation
              .filter((message) => message.role === 'user')
              .flatMap((message) => message.selectedOptions ?? []),
          ].filter(Boolean)
        )
      );
      const summary = selectedLabels.length > 0
        ? selectedLabels.join('、')
        : await summarizeRequirement(currentConversation);

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
      setSummaryPoints([]);
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
        handleSendMessage(nextRequirementSeed, [], nextRequirementSeed, true, false);
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
                inputCopy={waitlist.input}
                onSendMessage={handleSendMessage}
                onConfirmRequirement={handleConfirmRequirement}
                onComplete={handleComplete}
              />
            </>
          )}

          {stage === 'SUMMARY' && (
            <SummaryView
              confirmedRequirements={confirmedRequirements}
              copy={waitlist.summary}
              onSubmit={handleEmailSubmit}
              isLoading={isLoading}
            />
          )}

          {stage === 'SUCCESS' && <SuccessView copy={waitlist.success} />}
        </div>
      </section>
    </Reveal>
  );
}

export default function Waitlist(props: WaitlistProps) {
  return (
    <WaitlistProvider>
      <WaitlistInner {...props} />
    </WaitlistProvider>
  );
}
