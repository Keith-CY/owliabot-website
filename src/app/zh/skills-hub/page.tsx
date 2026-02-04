import { content } from "@/content/zh";
import { skillsHub } from "@/content/skills-hub-zh";
import Header from "@/components/Header";
import Building from "@/components/Building";
import Footer from "@/components/Footer";
import SkillsHub from "@/components/SkillsHub";

export const metadata = {
  title: "Skills Hub — OwliaBot",
  description: "探索 OwliaBot 的全部能力：从资产总览到自动化 DeFi 策略。",
};

export default function SkillsHubZhPage() {
  return (
    <div id="top" className="min-h-dvh overflow-hidden bg-background text-foreground">
      <Header nav={content.nav} links={{ x: content.links.x }} lang="zh" />
      <SkillsHub
        title={skillsHub.title}
        subtitle={skillsHub.subtitle}
        description={skillsHub.description}
        categories={skillsHub.categories}
        skills={skillsHub.skills}
        lang={skillsHub.lang}
        createSkillCTA={skillsHub.createSkillCTA}
      />
      <div className="mx-auto w-full max-w-5xl px-5 pb-16 sm:px-8">
        <Building building={content.building} lang="zh" />
      </div>
      <Footer note={content.footer.note} signature={content.footer.signature} links={content.links} />
    </div>
  );
}
