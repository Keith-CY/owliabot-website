type DevicesProps = {
  devices: {
    title: string;
    body: string;
  };
};

export default function Devices({ devices }: DevicesProps) {
  return (
    <section className="rounded-[32px] border border-border bg-surface px-8 py-10 shadow-[0_16px_40px_rgba(6,8,18,0.45)] backdrop-blur">
      <div className="flex flex-col gap-4">
        <h2 className="text-balance text-2xl font-semibold text-foreground sm:text-3xl">
          {devices.title}
        </h2>
        <p className="text-pretty text-base text-foreground/70">
          {devices.body}
        </p>
      </div>
    </section>
  );
}
