'use client'

import { ComponentType } from 'react';
import type { ComponentRenderProps } from '@json-render/react';

export const Text: ComponentType<ComponentRenderProps> = ({ element }) => {
  return (
    <div className="text-sm text-foreground/90 whitespace-pre-wrap">
      {element.props.content as string}
    </div>
  );
};

export const Question: ComponentType<ComponentRenderProps> = ({ element }) => {
  return (
    <div className="text-sm font-medium text-foreground/90 mt-3 pl-3 border-l-2 border-accent/50">
      {element.props.text as string}
    </div>
  );
};

export const buildingRegistry = {
  Text,
  Question,
};
