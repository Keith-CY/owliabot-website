import Header from "./Header";
import Hero from "./Hero";
import Pillars from "./Pillars";
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
    tiers: ReadonlyArray<{
      title: string;
      body: string;
      keyword: string;
    }>;
    footer: string;
  };
  execution: {
    title: string;
    steps: ReadonlyArray<string>;
    caption: string;
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
      <Header nav={content.nav} lang={content.lang} />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24 pt-10 sm:px-8 lg:px-12">
        <Hero hero={content.hero} githubUrl={content.links.github} />
        <Pillars title={content.why.title} subtitle={content.why.subtitle} pillars={content.why.items} />
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
