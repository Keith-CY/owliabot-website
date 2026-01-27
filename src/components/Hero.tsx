import ShaderHero from "./ShaderHero";
import Reveal from "./Reveal";

type HeroProps = {
  hero: {
    title: string;
    subtitle: string;
    emphasis: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  githubUrl: string;
};

export default function Hero({ hero, githubUrl }: HeroProps) {
  const subtitleLines = hero.subtitle.split("\n");

  return (
    <section className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="flex flex-col gap-6">
        <Reveal>
          <h1 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl lg:text-5xl">
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
        <Reveal delay={0.12}>
          <p className="text-sm font-semibold uppercase text-foreground/70">
            {hero.emphasis}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="flex flex-wrap gap-4">
            <a
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(107,82,255,0.35)]"
              href="#waitlist"
            >
              {hero.ctaPrimary}
            </a>
            <a
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:border-accent"
              href="#architecture"
            >
              {hero.ctaSecondary}
            </a>
          </div>
        </Reveal>
      </div>
      <div className="relative overflow-hidden rounded-[36px] border border-border bg-surface p-6 shadow-[0_20px_60px_rgba(10,10,20,0.45)]">
        <div className="absolute inset-0">
          <ShaderHero />
        </div>
        <div
          aria-hidden="true"
          className="relative z-10 min-h-[280px] rounded-[28px] border border-border bg-black/30 backdrop-blur"
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
