import { content } from "@/content/en";
import { skillsHub } from "@/content/skills-hub-en";
import Header from "@/components/Header";
import Building from "@/components/Building";
import Footer from "@/components/Footer";
import SkillsHub from "@/components/SkillsHub";

export const metadata = {
  title: "Skills Hub — OwliaBot",
  description: "Explore all OwliaBot skills: from portfolio tracking to automated DeFi strategies.",
};

export default function SkillsHubPage() {
  return (
    <div id="top" className="min-h-dvh overflow-hidden bg-background text-foreground">
      <Header nav={content.nav} links={{ x: content.links.x }} lang="en" />
      <SkillsHub
        title={skillsHub.title}
        subtitle={skillsHub.subtitle}
        description={skillsHub.description}
        categories={skillsHub.categories}
        skills={skillsHub.skills}
        lang={skillsHub.lang}
      />
      <div className="mx-auto w-full max-w-5xl px-5 pb-16 sm:px-8">
        <Building building={content.building} lang="en" />
      </div>
      <Footer note={content.footer.note} signature={content.footer.signature} links={content.links} />
    </div>
  );
}
