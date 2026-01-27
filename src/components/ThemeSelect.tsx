"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeSelect() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <select
      value={theme ?? "system"}
      onChange={(event) => setTheme(event.target.value)}
      className="rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold uppercase text-foreground"
      aria-label="Select theme"
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
