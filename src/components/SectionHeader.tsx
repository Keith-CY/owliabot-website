type SectionHeaderProps = {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    description?: string;
    className?: string;
    withDecoration?: boolean;
};

export default function SectionHeader({
    eyebrow,
    title,
    subtitle,
    description,
    className,
    withDecoration = true,
}: SectionHeaderProps) {
    return (
        <div className={`flex flex-col gap-3 ${className || ""}`}>
            {eyebrow && (
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
                    {eyebrow}
                </p>
            )}
            <div className="relative w-fit">
                <h2 className="relative z-10 text-balance text-2xl font-semibold text-foreground sm:text-3xl">
                    {title}
                </h2>
                {/* Artistic highlighter decoration */}
                {withDecoration && (
                    <div className="absolute bottom-0 left-0 z-0 h-3 w-20 -rotate-1 -skew-x-12 rounded-sm bg-accent/60" />
                )}
            </div>

            {subtitle && (
                <p className="text-pretty text-base text-foreground/80">{subtitle}</p>
            )}
            {description && (
                <p className="text-pretty text-sm text-foreground/70">{description}</p>
            )}
        </div>
    );
}
