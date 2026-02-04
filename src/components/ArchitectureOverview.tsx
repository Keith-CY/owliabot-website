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

/* ── Icons per layer (simple SVG paths) ── */
const layerIcons: Record<string, React.ReactNode> = {
  Channels: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Gateway: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" /><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
    </svg>
  ),
  "Agent Runtime": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6m-6 3h6m-6 3h4" />
    </svg>
  ),
  Skills: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  "Owlia Vault": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
};

const accentColors = [
  { border: "border-sky-400/25", bg: "bg-sky-400/10", text: "text-sky-400" },
  { border: "border-violet-400/25", bg: "bg-violet-400/10", text: "text-violet-400" },
  { border: "border-amber-400/25", bg: "bg-amber-400/10", text: "text-amber-400" },
  { border: "border-emerald-400/25", bg: "bg-emerald-400/10", text: "text-emerald-400" },
  { border: "border-rose-400/25", bg: "bg-rose-400/10", text: "text-rose-400" },
];

export default function ArchitectureOverview({
  architecture,
}: ArchitectureOverviewProps) {
  const [active, setActive] = useState(0);

  return (
    <section id="architecture" className="scroll-mt-24 flex flex-col gap-8 sm:scroll-mt-28">
      <Reveal>
        <SectionHeader
          eyebrow={architecture.subtitle}
          title={architecture.title}
          subtitle={architecture.body}
        />
      </Reveal>

      {/* ── Desktop: left nav + right detail card ── */}
      <Reveal delay={0.08}>
        <div className="hidden md:grid grid-cols-[220px_1fr] gap-4 items-start">
          {/* Left: vertical node list */}
          <div className="flex flex-col gap-1">
            {architecture.layers.map((layer, index) => {
              const isActive = active === index;
              const accent = accentColors[index % accentColors.length];
              const icon = layerIcons[layer.label];

              return (
                <button
                  key={layer.label}
                  type="button"
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-left
                    transition-all duration-200 cursor-pointer
                    ${isActive
                      ? `${accent.bg} ${accent.border} border shadow-sm`
                      : "border border-transparent hover:bg-surface/60"
                    }
                  `}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => setActive(index)}
                >
                  <span className={`flex-shrink-0 ${isActive ? accent.text : "text-foreground/40"} transition-colors`}>
                    {icon}
                  </span>
                  <span className={`
                    text-sm font-semibold tracking-tight
                    ${isActive ? "text-foreground" : "text-foreground/60"}
                    transition-colors
                  `}>
                    {layer.label}
                  </span>
                </button>
              );
            })}

            {/* Connecting line decoration */}
            <div className="ml-[29px] -mt-[calc(100%-16px)] mb-0 pointer-events-none absolute">
              {/* Intentionally empty — clean look without connector line */}
            </div>
          </div>

          {/* Right: detail card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`
                rounded-2xl border bg-background backdrop-blur p-6
                ${accentColors[active % accentColors.length].border}
                shadow-[0_4px_20px_rgba(4,6,10,0.06),_inset_0_1px_0_rgba(255,255,255,0.4)]
                dark:shadow-[0_4px_20px_rgba(4,6,10,0.25),_inset_0_1px_0_rgba(255,255,255,0.06)]
              `}
            >
              {/* Card header */}
              <div className="flex items-center gap-3">
                <span className={`${accentColors[active % accentColors.length].text}`}>
                  {layerIcons[architecture.layers[active].label]}
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {architecture.layers[active].label}
                </h3>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-foreground/65 leading-relaxed">
                {architecture.layers[active].description}
              </p>

              {/* Items as a structured list */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {architecture.layers[active].items.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-border/50 bg-surface/40 px-4 py-3 text-center"
                  >
                    <span className="text-sm font-medium text-foreground/80">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Position indicator */}
              <div className="mt-5 flex items-center gap-2">
                {architecture.layers.map((_, i) => (
                  <div
                    key={i}
                    className={`
                      h-1 rounded-full transition-all duration-300
                      ${i === active
                        ? `w-6 ${accentColors[active % accentColors.length].bg}`
                        : "w-1.5 bg-foreground/10"
                      }
                    `}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>

      {/* ── Mobile: vertical accordion ── */}
      <div className="flex flex-col gap-2 md:hidden">
        {architecture.layers.map((layer, index) => {
          const isActive = active === index;
          const accent = accentColors[index % accentColors.length];
          const icon = layerIcons[layer.label];
          return (
            <Reveal key={layer.label} delay={0.06 * index}>
              <button
                type="button"
                className={`
                  w-full text-left rounded-2xl border bg-background backdrop-blur px-5 py-4
                  ${accent.border}
                  shadow-[0_2px_8px_rgba(4,6,10,0.04),_inset_0_1px_0_rgba(255,255,255,0.4)]
                  dark:shadow-[0_2px_8px_rgba(4,6,10,0.2),_inset_0_1px_0_rgba(255,255,255,0.06)]
                  transition-colors
                `}
                onClick={() => setActive(isActive ? -1 : index)}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? accent.text : "text-foreground/40"}>
                    {icon}
                  </span>
                  <p className="text-sm font-semibold text-foreground tracking-tight">
                    {layer.label}
                  </p>
                </div>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-xs text-foreground/60 leading-relaxed">
                        {layer.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
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
