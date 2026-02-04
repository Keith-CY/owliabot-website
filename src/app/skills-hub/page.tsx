import { skillsHub } from "@/content/skills-hub-en";
import SkillsHub from "@/components/SkillsHub";

export const metadata = {
  title: "Skills Hub — OwliaBot",
  description: "Explore all OwliaBot skills: from portfolio tracking to automated DeFi strategies.",
};

export default function SkillsHubPage() {
  return (
    <SkillsHub
      title={skillsHub.title}
      subtitle={skillsHub.subtitle}
      description={skillsHub.description}
      backLabel={skillsHub.backLabel}
      categories={skillsHub.categories}
      skills={skillsHub.skills}
      lang={skillsHub.lang}
    />
  );
}
