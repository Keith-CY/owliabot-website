import Reveal from "./Reveal";

type DevicesProps = {
  devices: {
    eyebrow: string;
    title: string;
    body: string;
  };
};

export default function Devices({ devices }: DevicesProps) {
  return (
    <Reveal>
      <section className="rounded-[32px] border border-border bg-surface/70 px-8 py-10 shadow-[0_8px_20px_rgba(4,6,10,0.06),_inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur dark:shadow-[0_8px_20px_rgba(4,6,10,0.12),_inset_0_1px_0_rgba(255,255,255,0.14)]">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
            {devices.eyebrow}
          </p>
          <h2 className="text-balance text-2xl font-semibold text-foreground sm:text-3xl">
            {devices.title}
          </h2>
          <p className="text-pretty text-base text-foreground/70">
            {devices.body}
          </p>
        </div>
      </section>
    </Reveal>
  );
}
