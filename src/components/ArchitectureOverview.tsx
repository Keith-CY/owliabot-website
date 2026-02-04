"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

/* Accent colors per layer */
const layerAccents = [
  { border: "border-sky-400/20", bg: "bg-sky-400/[0.03]" },
  { border: "border-violet-400/20", bg: "bg-violet-400/[0.03]" },
  { border: "border-amber-400/20", bg: "bg-amber-400/[0.03]" },
  { border: "border-emerald-400/20", bg: "bg-emerald-400/[0.03]" },
  { border: "border-rose-400/20", bg: "bg-rose-400/[0.03]" },
];

const OVERLAP = 12;

export default function ArchitectureOverview({
  architecture,
}: ArchitectureOverviewProps) {
  const [active, setActive] = useState<number | null>(null);
  const count = architecture.layers.length;

  return (
    <section id="architecture" className="scroll-mt-24 flex flex-col gap-8 sm:scroll-mt-28">
      <Reveal>
        <SectionHeader
          eyebrow={architecture.subtitle}
          title={architecture.title}
          subtitle={architecture.body}
        />
      </Reveal>

      {/* ── Desktop: horizontal overlapping cards ── */}
      <Reveal delay={0.08}>
        <div
          className="hidden md:flex items-stretch justify-center"
          onMouseLeave={() => setActive(null)}
        >
          {architecture.layers.map((layer, index) => {
            const accent = layerAccents[index % layerAccents.length];
            const isActive = active === index;

            return (
              <motion.div
                key={layer.label}
                className={`
                  relative cursor-pointer select-none
                  rounded-2xl border backdrop-blur
                  ${accent.border} ${accent.bg}
                  shadow-[0_4px_16px_rgba(4,6,10,0.04),_inset_0_1px_0_rgba(255,255,255,0.08)]
                  dark:shadow-[0_4px_16px_rgba(4,6,10,0.16),_inset_0_1px_0_rgba(255,255,255,0.04)]
                `}
                style={{
                  marginLeft: index === 0 ? 0 : -OVERLAP,
                }}
                animate={{
                  zIndex: isActive ? 20 : count - index,
                }}
                transition={{ duration: 0 }}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(isActive ? null : index)}
              >
                <div className="flex h-full flex-col justify-between px-5 py-5 min-w-[160px]">
                  {/* Label */}
                  <p className="text-sm font-semibold text-foreground tracking-tight whitespace-nowrap">
                    {layer.label}
                  </p>

                  {/* Description + pills — always rendered */}
                  <p className="mt-3 text-xs text-foreground/50 leading-relaxed">
                    {layer.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {layer.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border/40 bg-surface/30 px-2.5 py-0.5 text-[10px] font-mono tracking-wide text-foreground/50"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Reveal>

      {/* ── Mobile: vertical stack ── */}
      <div className="flex flex-col gap-3 md:hidden">
        {architecture.layers.map((layer, index) => {
          const accent = layerAccents[index % layerAccents.length];
          return (
            <Reveal key={layer.label} delay={0.06 * index}>
              <div
                className={`
                  w-full rounded-2xl border backdrop-blur px-5 py-4
                  ${accent.border} ${accent.bg}
                  shadow-[0_4px_12px_rgba(4,6,10,0.04),_inset_0_1px_0_rgba(255,255,255,0.08)]
                  dark:shadow-[0_4px_12px_rgba(4,6,10,0.16),_inset_0_1px_0_rgba(255,255,255,0.04)]
                `}
              >
                <p className="text-sm font-semibold text-foreground tracking-tight">
                  {layer.label}
                </p>
                <p className="mt-2 text-xs text-foreground/50">
                  {layer.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border/40 bg-surface/30 px-2.5 py-0.5 text-[10px] font-mono tracking-wide text-foreground/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
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
