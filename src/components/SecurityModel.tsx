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

/* Icons per tier — simple inline SVGs for visual weight */
const tierIcons = [
  /* Shield / wallet icon */
  <svg key="wallet" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400">
    <path d="M12 2L3 7v6c0 5.25 3.75 10.13 9 11.25C17.25 23.13 21 18.25 21 13V7l-9-5z" />
    <path d="M9 12l2 2 4-4" />
  </svg>,
  /* Key icon */
  <svg key="key" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
    <circle cx="8" cy="15" r="5" />
    <path d="M11.7 11.3L15 8l2 2" />
    <path d="M15 8l4-4" />
  </svg>,
];

export default function SecurityModel({ security }: SecurityModelProps) {
  return (
    <section id="security" className="scroll-mt-24 flex flex-col gap-10 sm:scroll-mt-28">
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

      {/* Tier cards — side by side */}
      <div className="grid items-stretch gap-6 md:grid-cols-2">
        {security.tiers.map((tier, index) => (
          <Reveal key={tier.title} delay={0.06 + index * 0.06}>
            <div className="group h-full rounded-[28px] border border-border bg-surface/70 px-7 py-8 shadow-[0_6px_16px_rgba(4,6,10,0.04),_inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur transition-shadow hover:shadow-[0_8px_24px_rgba(4,6,10,0.08),_inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[0_6px_16px_rgba(4,6,10,0.12),_inset_0_1px_0_rgba(255,255,255,0.14)] dark:hover:shadow-[0_8px_24px_rgba(4,6,10,0.2),_inset_0_1px_0_rgba(255,255,255,0.14)]">
              <div className="mb-5 inline-flex items-center justify-center rounded-2xl border border-border/50 bg-surface/80 p-3">
                {tierIcons[index] || tierIcons[0]}
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground/50">
                {tier.keyword}
              </p>
              <h3 className="mt-2 text-balance text-xl font-semibold text-foreground">
                {tier.title}
              </h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/65">
                {tier.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {security.footer ? (
        <Reveal delay={0.18}>
          <p className="text-pretty text-sm font-semibold text-foreground">
            {security.footer}
          </p>
        </Reveal>
      ) : null}

      {/* Local-first highlight — visually distinct with gradient border */}
      <Reveal delay={0.22}>
        <div className="relative rounded-[32px] p-px overflow-hidden">
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-violet-500/25 via-sky-500/15 to-emerald-500/20" />
          <div className="relative rounded-[32px] bg-surface/95 px-8 py-10 backdrop-blur dark:bg-surface/90">
            <div className="flex flex-col gap-8">
              {/* Title area with decorative lock icon */}
              <div className="flex items-start gap-5">
                <div className="mt-1 shrink-0 rounded-2xl border border-violet-400/20 bg-violet-400/5 p-3">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-balance text-2xl font-semibold text-foreground sm:text-3xl">
                    {security.local.title}
                  </h3>
                  <p className="text-pretty text-base leading-relaxed text-foreground/65">
                    {security.local.body}
                  </p>
                </div>
              </div>
              {/* Bullets as distinct items */}
              <div className="grid items-stretch gap-4 sm:grid-cols-3">
                {security.local.bullets.map((bullet, index) => (
                  <Reveal key={bullet} delay={0.26 + index * 0.04}>
                    <div className="flex h-full items-start gap-3 rounded-2xl border border-border/60 bg-surface/50 px-5 py-4">
                      <span className="mt-0.5 inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                      <span className="text-sm leading-relaxed text-foreground/65">
                        {bullet}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
