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
};

export default function Hero({ hero }: HeroProps) {
  const waitlistUrl = "https://tally.so/r/RGD10d";
  const subtitleLines = hero.subtitle.split("\n");

  return (
    <section className="relative overflow-hidden border-b border-border bg-stage">
      <div className="absolute inset-0">
        <ShaderBackdrop />
        <div className="absolute inset-0 bg-stage/70" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light noise-film" />
        <div className="pointer-events-none absolute -right-24 -top-16 h-[520px] w-[520px] opacity-30 plume-drift dark:opacity-50">
          <svg
            aria-hidden
            className="h-full w-full"
            viewBox="0 0 520 520"
          >
            <defs>
              <filter
                id="plumePrimary"
                x="-30%"
                y="-30%"
                width="160%"
                height="160%"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.85"
                  numOctaves="2"
                  seed="2"
                  result="noise"
                >
                  <animate
                    attributeName="baseFrequency"
                    dur="22s"
                    values="0.9;0.75;0.9"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="30"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
                <feGaussianBlur stdDeviation="22" />
              </filter>
              <filter
                id="plumePrimarySoft"
                x="-35%"
                y="-35%"
                width="170%"
                height="170%"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.65"
                  numOctaves="2"
                  seed="5"
                  result="noise"
                >
                  <animate
                    attributeName="baseFrequency"
                    dur="26s"
                    values="0.7;0.6;0.7"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="22"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
                <feGaussianBlur stdDeviation="30" />
              </filter>
            </defs>
            <g filter="url(#plumePrimary)">
              <ellipse
                cx="290"
                cy="180"
                rx="200"
                ry="130"
                fill="rgb(var(--shader-hero-accent))"
                fillOpacity="0.16"
              />
              <ellipse
                cx="360"
                cy="235"
                rx="150"
                ry="110"
                fill="rgb(var(--shader-hero-accent))"
                fillOpacity="0.12"
              />
            </g>
            <g filter="url(#plumePrimarySoft)">
              <ellipse
                cx="330"
                cy="210"
                rx="150"
                ry="120"
                fill="rgb(var(--shader-glow))"
                fillOpacity="0.16"
              />
              <ellipse
                cx="315"
                cy="205"
                rx="90"
                ry="70"
                fill="rgb(var(--shader-base))"
                fillOpacity="0.22"
              />
            </g>
          </svg>
        </div>
        <div className="pointer-events-none absolute right-6 top-44 h-[320px] w-[320px] opacity-20 plume-drift-alt dark:opacity-35">
          <svg
            aria-hidden
            className="h-full w-full"
            viewBox="0 0 320 320"
          >
            <defs>
              <filter
                id="plumeSecondary"
                x="-40%"
                y="-40%"
                width="180%"
                height="180%"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.95"
                  numOctaves="1"
                  seed="6"
                  result="noise"
                >
                  <animate
                    attributeName="baseFrequency"
                    dur="18s"
                    values="0.92;0.78;0.92"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="22"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
                <feGaussianBlur stdDeviation="20" />
              </filter>
            </defs>
            <g filter="url(#plumeSecondary)">
              <ellipse
                cx="170"
                cy="150"
                rx="120"
                ry="90"
                fill="rgb(var(--shader-hero-accent))"
                fillOpacity="0.14"
              />
              <ellipse
                cx="200"
                cy="190"
                rx="90"
                ry="70"
                fill="rgb(var(--shader-glow))"
                fillOpacity="0.16"
              />
            </g>
          </svg>
        </div>
      </div>
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 pb-6 pt-12 text-center sm:px-8 lg:px-12">
        <Reveal>
          {hero.badge ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/60 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground/35" />
              {hero.badge}
            </span>
          ) : null}
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="max-w-[36rem] text-balance text-4xl font-medium leading-[1.1] text-foreground sm:text-5xl lg:text-[3.4rem]">
            {hero.title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-pretty text-base text-foreground/70 sm:text-lg">
            {subtitleLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < subtitleLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-[0_12px_30px_rgba(5,6,12,0.22),_inset_0_1px_0_rgba(255,255,255,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(5,6,12,0.28),_inset_0_1px_0_rgba(255,255,255,0.7)]"
              href={waitlistUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              {hero.ctaPrimary}
            </a>
            <a
              className="rounded-full border border-foreground/12 bg-surface/50 px-6 py-3 text-sm font-semibold text-foreground/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] transition hover:-translate-y-[1px] hover:border-foreground/20 hover:text-foreground/90 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
              href="#architecture"
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
      <div className="relative mx-auto w-full max-w-5xl px-6 pb-6 sm:px-8 lg:px-12 -mt-1">
        <Reveal delay={0.22}>
          <div className="rounded-[32px] border border-border/40 bg-surface/50 p-3 shadow-[0_8px_20px_rgba(4,6,10,0.1),_inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur dark:shadow-[0_10px_24px_rgba(4,6,10,0.18),_inset_0_1px_0_rgba(255,255,255,0.12)]">
            <div className="group relative overflow-hidden rounded-[26px] border border-border/50 bg-surface/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),_inset_0_-32px_60px_rgba(4,6,10,0.16)]">
              <div className="absolute inset-0">
                <ShaderHero />
              </div>
              <div className="relative z-10 min-h-[240px] px-4 pb-10 pt-5 text-[10px] text-foreground/40 sm:min-h-[260px] sm:px-6">
                <div className="relative mx-auto max-w-[880px]">
                  <div className="absolute left-6 right-10 top-6 h-[140px] rounded-[22px] border border-border/30 bg-surface/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition duration-300 group-hover:-translate-y-0.5 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
                  <div className="absolute left-10 right-6 top-10 h-[150px] rounded-[22px] border border-border/40 bg-surface/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition duration-300 group-hover:-translate-y-1 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />
                  <div className="relative z-10 rounded-[24px] border border-border/55 bg-surface/60 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] transition duration-300 group-hover:-translate-y-2 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
                    <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.18em] text-foreground/45">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-foreground/20" />
                        <span className="h-2 w-20 rounded-full bg-foreground/12" />
                      </div>
                      <span className="h-2 w-12 rounded-full bg-foreground/10" />
                    </div>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-start gap-2">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-foreground/20" />
                        <div className="relative">
                          <div className="rounded-[18px] border border-border/45 bg-surface/70 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.24)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                            <div className="space-y-1.5">
                              <div className="h-2 w-28 rounded-full bg-foreground/18" />
                              <div className="h-2 w-20 rounded-full bg-foreground/12" />
                            </div>
                          </div>
                          <span className="absolute bottom-1 left-2 h-2 w-2 rotate-45 rounded-[3px] border border-border/30 bg-surface/70" />
                        </div>
                        <span className="mt-1 h-2 w-8 rounded-full bg-foreground/10" />
                      </div>
                      <div className="flex items-start justify-end gap-2">
                        <span className="mt-1 h-2 w-8 rounded-full bg-foreground/10" />
                        <div className="relative">
                          <div className="rounded-[18px] border border-border/40 bg-foreground/5 px-3 py-2">
                            <div className="space-y-1.5">
                              <div className="h-2 w-24 rounded-full bg-foreground/16" />
                              <div className="h-2 w-16 rounded-full bg-foreground/10" />
                            </div>
                          </div>
                          <span className="absolute bottom-1 right-2 h-2 w-2 rotate-45 rounded-[3px] border border-border/30 bg-foreground/5" />
                        </div>
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-foreground/16" />
                      </div>
                      <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-foreground/45">
                        <span className="h-2 w-10 rounded-full bg-foreground/12" />
                        <span className="h-2 w-5 rounded-full bg-foreground/16" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-6 w-28 rounded-full border border-border/45 bg-surface/70" />
                        <span className="h-6 w-6 rounded-full border border-border/45 bg-surface/70" />
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-border/40 bg-surface/60 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-foreground/45">
                        <span className="h-2 w-2 rounded-full bg-foreground/20" />
                        Ack
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex flex-wrap items-center justify-center gap-2 text-[9px] font-semibold uppercase tracking-[0.26em] text-foreground/55">
                <span>Intent</span>
                <span className="text-foreground/35">→</span>
                <span>Permission</span>
                <span className="text-foreground/35">→</span>
                <span>Execution</span>
                <span className="text-foreground/35">→</span>
                <span>Audit</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
