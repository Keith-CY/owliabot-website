import Header from "./Header";
import Hero from "./Hero";
import Pillars from "./Pillars";
import Security from "./Security";
import Devices from "./Devices";
import Architecture from "./Architecture";
import Waitlist from "./Waitlist";
import Footer from "./Footer";

export type LandingPageContent = {
  lang: "en" | "zh";
  nav: {
    why: string;
    security: string;
    architecture: string;
    waitlist: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  pillars: {
    title: string;
    body: string;
  }[];
  security: {
    title: string;
    items: {
      title: string;
      body: string;
    }[];
  };
  devices: {
    title: string;
    body: string;
  };
  architecture: {
    title: string;
    items: {
      title: string;
      body: string;
    }[];
  };
  waitlist: {
    title: string;
    body: string;
    privacy: string;
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
        <Pillars title={content.nav.why} pillars={content.pillars} />
        <Security security={content.security} />
        <Devices devices={content.devices} />
        <Architecture architecture={content.architecture} />
        <Waitlist waitlist={content.waitlist} />
      </main>
      <Footer note={content.footer.note} />
    </div>
  );
}
