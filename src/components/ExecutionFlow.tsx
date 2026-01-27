import Reveal from "./Reveal";

type ExecutionFlowProps = {
  execution: {
    eyebrow: string;
    title: string;
    steps: ReadonlyArray<string>;
    caption: string;
    note?: string;
  };
};

export default function ExecutionFlow({ execution }: ExecutionFlowProps) {
  return (
    <section id="execution" className="flex flex-col gap-8">
      <Reveal>
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
            {execution.eyebrow}
          </p>
          <h2 className="text-balance text-2xl font-semibold text-foreground sm:text-3xl">
            {execution.title}
          </h2>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.24em] text-foreground/70">
          {execution.steps.map((step, index) => (
            <div
              key={step}
              className="rounded-full border border-border bg-surface/70 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
            >
              {step}
              {index < execution.steps.length - 1 && (
                <span className="ml-3 text-foreground/50">→</span>
              )}
            </div>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="text-pretty text-sm text-foreground/70">
          {execution.caption}
        </p>
      </Reveal>
      {execution.note ? (
        <Reveal delay={0.2}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
            {execution.note}
          </p>
        </Reveal>
      ) : null}
    </section>
  );
}
