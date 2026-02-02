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
    <section id="why" className="scroll-mt-24 flex flex-col gap-10 sm:scroll-mt-28">
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
            <div className="h-full rounded-[28px] border border-[rgba(125,211,252,0.15)] bg-surface/70 px-6 py-7 shadow-[0_0_20px_rgba(125,211,252,0.05),_inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur transition-all duration-300 hover:border-[rgba(125,211,252,0.3)] hover:shadow-[0_0_30px_rgba(125,211,252,0.1),_inset_0_1px_0_rgba(255,255,255,0.15)] dark:shadow-[0_0_20px_rgba(125,211,252,0.08),_inset_0_1px_0_rgba(255,255,255,0.08)] dark:hover:shadow-[0_0_35px_rgba(125,211,252,0.15),_inset_0_1px_0_rgba(255,255,255,0.12)]">
              <h3 className="text-balance text-lg font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-3 text-pretty text-sm text-foreground/70">
                {pillar.body}
              </p>
              <p className="mt-4 text-xs font-semibold text-accent">
                {pillar.mechanism}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
