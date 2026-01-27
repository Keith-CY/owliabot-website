import Reveal from "./Reveal";

type ArchitectureProps = {
  architecture: {
    title: string;
    items: {
      title: string;
      body: string;
    }[];
  };
};

export default function Architecture({ architecture }: ArchitectureProps) {
  return (
    <section id="architecture" className="flex flex-col gap-10">
      <Reveal>
        <div className="flex items-center justify-between">
          <h2 className="text-balance text-2xl font-semibold text-foreground sm:text-3xl">
            {architecture.title}
          </h2>
        </div>
      </Reveal>
      <div className="grid gap-6 lg:grid-cols-3">
        {architecture.items.map((item, index) => (
          <Reveal key={item.title} delay={0.06 * index}>
            <div className="rounded-[28px] border border-border bg-surface px-6 py-7 shadow-[0_16px_40px_rgba(6,8,18,0.45)] backdrop-blur">
              <h3 className="text-balance text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-pretty text-sm text-foreground/70">
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
