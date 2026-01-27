import ThemeToggle from "./ThemeToggle";

type HeaderProps = {
  nav: {
    why: string;
    security: string;
    architecture: string;
    waitlist: string;
  };
  lang: "en" | "zh";
};

export default function Header({ nav, lang }: HeaderProps) {
  const languageToggle =
    lang === "zh"
      ? { label: "EN", href: "/en" }
      : { label: "中文", href: "/zh" };

  return (
    <header className="border-b border-border bg-surface-strong/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center">
            <img
              src="/owliabot.svg"
              alt="Owliabot logo"
              className="h-7 w-7 dark:brightness-110"
            />
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-foreground/70 sm:flex">
          <a className="hover:text-foreground" href="#why">
            {nav.why}
          </a>
          <a className="hover:text-foreground" href="#security">
            {nav.security}
          </a>
          <a className="hover:text-foreground" href="#architecture">
            {nav.architecture}
          </a>
          <a className="hover:text-foreground" href="#waitlist">
            {nav.waitlist}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold uppercase text-foreground hover:border-accent"
            href={languageToggle.href}
          >
            {languageToggle.label}
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
