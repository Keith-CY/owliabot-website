import Script from "next/script";
import Reveal from "./Reveal";

type WaitlistProps = {
  waitlist: {
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
          <p className="text-pretty text-xs text-foreground/60">
            {waitlist.note}
          </p>
          <div className="mt-6 overflow-hidden rounded-[28px] border border-border bg-black/30">
            <iframe
              className="min-h-[520px] w-full"
              data-tally-src="https://tally.so/r/kdN1Mo?transparentBackground=1&dynamicHeight=1"
              title="OwliaBot waitlist"
            />
          </div>
          <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
        </div>
      </section>
    </Reveal>
  );
}
