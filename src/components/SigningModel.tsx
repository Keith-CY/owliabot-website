import Reveal from "./Reveal";

type SigningModelProps = {
  signing: {
    title: string;
    subtitle: string;
    description: string;
    status?: string;
    tiers: ReadonlyArray<{
      title: string;
      body: string;
      keyword: string;
    }>;
    footer: string;
  };
};

export default function SigningModel({ signing }: SigningModelProps) {
  return (
    <section id="signing" className="flex flex-col gap-8 border-t border-border/60 pt-12">
      <Reveal>
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
            {signing.subtitle}
          </p>
          <h2 className="text-balance text-2xl font-semibold text-foreground sm:text-3xl">
            {signing.title}
          </h2>
          <p className="text-pretty text-sm text-foreground/70">
            {signing.description}
          </p>
          {signing.status ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
              {signing.status}
            </p>
          ) : null}
        </div>
      </Reveal>
      <div className="grid items-stretch gap-6 lg:grid-cols-3">
        {signing.tiers.map((tier, index) => (
          <Reveal key={tier.title} delay={0.06 * index}>
            <div className="h-full rounded-[28px] border border-border bg-surface/70 px-6 py-7 shadow-[0_6px_16px_rgba(4,6,10,0.04),_inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur dark:shadow-[0_6px_16px_rgba(4,6,10,0.12),_inset_0_1px_0_rgba(255,255,255,0.14)]">
              <p className="text-xs font-semibold uppercase text-foreground/60">
                {tier.keyword}
              </p>
              <h3 className="mt-3 text-balance text-lg font-semibold text-foreground">
                {tier.title}
              </h3>
              <p className="mt-3 text-pretty text-sm text-foreground/70">
                {tier.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.12}>
        <p className="text-pretty text-sm font-semibold text-foreground">
          {signing.footer}
        </p>
      </Reveal>
    </section>
  );
}
