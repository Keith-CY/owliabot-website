import Reveal from "./Reveal";

type SkillsSectionProps = {
  skills: {
    title: string;
    subtitle: string;
    body: string;
    cards: ReadonlyArray<{
      title: string;
      body: string;
      meta?: string;
    }>;
    footer?: string;
  };
};

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="flex flex-col gap-10">
      <Reveal>
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
            {skills.subtitle}
          </p>
          <h2 className="text-balance text-2xl font-semibold text-foreground sm:text-3xl">
            {skills.title}
          </h2>
          <p className="text-pretty text-sm text-foreground/70">
            {skills.body}
          </p>
        </div>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {skills.cards.map((card, index) => (
          <Reveal key={card.title} delay={0.06 * index}>
            <div className="rounded-[28px] border border-border bg-surface px-6 py-7 shadow-[0_16px_40px_rgba(6,8,18,0.45)] backdrop-blur">
              <h3 className="text-balance text-lg font-semibold text-foreground">
                {card.title}
              </h3>
              <p className="mt-3 text-pretty text-sm text-foreground/70">
                {card.body}
              </p>
              {card.meta ? (
                <p className="mt-4 text-xs font-semibold text-foreground/60">
                  {card.meta}
                </p>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
      {skills.footer ? (
        <Reveal delay={0.12}>
          <p className="text-pretty text-sm font-semibold text-foreground/80">
            {skills.footer}
          </p>
        </Reveal>
      ) : null}
    </section>
  );
}
