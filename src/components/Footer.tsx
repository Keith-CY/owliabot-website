type FooterProps = {
  note: string;
  signature: string;
  links: {
    github: string;
    x: string;
  };
};

export default function Footer({ note, signature, links }: FooterProps) {
  return (
    <footer className="border-t border-border bg-surface/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-6 py-10 text-center sm:px-8 lg:px-12">
        <p className="text-pretty text-sm text-foreground/70">{note}</p>
        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/60">
          <a
            href={links.x}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-foreground"
          >
            X
          </a>
          <span className="text-foreground/20">•</span>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-foreground"
          >
            GitHub
          </a>
        </div>
        <p className="text-xs text-foreground/50">{signature}</p>
      </div>
    </footer>
  );
}
