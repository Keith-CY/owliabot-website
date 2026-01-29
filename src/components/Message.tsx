'use client'

import { motion } from 'framer-motion';
import { JSONUIProvider } from '@json-render/react';
import type { UIElement } from '@json-render/core';
import type { Message as MessageType, UITreeNode } from '@/types/building';
import { buildingRegistry } from './building/BuildingRegistry';

type MessageProps = {
  message: MessageType;
  uiTree?: UITreeNode; // For AI messages with UI tree
};

export default function Message({ message, uiTree }: MessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${isUser
            ? 'bg-foreground text-background'
            : 'bg-surface border border-border text-foreground'
          }`}
      >
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        ) : uiTree ? (
          <div>
            <JSONUIProvider registry={buildingRegistry}>
              {uiTree.children && uiTree.children.map((child, index) => {
                const Component = buildingRegistry[child.type as keyof typeof buildingRegistry];
                const element = {
                  ...child,
                  key: child.key ?? index,
                } as UIElement<string, Record<string, unknown>>;
                return Component ? (
                  <Component key={element.key} element={element} />
                ) : (
                  <p key={index} style={{ color: 'orange' }}>
                    Unknown component: {child.type}
                  </p>
                );
              })}
            </JSONUIProvider>
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
    </motion.div>
  );
}
