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

const tierIcons = [
  <svg key="wallet" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400">
    <path d="M12 2L3 7v6c0 5.25 3.75 10.13 9 11.25C17.25 23.13 21 18.25 21 13V7l-9-5z" />
    <path d="M9 12l2 2 4-4" />
  </svg>,
  <svg key="key" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-sky-400">
    <circle cx="8" cy="15" r="5" />
    <path d="M11.7 11.3L15 8l2 2" />
    <path d="M15 8l4-4" />
  </svg>,
];

export default function SecurityModel({ security }: SecurityModelProps) {
  return (
    <section id="security" className="scroll-mt-24 flex flex-col gap-10 sm:scroll-mt-28">
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

      {/* Tier cards — side by side, visual focus */}
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

      {/* Local-first — lightweight, secondary to tier cards */}
      <Reveal delay={0.22}>
        <div className="rounded-2xl border border-border/40 bg-surface/40 px-7 py-7 backdrop-blur">
          <h3 className="text-lg font-semibold text-foreground/80">
            {security.local.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/55">
            {security.local.body}
          </p>
          <ul className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-6">
            {security.local.bullets.map((bullet) => (
              <li key={bullet} className="text-xs leading-relaxed text-foreground/45">
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
