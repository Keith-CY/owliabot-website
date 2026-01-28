'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from './Reveal';
import { cn } from '@/lib/utils';
import { ShieldCheck, MessageCircle, TrendingUp } from 'lucide-react';

type Message = {
    role: 'user' | 'assistant';
    content: string;
    type?: 'alert' | 'info' | 'success';
    actions?: ReadonlyArray<string>;
};

type Scenario = {
    id: string;
    label: string;
    messages: ReadonlyArray<Message>;
};

type HeroIllustrationProps = {
    data: {
        scenarios: ReadonlyArray<Scenario>;
    };
};

export default function HeroIllustration({ data }: HeroIllustrationProps) {
    const [activeTab, setActiveTab] = useState(0);
    const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentScenario = data.scenarios[activeTab];

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [visibleMessages]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        let messageIndex = 0;

        // Reset when tab changes
        setVisibleMessages([]);
        messageIndex = 0;

        const playScenario = () => {
            if (!isAutoPlaying) return;

            if (messageIndex < currentScenario.messages.length) {
                const nextMsg = currentScenario.messages[messageIndex];
                if (!nextMsg) return;

                // Add next message
                setVisibleMessages((prev) => [...prev, nextMsg]);

                // Calculate delay based on message length or type
                const currentMsg = currentScenario.messages[messageIndex];
                const delay = currentMsg.role === 'user' ? 800 : 1500;

                messageIndex++;
                timeoutId = setTimeout(playScenario, delay);
            } else {
                // Scenario finished, wait 3s then switch tab
                timeoutId = setTimeout(() => {
                    setActiveTab((prev) => (prev + 1) % data.scenarios.length);
                }, 3000);
            }
        };

        // Start slightly delayed
        timeoutId = setTimeout(playScenario, 500);

        return () => clearTimeout(timeoutId);
    }, [activeTab, isAutoPlaying, currentScenario, data.scenarios.length]);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        setIsAutoPlaying(false); // Stop auto-rotation on user interaction
        // Determine if we should restart the sequence immediately or not if clicked.
        // Ideally if clicked, we show the full history or restart? 
        // Let's restart the sequence for that tab to show the "flow".
        // But since auto-play is off, we need a manual way to advance or just show all?
        // User said: "If user doesn't click, auto switch after 3s".
        // Implies if user clicks, they want to see THAT scenario.
        // Let's keep playing the scenario but stop the *tab rotation*.
        setIsAutoPlaying(true); // Actually user just wants to control the tab, the flow inside should probably still play?
        // "If user doesn't click... auto switch to NEXT STATE" implies auto-TAB-switching.
        // The message flow within a tab is an animation of that state.
        // So let's keep playing messages, just cancel the *tab switch* timer?
        // Actually simplicity: Just reset state and let it play. 
        // I will add a ref to track if "user intervened" to stop the 3s global rotation.
    };

    // Improved Logic:
    // 1. "Auto Rotation" switches tabs.
    // 2. "Message Flow" happens within a tab.
    // 3. User click on tab -> Switch tab, Restart Flow, RESET auto-switch timer (or pause it? User said "If user doesn't click... auto switch").
    // Let's make it simple: User click pauses the *tab rotation* cycle effectively because we reset the flow. 
    // But strictly speaking, if I click tab 2, I want to see tab 2. After tab 2 finishes, should it go to 3? 
    // User says "If user doesn't click, then ... auto switch". So if I click, maybe it stays?
    // Let's stick to: Always play flow. If auto-rotate is enabled (default), switch tab after flow. 
    // If user clicks, maybe we disable auto-rotate globally? "Stop auto-play on interaction" is a common pattern.

    // Let's try: User click sets active tab. Flow restarts. Auto-rotate timer is cancelled for that cycle? 
    // Let's just keep simple:
    // Effect runs on `activeTab`. It plays messages. When done, if `isAutoPlaying`, it waits 3s then sets `activeTab + 1`.
    // If user clicks tab, `activeTab` updates, Effect re-runs. 
    // So changing tab manually *does* restart the flow and the timer.
    // The only question is: should we disable `isAutoPlaying` on click?
    // "If user doesn't click... auto switch".
    // I will interpret this as: Interactive mode stops auto-rotation? 
    // Or just "It auto plays by default".
    // I'll keep it auto-playing even after click, just resetting the cycle. It feels more alive.

    return (
        <div className="w-full">
            <Reveal delay={0.22}>
                <div className="flex flex-col gap-4">
                    {/* Top Tabs */}
                    <div className="flex items-center justify-center gap-2">
                        {data.scenarios.map((scenario, index) => {
                            const isActive = activeTab === index;
                            const Icon = index === 0 ? ShieldCheck : index === 1 ? MessageCircle : TrendingUp; // Simple icon mapping based on index

                            return (
                                <button
                                    key={scenario.id}
                                    onClick={() => handleTabClick(index)}
                                    className={cn(
                                        "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300",
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-lg scale-105"
                                            : "bg-surface/50 text-foreground/60 hover:bg-surface hover:text-foreground"
                                    )}
                                >
                                    <Icon className="h-3.5 w-3.5" />
                                    {scenario.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Chat Container */}
                    <div className="relative mx-auto w-full max-w-[400px] overflow-hidden rounded-[32px] border border-border/40 bg-[#0E1621] shadow-2xl">
                        {/* Telegram Header */}
                        <div className="flex items-center gap-3 border-b border-white/5 bg-[#17212B] px-4 py-3">
                            <div className="flex size-9 items-center justify-center rounded-full bg-white font-bold text-white overflow-hidden">
                                <img src="/owliabot.svg" alt="OwliaBot" className="h-6 w-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-white">OwliaBot</span>
                                <span className="text-[10px] text-blue-400">bot</span>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={containerRef}
                            className="flex h-[420px] flex-col gap-4 overflow-y-auto px-4 py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        >
                            <AnimatePresence mode="popLayout">
                                {visibleMessages.map((msg, i) => (
                                    <motion.div
                                        key={`${activeTab}-${i}`}
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.2 }}
                                        className={cn(
                                            "flex w-full max-w-[85%]",
                                            msg.role === 'user' ? "self-end justify-end" : "self-start justify-start"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                                                msg.role === 'user'
                                                    ? "bg-[#2B5278] text-white rounded-br-sm"
                                                    : "bg-[#182533] text-white rounded-bl-sm"
                                            )}
                                        >
                                            {/* Message Content with line breaks */}
                                            <div className="whitespace-pre-wrap">{msg.content}</div>

                                            {/* Alert / Type styling */}
                                            {msg.type && (
                                                <div className={cn(
                                                    "mt-2 rounded-lg border p-2 text-xs",
                                                    msg.type === 'alert' ? "border-red-500/30 bg-red-500/10 text-red-200" :
                                                        msg.type === 'success' ? "border-green-500/30 bg-green-500/10 text-green-200" :
                                                            "border-blue-500/30 bg-blue-500/10 text-blue-200"
                                                )}>
                                                    {msg.type === 'alert' && "⚠️ High Risk"}
                                                    {msg.type === 'success' && "💰 Opportunity"}
                                                    {msg.type === 'info' && "ℹ️ Update"}
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            {msg.actions && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {msg.actions.map((action, idx) => (
                                                        <button
                                                            key={idx}
                                                            className="w-full rounded-lg bg-[#2B5278]/50 px-3 py-2 text-center text-xs font-medium text-blue-300 transition hover:bg-[#2B5278]"
                                                        >
                                                            {action}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Timestamp (fake) */}
                                            <div className="mt-1 flex justify-end">
                                                <span className="text-[9px] opacity-40">
                                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Input Area (Mock) */}
                        <div className="border-t border-white/5 bg-[#17212B] px-4 py-3">
                            <div className="h-9 w-full rounded-full bg-[#0E1621] px-4 py-2 text-xs text-white/30">
                                Message...
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    );
}
