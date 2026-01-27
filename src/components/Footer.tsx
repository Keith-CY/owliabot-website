type FooterProps = {
  note: string;
};

export default function Footer({ note }: FooterProps) {
  return (
    <footer className="border-t border-border bg-surface/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-6 py-10 text-center sm:px-8 lg:px-12">
        <p className="text-pretty text-sm text-foreground/70">{note}</p>
      </div>
    </footer>
  );
}
