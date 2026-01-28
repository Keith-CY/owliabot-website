"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function ThemeSelect() {
  const initialTheme = useMemo(() => {
    if (typeof document === "undefined") return "system";
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("theme="));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : "system";
  }, []);
  const [theme, setTheme] = useState(initialTheme);
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
    if (typeof document === "undefined") return;
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
