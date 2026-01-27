import LanguageSelect from "./LanguageSelect";
import ThemeSelect from "./ThemeSelect";

type HeaderProps = {
  nav: {
    why: string;
    signing: string;
    execution: string;
    local: string;
    waitlist: string;
  };
};

export default function Header({ nav }: HeaderProps) {
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
          <a className="hover:text-foreground" href="#architecture">
            {nav.signing}
          </a>
          <a className="hover:text-foreground" href="#execution">
            {nav.execution}
          </a>
          <a className="hover:text-foreground" href="#local">
            {nav.local}
          </a>
          <a className="hover:text-foreground" href="#waitlist">
            {nav.waitlist}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSelect />
          <ThemeSelect />
        </div>
      </div>
    </header>
  );
}
