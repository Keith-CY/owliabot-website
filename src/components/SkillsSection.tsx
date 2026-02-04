import Link from "next/link";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

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
    exploreMore?: string;
  };
  lang?: string;
};

export default function SkillsSection({ skills, lang }: SkillsSectionProps) {
  const hubHref = lang === "zh" ? "/zh/skills-hub" : "/skills-hub";

  return (
    <section id="skills" className="scroll-mt-24 flex flex-col gap-10 sm:scroll-mt-28">
      <Reveal>
        <SectionHeader
          eyebrow={skills.subtitle}
          title={skills.title}
          subtitle={skills.body}
        />
      </Reveal>
      <div className="grid items-stretch gap-6 md:grid-cols-3">
        {skills.cards.map((card, index) => (
          <Reveal key={card.title} delay={0.06 * index}>
            <div className="h-full rounded-[28px] border border-border bg-surface/70 px-6 py-7 shadow-[0_6px_16px_rgba(4,6,10,0.04),_inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur dark:shadow-[0_6px_16px_rgba(4,6,10,0.12),_inset_0_1px_0_rgba(255,255,255,0.14)]">
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
      {skills.exploreMore ? (
        <Reveal delay={0.16}>
          <div className="flex justify-center">
            <Link
              href={hubHref}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-6 py-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition-all hover:bg-foreground hover:text-background hover:shadow-md"
            >
              {skills.exploreMore}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      ) : null}
    </section>
  );
}
