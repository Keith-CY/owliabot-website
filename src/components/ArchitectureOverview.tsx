"use client";

import { useState, useEffect, useReducer } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

type DiagramData = {
  user: string;
  bot: string;
  skillsLabel: string;
  vaultLabel: string;
  skills: ReadonlyArray<string>;
  vault: ReadonlyArray<string>;
};

type ArchitectureOverviewProps = {
  architecture: {
    title: string;
    subtitle: string;
    body: string;
    flowLabel: string;
    flow: ReadonlyArray<string>;
    footer: string;
    diagram?: DiagramData;
  };
};

/* ── Route definitions ── */
type Route = {
  skillIdx: number;
  vaultIdxs: number[];
  color: string;
};

const routes: Route[] = [
  { skillIdx: 0, vaultIdxs: [1],    color: "#38bdf8" }, // 资产总览 → API Key
  { skillIdx: 1, vaultIdxs: [0],    color: "#a78bfa" }, // 借币生息 → 加密钱包
  { skillIdx: 2, vaultIdxs: [0],    color: "#fbbf24" }, // AMM LP 管理 → 加密钱包
  { skillIdx: 3, vaultIdxs: [0],    color: "#34d399" }, // Token 发射 → 加密钱包
];

/* ── Layout (SVG viewBox 1000×400) ── */
const VB_W = 1000;
const VB_H = 400;

const CARD_H = 52;
const CARD_R = 16;

// Columns (left edge x)
const COL_USER = 20;
const COL_USER_W = 130;
const COL_BOT = 205;
const COL_BOT_W = 150;
const COL_SKILL = 460;
const COL_SKILL_W = 250;
const COL_VAULT = 800;
const COL_VAULT_W = 180;

const CENTER_Y = VB_H / 2;

// Skill Y (4 items)
const SKILL_GAP = 60;
const SKILL_Y0 = 84;
const skillY = (i: number) => SKILL_Y0 + i * SKILL_GAP;
const skillCY = (i: number) => skillY(i) + CARD_H / 2;

// Vault Y (2 items)
const VAULT_GAP = 72;
const VAULT_Y0 = 130;
const vaultY = (i: number) => VAULT_Y0 + i * VAULT_GAP;
const vaultCY = (i: number) => vaultY(i) + CARD_H / 2;

/* ── Path builders ── */

// Straight line
function linePath(x1: number, y1: number, x2: number, y2: number) {
  return `M${x1},${y1} L${x2},${y2}`;
}

// Smooth curve between two points
function curveBetween(x1: number, y1: number, x2: number, y2: number) {
  const cpx = (x1 + x2) / 2;
  return `M${x1},${y1} C${cpx},${y1} ${cpx},${y2} ${x2},${y2}`;
}

/* ── Animation ── */
const PHASE_DUR = [600, 600, 800, 1000]; // 4 phases
// 0: User→Bot line
// 1: Bot→Skill curve
// 2: Skill→Vault curves
// 3: hold before next route
const TOTAL_PHASES = 4;

type AnimState = { routeIdx: number; phase: number };
type AnimAction = { type: 'ADVANCE' } | { type: 'SET_ROUTE'; routeIdx: number };

function animReducer(state: AnimState, action: AnimAction): AnimState {
  if (action.type === 'ADVANCE') {
    if (state.phase < TOTAL_PHASES - 1) {
      return { ...state, phase: state.phase + 1 };
    }
    // Move to next route
    const nextRoute = (state.routeIdx + 1) % routes.length;
    console.log(`🎬 Animation: Route ${state.routeIdx} → ${nextRoute}`);
    return {
      routeIdx: nextRoute,
      phase: 0,
    };
  }
  if (action.type === 'SET_ROUTE') {
    return { routeIdx: action.routeIdx, phase: 0 };
  }
  return state;
}

function AnimPath({ d, color, phase, target, dur }: {
  d: string; color: string; phase: number; target: number; dur: number;
}) {
  const active = phase >= target;
  const animating = phase === target;
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
      transition={{
        pathLength: { duration: animating ? dur / 1000 : 0, ease: "easeInOut" },
        opacity: { duration: 0.1 },
      }}
    />
  );
}

