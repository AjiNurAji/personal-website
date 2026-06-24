"use client";

import * as React from "react";
import { RiMenu3Line } from "@remixicon/react";
import { NAV_LINKS } from "@/Config/nav";
import { Button } from "../UI/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../UI/sheet";
import { Logo } from "./logo";

interface MobileNavProps {
  links: { label: string; href: string }[];
}

export function MobileNav({ links }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && window.location.pathname === '/') {
      e.preventDefault();
      // Also handle potential singular/plural mismatch (achievement vs achievements)
      let id = href.replace('/#', '');
      if (id === 'achievement') id = 'achievements';
      
      const element = document.getElementById(id);
      if (element) {
        setOpen(false);
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      } else {
        window.location.href = href;
      }
    } else {
      setOpen(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <RiMenu3Line className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] flex flex-col">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="flex justify-start">
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 pt-6 px-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
