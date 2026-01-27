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
      <section className="rounded-[34px] border border-border bg-surface px-8 py-10 shadow-[0_16px_40px_rgba(6,8,18,0.32)] backdrop-blur">
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
