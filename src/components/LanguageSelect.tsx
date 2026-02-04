"use client";

import { usePathname, useRouter } from "next/navigation";

/**
 * Strip the language prefix (/en or /zh) from a pathname and return
 * the remaining sub-path. Examples:
 *   /zh/skills-hub → /skills-hub
 *   /en            → /
 *   /skills-hub    → /skills-hub   (no prefix = English default)
 */
function subPath(pathname: string): string {
  if (pathname.startsWith("/zh")) {
    const rest = pathname.slice(3); // remove "/zh"
    return rest || "/";
  }
  if (pathname.startsWith("/en")) {
    const rest = pathname.slice(3);
    return rest || "/";
  }
  return pathname;
}

export default function LanguageSelect() {
  const pathname = usePathname();
  const router = useRouter();

  const isZh = pathname?.startsWith("/zh");
  const current = isZh ? "/zh" : "/en";
  const sub = subPath(pathname ?? "/");

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const lang = event.target.value; // "/en" or "/zh"
    // Build target: for English, sub-paths live at root (e.g. /skills-hub)
    // For Chinese, sub-paths live under /zh (e.g. /zh/skills-hub)
    const target =
      lang === "/en"
        ? sub === "/" ? "/en" : sub
        : sub === "/" ? "/zh" : `/zh${sub}`;
    router.push(target);
  }

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
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.4 2.3 3.6 5.4 3.6 9s-1.2 6.7-3.6 9c-2.4-2.3-3.6-5.4-3.6-9s1.2-6.7 3.6-9z" />
        </svg>
      </div>
      <select
        value={current}
        onChange={handleChange}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        aria-label="Select language"
      >
        <option value="/en">English</option>
        <option value="/zh">中文</option>
      </select>
    </div>
  );
}
