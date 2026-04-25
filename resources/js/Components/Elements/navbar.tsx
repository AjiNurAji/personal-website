import { ThemeToggle } from "../UI/theme-toggle";
import { Logo } from "./logo";
import { Badge } from "../UI/badge";
import { NAV_LINKS } from "@/Config/nav";
import { MobileNav } from "./mobile-nav";

interface NavbarProps {
  customLinks?: { label: string; href: string }[] | null;
  isAvailable?: boolean;
}

export const Navbar = ({ customLinks, isAvailable = true }: NavbarProps) => {
  const links = customLinks || NAV_LINKS.map(l => ({ label: l.name, href: l.href }));

  return (
    <nav className="fixed z-40 top-0 h-14 backdrop-blur-md bg-background/80 w-full border-b px-4 sm:px-0">
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-400/50 to-transparent" />
      <div className="h-full flex items-center justify-between mx-auto px-3 max-w-5xl border-x">
        <div className="flex items-center gap-4">
          <Logo />
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            System Live
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-bold uppercase tracking-tighter text-muted-foreground hover:text-foreground transition-all flex items-center gap-1 group"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-300 dark:text-zinc-700">/</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <MobileNav links={links} />
        </div>
      </div>
    </nav>
  );
};
