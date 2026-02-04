"use client";

import { useState } from "react";

type Skill = {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  scenario: string;
};

type SkillsHubProps = {
  title: string;
  subtitle: string;
  description: string;
  categories: Record<string, string>;
  skills: readonly Skill[];
  lang: string;
  allLabel?: string;
};

const categoryColors: Record<string, { active: string; inactive: string; card: string }> = {
  monitoring: {
    active: "bg-blue-600 text-white dark:bg-blue-500",
    inactive: "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60",
    card: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  defi: {
    active: "bg-emerald-600 text-white dark:bg-emerald-500",
    inactive: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:hover:bg-emerald-900/60",
    card: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  trading: {
    active: "bg-amber-600 text-white dark:bg-amber-500",
    inactive: "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:hover:bg-amber-900/60",
    card: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
};

export default function SkillsHub({
  title,
  subtitle,
  description,
  categories,
  skills,
  lang,
  allLabel,
}: SkillsHubProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = activeFilter
    ? skills.filter((s) => s.category === activeFilter)
    : skills;

  const allText = allLabel ?? (lang === "zh" ? "全部" : "All");

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-5 pb-16 pt-28 sm:px-8 sm:pt-32">
      {/* Page title */}
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="text-lg font-medium text-foreground/70">{subtitle}</p>
        <p className="max-w-2xl text-sm text-foreground/60">{description}</p>
      </header>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveFilter(null)}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
            activeFilter === null
              ? "bg-foreground text-background"
              : "bg-foreground/10 text-foreground/70 hover:bg-foreground/20"
          }`}
        >
          {allText}
        </button>
        {Object.entries(categories).map(([key, label]) => {
          const colors = categoryColors[key];
          const isActive = activeFilter === key;
          return (
            <button
              key={key}
              onClick={() => setActiveFilter(isActive ? null : key)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                isActive
                  ? (colors?.active ?? "bg-foreground text-background")
                  : (colors?.inactive ?? "bg-foreground/10 text-foreground/70 hover:bg-foreground/20")
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map((skill) => {
          const colors = categoryColors[skill.category];
          return (
            <article
              key={skill.id}
              className="flex flex-col gap-4 rounded-[28px] border border-border bg-surface/70 p-6 shadow-[0_6px_16px_rgba(4,6,10,0.04),_inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur transition-shadow hover:shadow-md dark:shadow-[0_6px_16px_rgba(4,6,10,0.12),_inset_0_1px_0_rgba(255,255,255,0.14)]"
            >
              {/* Category badge */}
              <div className="flex items-center">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    colors?.card ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {categories[skill.category] ?? skill.category}
                </span>
              </div>

              {/* Title + tagline */}
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {skill.title}
                </h2>
                <p className="mt-0.5 text-sm font-medium text-foreground/60">
                  {skill.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-foreground/70">
                {skill.description}
              </p>

              {/* Scenario */}
              <div className="rounded-xl bg-foreground/[0.03] px-4 py-3 dark:bg-foreground/[0.06]">
                <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-1.5">
                  {lang === "zh" ? "典型场景" : "Example"}
                </p>
                <p className="text-sm italic text-foreground/60">
                  {skill.scenario}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
