import ShaderBackdrop from "./ShaderBackdrop";
import Reveal from "./Reveal";

type HeroProps = {
  hero: {
    title: string;
    subtitle: string;
    emphasis: string;
    ctaPrimary: string;
    ctaPrimaryHref?: string;
    ctaSecondary: string;
    ctaSecondaryHref?: string;
    badge?: string;
    status?: string;
  };
};

export default function Hero({ hero }: HeroProps) {
  const subtitleLines = hero.subtitle.split("\n");

  return (
    <section className="relative w-full overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <ShaderBackdrop />
        <div className="absolute inset-0 bg-background/70" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light noise-film" />
      </div>

      {/* Content Container */}
      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-6xl flex-col items-center justify-center gap-12 px-6 py-24 sm:px-8 lg:min-h-screen lg:px-12 lg:pt-32">

        {/* Center Column: Text */}
        <div className="flex w-full flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-6">
            <Reveal>
              {hero.badge ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/60 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/35" />
                  {hero.badge}
                </span>
              ) : null}
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="max-w-[56rem] text-balance text-4xl font-medium leading-[1.1] text-foreground sm:text-5xl lg:text-[4.5rem]">
                {hero.title}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-3xl text-pretty text-base text-foreground/70 sm:text-lg lg:text-xl">
                {subtitleLines.map((line, index) => (
                  <span key={`${line}-${index}`}>
                    {line}
                    {index < subtitleLines.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                className="rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-background shadow-[0_12px_30px_rgba(5,6,12,0.22),_inset_0_1px_0_rgba(255,255,255,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(5,6,12,0.28),_inset_0_1px_0_rgba(255,255,255,0.7)]"
                href={hero.ctaPrimaryHref ?? "#building"}
              >
                {hero.ctaPrimary}
              </a>
              <a
                className="rounded-full border border-foreground/12 bg-surface/50 px-8 py-4 text-sm font-semibold text-foreground/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] transition hover:-translate-y-[1px] hover:border-foreground/20 hover:text-foreground/90 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                href={hero.ctaSecondaryHref ?? "#architecture"}
                target={hero.ctaSecondaryHref ? "_blank" : undefined}
                rel={hero.ctaSecondaryHref ? "noopener noreferrer" : undefined}
              >
                {hero.ctaSecondary}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">
              {hero.emphasis}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
