"use client";

import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiInstagramLine,
  RiTwitterXFill,
  RiTiktokFill,
  RiFacebookCircleFill,
  RiYoutubeFill,
  RiTelegramFill,
  RiWhatsappFill,
  RiCupLine,
  RiGlobalLine,
  RiArrowRightSLine,
  RiCloseLine,
  RiMenuLine,
} from "@remixicon/react";
import { ThemeToggle } from "@/Components/UI/theme-toggle";
import { Logo } from "./logo";
import { Link, router, usePage } from "@inertiajs/react";
import { Button } from "@/Components/UI/button";
import { useEffect, useState } from "react";
import { useTranslation, supportedLocales } from "@/lib/i18n";
import { AnimatePresence, motion } from "framer-motion";
import { getIconComponent } from "@/Components/Dashboard/IconRegistry";
import { HiBadgeCheck } from "react-icons/hi";

interface SidebarProps {
  name: string;
  role: string;
  tagline: string;
  githubUrl?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
  navSections: Array<{ label: string; href: string; icon?: string }>;
  activeSection?: string;
  contactEmail?: string;
  avatarUrl?: string;
  availabilityMessages?: string[];
}

const getSocialIcon = (platform: string) => {
  const norm = platform.toLowerCase().trim();
  switch (norm) {
    case "github": return <RiGithubFill className="size-5" />;
    case "linkedin": return <RiLinkedinBoxFill className="size-5" />;
    case "instagram": return <RiInstagramLine className="size-5" />;
    case "twitter":
    case "x":
      return <RiTwitterXFill className="size-5" />;
    case "tiktok": return <RiTiktokFill className="size-5" />;
    case "facebook": return <RiFacebookCircleFill className="size-5" />;
    case "youtube": return <RiYoutubeFill className="size-5" />;
    case "telegram": return <RiTelegramFill className="size-5" />;
    case "whatsapp": return <RiWhatsappFill className="size-5" />;
    case "coffee": return <RiCupLine className="size-5" />;
    default: return <RiGlobalLine className="size-5" />;
  }
};

const availabilityMessages = ["Open to work", "Let's build together", "Available for projects"];

function AvailabilityBadge({ messages = availabilityMessages }: { messages?: string[] }) {
  const { t } = useTranslation();
  const [messageIndex, setMessageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setMessageIndex((index) => (index + 1) % Math.max(messages.length, 1));
    }, 3200);
    return () => window.clearInterval(timer);
  }, [isPaused, messages.length]);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      aria-label="Availability status"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="mt-4 h-7 gap-1.5 rounded-full border-primary/50 bg-primary/5 px-2.5 text-[9px] font-bold uppercase tracking-[0.12em] text-primary hover:bg-primary/10 hover:text-primary"
    >
      <span className="relative flex size-2" aria-hidden="true">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/50" />
        <span className="relative inline-flex size-2 rounded-full bg-primary" />
      </span>
      <span className="relative min-w-[8rem] overflow-hidden text-left">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={messageIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="block"
          >
            {t(messages[messageIndex] || availabilityMessages[0])}
          </motion.span>
        </AnimatePresence>
      </span>
    </Button>
  );
}

function NavLabel({ label, icon, isActive }: { label: string; icon?: string; isActive: boolean }) {
  const Icon = getIconComponent(icon) || RiGlobalLine;

  return (
    <>
      <span className={`flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
        isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
      }`}>
        <Icon className="size-4 shrink-0" aria-hidden="true" />
        {label}
      </span>
      {isActive && <RiArrowRightSLine className="size-4 text-muted-foreground" />}
    </>
  );
}

