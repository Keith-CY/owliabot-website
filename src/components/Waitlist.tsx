import Script from "next/script";
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
          <div className="mt-6 overflow-hidden rounded-[26px] border border-border bg-surface/80 shadow-[0_10px_22px_rgba(4,6,10,0.14),_inset_0_1px_0_rgba(255,255,255,0.35)] dark:shadow-[0_10px_22px_rgba(4,6,10,0.2),_inset_0_1px_0_rgba(255,255,255,0.12)]">
            <iframe
              className="min-h-[520px] w-full"
              data-tally-src="https://tally.so/r/RGD10d?transparentBackground=1&dynamicHeight=1"
              title="OwliaBot waitlist"
            />
          </div>
          <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
        </div>
      </section>
    </Reveal>
  );
}
