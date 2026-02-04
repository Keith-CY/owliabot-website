"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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

/* ── Data ── */
const skills = [
  "Health Factor Guardian",
  "Portfolio Overview",
  "Execution Engine",
  "Uniswap V3 LP Manager",
  "Refinance Router",
];

const vaultItems = ["Crypto Wallet", "API Key"];

type Route = {
  skillIdx: number;
  vaultIdxs: number[];
  color: string;
};

const routes: Route[] = [
  { skillIdx: 0, vaultIdxs: [0],    color: "#38bdf8" },
  { skillIdx: 1, vaultIdxs: [1],    color: "#a78bfa" },
  { skillIdx: 2, vaultIdxs: [0, 1], color: "#fbbf24" },
  { skillIdx: 3, vaultIdxs: [0],    color: "#34d399" },
  { skillIdx: 4, vaultIdxs: [0],    color: "#fb7185" },
];

/* ── Layout constants (SVG viewBox 900×340) ── */
const VB_W = 900;
const VB_H = 340;

// Card dimensions
const CARD_W = 170;
const CARD_H = 32;
const CARD_R = 12; // border-radius

// Column positions (left edge of cards)
const COL_USER_X = 10;
const COL_BOT_X = 140;
const COL_SKILL_X = 380;
const COL_VAULT_X = 700;

// Y center for User and OwliaBot
const CENTER_Y = 160;

// Skill card Y positions (5 items)
const SKILL_GAP = 48;
const SKILL_Y_START = 65;
const skillCenterY = (i: number) => SKILL_Y_START + i * SKILL_GAP + CARD_H / 2;

// Vault card Y positions (2 items)
const VAULT_GAP = 60;
const VAULT_Y_START = 110;
const vaultCenterY = (i: number) => VAULT_Y_START + i * VAULT_GAP + CARD_H / 2;

// Label Y positions (above the cards)
const SKILL_LABEL_Y = SKILL_Y_START - 22;
const VAULT_LABEL_Y = VAULT_Y_START - 22;

/* ── Path builders ── */

// Straight horizontal line
function straightPath(x1: number, y1: number, x2: number, y2: number) {
  return `M${x1},${y1} L${x2},${y2}`;
}

// Curve from right edge of source → left center of target card,
// with a small arc wrapping around the card's left side for the "hug" effect
function curveToCard(
  srcX: number,
  srcY: number,
  cardX: number,
  cardCenterY: number,
) {
  // Approach point: slightly left of card
  const approachX = cardX - 14;
  // Control points for the main bezier
  const cpx = (srcX + approachX) / 2;

  // Arc around the card left edge: come in from the left, curve around the rounded corner
  const arcStartY = cardCenterY - CARD_R;
  const arcEndY = cardCenterY;

  return (
    `M${srcX},${srcY} ` +
    `C${cpx},${srcY} ${cpx},${arcStartY} ${approachX},${arcStartY} ` +
    `Q${cardX - 2},${arcStartY} ${cardX - 2},${arcEndY}`
  );
}

// Curve from right edge of card → onwards to next column left edge
function curveFromCard(
  cardRightX: number,
  cardCenterY: number,
  destCardX: number,
  destCenterY: number,
) {
  // Start from right edge of source card, arc away
  const departX = cardRightX + 2;
  const departY = cardCenterY;
  const arcEndY = cardCenterY + (destCenterY > cardCenterY ? CARD_R : -CARD_R);

  // Approach destination card left side
  const approachX = destCardX - 14;
  const destArcStartY = destCenterY - CARD_R;
  const destArcEndY = destCenterY;

  const cpx = (departX + approachX) / 2;

  return (
    `M${departX},${departY} ` +
    `Q${departX},${arcEndY} ${departX + 12},${arcEndY} ` +
    `C${cpx},${arcEndY} ${cpx},${destArcStartY} ${approachX},${destArcStartY} ` +
    `Q${destCardX - 2},${destArcStartY} ${destCardX - 2},${destArcEndY}`
  );
}

/* ── Animation phases ── */
const PHASE_DURATION = [0, 500, 600, 600, 1400]; // ms
const TOTAL_PHASES = 5;

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
        opacity: { duration: 0.1 },
      }}
    />
  );
}

/* ── Card component (positioned absolutely in SVG-space via foreignObject or overlay) ── */
function FlowCard({
  label,
  x,
  y,
  w,
  active,
  onClick,
}: {
  label: string;
  x: number;
  y: number;
  w: number;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={`
        absolute flex items-center rounded-xl border px-3 text-xs font-semibold
        transition-all duration-400
        ${active
          ? "border-foreground/20 bg-background text-foreground shadow-sm"
          : "border-border/40 bg-surface/40 text-foreground/30"
        }
        ${onClick ? "cursor-pointer hover:text-foreground/50" : ""}
      `}
      style={{
        left: `${(x / VB_W) * 100}%`,
        top: `${(y / VB_H) * 100}%`,
        width: `${(w / VB_W) * 100}%`,
        height: `${(CARD_H / VB_H) * 100}%`,
      }}
      onClick={onClick}
    >
      {label}
    </div>
  );
}

