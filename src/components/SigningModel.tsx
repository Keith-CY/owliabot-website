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
    <section id="signing" className="flex flex-col gap-8 border-t border-border pt-12">
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
      <div className="grid gap-6 lg:grid-cols-3">
        {signing.tiers.map((tier, index) => (
          <Reveal key={tier.title} delay={0.06 * index}>
            <div className="rounded-[28px] border border-border bg-surface px-6 py-7 shadow-[0_16px_40px_rgba(6,8,18,0.45)] backdrop-blur">
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
