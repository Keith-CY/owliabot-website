"use client";

import { useState, useEffect, useCallback } from "react";
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

/* ── Skills displayed in the diagram ── */
const skills = [
  "Health Factor Guardian",
  "Portfolio Overview",
  "Execution Engine",
  "Uniswap V3 LP Manager",
  "Refinance Router",
];

/* ── Vault targets ── */
const vaultItems = ["Crypto Wallet", "API Key"];

/* ── Routes: skill index → vault index(es) ── */
type Route = {
  skillIdx: number;
  vaultIdxs: number[]; // 0 = Crypto Wallet, 1 = API Key
  color: string;       // CSS stroke color
};

const routes: Route[] = [
  { skillIdx: 0, vaultIdxs: [0],    color: "#38bdf8" },  // sky
  { skillIdx: 1, vaultIdxs: [1],    color: "#a78bfa" },  // violet
  { skillIdx: 2, vaultIdxs: [0, 1], color: "#fbbf24" },  // amber
  { skillIdx: 3, vaultIdxs: [0],    color: "#34d399" },  // emerald
  { skillIdx: 4, vaultIdxs: [0],    color: "#fb7185" },  // rose
];

/* ── SVG layout constants (viewBox 800×320) ── */
const VB_W = 800;
const VB_H = 320;

// Column X positions (center of each node)
const X_USER = 50;
const X_BOT = 190;
const X_SKILL_LEFT = 370;   // left edge of skill card
const X_SKILL = 460;        // center of skill labels
const X_VAULT_LEFT = 610;   // left edge of vault card
const X_VAULT = 700;        // center of vault labels

// Y positions for skill items (5 items, evenly spaced)
const SKILL_Y_START = 60;
const SKILL_Y_GAP = 50;
const skillY = (i: number) => SKILL_Y_START + i * SKILL_Y_GAP;

// Y positions for vault items (2 items)
const VAULT_Y_START = 120;
const VAULT_Y_GAP = 70;
const vaultY = (i: number) => VAULT_Y_START + i * VAULT_Y_GAP;

// Center Y for User and OwliaBot
const CENTER_Y = 160;

/* ── Build SVG paths ── */
function straightPath(x1: number, y1: number, x2: number, y2: number) {
  return `M${x1},${y1} L${x2},${y2}`;
}

function curvePath(x1: number, y1: number, x2: number, y2: number) {
  const cpx = (x1 + x2) / 2;
  return `M${x1},${y1} C${cpx},${y1} ${cpx},${y2} ${x2},${y2}`;
}

/* ── Animation phases ── */
// Phase 0: idle (nothing lit)
// Phase 1: User → OwliaBot line draws
// Phase 2: OwliaBot → Skill curve draws
// Phase 3: Skill → Vault curve draws
// Phase 4: hold
const PHASE_DURATION = [0, 600, 700, 700, 1200]; // ms per phase
const TOTAL_CYCLE = PHASE_DURATION.reduce((a, b) => a + b, 0);

/* ── Animated SVG path ── */
function AnimatedPath({
  d,
  color,
  phase,
  targetPhase,
  duration,
}: {
  d: string;
  color: string;
  phase: number;
  targetPhase: number;
  duration: number;
}) {
  const isActive = phase >= targetPhase;
  const isAnimating = phase === targetPhase;

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: isActive ? 1 : 0,
        opacity: isActive ? 1 : 0,
      }}
      transition={{
        pathLength: { duration: isAnimating ? duration / 1000 : 0, ease: "easeOut" },
        opacity: { duration: 0.15 },
      }}
    />
  );
}

