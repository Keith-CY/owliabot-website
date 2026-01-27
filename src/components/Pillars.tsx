import Reveal from "./Reveal";

type PillarsProps = {
  title: string;
  pillars: {
    title: string;
    body: string;
  }[];
};

export default function Pillars({ title, pillars }: PillarsProps) {
  return (
    <section id="why" className="flex flex-col gap-10">
      <Reveal>
        <div className="flex items-center justify-between">
          <h2 className="text-balance text-2xl font-semibold text-foreground sm:text-3xl">
            {title}
          </h2>
        </div>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        {pillars.map((pillar, index) => (
          <Reveal key={pillar.title} delay={0.06 * index}>
            <div className="rounded-[28px] border border-border bg-surface px-6 py-7 shadow-[0_16px_40px_rgba(6,8,18,0.45)] backdrop-blur">
              <h3 className="text-balance text-lg font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-3 text-pretty text-sm text-foreground/70">
                {pillar.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
