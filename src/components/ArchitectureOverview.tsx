import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

type Layer = {
  label: string;
  items: ReadonlyArray<string>;
  description: string;
};

type ArchitectureOverviewProps = {
  architecture: {
    title: string;
    subtitle: string;
    body: string;
    flowLabel: string;
    flow: ReadonlyArray<string>;
    layers: ReadonlyArray<Layer>;
    footer: string;
  };
};

/* Accent colors per layer – keeps the diagram visually scannable */
const layerAccents = [
  { border: "border-sky-400/30", bg: "bg-sky-400/5", dot: "bg-sky-400" },
  { border: "border-violet-400/30", bg: "bg-violet-400/5", dot: "bg-violet-400" },
  { border: "border-amber-400/30", bg: "bg-amber-400/5", dot: "bg-amber-400" },
  { border: "border-emerald-400/30", bg: "bg-emerald-400/5", dot: "bg-emerald-400" },
  { border: "border-rose-400/30", bg: "bg-rose-400/5", dot: "bg-rose-400" },
];

function ArrowDown() {
  return (
    <div className="flex justify-center py-1">
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none" className="text-foreground/40">
        <path d="M10 0v20m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function LayerRow({ layer, accent, index }: { layer: Layer; accent: typeof layerAccents[number]; index: number }) {
  return (
    <Reveal delay={0.08 + index * 0.05}>
      <div
        className={`
          relative rounded-2xl border ${accent.border} ${accent.bg}
          px-5 py-4 backdrop-blur
          shadow-[0_4px_12px_rgba(4,6,10,0.04),_inset_0_1px_0_rgba(255,255,255,0.3)]
          dark:shadow-[0_4px_12px_rgba(4,6,10,0.16),_inset_0_1px_0_rgba(255,255,255,0.08)]
          transition-colors
        `}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          {/* Label */}
          <div className="flex items-center gap-2.5 sm:w-40 shrink-0">
            <span className="text-sm font-semibold text-foreground tracking-tight">
              {layer.label}
            </span>
          </div>

          {/* Items (pills) */}
          <div className="flex flex-wrap gap-2 flex-1">
            {layer.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border/60 bg-surface/60 px-3 py-1 text-xs font-mono tracking-wide text-foreground/80"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-xs text-foreground/65 sm:w-52 shrink-0 sm:text-right">
            {layer.description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export default function ArchitectureOverview({
  architecture,
}: ArchitectureOverviewProps) {
  return (
    <section id="architecture" className="scroll-mt-24 flex flex-col gap-8 sm:scroll-mt-28">
      <Reveal>
        <SectionHeader
          eyebrow={architecture.subtitle}
          title={architecture.title}
          subtitle={architecture.body}
        />
      </Reveal>

      {/* Layered architecture diagram */}
      <div className="flex flex-col">
        {architecture.layers.map((layer, index) => {
          const accent = layerAccents[index % layerAccents.length];
          return (
            <div key={layer.label}>
              <LayerRow layer={layer} accent={accent} index={index} />
              {index < architecture.layers.length - 1 && <ArrowDown />}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {architecture.footer && (
        <Reveal delay={0.36}>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-foreground/65">
            {architecture.footer}
          </p>
        </Reveal>
      )}
    </section>
  );
}
