import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

type PartnersProps = {
  partners: {
    eyebrow: string;
    title: string;
    subtitle: string;
    logos?: ReadonlyArray<{
      name: string;
      url?: string;
      image?: string;
    }>;
  };
};

export default function Partners({ partners }: PartnersProps) {
  return (
    <section id="partners" className="scroll-mt-24 flex flex-col gap-8 sm:scroll-mt-28">
      <Reveal>
        <SectionHeader
          eyebrow={partners.eyebrow}
          title={partners.title}
          subtitle={partners.subtitle}
        />
      </Reveal>

      <Reveal delay={0.12}>
        <div className="rounded-[28px] border border-border bg-surface/70 px-12 py-16 shadow-[0_6px_16px_rgba(4,6,10,0.04),_inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur dark:shadow-[0_6px_16px_rgba(4,6,10,0.12),_inset_0_1px_0_rgba(255,255,255,0.14)]">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            {/* Placeholder boxes for partner logos */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-xl border border-border/40 bg-surface/30 text-foreground/20"
              >
                <span className="text-xs font-semibold">Logo {i}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
