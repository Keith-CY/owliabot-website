import Header from "./Header";
import Hero from "./Hero";
import Pillars from "./Pillars";
import ArchitectureOverview from "./ArchitectureOverview";
import SkillsSection from "./SkillsSection";
import SigningModel from "./SigningModel";
import ExecutionFlow from "./ExecutionFlow";
import LocalFirst from "./LocalFirst";
import Devices from "./Devices";
import Waitlist from "./Waitlist";
import Footer from "./Footer";

export type LandingPageContent = {
  lang: "en" | "zh";
  nav: {
    why: string;
    architecture: string;
    skills: string;
    signing: string;
    execution: string;
    local: string;
    waitlist: string;
  };
  hero: {
    title: string;
    subtitle: string;
    emphasis: string;
    ctaPrimary: string;
    ctaSecondary: string;
    badge?: string;
    status?: string;
  };
  why: {
    title: string;
    subtitle: string;
    items: ReadonlyArray<{
      title: string;
      body: string;
      mechanism: string;
    }>;
  };
  signing: {
    title: string;
    subtitle: string;
    description: string;
    status?: string;
    tiers: ReadonlyArray<{
      title: string;
      body: string;
      keyword: string;
    }>;
    footer: string;
  };
  architecture: {
    title: string;
    subtitle: string;
    body: string;
    flowLabel: string;
    flow: ReadonlyArray<string>;
    bullets: ReadonlyArray<string>;
    note?: string;
  };
  skills: {
    title: string;
    subtitle: string;
    body: string;
    cards: ReadonlyArray<{
      title: string;
      body: string;
      meta?: string;
    }>;
    footer?: string;
  };
  execution: {
    title: string;
    steps: ReadonlyArray<string>;
    caption: string;
    note?: string;
  };
  local: {
    title: string;
    body: string;
    bullets: ReadonlyArray<string>;
  };
  devices: {
    title: string;
    body: string;
  };
  waitlist: {
    title: string;
    body: string;
    privacy: string;
    note: string;
  };
  footer: {
    note: string;
  };
  links: {
    github: string;
  };
};

type LandingPageProps = {
  content: LandingPageContent;
};

export default function LandingPage({ content }: LandingPageProps) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Header nav={content.nav} />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24 pt-10 sm:px-8 lg:px-12">
        <Hero hero={content.hero} githubUrl={content.links.github} />
        <Pillars title={content.why.title} subtitle={content.why.subtitle} pillars={content.why.items} />
        <ArchitectureOverview architecture={content.architecture} />
        <SkillsSection skills={content.skills} />
        <SigningModel signing={content.signing} />
        <ExecutionFlow execution={content.execution} />
        <LocalFirst local={content.local} />
        <Devices devices={content.devices} />
        <Waitlist waitlist={content.waitlist} />
      </main>
      <Footer note={content.footer.note} />
    </div>
  );
}
