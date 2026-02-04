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

        {/* Right: Vault illustration */}
        <Reveal delay={0.12}>
          <div className="hidden lg:flex h-full items-center justify-center relative overflow-visible">
            {/* Organic blob glow behind image */}
            <div
              className="absolute -inset-8 opacity-60 blur-3xl dark:opacity-40"
              style={{
                background: "radial-gradient(ellipse 70% 60% at 55% 45%, rgba(139,92,246,0.25), transparent 70%), radial-gradient(ellipse 50% 70% at 30% 70%, rgba(56,189,248,0.2), transparent 65%)",
              }}
            />
            {/* Organic clip path — fluid blob shape */}
            <div
              className="relative z-10 w-full max-w-md"
              style={{
                clipPath: "url(#vault-blob)",
              }}
            >
              <img
                src="/owlia-vault.png"
                alt="Owlia Vault"
                className="w-full"
              />
            </div>
            {/* SVG clip definition — organic blob */}
            <svg className="absolute h-0 w-0" aria-hidden="true">
              <defs>
                <clipPath id="vault-blob" clipPathUnits="objectBoundingBox">
                  <path d="M0.5,0.02 C0.75,0,1,0.15,0.98,0.4 C0.96,0.65,1,0.85,0.82,0.95 C0.64,1.05,0.35,1.02,0.18,0.92 C0.01,0.82,0,0.6,0.03,0.38 C0.06,0.16,0.25,0.04,0.5,0.02 Z" />
                </clipPath>
              </defs>
            </svg>
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
