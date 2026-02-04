"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

type ArchitectureOverviewProps = {
  architecture: {
    title: string;
    subtitle: string;
    body: string;
    flowLabel: string;
    flow: ReadonlyArray<string>;
    layers: ReadonlyArray<{
      label: string;
      items: ReadonlyArray<string>;
      description: string;
    }>;
    footer: string;
  };
};

/* ── Route definitions: each route lights up a path from User → OwliaBot → Skill → Vault target ── */
type Route = {
  skill: string;
  skillLabel: string;
  vault: "wallet" | "apikey" | "both";
  color: string;       // tailwind color token
  glowColor: string;   // CSS color for SVG glow
};

const routes: Route[] = [
  { skill: "health-guardian", skillLabel: "Health Factor Guardian", vault: "wallet", color: "sky", glowColor: "rgb(56,189,248)" },
  { skill: "portfolio", skillLabel: "Portfolio Overview", vault: "apikey", color: "violet", glowColor: "rgb(167,139,250)" },
  { skill: "execution", skillLabel: "Execution Engine", vault: "both", color: "amber", glowColor: "rgb(251,191,36)" },
  { skill: "lp-manager", skillLabel: "Uniswap V3 LP Manager", vault: "wallet", color: "emerald", glowColor: "rgb(52,211,153)" },
  { skill: "refinance", skillLabel: "Refinance Router", vault: "wallet", color: "rose", glowColor: "rgb(251,113,133)" },
];

const CYCLE_MS = 3000;

/* ── Node component ── */
function Node({
  label,
  active,
  glowColor,
  sub,
}: {
  label: string;
  active: boolean;
  glowColor?: string;
  sub?: string;
}) {
  return (
    <div className="relative flex flex-col items-center gap-1.5">
      {active && glowColor && (
        <motion.div
          className="absolute -inset-2 rounded-2xl opacity-30 blur-xl"
          style={{ background: glowColor }}
          layoutId={undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.4 }}
        />
      )}
      <div
        className={`
          relative z-10 rounded-xl border px-4 py-2.5 text-sm font-semibold backdrop-blur
          transition-all duration-500
          ${active
            ? "border-foreground/20 bg-background text-foreground shadow-lg"
            : "border-border/50 bg-surface/50 text-foreground/40"
          }
        `}
      >
        {label}
      </div>
      {sub && (
        <span className={`text-[10px] font-medium transition-colors duration-500 ${active ? "text-foreground/50" : "text-foreground/20"}`}>
          {sub}
        </span>
      )}
    </div>
  );
}

