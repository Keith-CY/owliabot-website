"use client";

import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold uppercase text-foreground hover:border-accent"
      aria-label={`Switch to ${next} theme`}
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
}
