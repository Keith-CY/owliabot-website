'use client'

import { ComponentType } from 'react';
import { useWaitlist } from '@/contexts/WaitlistContext';
import type { ComponentRenderProps } from '@json-render/react';

export const Text: ComponentType<ComponentRenderProps> = ({ element }) => {
  console.log('[Text Component] Rendering:', element);
  return (
    <div className="text-sm text-foreground/90 whitespace-pre-wrap">
      {element.props.content}
    </div>
  );
};

export const CheckboxGroup: ComponentType<ComponentRenderProps> = ({ element }) => {
  console.log('[CheckboxGroup Component] Rendering:', element);
  const { label, options } = element.props;
  const { selectedOptions, toggleOption } = useWaitlist();

  return (
    <div className="flex flex-col gap-3 my-4">
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <div className="flex flex-col gap-2">
        {options.map((option: { id: string; label: string }) => (
          <label
            key={option.id}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              name="waitlist-options"
              value={option.id}
              checked={selectedOptions.has(option.id)}
              onChange={() => toggleOption(option.id)}
              className="w-4 h-4 rounded border-border bg-background text-foreground focus:ring-2 focus:ring-foreground/20 cursor-pointer"
            />
            <span className="text-sm text-foreground/80 group-hover:text-foreground">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export const Question: ComponentType<ComponentRenderProps> = ({ element }) => {
  console.log('[Question Component] Rendering:', element);
  return (
    <div className="text-sm font-medium text-foreground/90 mt-2">
      {element.props.text}
    </div>
  );
};

export const waitlistRegistry = {
  Text,
  CheckboxGroup,
  Question,
};
