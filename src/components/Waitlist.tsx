type WaitlistProps = {
  waitlist: {
    title: string;
    body: string;
    privacy: string;
  };
};

export default function Waitlist({ waitlist }: WaitlistProps) {
  return (
    <section
      id="waitlist"
      className="rounded-[36px] border border-border bg-surface px-8 py-12 shadow-[0_20px_60px_rgba(6,8,18,0.45)] backdrop-blur"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-balance text-2xl font-semibold text-foreground sm:text-3xl">
          {waitlist.title}
        </h2>
        <p className="text-pretty text-base text-foreground/70">
          {waitlist.body}
        </p>
        <p className="text-pretty text-sm font-semibold text-foreground">
          {waitlist.privacy}
        </p>
        <div className="mt-6 rounded-[28px] border border-dashed border-border bg-black/30 px-6 py-10 text-center text-xs font-semibold uppercase text-foreground/60">
          Tally embed placeholder
        </div>
      </div>
    </section>
  );
}
