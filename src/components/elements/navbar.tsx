import { ThemeToggle } from "../ui/theme-toggle";
import { Logo } from "./logo";
import { Badge } from "../ui/badge";
import { NAV_LINKS } from "~/config/nav";
import { MobileNav } from "./mobile-nav";

export const Navbar = () => {
	return (
		<nav className="fixed z-40 top-0 h-14 backdrop-blur-sm bg-background/70 w-full border-b px-4 sm:px-0">
			<div className="h-full flex items-center justify-between mx-auto px-3 max-w-5xl border-x">
				<Logo />
				<nav className="hidden md:flex items-center gap-6">
					{NAV_LINKS.map((link) => (
						<a
							key={link.name}
							href={link.href}
							className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
						>
							{link.name}
						</a>
					))}
				</nav>
				<div className="flex items-center gap-2 sm:gap-3">
					<div className="block">
						<Badge
							variant="outline"
							className="px-2 py-1 text-[11px] border-green-500/50 bg-green-500/10 text-green-500 backdrop-blur-md cursor-default pointer-events-none"
						>
							<span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mr-1.5 inline-block" />
							Open to Hire
						</Badge>
					</div>
					<ThemeToggle />
					<MobileNav />
				</div>
			</div>
		</nav>
	);
};
