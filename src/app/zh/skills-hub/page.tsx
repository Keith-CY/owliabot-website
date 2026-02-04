import { content } from "@/content/zh";
import { skillsHub } from "@/content/skills-hub-zh";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkillsHub from "@/components/SkillsHub";

export const metadata = {
  title: "Skills Hub — OwliaBot",
  description: "探索 OwliaBot 的全部能力：从资产总览到自动化 DeFi 策略。",
};

export default function SkillsHubZhPage() {
  return (
    <div id="top" className="min-h-dvh overflow-hidden bg-background text-foreground">
      <Header nav={content.nav} links={{ x: content.links.x }} />
      <SkillsHub
        title={skillsHub.title}
        subtitle={skillsHub.subtitle}
        description={skillsHub.description}
        categories={skillsHub.categories}
        skills={skillsHub.skills}
        lang={skillsHub.lang}
      />
      <Footer note={content.footer.note} signature={content.footer.signature} links={content.links} />
    </div>
  );
}
