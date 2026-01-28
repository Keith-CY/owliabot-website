import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

type PillarsProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  pillars: ReadonlyArray<{
    title: string;
    body: string;
    mechanism: string;
  }>;
};

export default function Pillars({ eyebrow, title, subtitle, pillars }: PillarsProps) {
  return (
    <section id="why" className="flex flex-col gap-10">
      <Reveal>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />
      </Reveal>
      <div className="grid items-stretch gap-6 md:grid-cols-2">
        {pillars.map((pillar, index) => (
          <Reveal key={pillar.title} delay={0.06 * index}>
            <div className="h-full rounded-[28px] border border-border bg-surface/70 px-6 py-7 shadow-[0_6px_16px_rgba(4,6,10,0.04),_inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur dark:shadow-[0_6px_16px_rgba(4,6,10,0.12),_inset_0_1px_0_rgba(255,255,255,0.14)]">
              <h3 className="text-balance text-lg font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-3 text-pretty text-sm text-foreground/70">
                {pillar.body}
              </p>
              <p className="mt-4 text-xs font-semibold text-foreground/60">
                {pillar.mechanism}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
