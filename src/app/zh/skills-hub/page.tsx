import { skillsHub } from "@/content/skills-hub-zh";
import SkillsHub from "@/components/SkillsHub";

export const metadata = {
  title: "Skills Hub — OwliaBot",
  description: "探索 OwliaBot 的全部能力：从资产总览到自动化 DeFi 策略。",
};

export default function SkillsHubZhPage() {
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
