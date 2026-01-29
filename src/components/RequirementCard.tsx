'use client'

import { motion } from 'framer-motion';
import type { ConfirmedRequirement } from '@/types/building';

type RequirementCardProps = {
  requirement: ConfirmedRequirement;
  index: number;
};

export default function RequirementCard({ requirement, index }: RequirementCardProps) {
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
      </div>
    </motion.div>
  );
}
