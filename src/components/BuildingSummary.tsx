'use client'

import { useState } from 'react';
import type { ConfirmedRequirement } from '@/types/building';

type BuildingSummaryProps = {
  confirmedRequirements: ConfirmedRequirement[];
  copy: {
    title: string;
    emailLabel: string;
    emailPlaceholder: string;
    submit: string;
    submitting: string;
  };
  onSubmit: (email: string) => void;
  isLoading: boolean;
};

export default function BuildingSummary({
  confirmedRequirements,
  copy,
  onSubmit,
  isLoading,
}: BuildingSummaryProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && !isLoading) {
      onSubmit(email.trim());
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Summary Points */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-foreground">
          {copy.title}
        </h3>
        <ul className="flex flex-col gap-2">
          {confirmedRequirements.map((req, index) => (
            <li
              key={req.id}
              className="flex gap-3 text-sm text-foreground/80"
            >
              <span className="font-semibold text-foreground">{index + 1}.</span>
              <span>{req.summary}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Email Input */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label htmlFor="email" className="text-sm font-semibold text-foreground">
          {copy.emailLabel}
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={copy.emailPlaceholder}
          required
          disabled={isLoading}
          className="w-full rounded-full border border-border bg-background px-6 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!email.trim() || isLoading}
          className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? copy.submitting : copy.submit}
        </button>
      </form>
    </div>
  );
}
