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
    card: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  defi: {
    card: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  trading: {
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
  createSkillCTA,
}: SkillsHubProps) {
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

      {/* Create Skill CTA */}
      {createSkillCTA && (
        <div className="flex justify-center">
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
        </div>
      )}

      {/* Skills Masonry Grid */}
      <div className="columns-1 gap-6 sm:columns-2 space-y-6">
        {skills.map((skill) => {
          const colors = categoryColors[skill.category];
          return (
            <article
              key={skill.id}
              className="break-inside-avoid flex flex-col gap-4 rounded-[28px] border border-border bg-surface/70 p-6 shadow-[0_6px_16px_rgba(4,6,10,0.04),_inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur transition-shadow hover:shadow-md dark:shadow-[0_6px_16px_rgba(4,6,10,0.12),_inset_0_1px_0_rgba(255,255,255,0.14)] relative"
            >
              {/* Building badge - top right */}
              <span className="absolute top-5 right-5 flex items-center gap-1 rounded-md border border-foreground/10 bg-foreground/5 px-2 py-0.5 text-[10px] font-medium text-foreground/50 dark:border-foreground/20 dark:bg-foreground/10">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Building
              </span>

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
