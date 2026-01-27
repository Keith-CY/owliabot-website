import ShaderHero from "./ShaderHero";
import ShaderBackdrop from "./ShaderBackdrop";
import Reveal from "./Reveal";

type HeroProps = {
  hero: {
    title: string;
    subtitle: string;
    emphasis: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badge?: string;
    status?: string;
  };
  githubUrl: string;
};

export default function Hero({ hero, githubUrl }: HeroProps) {
  const subtitleLines = hero.subtitle.split("\n");

  return (
    <section className="relative grid items-center gap-10 overflow-hidden rounded-[36px] border border-border bg-surface/40 px-6 py-8 shadow-[0_18px_50px_rgba(10,10,20,0.32)] lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
      <div className="absolute inset-0">
        <ShaderBackdrop />
      </div>
      <div className="relative z-10 flex flex-col gap-6">
        <Reveal>
          {hero.badge ? (
            <span className="w-fit rounded-full border border-border bg-surface px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/60">
              {hero.badge}
            </span>
          ) : null}
          <h1 className="text-balance text-3xl font-semibold leading-[1.05] text-foreground sm:text-4xl lg:text-5xl">
            {hero.title}
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-pretty text-base text-foreground/70 sm:text-lg">
            {subtitleLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < subtitleLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </Reveal>
        {hero.status ? (
          <Reveal delay={0.1}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
              {hero.status}
            </p>
          </Reveal>
        ) : null}
        <Reveal delay={0.12}>
          <p className="text-sm font-semibold uppercase text-foreground/70">
            {hero.emphasis}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="flex flex-wrap gap-4">
            <a
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(107,82,255,0.28)]"
              href="#waitlist"
            >
              {hero.ctaPrimary}
            </a>
            <a
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent"
              href="#architecture"
            >
              {hero.ctaSecondary}
            </a>
          </div>
        </Reveal>
      </div>
      <div className="relative z-10 overflow-hidden rounded-[32px] border border-border bg-surface/80 p-6 shadow-[0_18px_50px_rgba(10,10,20,0.35)]">
        <div className="absolute inset-0">
          <ShaderHero />
        </div>
        <div
          aria-hidden="true"
          className="relative z-10 min-h-[280px] rounded-[26px] border border-border bg-black/30 backdrop-blur"
        />
        <div className="relative z-10 mt-4 flex flex-wrap gap-2 text-[10px] font-semibold uppercase text-foreground/70">
          <span>Intent</span>
          <span className="text-foreground/40">→</span>
          <span>Permission</span>
          <span className="text-foreground/40">→</span>
          <span>Execution</span>
          <span className="text-foreground/40">→</span>
          <span>Audit</span>
        </div>
      </div>
    </section>
  );
}
