'use client'

import { useState } from 'react';
import type { ConfirmedRequirement } from '@/types/building';

type BuildingSummaryProps = {
  confirmedRequirements: ConfirmedRequirement[];
  copy: {
    title: string;
    back: string;
    telegramLabel: string;
    telegramPlaceholder: string;
    submit: string;
    submitting: string;
  };
  onBack: () => void;
  onSubmit: (telegramId: string) => void;
  isLoading: boolean;
};

export default function BuildingSummary({
  confirmedRequirements,
  copy,
  onBack,
  onSubmit,
  isLoading,
}: BuildingSummaryProps) {
  const [telegramId, setTelegramId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (telegramId.trim() && !isLoading) {
      onSubmit(telegramId.trim());
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Summary Points */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-foreground/5"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="h-3.5 w-3.5 stroke-current"
              strokeWidth="2"
            >
              <path d="M12.5 4.5L7.5 10l5 5.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{copy.back}</span>
          </button>
          <h3 className="text-lg font-semibold text-foreground">
            {copy.title}
          </h3>
        </div>
        <ul className="flex flex-col gap-2">
          {confirmedRequirements.map((req, index) => (
            <li
              key={req.id}
              className="flex items-start gap-3 text-sm text-foreground/80"
            >
              <span className="font-semibold text-foreground">{index + 1}.</span>
              <span className="flex-1">{req.summary}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Telegram ID Input */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="telegramId" className="text-sm font-semibold text-foreground">
          {copy.telegramLabel}
        </label>
        <input
          id="telegramId"
          type="text"
          value={telegramId}
          onChange={(e) => setTelegramId(e.target.value)}
          placeholder={copy.telegramPlaceholder}
          required
          disabled={isLoading}
          className="w-full rounded-full border border-border bg-background px-6 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!telegramId.trim() || isLoading}
          className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? copy.submitting : copy.submit}
        </button>
      </form>
    </div>
  );
}
