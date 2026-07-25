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
  RiGlobalLine
} from "@remixicon/react";
import { ThemeToggle } from "@/Components/UI/theme-toggle";
import { Logo } from "./logo";

interface SidebarProps {
  name: string;
  role: string;
  tagline: string;
  githubUrl?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
  navSections: Array<{ label: string; href: string }>;
  activeSection?: string;
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

export const Sidebar = ({ name, role, tagline, githubUrl, socialLinks, navSections, activeSection }: SidebarProps) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
  };

  return (
    <aside className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <div className="space-y-10">
        {/* Logo */}
        <Logo />

        {/* Name & tagline */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {name}
          </h1>
          <h2 className="mt-3 text-lg font-medium tracking-tight text-foreground sm:text-xl">
            {role}
          </h2>
          <p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">
            {tagline}
          </p>
        </div>

        {/* Navigation */}
        {navSections.length > 0 && (
          <nav aria-label="In-page jump links">
            <ul className="space-y-3">
              {navSections.map((section) => {
                const isActive = activeSection === section.href;
                return (
                  <li key={section.label}>
                    <a
                      href={section.href}
                      onClick={(e) => handleNavClick(e, section.href)}
                      className="group flex items-center gap-3 py-1"
                    >
                      <span className={`h-px transition-all duration-300 ${
                        isActive
                          ? "w-16 bg-foreground"
                          : "w-8 bg-muted-foreground/30 group-hover:w-16 group-hover:bg-foreground"
                      }`} />
                      <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}>
                        {section.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>

      {/* Bottom: Social links + theme toggle */}
      <div className="mt-12 flex items-center gap-4">
        {socialLinks?.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            title={link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
          >
            {getSocialIcon(link.platform)}
          </a>
        ))}
        <ThemeToggle />
      </div>
    </aside>
  );
};
