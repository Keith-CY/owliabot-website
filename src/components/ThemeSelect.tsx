"use client";

import { useEffect, useState } from "react";

export default function ThemeSelect() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("system");
  const [media, setMedia] = useState<MediaQueryList | null>(null);

  const applyTheme = (value: string, query: MediaQueryList | null) => {
    const resolved =
      value === "system"
        ? query?.matches
          ? "dark"
          : "light"
        : value;
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolved);
    root.style.colorScheme = resolved;
  };

  useEffect(() => {
    setMounted(true);
    if (typeof document === "undefined") return;
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    setMedia(query);
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("theme="));
    const value = cookie ? decodeURIComponent(cookie.split("=")[1]) : "system";
    setTheme(value);
    applyTheme(value, query);
  }, []);

  useEffect(() => {
    if (!mounted || !media) return;
    applyTheme(theme, media);
    const handler = () => {
      if (theme === "system") applyTheme("system", media);
    };

    media.addEventListener("change", handler);
    return () => {
      media.removeEventListener("change", handler);
    };
  }, [theme, media, mounted]);

  if (!mounted) return null;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setTheme(value);
    document.cookie = `theme=${encodeURIComponent(value)}; path=/; max-age=31536000`;
    applyTheme(value, media);
  };

  return (
    <select
      value={theme}
      onChange={handleChange}
      className="rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold uppercase text-foreground"
      aria-label="Select theme"
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
