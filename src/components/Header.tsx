import LanguageSelect from "./LanguageSelect";
import ThemeSelect from "./ThemeSelect";

type HeaderProps = {
  nav: {
    about: string;
    skillsHub: string;
  };
  links: {
    x: string;
  };
  lang?: string;
};

export default function Header({ nav, links, lang }: HeaderProps) {
  const prefix = lang === "zh" ? "/zh" : "";
  const homeHref = prefix || "/";
  const skillsHubHref = `${prefix}/skills-hub`;

  return (
    <header className="fixed top-0 w-full z-40 bg-transparent transition-all duration-300">
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-5 sm:px-8 lg:px-12">
        {/* Desktop: single unified pill */}
        <div className="hidden items-center gap-4 rounded-full border border-border bg-surface/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/55 shadow-[0_14px_36px_rgba(5,6,12,0.2),_inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur dark:shadow-[0_14px_36px_rgba(5,6,12,0.2),_inset_0_1px_0_rgba(255,255,255,0.14)] sm:inline-flex">
          <a href={homeHref} aria-label="Back to home" className="flex size-8 items-center justify-center">
            <img
              src="/owliabot.svg"
              alt="Owliabot logo"
              className="h-6 w-6 dark:brightness-110"
            />
          </a>
          <div className="h-4 w-px bg-foreground/10" />
          <nav className="flex flex-nowrap items-center gap-5 text-foreground/55">
            <a className="whitespace-nowrap leading-none text-foreground/55 transition hover:text-foreground/85 visited:text-foreground/55" href={homeHref}>
              {nav.about}
            </a>
            <a className="whitespace-nowrap leading-none text-foreground/55 transition hover:text-foreground/85 visited:text-foreground/55" href={skillsHubHref}>
              {nav.skillsHub}
            </a>
          </nav>
          <div className="h-4 w-px bg-foreground/10" />
          <div className="flex items-center gap-3">
            <LanguageSelect />
            <ThemeSelect />
            <a
              href={links.x}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-8 items-center justify-center rounded-full text-foreground/70 transition hover:text-foreground"
              aria-label="OwliaBot on X"
            >
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2H21.6l-7.32 8.37L22.4 22h-6.66l-5.214-6.81L4.4 22H1.04l7.83-8.95L1.6 2h6.82l4.71 6.2L18.244 2Zm-1.17 18h1.85L6.94 3.9H4.97l12.104 16.1Z" />
              </svg>
            </a>
          </div>
        </div>
        {/* Mobile: compact bar */}
        <div className="flex w-full items-center justify-between sm:hidden">
          <a href={homeHref} aria-label="Back to home" className="flex size-9 items-center justify-center rounded-full border border-border bg-surface/70 backdrop-blur">
            <img src="/owliabot.svg" alt="Owliabot logo" className="h-6 w-6 dark:brightness-110" />
          </a>
          <div className="flex items-center gap-2">
            <LanguageSelect />
            <ThemeSelect />
            <a
              href={links.x}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-9 items-center justify-center rounded-full border border-border bg-surface/70 text-foreground/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition hover:text-foreground"
              aria-label="OwliaBot on X"
            >
              <svg
                aria-hidden="true"
                className="h-3.5 w-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2H21.6l-7.32 8.37L22.4 22h-6.66l-5.214-6.81L4.4 22H1.04l7.83-8.95L1.6 2h6.82l4.71 6.2L18.244 2Zm-1.17 18h1.85L6.94 3.9H4.97l12.104 16.1Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
