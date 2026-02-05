'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import LanguageSelect from "./LanguageSelect";
import ThemeSelect from "./ThemeSelect";

type HeaderProps = {
  nav: {
    about: string;
    skillsHub: string;
  };
  links: {
    x: string;
  };
  lang?: string;
};

// 提取 X/Twitter 图标组件
function XIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18.244 2H21.6l-7.32 8.37L22.4 22h-6.66l-5.214-6.81L4.4 22H1.04l7.83-8.95L1.6 2h6.82l4.71 6.2L18.244 2Zm-1.17 18h1.85L6.94 3.9H4.97l12.104 16.1Z" />
    </svg>
  );
}

// 提取分隔线组件
function Divider() {
  return <div className="h-4 w-px bg-foreground/10" />;
}

// 提取导航链接组件
function NavLinks({ 
  nav, 
  homeHref, 
  skillsHubHref,
  className = "gap-5"
}: { 
  nav: HeaderProps['nav'];
  homeHref: string;
  skillsHubHref: string;
  className?: string;
}) {
  return (
    <nav className={`flex flex-nowrap items-center text-foreground/55 ${className}`}>
      <a 
        className="whitespace-nowrap leading-none text-foreground/55 transition hover:text-foreground/85 visited:text-foreground/55" 
        href={homeHref}
      >
        {nav.about}
      </a>
      <a 
        className="whitespace-nowrap leading-none text-foreground/55 transition hover:text-foreground/85 visited:text-foreground/55" 
        href={skillsHubHref}
      >
        {nav.skillsHub}
      </a>
    </nav>
  );
}

// 提取社交链接组件
function SocialLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-surface/70 text-foreground/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur transition hover:text-foreground dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
      aria-label="OwliaBot on X"
    >
      <XIcon />
    </a>
  );
}

export default function Header({ nav, links, lang }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  // 使用 useRef 避免 effect 重复绑定
  const lastScrollYRef = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollThreshold = 10;

    if (Math.abs(currentScrollY - lastScrollYRef.current) < scrollThreshold) {
      return;
    }

    if (currentScrollY < 50) {
      setIsVisible(true);
    } else if (currentScrollY > lastScrollYRef.current) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    lastScrollYRef.current = currentScrollY;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const prefix = lang === "zh" ? "/zh" : "";
  const homeHref = prefix || "/";
  const skillsHubHref = `${prefix}/skills-hub`;

  const pillBaseClass = "items-center rounded-full border border-border bg-surface/70 text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground/55 shadow-[0_14px_36px_rgba(5,6,12,0.2),_inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur dark:shadow-[0_14px_36px_rgba(5,6,12,0.2),_inset_0_1px_0_rgba(255,255,255,0.14)]";

  return (
    <header 
      className={`fixed top-0 w-full z-40 bg-transparent transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-5 sm:px-8 lg:px-12">
        {/* Desktop */}
        <div className={`hidden sm:inline-flex gap-4 px-4 py-2 ${pillBaseClass}`}>
          <a href={homeHref} aria-label="Back to home" className="flex size-8 items-center justify-center">
            <img src="/owliabot.svg" alt="Owliabot logo" className="h-6 w-6 dark:brightness-110" />
          </a>
          <Divider />
          <NavLinks nav={nav} homeHref={homeHref} skillsHubHref={skillsHubHref} className="gap-5" />
          <Divider />
          <div className="flex items-center gap-3">
            <LanguageSelect />
            <ThemeSelect />
            <SocialLink href={links.x} />
          </div>
        </div>

        {/* Mobile */}
        <div className={`flex sm:hidden gap-3 px-3 py-2 ${pillBaseClass}`}>
          <a href={homeHref} aria-label="Back to home" className="flex size-7 items-center justify-center">
            <img src="/owliabot.svg" alt="Owliabot logo" className="h-5 w-5 dark:brightness-110" />
          </a>
          <Divider />
          <NavLinks nav={nav} homeHref={homeHref} skillsHubHref={skillsHubHref} className="gap-3" />
          <Divider />
          <div className="flex items-center gap-2">
            <LanguageSelect />
            <ThemeSelect />
            <SocialLink href={links.x} />
          </div>
        </div>
      </div>
    </header>
  );
}
