"use client";

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
  createSkillCTA?: string;
};

const categoryColors: Record<string, { card: string }> = {
  monitoring: {
    card: "bg-blue-600 text-white dark:bg-blue-900/40 dark:text-blue-300",
  },
  defi: {
    card: "bg-emerald-600 text-white dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  trading: {
    card: "bg-amber-600 text-white dark:bg-amber-900/40 dark:text-amber-300",
  },
};

export default function SkillsHub({
  title,
  subtitle,
  description,
  categories,
  skills,
  lang,
  createSkillCTA,
}: SkillsHubProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-5 pb-16 pt-28 sm:px-8 sm:pt-32">
      {/* Page title */}
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        
        {/* Subtitle/Description with line breaks */}
        <div className="max-w-2xl space-y-2 text-sm text-foreground/60">
          {subtitle.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        
        {/* CTA Button */}
        {createSkillCTA && (
          <a
            href="#building"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:shadow-lg hover:scale-105"
          >
            <span>{createSkillCTA}</span>
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        )}
      </header>

      {/* Skills Masonry Grid */}
      <div className="columns-1 gap-6 sm:columns-2 space-y-6">
        {skills.map((skill) => {
          const colors = categoryColors[skill.category];
          return (
            <article
              key={skill.id}
              className="break-inside-avoid flex flex-col gap-4 rounded-[28px] border border-border bg-white dark:bg-surface p-6 shadow-[0_6px_16px_rgba(4,6,10,0.04)] transition-shadow hover:shadow-md dark:shadow-[0_6px_16px_rgba(4,6,10,0.12)] relative"
            >
              {/* Building badge - top right */}
              <span className="absolute top-5 right-5 z-10 isolate flex items-center gap-1 rounded-md border border-foreground/10 bg-foreground/5 px-2 py-0.5 text-[10px] font-medium text-foreground/50 dark:border-foreground/20 dark:bg-foreground/10">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Building
              </span>

              {/* Category badge */}
              <div className="flex items-center relative z-10 isolate">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    colors?.card ?? "bg-gray-600 text-white"
                  }`}
                  style={{
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                  }}
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
