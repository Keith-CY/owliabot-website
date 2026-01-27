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
      className="rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold uppercase text-foreground"
      aria-label="Select language"
    >
      <option value="/en">EN</option>
      <option value="/zh">中文</option>
    </select>
  );
}