/* ── Card overlay (HTML) ── */
function Card({ label, x, y, w, active, onClick }: {
  label: string; x: number; y: number; w: number; active: boolean; onClick?: () => void;
}) {
  return (
    <div
      className={`
        absolute flex items-center justify-center rounded-[14px] border px-4 text-center text-[15px] font-semibold
        transition-all duration-400
        ${active
          ? "border-foreground/25 bg-background text-foreground shadow-sm"
          : "border-border/40 bg-surface/50 text-foreground/30"
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

export default function ArchitectureOverview({ architecture }: ArchitectureOverviewProps) {
  const diagram: DiagramData = architecture.diagram ?? {
    user: "User", bot: "OwliaBot", skillsLabel: "Skills", vaultLabel: "Owlia Vault",
    skills: ["Health Factor Guardian", "Portfolio Overview", "Execution Engine", "Uniswap V3 LP Manager", "Refinance Router"],
    vault: ["Crypto Wallet", "API Key"],
  };

  const [{ routeIdx, phase }, dispatch] = useReducer(animReducer, { routeIdx: 0, phase: 0 });
  const [paused, setPaused] = useState(false);

  const route = routes[routeIdx];

  useEffect(() => {
    if (paused) return;
    
    const timer = setTimeout(() => {
      dispatch({ type: 'ADVANCE' });
    }, PHASE_DUR[phase]);
    
    return () => clearTimeout(timer);
  }, [phase, paused]);

  const selectRoute = (i: number) => { 
    dispatch({ type: 'SET_ROUTE', routeIdx: i }); 
    setPaused(false); 
  };

  // ── Build all paths for current route ──

  // User → Bot line
  const lineUserBot = linePath(COL_USER + COL_USER_W, CENTER_Y, COL_BOT, CENTER_Y);

  // Bot → Skill curve
  const si = route.skillIdx;
  const lineBotSkill = curveBetween(COL_BOT + COL_BOT_W, CENTER_Y, COL_SKILL, skillCY(si));

  // Skill → Vault curves
  const vaultPaths = route.vaultIdxs.map((vi) => ({
    line: curveBetween(COL_SKILL + COL_SKILL_W, skillCY(si), COL_VAULT, vaultCY(vi)),
  }));

  // Active states (phase 0-3)
  const userLit = phase >= 0;
  const botLit = phase >= 1;
  const skillLit = phase >= 2;
  const vaultLit = phase >= 2;

  return (
    <section id="architecture" className="scroll-mt-24 flex flex-col gap-8 sm:scroll-mt-28">
      <Reveal>
        <SectionHeader
          eyebrow={architecture.subtitle}
          title={architecture.title}
          subtitle={architecture.body}
        />
      </Reveal>

      <Reveal delay={0.08}>
        {/* Outer container with horizontal scroll on mobile */}
        <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="relative mx-auto" style={{ width: `${VB_W}px`, height: `${VB_H}px`, minWidth: `${VB_W}px` }}>
            {/* SVG lines */}
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="xMidYMid meet">
              {/* Dim base paths (background guides) */}
              {[lineUserBot, lineBotSkill, ...vaultPaths.map(v => v.line)].map((d, i) => (
                <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="1" className="text-foreground/6" />
              ))}

              {/* Animated paths */}
              {/* Phase 0: User → Bot */}
              <AnimPath d={lineUserBot} color={route.color} phase={phase} target={0} dur={PHASE_DUR[0]} />

              {/* Phase 1: Bot → Skill */}
              <AnimPath d={lineBotSkill} color={route.color} phase={phase} target={1} dur={PHASE_DUR[1]} />

              {/* Phase 2: Skill → Vault */}
              {vaultPaths.map((v, i) => (
                <AnimPath key={i} d={v.line} color={route.color} phase={phase} target={2} dur={PHASE_DUR[2]} />
              ))}
            </svg>

            {/* HTML cards */}
            <div className="absolute inset-0">
              {/* User card */}
              <Card label={diagram.user} x={COL_USER} y={CENTER_Y - CARD_H / 2} w={COL_USER_W} active={userLit} />

              {/* Bot card */}
              <Card label={diagram.bot} x={COL_BOT} y={CENTER_Y - CARD_H / 2} w={COL_BOT_W} active={botLit} />

              {/* Skills label */}
              <div className="absolute" style={{
                left: `${(COL_SKILL / VB_W) * 100}%`,
                top: `${((SKILL_Y0 - 34) / VB_H) * 100}%`,
              }}>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-foreground/40">
                  {diagram.skillsLabel}
                </span>
              </div>

              {/* Skill cards */}
              {diagram.skills.map((s, i) => (
                <Card
                  key={s}
                  label={s}
                  x={COL_SKILL}
                  y={skillY(i)}
                  w={COL_SKILL_W}
                  active={skillLit && route.skillIdx === i}
                  onClick={() => {
                    const ri = routes.findIndex((r) => r.skillIdx === i);
                    if (ri >= 0) selectRoute(ri);
                  }}
                />
              ))}

              {/* Vault label */}
              <div className="absolute" style={{
                left: `${(COL_VAULT / VB_W) * 100}%`,
                top: `${((VAULT_Y0 - 34) / VB_H) * 100}%`,
              }}>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-foreground/40">
                  {diagram.vaultLabel}
                </span>
              </div>

              {/* Vault cards */}
              {diagram.vault.map((v, i) => (
                <Card
                  key={v}
                  label={v}
                  x={COL_VAULT}
                  y={vaultY(i)}
                  w={COL_VAULT_W}
                  active={vaultLit && route.vaultIdxs.includes(i)}
                />
              ))}
            </div>
          </div>
          </div>
        </div>
      </Reveal>

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
