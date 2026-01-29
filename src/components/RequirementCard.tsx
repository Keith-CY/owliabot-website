'use client'

import { motion } from 'framer-motion';
import type { ConfirmedRequirement } from '@/types/building';

type RequirementCardProps = {
  requirement: ConfirmedRequirement;
  index: number;
  onRemove: (id: string) => void;
  removeLabel: string;
};

export default function RequirementCard({
  requirement,
  index,
  onRemove,
  removeLabel,
}: RequirementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-border bg-surface/50 px-4 py-3"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-foreground/10 text-foreground text-xs font-semibold">
          {index + 1}
        </div>
        <p className="flex-1 text-sm text-foreground leading-relaxed">
          {requirement.summary}
        </p>
        <button
          type="button"
          onClick={() => onRemove(requirement.id)}
          className="rounded-full p-1.5 text-foreground/50 transition hover:text-foreground"
          aria-label={removeLabel}
          title={removeLabel}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="h-4 w-4 stroke-current"
            strokeWidth="1.8"
          >
            <path d="M6 6l8 8M14 6l-8 8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
