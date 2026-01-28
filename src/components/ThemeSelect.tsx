"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function ThemeSelect() {
  // Always initialize with "system" to match server rendering
  const [theme, setTheme] = useState("system");
  const mediaRef = useRef<MediaQueryList | null>(null);

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
    // 1. Read from cookie on mount (client-only)
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('theme='));
    const storedTheme = cookie ? decodeURIComponent(cookie.split('=')[1]) : 'system';

    // 2. Update state if different from default "system"
    if (storedTheme !== "system") {
      setTheme(storedTheme);
    }

    // 3. Set up media query and listener
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    mediaRef.current = query;

    // 4. Apply the resolved theme immediately
    applyTheme(storedTheme, query);

    const handler = () => {
      // We only care about system preference changes if the current theme is "system"
      // But we need to check the LATEST theme state, or use 'system' if that's what we want to support dynamic switching for.
      // However, since 'applyTheme' depends on 'theme' state in the dep array below, the effect re-runs on theme change.
      // So inside this effect instance, 'theme' is constant. 
      // The original code re-bound the event listener on every theme change. We can keep that pattern or optimize.
      // Keeping original pattern for safety but referencing 'storedTheme' or 'theme' correctly is tricky if we split initialization.
      // To keep it simple: We just re-use the effect logic for updates, but we need initialization logic SEPARATE or integrated.
    };

    // Actually, let's keep it clean. We need one effect for initialization and one for updates? 
    // Or just one effect that handles both.
    // Let's stick to the previous pattern but JUST fix the initialization.
    // The previous pattern had `useEffect(..., [theme])`.
    // It bound the listener every time.
  }, []);

  // Separate effect for handling theme changes and system preference listeners
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    mediaRef.current = query;
    applyTheme(theme, query);

    const handler = () => {
      if (theme === "system") applyTheme("system", query);
    };

    query.addEventListener("change", handler);
    return () => {
      query.removeEventListener("change", handler);
    };
  }, [theme]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setTheme(value);
    document.cookie = `theme=${encodeURIComponent(value)}; path=/; max-age=31536000`;
    applyTheme(value, mediaRef.current);
  };

  const themeIcon =
    theme === "dark" ? (
      <path d="M14.5 4.5a7 7 0 1 0 5 12.5 8 8 0 1 1-5-12.5z" />
    ) : theme === "light" ? (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="M4.9 4.9l1.4 1.4" />
        <path d="M17.7 17.7l1.4 1.4" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="M4.9 19.1l1.4-1.4" />
        <path d="M17.7 6.3l1.4-1.4" />
      </>
    ) : (
      <>
        <rect x="4" y="5" width="16" height="12" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </>
    );

  return (
    <div className="group relative h-9 w-9">
      <div className="flex h-full w-full items-center justify-center rounded-full border border-border/70 bg-surface/70 text-foreground/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur transition group-hover:text-foreground group-focus-within:text-foreground dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {themeIcon}
        </svg>
      </div>
      <select
        value={theme}
        onChange={handleChange}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        aria-label="Select theme"
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