export default function ArchitectureOverview({
  architecture,
}: ArchitectureOverviewProps) {
  const [routeIdx, setRouteIdx] = useState(0);
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);

  const route = routes[routeIdx];

  const advancePhase = useCallback(() => {
    setPhase((p) => {
      if (p < TOTAL_PHASES - 1) return p + 1;
      setRouteIdx((r) => (r + 1) % routes.length);
      return 0;
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(advancePhase, PHASE_DURATION[phase]);
    return () => clearTimeout(timer);
  }, [phase, paused, advancePhase]);

  const selectRoute = (i: number) => {
    setRouteIdx(i);
    setPhase(0);
    setPaused(false);
  };

  // Build paths
  const userRightX = COL_USER_X + 60;
  const botLeftX = COL_BOT_X;
  const botRightX = COL_BOT_X + 90;

  const pathUserToBot = straightPath(userRightX, CENTER_Y, botLeftX, CENTER_Y);
  const pathBotToSkill = curveToCard(botRightX, CENTER_Y, COL_SKILL_X, skillCenterY(route.skillIdx));
  const pathsSkillToVault = route.vaultIdxs.map((vi) =>
    curveFromCard(COL_SKILL_X + CARD_W, skillCenterY(route.skillIdx), COL_VAULT_X, vaultCenterY(vi))
  );

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

      {/* ── Desktop ── */}
      <Reveal delay={0.08}>
        <div
          className="hidden md:block"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative mx-auto" style={{ maxWidth: VB_W, aspectRatio: `${VB_W}/${VB_H}` }}>
            {/* SVG lines */}
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Dim base lines */}
              <path d={pathUserToBot} fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground/6" />
              <path d={pathBotToSkill} fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground/6" />
              {pathsSkillToVault.map((d, i) => (
                <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground/6" />
              ))}

              {/* Animated lines */}
              <AnimatedPath d={pathUserToBot} color={route.color} phase={phase} targetPhase={1} duration={PHASE_DURATION[1]} />
              <AnimatedPath d={pathBotToSkill} color={route.color} phase={phase} targetPhase={2} duration={PHASE_DURATION[2]} />
              {pathsSkillToVault.map((d, i) => (
                <AnimatedPath key={i} d={d} color={route.color} phase={phase} targetPhase={3} duration={PHASE_DURATION[3]} />
              ))}
            </svg>

            {/* HTML overlay — nodes */}
            <div className="absolute inset-0">
              {/* User */}
              <div
                className="absolute flex items-center"
                style={{
                  left: `${(COL_USER_X / VB_W) * 100}%`,
                  top: `${((CENTER_Y - 16) / VB_H) * 100}%`,
                }}
              >
                <span className={`text-sm font-semibold transition-colors duration-300 ${userLit ? "text-foreground" : "text-foreground/30"}`}>
                  User
                </span>
              </div>

              {/* OwliaBot */}
              <FlowCard
                label="OwliaBot"
                x={COL_BOT_X}
                y={CENTER_Y - CARD_H / 2}
                w={90}
                active={botLit}
              />

              {/* Skills label */}
              <div
                className="absolute"
                style={{
                  left: `${(COL_SKILL_X / VB_W) * 100}%`,
                  top: `${(SKILL_LABEL_Y / VB_H) * 100}%`,
                }}
              >
                <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground/25">
                  Skills
                </span>
              </div>

              {/* Skill cards */}
              {skills.map((s, i) => (
                <FlowCard
                  key={s}
                  label={s}
                  x={COL_SKILL_X}
                  y={SKILL_Y_START + i * SKILL_GAP}
                  w={CARD_W}
                  active={skillLit && route.skillIdx === i}
                  onClick={() => {
                    const ri = routes.findIndex((r) => r.skillIdx === i);
                    if (ri >= 0) selectRoute(ri);
                  }}
                />
              ))}

              {/* Vault label */}
              <div
                className="absolute"
                style={{
                  left: `${(COL_VAULT_X / VB_W) * 100}%`,
                  top: `${(VAULT_LABEL_Y / VB_H) * 100}%`,
                }}
              >
                <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground/25">
                  Owlia Vault
                </span>
              </div>

              {/* Vault cards */}
              {vaultItems.map((v, i) => (
                <FlowCard
                  key={v}
                  label={v}
                  x={COL_VAULT_X}
                  y={VAULT_Y_START + i * VAULT_GAP}
                  w={140}
                  active={vaultLit && route.vaultIdxs.includes(i)}
                />
              ))}
            </div>
          </div>

          {/* Route dots */}
          <div className="mt-4 flex justify-center gap-2">
            {routes.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === routeIdx ? "w-6 bg-foreground/30" : "w-1.5 bg-foreground/10 hover:bg-foreground/20"}`}
                onClick={() => selectRoute(i)}
              />
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── Mobile ── */}
      <div className="flex flex-col items-center gap-3 md:hidden">
        <span className={`text-sm font-semibold transition-colors duration-300 ${userLit ? "text-foreground" : "text-foreground/30"}`}>User</span>
        <div className="w-px h-5 bg-foreground/10" />
        <span className={`rounded-xl border px-3 py-1.5 text-sm font-semibold transition-all duration-300 ${botLit ? "border-foreground/20 bg-background text-foreground" : "border-border/40 text-foreground/30"}`}>OwliaBot</span>
        <div className="w-px h-5 bg-foreground/10" />
        <div className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all duration-300 ${skillLit ? "border-foreground/20 bg-background text-foreground" : "border-border/40 text-foreground/30"}`}>
          {skills[route.skillIdx]}
        </div>
        <div className="w-px h-5 bg-foreground/10" />
        <div className="flex gap-2">
          {vaultItems.map((v, i) => (
            <span key={v} className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${vaultLit && route.vaultIdxs.includes(i) ? "border-foreground/20 bg-background text-foreground" : "border-border/40 text-foreground/30"}`}>
              {v}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-1.5 mt-4">
          {routes.map((r, i) => (
            <button key={i} type="button" className={`rounded-lg border px-2.5 py-1 text-[10px] font-semibold transition-all duration-300 ${i === routeIdx ? "border-foreground/20 bg-background text-foreground" : "border-border/40 text-foreground/30"}`} onClick={() => selectRoute(i)}>
              {skills[r.skillIdx]}
            </button>
          ))}
        </div>
      </div>

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
