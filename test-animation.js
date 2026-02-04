// Test animation logic
const routes = [
  { skillIdx: 0, vaultIdxs: [1], color: "#38bdf8" }, // 资产总览
  { skillIdx: 1, vaultIdxs: [0], color: "#a78bfa" }, // 借币生息
  { skillIdx: 2, vaultIdxs: [0], color: "#fbbf24" }, // AMM LP 管理
  { skillIdx: 3, vaultIdxs: [0], color: "#34d399" }, // Token 发射
];

const TOTAL_PHASES = 4;
const PHASE_DUR = [600, 600, 800, 1000]; // 4 phases

// Reducer logic
function animReducer(state, action) {
  if (action.type === 'ADVANCE') {
    if (state.phase < TOTAL_PHASES - 1) {
      return { ...state, phase: state.phase + 1 };
    }
    // Move to next route
    return {
      routeIdx: (state.routeIdx + 1) % routes.length,
      phase: 0,
    };
  }
  if (action.type === 'SET_ROUTE') {
    return { routeIdx: action.routeIdx, phase: 0 };
  }
  return state;
}

// Simulate animation
let state = { routeIdx: 0, phase: 0 };
console.log('=== Animation Simulation ===\n');

for (let i = 0; i < 20; i++) {
  const route = routes[state.routeIdx];
  console.log(`Step ${i}: Route ${state.routeIdx} (Skill: ${route.skillIdx}), Phase ${state.phase}, Duration: ${PHASE_DUR[state.phase]}ms`);
  
  state = animReducer(state, { type: 'ADVANCE' });
  
  // Check for route change
  if (state.phase === 0 && i > 0) {
    console.log(`  → Switched to Route ${state.routeIdx}\n`);
  }
}

console.log('\n=== Expected Pattern ===');
console.log('Route 0 (4 phases) → Route 1 (4 phases) → Route 2 (4 phases) → Route 3 (4 phases) → Route 0...');

// Verify pattern
console.log('\n=== Pattern Verification ===');
state = { routeIdx: 0, phase: 0 };
let routeSequence = [0];
for (let i = 0; i < 16; i++) {
  state = animReducer(state, { type: 'ADVANCE' });
  if (state.phase === 0 && i > 0) {
    routeSequence.push(state.routeIdx);
  }
}
console.log('Route sequence:', routeSequence.join(' → '));
console.log('Expected:       0 → 1 → 2 → 3 → 0');
console.log('✓ Match:', routeSequence.join(' → ') === '0 → 1 → 2 → 3 → 0' ? 'YES' : 'NO');
