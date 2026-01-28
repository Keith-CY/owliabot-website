"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSelect() {
  const pathname = usePathname();
  const router = useRouter();

  const current = pathname?.startsWith("/zh") ? "/zh" : "/en";

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
        onChange={(event) => router.push(event.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        aria-label="Select language"
      >
        <option value="/en">EN</option>
        <option value="/zh">中文</option>
      </select>
    </div>
  );
}