export default function ArchitectureOverview({
  architecture,
}: ArchitectureOverviewProps) {
  const [routeIdx, setRouteIdx] = useState(0);
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);

  const route = routes[routeIdx];

  // Phase state machine
  const advancePhase = useCallback(() => {
    setPhase((p) => {
      if (p < 4) return p + 1;
      // End of cycle → next route
      setRouteIdx((r) => (r + 1) % routes.length);
      return 0;
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(advancePhase, PHASE_DURATION[phase]);
    return () => clearTimeout(timer);
  }, [phase, paused, advancePhase]);

  // Reset phase when route changes manually
  const selectRoute = (i: number) => {
    setRouteIdx(i);
    setPhase(0);
    setPaused(false);
  };

  // Build paths for current route
  const pathUserToBot = straightPath(X_USER + 40, CENTER_Y, X_BOT - 40, CENTER_Y);
  const pathBotToSkill = curvePath(X_BOT + 50, CENTER_Y, X_SKILL_LEFT, skillY(route.skillIdx));
  const pathsSkillToVault = route.vaultIdxs.map((vi) =>
    curvePath(X_SKILL + 80, skillY(route.skillIdx), X_VAULT_LEFT, vaultY(vi))
  );

  // Which nodes are lit
  const userLit = phase >= 1;
  const botLit = phase >= 1;
  const skillLit = phase >= 2;
  const vaultLit = phase >= 3;

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
          <div className="relative mx-auto" style={{ maxWidth: VB_W, aspectRatio: `${VB_W}/${VB_H}` }}>
            {/* SVG lines layer */}
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Base lines (dim) */}
              <path d={pathUserToBot} fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground/8" />
              <path d={pathBotToSkill} fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground/8" />
              {pathsSkillToVault.map((d, i) => (
                <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground/8" />
              ))}

              {/* Animated lines */}
              <AnimatedPath d={pathUserToBot} color={route.color} phase={phase} targetPhase={1} duration={PHASE_DURATION[1]} />
              <AnimatedPath d={pathBotToSkill} color={route.color} phase={phase} targetPhase={2} duration={PHASE_DURATION[2]} />
              {pathsSkillToVault.map((d, i) => (
                <AnimatedPath key={i} d={d} color={route.color} phase={phase} targetPhase={3} duration={PHASE_DURATION[3]} />
              ))}
            </svg>

            {/* HTML nodes layer */}
            <div className="absolute inset-0" style={{ fontSize: 0 }}>
              {/* User node */}
              <div
                className="absolute flex items-center justify-center"
                style={{ left: X_USER - 30, top: CENTER_Y - 18, width: 70, height: 36 }}
              >
                <span className={`text-sm font-semibold transition-colors duration-300 ${userLit ? "text-foreground" : "text-foreground/35"}`}>
                  User
                </span>
              </div>

              {/* OwliaBot node */}
              <div
                className="absolute flex items-center justify-center"
                style={{ left: X_BOT - 45, top: CENTER_Y - 18, width: 100, height: 36 }}
              >
                <span className={`
                  rounded-lg border px-3 py-1.5 text-sm font-semibold
                  transition-all duration-300
                  ${botLit
                    ? "border-foreground/20 bg-background text-foreground"
                    : "border-border/40 bg-surface/40 text-foreground/35"
                  }
                `}>
                  OwliaBot
                </span>
              </div>

              {/* Skills card */}
              <div
                className="absolute rounded-2xl border border-border/50 bg-surface/30 backdrop-blur"
                style={{
                  left: X_SKILL_LEFT - 10,
                  top: SKILL_Y_START - 35,
                  width: 200,
                  height: skills.length * SKILL_Y_GAP + 20,
                }}
              >
                <div className="px-4 pt-2 pb-1">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground/30">Skills</span>
                </div>
                {skills.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    className={`
                      w-full text-left px-4 py-1.5 text-xs font-medium
                      transition-all duration-300 cursor-pointer
                      ${skillLit && route.skillIdx === i
                        ? "text-foreground"
                        : "text-foreground/30 hover:text-foreground/50"
                      }
                    `}
                    onClick={() => selectRoute(routes.findIndex((r) => r.skillIdx === i) ?? 0)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Owlia Vault card */}
              <div
                className="absolute rounded-2xl border border-border/50 bg-surface/30 backdrop-blur"
                style={{
                  left: X_VAULT_LEFT - 10,
                  top: VAULT_Y_START - 35,
                  width: 150,
                  height: vaultItems.length * VAULT_Y_GAP + 30,
                }}
              >
                <div className="px-4 pt-2 pb-1">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground/30">Owlia Vault</span>
                </div>
                {vaultItems.map((v, i) => (
                  <div
                    key={v}
                    className={`
                      px-4 py-2 text-xs font-medium
                      transition-all duration-300
                      ${vaultLit && route.vaultIdxs.includes(i)
                        ? "text-foreground"
                        : "text-foreground/30"
                      }
                    `}
                  >
                    {v}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Route dots */}
          <div className="mt-4 flex justify-center gap-2">
            {routes.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`
                  h-1.5 rounded-full transition-all duration-300 cursor-pointer
                  ${i === routeIdx ? "w-6 bg-foreground/30" : "w-1.5 bg-foreground/10 hover:bg-foreground/20"}
                `}
                onClick={() => selectRoute(i)}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── Mobile: simplified vertical flow ── */}
      <div className="flex flex-col items-center gap-3 md:hidden">
        <span className={`text-sm font-semibold transition-colors duration-300 ${userLit ? "text-foreground" : "text-foreground/35"}`}>User</span>
        <div className="w-px h-5 bg-foreground/10" />
        <span className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition-all duration-300 ${botLit ? "border-foreground/20 bg-background text-foreground" : "border-border/40 text-foreground/35"}`}>OwliaBot</span>
        <div className="w-px h-5 bg-foreground/10" />

        {/* Active skill */}
        <div className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-300 ${skillLit ? "border-foreground/20 bg-background text-foreground" : "border-border/40 text-foreground/35"}`}>
          {skills[route.skillIdx]}
        </div>
        <div className="w-px h-5 bg-foreground/10" />

        {/* Vault targets */}
        <div className="flex gap-2">
          {vaultItems.map((v, i) => (
            <span
              key={v}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${vaultLit && route.vaultIdxs.includes(i) ? "border-foreground/20 bg-background text-foreground" : "border-border/40 text-foreground/30"}`}
            >
              {v}
            </span>
          ))}
        </div>

        {/* Skill selector */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-4">
          {routes.map((r, i) => (
            <button
              key={i}
              type="button"
              className={`
                rounded-lg border px-2.5 py-1 text-[10px] font-semibold transition-all duration-300
                ${i === routeIdx ? "border-foreground/20 bg-background text-foreground" : "border-border/40 text-foreground/30"}
              `}
              onClick={() => selectRoute(i)}
            >
              {skills[r.skillIdx]}
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
