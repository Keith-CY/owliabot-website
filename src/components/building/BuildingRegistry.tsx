'use client'

import { ComponentType } from 'react';
import { useBuilding } from '@/contexts/BuildingContext';
import type { ComponentRenderProps } from '@json-render/react';

export const Text: ComponentType<ComponentRenderProps> = ({ element }) => {
  return (
    <div className="text-sm text-foreground/90 whitespace-pre-wrap">
      {element.props.content as string}
    </div>
  );
};

export const CheckboxGroup: ComponentType<ComponentRenderProps> = ({ element }) => {
  const { label, options } = element.props as { label: string; options: { id: string; label: string }[] };
  const { selectedOptions, toggleOption } = useBuilding();

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
              name="building-options"
              value={option.label}
              checked={selectedOptions.has(option.label)}
              onChange={() => toggleOption(option.label)}
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
  return (
    <div className="text-sm font-medium text-foreground/90 mt-2">
      {element.props.text as string}
    </div>
  );
};

export const buildingRegistry = {
  Text,
  CheckboxGroup,
  Question,
};
