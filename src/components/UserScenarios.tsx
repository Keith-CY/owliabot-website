import { User, Sparkles, LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

type UserScenariosProps = {
  scenarios: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: ReadonlyArray<{
      title: string;
      body: string;
      icon?: string;
    }>;
  };
};

const iconMap: Record<string, LucideIcon> = {
  User,
  Sparkles,
};

export default function UserScenarios({ scenarios }: UserScenariosProps) {
  return (
    <section id="user-scenarios" className="scroll-mt-24 flex flex-col gap-8 sm:scroll-mt-28">
      <Reveal>
        <SectionHeader
          eyebrow={scenarios.eyebrow}
          title={scenarios.title}
          subtitle={scenarios.subtitle}
        />
      </Reveal>

      <div className="grid items-stretch gap-6 md:grid-cols-2">
        {scenarios.cards.map((card, index) => {
          const IconComponent = card.icon ? iconMap[card.icon] : null;
          
          return (
            <Reveal key={card.title} delay={0.08 + index * 0.06}>
              <div className="h-full rounded-[28px] border border-border bg-surface/70 px-8 py-8 shadow-[0_6px_16px_rgba(4,6,10,0.04),_inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur dark:shadow-[0_6px_16px_rgba(4,6,10,0.12),_inset_0_1px_0_rgba(255,255,255,0.14)]">
                {IconComponent && (
                  <div className="mb-4">
                    <IconComponent className="h-8 w-8 text-foreground/70" strokeWidth={1.5} />
                  </div>
                )}
                <h3 className="text-balance text-xl font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-4 text-pretty text-base text-foreground/70">
                  {card.body}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
