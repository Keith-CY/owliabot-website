import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

type ArchitectureOverviewProps = {
  architecture: {
    title: string;
    subtitle: string;
    body: string;
    flowLabel: string;
    flow: ReadonlyArray<string>;
    bullets: ReadonlyArray<string>;
    note?: string;
  };
};

export default function ArchitectureOverview({
  architecture,
}: ArchitectureOverviewProps) {
  return (
    <section id="architecture" className="flex flex-col gap-8">
      <Reveal>
        <SectionHeader
          eyebrow={architecture.subtitle}
          title={architecture.title}
          subtitle={architecture.body}
        />
      </Reveal>
      <Reveal delay={0.08}>
        <div className="rounded-[28px] border border-border bg-surface/70 px-6 py-6 shadow-[0_6px_16px_rgba(4,6,10,0.04),_inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur dark:shadow-[0_6px_16px_rgba(4,6,10,0.12),_inset_0_1px_0_rgba(255,255,255,0.14)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
            {architecture.flowLabel}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-foreground/70">
            {architecture.flow.map((step, index) => (
              <span key={step} className="rounded-full border border-border bg-surface/70 px-4 py-2">
                {step}
                {index < architecture.flow.length - 1 && (
                  <span className="ml-3 text-foreground/50">→</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="grid items-stretch gap-4 md:grid-cols-3">
        {architecture.bullets.map((item, index) => (
          <Reveal key={item} delay={0.1 + index * 0.04}>
            <div className="h-full rounded-[24px] border border-border bg-surface/70 px-5 py-5 text-sm text-foreground/70 shadow-[0_8px_18px_rgba(4,6,10,0.12),_inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[0_8px_18px_rgba(4,6,10,0.2),_inset_0_1px_0_rgba(255,255,255,0.12)]">
              {item}
            </div>
          </Reveal>
        ))}
      </div>
      {architecture.note ? (
        <Reveal delay={0.16}>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
            {architecture.note}
          </p>
        </Reveal>
      ) : null}
    </section>
  );
}
