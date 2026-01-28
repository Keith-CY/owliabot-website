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
    <section id="local" className="rounded-[32px] border border-border bg-surface/70 px-8 py-10 shadow-[0_12px_28px_rgba(4,6,10,0.16),_inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur dark:shadow-[0_12px_28px_rgba(4,6,10,0.22),_inset_0_1px_0_rgba(255,255,255,0.14)]">
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
        <ul className="grid items-stretch gap-3 text-sm text-foreground/70 sm:grid-cols-3">
          {local.bullets.map((bullet, index) => (
            <Reveal key={bullet} delay={0.12 + index * 0.04}>
              <li className="h-full rounded-[20px] border border-border bg-surface/70 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                {bullet}
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
