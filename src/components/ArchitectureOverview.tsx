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

/* Accent border colors per layer */
const layerAccents = [
  "border-sky-500/25",
  "border-violet-500/25",
  "border-amber-500/25",
  "border-emerald-500/25",
  "border-rose-500/25",
];

/*
 * "Fanned card deck" layout:
 *  - Each card is full-width (~280px) but heavily overlapped
 *  - Only a ~64px "tab" strip of each inactive card is visible (showing the label)
 *  - The active card sits on top (z-index) with full content visible
 *  - Hover/click changes which card is on top
 */

const TAB_WIDTH = 64;     // visible strip per inactive card
const CARD_WIDTH = 300;   // full card width
const CARD_HEIGHT = 220;  // fixed height so cards stack cleanly

export default function ArchitectureOverview({
  architecture,
}: ArchitectureOverviewProps) {
  const [active, setActive] = useState(0);
  const count = architecture.layers.length;

  // Total container width = all tab strips + one full card
  const totalWidth = (count - 1) * TAB_WIDTH + CARD_WIDTH;

  return (
    <section id="architecture" className="scroll-mt-24 flex flex-col gap-8 sm:scroll-mt-28">
      <Reveal>
        <SectionHeader
          eyebrow={architecture.subtitle}
          title={architecture.title}
          subtitle={architecture.body}
        />
      </Reveal>

      {/* ── Desktop: fanned card deck ── */}
      <Reveal delay={0.08}>
        <div
          className="hidden md:flex justify-center"
          onMouseLeave={() => setActive(0)}
        >
          <div className="relative" style={{ width: totalWidth, height: CARD_HEIGHT }}>
            {architecture.layers.map((layer, index) => {
              const isActive = active === index;
              const accent = layerAccents[index % layerAccents.length];

              // Position: each card starts at TAB_WIDTH * index,
              // but cards after the active one shift right to make room for the full card
              const left =
                index <= active
                  ? index * TAB_WIDTH
                  : (active * TAB_WIDTH) + CARD_WIDTH + (index - active - 1) * TAB_WIDTH;

              return (
                <motion.div
                  key={layer.label}
                  className={`
                    absolute top-0 cursor-pointer select-none
                    rounded-2xl border bg-background backdrop-blur
                    ${accent}
                    shadow-[0_4px_20px_rgba(4,6,10,0.08),_inset_0_1px_0_rgba(255,255,255,0.5)]
                    dark:shadow-[0_4px_20px_rgba(4,6,10,0.3),_inset_0_1px_0_rgba(255,255,255,0.06)]
                  `}
                  style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                  animate={{
                    left,
                    zIndex: isActive ? 20 : count - Math.abs(index - active),
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => setActive(index)}
                >
                  {/* Vertical label — always visible on the left strip */}
                  <div
                    className="absolute left-0 top-0 flex items-start justify-center pt-5"
                    style={{ width: TAB_WIDTH, height: CARD_HEIGHT }}
                  >
                    <span
                      className={`
                        text-xs font-semibold tracking-tight whitespace-nowrap
                        ${isActive ? "text-foreground" : "text-foreground/60"}
                      `}
                      style={{
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                      }}
                    >
                      {layer.label}
                    </span>
                  </div>

                  {/* Full content — only meaningful when this card is active/on top */}
                  <div
                    className="absolute top-0 right-0 flex flex-col justify-between p-5"
                    style={{
                      left: TAB_WIDTH,
                      height: CARD_HEIGHT,
                    }}
                  >
                    <div>
                      <p className="text-base font-semibold text-foreground">
                        {layer.label}
                      </p>
                      <p className="mt-2 text-sm text-foreground/65 leading-relaxed">
                        {layer.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {layer.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-border/60 bg-surface/60 px-3 py-1 text-xs font-mono tracking-wide text-foreground/70"
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
        </div>
      </Reveal>

      {/* ── Mobile: vertical accordion ── */}
      <div className="flex flex-col gap-2 md:hidden">
        {architecture.layers.map((layer, index) => {
          const accent = layerAccents[index % layerAccents.length];
          const isActive = active === index;
          return (
            <Reveal key={layer.label} delay={0.06 * index}>
              <button
                type="button"
                className={`
                  w-full text-left rounded-2xl border bg-background backdrop-blur px-5 py-4
                  ${accent}
                  shadow-[0_2px_8px_rgba(4,6,10,0.04),_inset_0_1px_0_rgba(255,255,255,0.5)]
                  dark:shadow-[0_2px_8px_rgba(4,6,10,0.2),_inset_0_1px_0_rgba(255,255,255,0.06)]
                  transition-colors
                `}
                onClick={() => setActive(isActive ? -1 : index)}
              >
                <p className="text-sm font-semibold text-foreground tracking-tight">
                  {layer.label}
                </p>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-2 text-xs text-foreground/60">
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
