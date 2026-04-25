import { Link } from "@inertiajs/react";
import { Separator } from "../UI/separator";
import { Logo } from "./logo";
import {
  RiCupFill,
  RiGithubFill,
  RiInstagramLine,
  RiTiktokFill,
  RiLinkedinBoxFill,
  RiTwitterXFill,
  RiFacebookCircleFill,
  RiYoutubeFill,
  RiGlobalLine,
} from "@remixicon/react";

interface FooterProps {
  socialLinks?: Array<{ platform: string, url: string }>;
  customLinks?: Array<{ label: string, href: string }>;
}

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'github': return <RiGithubFill className="w-6 h-6" />;
    case 'instagram': return <RiInstagramLine className="w-6 h-6" />;
    case 'tiktok': return <RiTiktokFill className="w-6 h-6" />;
    case 'coffee': return <RiCupFill className="w-6 h-6" />;
    case 'linkedin': return <RiLinkedinBoxFill className="w-6 h-6" />;
    case 'twitter': return <RiTwitterXFill className="w-6 h-6" />;
    case 'facebook': return <RiFacebookCircleFill className="w-6 h-6" />;
    case 'youtube': return <RiYoutubeFill className="w-6 h-6" />;
    default: return <RiGlobalLine className="w-6 h-6" />;
  }
};

export const Footer = ({ socialLinks, customLinks }: FooterProps) => {
  const defaultSocials = [
    { platform: "github", url: "https://github.com/ajinuraji" },
    { platform: "instagram", url: "#" },
    { platform: "coffee", url: "#" },
    { platform: "tiktok", url: "#" },
  ];

  const defaultLinks = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Achievement", href: "#achievement" },
  ];

  const socials = socialLinks || defaultSocials;
  const navLinks = customLinks || defaultLinks;

  return (
    <footer className="border-t bg-background px-4 sm:px-0">
        <div className="max-w-5xl mx-auto border-x px-6 bg-background relative z-10">
          <div className="py-12 flex flex-col justify-start gap-3 items-center">
            <Logo />
            <nav className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <Separator orientation="horizontal" />
          <div className="flex sm:flex-row flex-col-reverse gap-4 justify-between items-center py-4 text-muted-foreground">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Aji Nur Aji. All rights
              reserved.
            </p>
            {/* social media icons */}
            <div className="flex gap-4">
              {socials.map((social, index) => (
                <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>
    </footer>
  );
};
