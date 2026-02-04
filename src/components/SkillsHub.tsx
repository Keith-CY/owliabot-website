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
};

const categoryColors: Record<string, string> = {
  monitoring:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  defi: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  trading:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

export default function SkillsHub({
  title,
  subtitle,
  description,
  categories,
  skills,
  lang,
}: SkillsHubProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 px-5 pb-16 pt-28 sm:px-8 sm:pt-32">
      {/* Page title */}
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="text-lg font-medium text-foreground/70">{subtitle}</p>
        <p className="max-w-2xl text-sm text-foreground/60">{description}</p>
      </header>

      {/* Skills Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((skill) => (
          <article
            key={skill.id}
            className="flex flex-col gap-4 rounded-[28px] border border-border bg-surface/70 p-6 shadow-[0_6px_16px_rgba(4,6,10,0.04),_inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur transition-shadow hover:shadow-md dark:shadow-[0_6px_16px_rgba(4,6,10,0.12),_inset_0_1px_0_rgba(255,255,255,0.14)]"
          >
            {/* Top row: id + category badge */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground/40">
                #{skill.id}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                  categoryColors[skill.category] ?? "bg-gray-100 text-gray-600"
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
        ))}
      </div>
    </div>
  );
}
