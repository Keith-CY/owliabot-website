import Reveal from "./Reveal";

type WaitlistProps = {
  waitlist: {
    eyebrow: string;
    title: string;
    body: string;
    privacy: string;
    note: string;
  };
};

export default function Waitlist({ waitlist }: WaitlistProps) {
  const waitlistUrl = "https://tally.so/r/RGD10d";

  return (
    <Reveal>
      <section
        id="waitlist"
        className="rounded-[34px] border border-border bg-surface/70 px-8 py-12 shadow-[0_14px_32px_rgba(4,6,10,0.16),_inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur dark:shadow-[0_14px_32px_rgba(4,6,10,0.22),_inset_0_1px_0_rgba(255,255,255,0.14)]"
      >
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
            {waitlist.eyebrow}
          </p>
          <h2 className="text-balance text-2xl font-semibold text-foreground sm:text-3xl">
            {waitlist.title}
          </h2>
          <p className="text-pretty text-base text-foreground/70">
            {waitlist.body}
          </p>
          <p className="text-pretty text-sm font-semibold text-foreground">
            {waitlist.privacy}
          </p>
          <p className="text-pretty text-xs text-foreground/60">
            {waitlist.note}
          </p>
          <a
            className="mt-6 inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-[0_12px_30px_rgba(5,6,12,0.22),_inset_0_1px_0_rgba(255,255,255,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(5,6,12,0.28),_inset_0_1px_0_rgba(255,255,255,0.7)]"
            href={waitlistUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            {waitlist.title}
          </a>
        </div>
      </section>
    </Reveal>
  );
}
