import Reveal from "./Reveal";

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
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
            {architecture.subtitle}
          </p>
          <h2 className="text-balance text-2xl font-semibold text-foreground sm:text-3xl">
            {architecture.title}
          </h2>
          <p className="text-pretty text-sm text-foreground/70">
            {architecture.body}
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="rounded-[30px] border border-border bg-surface px-6 py-6 shadow-[0_14px_36px_rgba(6,8,18,0.35)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
            {architecture.flowLabel}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-foreground/70">
            {architecture.flow.map((step, index) => (
              <span key={step} className="rounded-full border border-border bg-surface px-4 py-2">
                {step}
                {index < architecture.flow.length - 1 && (
                  <span className="ml-3 text-foreground/50">→</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-3">
        {architecture.bullets.map((item, index) => (
          <Reveal key={item} delay={0.1 + index * 0.04}>
            <div className="rounded-[26px] border border-border bg-surface px-5 py-5 text-sm text-foreground/70 shadow-[0_10px_28px_rgba(6,8,18,0.25)]">
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
