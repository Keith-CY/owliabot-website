"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const nodeAccents = [
  { ring: "ring-sky-400/40", bg: "hover:bg-sky-400/10", activeBg: "bg-sky-400/15", line: "bg-sky-400/30" },
  { ring: "ring-violet-400/40", bg: "hover:bg-violet-400/10", activeBg: "bg-violet-400/15", line: "bg-violet-400/30" },
  { ring: "ring-amber-400/40", bg: "hover:bg-amber-400/10", activeBg: "bg-amber-400/15", line: "bg-amber-400/30" },
  { ring: "ring-emerald-400/40", bg: "hover:bg-emerald-400/10", activeBg: "bg-emerald-400/15", line: "bg-emerald-400/30" },
  { ring: "ring-rose-400/40", bg: "hover:bg-rose-400/10", activeBg: "bg-rose-400/15", line: "bg-rose-400/30" },
];

const cardAccents = [
  "border-sky-400/25",
  "border-violet-400/25",
  "border-amber-400/25",
  "border-emerald-400/25",
  "border-rose-400/25",
];

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

      {/* ── Desktop: node pipeline + expandable card ── */}
      <Reveal delay={0.08}>
        <div className="hidden md:flex flex-col items-center gap-6">
          {/* Pipeline row: nodes + arrows */}
          <div className="flex items-center w-full max-w-3xl mx-auto">
            {architecture.layers.map((layer, index) => {
              const accent = nodeAccents[index % nodeAccents.length];
              const isActive = active === index;

              return (
                <div key={layer.label} className="flex items-center flex-1 last:flex-none">
                  {/* Node */}
                  <button
                    type="button"
                    className={`
                      relative flex-shrink-0 px-4 py-2.5 rounded-xl
                      border border-border/60 backdrop-blur
                      transition-all duration-200 cursor-pointer
                      ${isActive
                        ? `${accent.activeBg} ring-2 ${accent.ring} shadow-lg`
                        : `bg-surface/60 ${accent.bg}`
                      }
                    `}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => setActive(isActive ? null : index)}
                  >
                    <span className={`
                      text-sm font-semibold tracking-tight whitespace-nowrap
                      ${isActive ? "text-foreground" : "text-foreground/70"}
                    `}>
                      {layer.label}
                    </span>
                  </button>

                  {/* Arrow connector */}
                  {index < count - 1 && (
                    <div className="flex-1 flex items-center mx-1.5">
                      <div className="flex-1 h-px bg-foreground/15" />
                      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" className="text-foreground/30 flex-shrink-0">
                        <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Expanded card — appears below the active node */}
          <div className="w-full max-w-3xl mx-auto" style={{ minHeight: 120 }}>
            <AnimatePresence mode="wait">
              {active !== null && (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`
                    rounded-2xl border bg-background backdrop-blur px-6 py-5
                    ${cardAccents[active % cardAccents.length]}
                    shadow-[0_4px_20px_rgba(4,6,10,0.06),_inset_0_1px_0_rgba(255,255,255,0.4)]
                    dark:shadow-[0_4px_20px_rgba(4,6,10,0.25),_inset_0_1px_0_rgba(255,255,255,0.06)]
                  `}
                >
                  <p className="text-base font-semibold text-foreground">
                    {architecture.layers[active].label}
                  </p>
                  <p className="mt-2 text-sm text-foreground/65 leading-relaxed">
                    {architecture.layers[active].description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {architecture.layers[active].items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border/60 bg-surface/60 px-3 py-1 text-xs font-mono tracking-wide text-foreground/70"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Reveal>

      {/* ── Mobile: vertical accordion ── */}
      <div className="flex flex-col gap-2 md:hidden">
        {architecture.layers.map((layer, index) => {
          const isActive = active === index;
          return (
            <Reveal key={layer.label} delay={0.06 * index}>
              <button
                type="button"
                className={`
                  w-full text-left rounded-2xl border bg-background backdrop-blur px-5 py-4
                  ${cardAccents[index % cardAccents.length]}
                  shadow-[0_2px_8px_rgba(4,6,10,0.04),_inset_0_1px_0_rgba(255,255,255,0.4)]
                  dark:shadow-[0_2px_8px_rgba(4,6,10,0.2),_inset_0_1px_0_rgba(255,255,255,0.06)]
                  transition-colors
                `}
                onClick={() => setActive(isActive ? null : index)}
              >
                <p className="text-sm font-semibold text-foreground tracking-tight">
                  {layer.label}
                </p>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-xs text-foreground/60 leading-relaxed">
                        {layer.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {layer.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-border/50 bg-surface/50 px-2.5 py-0.5 text-[10px] font-mono tracking-wide text-foreground/60"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
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