/* ── Animated connection line (SVG) ── */
function ConnectionLine({
  active,
  glowColor,
  className,
}: {
  active: boolean;
  glowColor: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center ${className ?? ""}`}>
      <svg width="100%" height="4" className="overflow-visible">
        {/* Base line */}
        <line x1="0" y1="2" x2="100%" y2="2" stroke="currentColor" strokeWidth="1" className="text-foreground/10" />
        {/* Active glow line */}
        {active && (
          <motion.line
            x1="0" y1="2" x2="100%" y2="2"
            stroke={glowColor}
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </svg>
    </div>
  );
}

export default function ArchitectureOverview({
  architecture,
}: ArchitectureOverviewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-cycle
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % routes.length);
    }, CYCLE_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const route = routes[activeIndex];

  // Which vault nodes are active
  const walletActive = route.vault === "wallet" || route.vault === "both";
  const apikeyActive = route.vault === "apikey" || route.vault === "both";

  return (
    <section id="architecture" className="scroll-mt-24 flex flex-col gap-8 sm:scroll-mt-28">
      <Reveal>
        <SectionHeader
          eyebrow={architecture.subtitle}
          title={architecture.title}
          subtitle={architecture.body}
        />
      </Reveal>

      {/* ── Desktop: animated flow diagram ── */}
      <Reveal delay={0.08}>
        <div
          className="hidden md:block"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="mx-auto max-w-4xl">
            {/* Main flow row */}
            <div className="grid grid-cols-[auto_48px_auto_48px_1fr_48px_auto] items-center gap-0">
              {/* User */}
              <Node label="User" active glowColor={route.glowColor} />

              {/* Line: User → OwliaBot */}
              <ConnectionLine active glowColor={route.glowColor} />

              {/* OwliaBot */}
              <Node label="OwliaBot" active glowColor={route.glowColor} />

              {/* Line: OwliaBot → Skills */}
              <ConnectionLine active glowColor={route.glowColor} />

              {/* Skills cluster */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex flex-wrap justify-center gap-2">
                  {routes.map((r, i) => (
                    <button
                      key={r.skill}
                      type="button"
                      className={`
                        rounded-lg border px-3 py-1.5 text-xs font-semibold
                        transition-all duration-500 cursor-pointer
                        ${i === activeIndex
                          ? "border-foreground/20 bg-background text-foreground shadow-md"
                          : "border-border/40 bg-surface/40 text-foreground/35 hover:text-foreground/50"
                        }
                      `}
                      onClick={() => { setActiveIndex(i); setPaused(true); }}
                    >
                      {r.skillLabel}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] font-medium text-foreground/30">Skills</span>
              </div>

              {/* Line: Skills → Vault */}
              <ConnectionLine active glowColor={route.glowColor} />

              {/* Owlia Vault */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`
                    relative z-10 rounded-xl border px-4 py-2 text-sm font-semibold backdrop-blur
                    transition-all duration-500
                    border-foreground/20 bg-background text-foreground shadow-lg
                  `}
                >
                  Owlia Vault
                </div>
                <div className="flex gap-3 mt-1">
                  <div className={`
                    flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-medium
                    transition-all duration-500
                    ${walletActive
                      ? "border-foreground/20 bg-background text-foreground shadow-sm"
                      : "border-border/40 bg-surface/40 text-foreground/30"
                    }
                  `}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Crypto Wallet
                  </div>
                  <div className={`
                    flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-medium
                    transition-all duration-500
                    ${apikeyActive
                      ? "border-foreground/20 bg-background text-foreground shadow-sm"
                      : "border-border/40 bg-surface/40 text-foreground/30"
                    }
                  `}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                    </svg>
                    API Key
                  </div>
                </div>
              </div>
            </div>

            {/* Route indicator */}
            <div className="mt-6 flex justify-center gap-2">
              {routes.map((r, i) => (
                <button
                  key={r.skill}
                  type="button"
                  className={`
                    h-1.5 rounded-full transition-all duration-300 cursor-pointer
                    ${i === activeIndex ? "w-6 bg-foreground/30" : "w-1.5 bg-foreground/10 hover:bg-foreground/20"}
                  `}
                  onClick={() => { setActiveIndex(i); setPaused(true); }}
                />
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── Mobile: simplified vertical flow ── */}
      <div className="flex flex-col gap-4 md:hidden">
        <div className="flex flex-col items-center gap-3">
          <Node label="User" active glowColor={route.glowColor} />
          <svg width="2" height="20" className="text-foreground/15"><line x1="1" y1="0" x2="1" y2="20" stroke="currentColor" strokeWidth="1.5" /></svg>
          <Node label="OwliaBot" active glowColor={route.glowColor} />
          <svg width="2" height="20" className="text-foreground/15"><line x1="1" y1="0" x2="1" y2="20" stroke="currentColor" strokeWidth="1.5" /></svg>

          {/* Active skill */}
          <div className="rounded-xl border border-foreground/20 bg-background px-4 py-2.5 text-sm font-semibold text-foreground shadow-md">
            {route.skillLabel}
          </div>
          <span className="text-[10px] text-foreground/30">Skills</span>

          <svg width="2" height="20" className="text-foreground/15"><line x1="1" y1="0" x2="1" y2="20" stroke="currentColor" strokeWidth="1.5" /></svg>

          {/* Vault */}
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-xl border border-foreground/20 bg-background px-4 py-2.5 text-sm font-semibold text-foreground shadow-md">
              Owlia Vault
            </div>
            <div className="flex gap-2">
              <span className={`rounded-lg border px-2.5 py-1 text-[10px] font-medium transition-all duration-500 ${walletActive ? "border-foreground/20 bg-background text-foreground" : "border-border/40 text-foreground/30"}`}>
                Wallet
              </span>
              <span className={`rounded-lg border px-2.5 py-1 text-[10px] font-medium transition-all duration-500 ${apikeyActive ? "border-foreground/20 bg-background text-foreground" : "border-border/40 text-foreground/30"}`}>
                API Key
              </span>
            </div>
          </div>
        </div>

        {/* Skill selector */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-2">
          {routes.map((r, i) => (
            <button
              key={r.skill}
              type="button"
              className={`
                rounded-lg border px-2.5 py-1 text-[10px] font-semibold
                transition-all duration-300
                ${i === activeIndex
                  ? "border-foreground/20 bg-background text-foreground"
                  : "border-border/40 text-foreground/30"
                }
              `}
              onClick={() => { setActiveIndex(i); setPaused(true); }}
            >
              {r.skillLabel}
            </button>
          ))}
        </div>
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
