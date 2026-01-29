'use client'

import { motion } from 'framer-motion';

type SuccessCopy = {
  title: string;
  body: string;
  note: string;
};

export default function SuccessView({ copy }: { copy: SuccessCopy }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-4 py-8 text-center"
    >
      <div className="text-4xl">✓</div>
      <h3 className="text-xl font-semibold text-foreground">
        {copy.title}
      </h3>
      <p className="text-sm text-foreground/70 max-w-md">
        {copy.body}
      </p>
      <p className="text-xs text-foreground/60 mt-4">
        {copy.note}
      </p>
    </motion.div>
  );
}
