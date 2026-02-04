import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

type SecurityModelProps = {
  security: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    status: string;
    tiers: ReadonlyArray<{
      title: string;
      body: string;
      keyword: string;
    }>;
    footer: string;
    local: {
      title: string;
      body: string;
      bullets: ReadonlyArray<string>;
    };
  };
};

export default function SecurityModel({ security }: SecurityModelProps) {
  return (
    <section id="security" className="scroll-mt-24 flex flex-col gap-8 sm:scroll-mt-28">
      {/* Header */}
      <Reveal>
        <SectionHeader
          eyebrow={security.eyebrow}
          title={security.title}
          subtitle={security.subtitle}
          description={security.description}
        />
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
            {security.status}
          </p>
        </div>
      </Reveal>

      {/* Vault use cases: left stacked cards + right illustration placeholder */}
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {/* Left: use case cards stacked vertically */}
        <div className="flex flex-col gap-6">
          {security.tiers.map((tier, index) => (
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

        {/* Right: illustration placeholder */}
        <Reveal delay={0.12}>
          <div className="hidden lg:flex h-full items-center justify-center rounded-[28px] border border-dashed border-border/60 bg-surface/30">
            <p className="text-sm text-foreground/30">Illustration</p>
          </div>
        </Reveal>
      </div>

      {security.footer ? (
        <Reveal delay={0.14}>
          <p className="text-pretty text-sm font-semibold text-foreground">
            {security.footer}
          </p>
        </Reveal>
      ) : null}

      {/* Local-first / Key control card */}
      <Reveal delay={0.16}>
        <div className="rounded-[32px] border border-border bg-surface/70 px-8 py-10 shadow-[0_6px_16px_rgba(4,6,10,0.04),_inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur dark:shadow-[0_6px_16px_rgba(4,6,10,0.12),_inset_0_1px_0_rgba(255,255,255,0.14)]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h3 className="text-balance text-2xl font-semibold text-foreground sm:text-3xl">
                {security.local.title}
              </h3>
              <p className="text-pretty text-base text-foreground/70">
                {security.local.body}
              </p>
            </div>
            <ul className="grid items-stretch gap-3 text-sm text-foreground/70 sm:grid-cols-3">
              {security.local.bullets.map((bullet, index) => (
                <Reveal key={bullet} delay={0.2 + index * 0.04}>
                  <li className="h-full rounded-[20px] border border-border bg-surface/70 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                    {bullet}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
