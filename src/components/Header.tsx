import LanguageSelect from "./LanguageSelect";
import ThemeSelect from "./ThemeSelect";

type HeaderProps = {
  nav: {
    why: string;
    architecture: string;
    skills: string;
    security: string;
    waitlist: string;
  };
};

export default function Header({ nav }: HeaderProps) {


  return (
    <header className="fixed top-0 w-full z-40 bg-transparent transition-all duration-300">
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full border border-border bg-surface/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
            <img
              src="/owliabot.svg"
              alt="Owliabot logo"
              className="h-7 w-7 dark:brightness-110"
            />
          </div>
        </div>
        <div className="hidden items-center gap-5 rounded-full border border-border bg-surface/70 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/55 shadow-[0_14px_36px_rgba(5,6,12,0.2),_inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur dark:shadow-[0_14px_36px_rgba(5,6,12,0.2),_inset_0_1px_0_rgba(255,255,255,0.14)] sm:absolute sm:left-1/2 sm:flex sm:-translate-x-1/2">
          <nav className="flex flex-nowrap items-center gap-5 text-foreground/55">
            <a className="whitespace-nowrap leading-none text-foreground/55 transition hover:text-foreground/85 visited:text-foreground/55" href="#why">
              {nav.why}
            </a>
            <a className="whitespace-nowrap leading-none text-foreground/55 transition hover:text-foreground/85 visited:text-foreground/55" href="#architecture">
              {nav.architecture}
            </a>
            <a className="whitespace-nowrap leading-none text-foreground/55 transition hover:text-foreground/85 visited:text-foreground/55" href="#skills">
              {nav.skills}
            </a>
            <a className="whitespace-nowrap leading-none text-foreground/55 transition hover:text-foreground/85 visited:text-foreground/55" href="#security">
              {nav.security}
            </a>
          </nav>
          <div className="mx-2 h-4 w-px bg-foreground/10" />
          <div className="flex items-center gap-3">
            <LanguageSelect />
            <ThemeSelect />
            <a
              className="whitespace-nowrap rounded-full bg-foreground px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-background shadow-[0_10px_22px_rgba(5,6,12,0.22),_inset_0_1px_0_rgba(255,255,255,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(5,6,12,0.28),_inset_0_1px_0_rgba(255,255,255,0.7)]"
              href="#building"
            >
              {nav.waitlist}
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:hidden">
          <LanguageSelect />
          <ThemeSelect />
        </div>
      </div>
    </header>
  );
}
