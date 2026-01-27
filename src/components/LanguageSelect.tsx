"use client";

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSelect() {
  const pathname = usePathname();
  const router = useRouter();

  const current = pathname?.startsWith("/zh") ? "/zh" : "/en";

  return (
    <select
      value={current}
      onChange={(event) => router.push(event.target.value)}
      className="rounded-full border border-border/70 bg-surface/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur transition hover:text-foreground dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
      aria-label="Select language"
    >
      <option value="/en">EN</option>
      <option value="/zh">中文</option>
    </select>
  );
}
