import Header from "./Header";
import Hero from "./Hero";
import Pillars from "./Pillars";
import ArchitectureOverview from "./ArchitectureOverview";
import SecurityModel from "./SecurityModel";
import UserScenarios from "./UserScenarios";
import Partners from "./Partners";
import Footer from "./Footer";

export type LandingPageContent = {
  lang: "en" | "zh";
  nav: {
    about: string;
    skillsHub: string;
  };
  hero: {
    title: string;
    subtitle: string;
    emphasis: string;
    ctaPrimary: string;
    ctaPrimaryHref?: string;
    ctaSecondary: string;
    ctaSecondaryHref?: string;
    badge?: string;
    status?: string;
  };
  hero_illustration: {
    scenarios: ReadonlyArray<{
      id: string;
      label: string;
      messages: ReadonlyArray<{
        role: "user" | "assistant";
        content: string;
        type?: "alert" | "info" | "success";
        actions?: ReadonlyArray<string>;
      }>;
    }>;
  };
  why: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: ReadonlyArray<{
      title: string;
      body: string;
      mechanism: string;
    }>;
  };
  security: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    status: string;
    tiers: ReadonlyArray<{
      title: string;
      body: string;
      keyword: string;
    }>;
    footer: string;
    local: {
      title: string;
      body: string;
      bullets: ReadonlyArray<string>;
    };
  };
  architecture: {
    title: string;
    subtitle: string;
    body: string;
    flowLabel: string;
    flow: ReadonlyArray<string>;
    footer: string;
    diagram?: {
      user: string;
      bot: string;
      skillsLabel: string;
      vaultLabel: string;
      skills: ReadonlyArray<string>;
      vault: ReadonlyArray<string>;
    };
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
  building: {
    eyebrow: string;
    title: string;
    body: string;
    privacy: string;
    note: string;
    prompts: {
      noticeMultiple: string;
      noticeQueued: string;
      refineHint: string;
      unclearFallback: string;
      confirmError: string;
      confirmRequired: string;
      requireAtLeastOne: string;
    };
    input: {
      placeholderInitial: string;
      placeholderFollowup: string;
      placeholderAdditional: string;
      send: string;
      confirmCurrent: string;
      complete: string;
    };
    summary: {
      title: string;
      back: string;
      emailLabel: string;
      emailPlaceholder: string;
      submit: string;
      submitting: string;
    };
    success: {
      title: string;
      body: string;
      note: string;
    };
  };
  userScenarios: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: ReadonlyArray<{
      title: string;
      body: string;
      icon?: string;
    }>;
  };
  partners: {
    eyebrow: string;
    title: string;
    subtitle: string;
    logos?: ReadonlyArray<{
      name: string;
      url?: string;
      image?: string;
    }>;
  };
  footer: {
    note: string;
    signature: string;
  };
  links: {
    github: string;
    x: string;
  };
};

type LandingPageProps = {
  content: LandingPageContent;
};

export default function LandingPage({ content }: LandingPageProps) {
  return (
    <div id="top" className="min-h-dvh overflow-hidden bg-background text-foreground">
      <Header nav={content.nav} links={{ x: content.links.x }} lang={content.lang} />
      <Hero hero={content.hero} />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-32 px-6 pb-24 pt-24 sm:px-8 lg:px-12">
        <Pillars eyebrow={content.why.eyebrow} title={content.why.title} subtitle={content.why.subtitle} pillars={content.why.items} />

        <div className="relative isolate">
          <div className="absolute -left-1/4 -top-1/4 -z-10 h-[150%] w-[150%] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08),transparent_70%)] opacity-0 dark:opacity-100 pointer-events-none mix-blend-screen" />
          <ArchitectureOverview architecture={content.architecture} />
        </div>

        <UserScenarios scenarios={content.userScenarios} />

        <Partners partners={content.partners} />

        <div className="relative isolate">
          <div className="absolute -right-1/4 -top-1/4 -z-10 h-[150%] w-[150%] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.08),transparent_70%)] opacity-0 dark:opacity-100 pointer-events-none mix-blend-screen" />
          <SecurityModel security={content.security} />
        </div>

      </main>
      <Footer note={content.footer.note} signature={content.footer.signature} links={content.links} />
    </div>
  );
}
