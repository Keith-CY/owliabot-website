import Reveal from "./Reveal";

type LocalFirstProps = {
  local: {
    eyebrow: string;
    title: string;
    body: string;
    bullets: ReadonlyArray<string>;
  };
};

export default function LocalFirst({ local }: LocalFirstProps) {
  return (
    <section id="local" className="rounded-[34px] border border-border bg-surface px-8 py-10 shadow-[0_16px_40px_rgba(6,8,18,0.32)] backdrop-blur">
      <div className="flex flex-col gap-6">
        <Reveal>
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
              {local.eyebrow}
            </p>
            <h2 className="text-balance text-2xl font-semibold text-foreground sm:text-3xl">
              {local.title}
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-pretty text-base text-foreground/70">
            {local.body}
          </p>
        </Reveal>
        <ul className="grid gap-3 text-sm text-foreground/70 sm:grid-cols-3">
          {local.bullets.map((bullet, index) => (
            <Reveal key={bullet} delay={0.12 + index * 0.04}>
              <li className="rounded-[22px] border border-border bg-surface px-4 py-3 shadow-[0_8px_20px_rgba(6,8,18,0.2)]">
                {bullet}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
