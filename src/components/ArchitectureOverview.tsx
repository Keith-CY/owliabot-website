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

/* Accent colors per layer */
const layerAccents = [
  { border: "border-sky-400/30", bg: "bg-sky-400/8", activeBg: "bg-sky-400/15", text: "text-sky-300" },
  { border: "border-violet-400/30", bg: "bg-violet-400/8", activeBg: "bg-violet-400/15", text: "text-violet-300" },
  { border: "border-amber-400/30", bg: "bg-amber-400/8", activeBg: "bg-amber-400/15", text: "text-amber-300" },
  { border: "border-emerald-400/30", bg: "bg-emerald-400/8", activeBg: "bg-emerald-400/15", text: "text-emerald-300" },
  { border: "border-rose-400/30", bg: "bg-rose-400/8", activeBg: "bg-rose-400/15", text: "text-rose-300" },
];

/* How much each card overlaps the previous one (px) */
const OVERLAP = 12;
/* Expanded card extra width */
const EXPAND_EXTRA = 80;

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
                  ${accent.border}
                  ${isActive ? accent.activeBg : accent.bg}
                  shadow-[0_4px_16px_rgba(4,6,10,0.06),_inset_0_1px_0_rgba(255,255,255,0.25)]
                  dark:shadow-[0_4px_16px_rgba(4,6,10,0.2),_inset_0_1px_0_rgba(255,255,255,0.08)]
                `}
                style={{
                  zIndex: isActive ? 20 : count - index,
                  marginLeft: index === 0 ? 0 : -OVERLAP,
                }}
                animate={{
                  width: isActive ? 260 + EXPAND_EXTRA : 160,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(isActive ? null : index)}
              >
                <div className="flex h-full flex-col justify-between px-5 py-5">
                  {/* Label — always visible */}
                  <p className="text-sm font-semibold text-foreground tracking-tight whitespace-nowrap">
                    {layer.label}
                  </p>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-xs text-foreground/65 leading-relaxed">
                          {layer.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {layer.items.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-border/50 bg-surface/50 px-2.5 py-0.5 text-[10px] font-mono tracking-wide text-foreground/70"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Reveal>

      {/* ── Mobile: vertical stack (simplified) ── */}
      <div className="flex flex-col gap-3 md:hidden">
        {architecture.layers.map((layer, index) => {
          const accent = layerAccents[index % layerAccents.length];
          return (
            <Reveal key={layer.label} delay={0.06 * index}>
              <button
                type="button"
                className={`
                  w-full text-left rounded-2xl border backdrop-blur px-5 py-4
                  ${accent.border} ${active === index ? accent.activeBg : accent.bg}
                  shadow-[0_4px_12px_rgba(4,6,10,0.04),_inset_0_1px_0_rgba(255,255,255,0.3)]
                  dark:shadow-[0_4px_12px_rgba(4,6,10,0.16),_inset_0_1px_0_rgba(255,255,255,0.08)]
                  transition-colors
                `}
                onClick={() => setActive(active === index ? null : index)}
              >
                <p className="text-sm font-semibold text-foreground tracking-tight">
                  {layer.label}
                </p>
                <AnimatePresence>
                  {active === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-xs text-foreground/65">
                        {layer.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {layer.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-border/50 bg-surface/50 px-2.5 py-0.5 text-[10px] font-mono tracking-wide text-foreground/70"
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