export const Sidebar = ({ name, role, tagline, socialLinks, navSections, activeSection, contactEmail, avatarUrl, availabilityMessages: customAvailabilityMessages }: SidebarProps) => {
  const { locale, t } = useTranslation();
  const { url } = usePage();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
    setIsMobileOpen(false);
  };

  const changeLocale = (nextLocale: string) => {
    if (nextLocale === locale) return;
    router.post(`/locale/${nextLocale}`, {}, { preserveScroll: true, preserveState: false });
  };

  return (
    <>
      <div className="sticky top-0 z-[60] -mx-6 flex h-16 items-center justify-between border-b border-border/70 bg-background/90 px-6 backdrop-blur-xl lg:hidden">
        <Logo />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={isMobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMobileOpen}
          onClick={() => setIsMobileOpen((open) => !open)}
        >
          {isMobileOpen ? <RiCloseLine className="size-5" /> : <RiMenuLine className="size-5" />}
        </Button>
      </div>
      {isMobileOpen && <button type="button" aria-label="Close navigation" onClick={() => setIsMobileOpen(false)} className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden" />}
      <aside className={`z-50 flex w-full flex-col justify-between py-8 lg:sticky lg:top-0 lg:z-auto lg:h-screen lg:max-h-screen ${isMobileOpen ? "fixed inset-x-0 top-16 max-h-[calc(100vh-4rem)] animate-in slide-in-from-top-2 overflow-y-auto border-b border-border bg-background px-5 pb-8 pt-8 shadow-2xl sm:px-10 sm:pt-10 lg:static lg:border-0 lg:bg-transparent lg:px-0 lg:shadow-none" : "hidden lg:flex"}`}>
      <div className="space-y-7 sm:space-y-9 lg:space-y-12">
        {/* Logo */}
        <div className="hidden lg:block">
          <Logo />
        </div>

        {/* Profile identity */}
        <div className="flex flex-col items-center justify-center gap-3 overflow-visible rounded-2xl border border-border/70 bg-card/60 p-5 text-center lg:border-0 lg:bg-transparent lg:p-0">
          {avatarUrl && <img src={avatarUrl} alt={`${name} GitHub profile`} className="size-14 shrink-0 rounded-full border border-border object-cover lg:mb-5 lg:size-24" loading="lazy" />}
          <h1 className="flex max-w-[18ch] items-center gap-1.5 text-xl font-bold leading-tight tracking-tight text-foreground sm:text-2xl">
            <span>{name}</span>
            <span className="inline-flex size-4 shrink-0 items-center justify-center text-sky-400" title="Verified profile" aria-label="Verified profile">
              <HiBadgeCheck className="size-5" />
            </span>
          </h1>
          <AvailabilityBadge messages={customAvailabilityMessages} />
        </div>

        {/* Navigation */}
        <div className="border-t border-border/70 pt-5 lg:pt-6">
        {navSections.length > 0 && (
          <nav aria-label="Primary navigation">
            <ul className="grid gap-1.5 sm:grid-cols-2 lg:block lg:space-y-2">
              {navSections.map((section) => {
                const translatedLabel = t(section.label);
                const normalizedHref = section.href.startsWith("/") ? section.href : `/${section.href}`;
                const isActive = activeSection === section.label || activeSection === translatedLabel || activeSection === section.href || activeSection === `#${section.label.toLowerCase()}` || url.split('?')[0] === normalizedHref;
                return (
                  <li key={section.label}>
                    {normalizedHref.startsWith("/#") && url.split('?')[0] === "/" ? (
                      <a
                        href={normalizedHref}
                        onClick={(e) => handleNavClick(e, normalizedHref)}
                        className={`group flex min-h-11 items-center justify-between gap-4 rounded-xl border px-3 py-2.5 transition-colors lg:border-0 ${isActive ? "border-primary/25 bg-primary/5 text-foreground" : "border-border/60 hover:bg-card/60"}`}
                      >
                        <NavLabel label={translatedLabel} icon={section.icon} isActive={isActive} />
                      </a>
                    ) : (
                      <Link
                        href={normalizedHref}
                        preserveScroll
                        onClick={() => setIsMobileOpen(false)}
                        className={`group flex min-h-11 items-center justify-between gap-4 rounded-xl border px-3 py-2.5 transition-colors lg:border-0 ${isActive ? "border-primary/25 bg-primary/5 text-foreground" : "border-border/60 hover:bg-card/60"}`}
                      >
                        <NavLabel label={translatedLabel} icon={section.icon} isActive={isActive} />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-5">
          <div className="inline-flex overflow-hidden rounded-full border border-border bg-card text-[10px] font-bold tracking-widest" aria-label="Language">
            {supportedLocales.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => changeLocale(item.code)}
                aria-pressed={locale === item.code}
                className={`px-3 py-1.5 transition-colors ${locale === item.code ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="mt-8 space-y-5 lg:mt-12">
        <div className="flex items-center gap-5 border-t border-border/70 pt-5">
        {socialLinks?.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground [&_svg]:size-[18px]"
            title={link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
          >
            {getSocialIcon(link.platform)}
          </a>
        ))}
        </div>
        <div className="border-t border-border/70 pt-5 text-center text-[9px] uppercase tracking-[0.18em] text-muted-foreground/60 lg:text-left">
          <p>{t("Copyright © :year").replace(":year", String(new Date().getFullYear()))}</p>
          <p className="mt-1 normal-case tracking-normal">{t(":name. All rights reserved.").replace(":name", name)}</p>
        </div>
      </div>
      </aside>
    </>
  );
};
