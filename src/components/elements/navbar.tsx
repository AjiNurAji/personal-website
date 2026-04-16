import { ThemeToggle } from "../ui/theme-toggle";
import { Logo } from "./logo";

export const Navbar = () => {
	return (
		<nav className="fixed z-100 top-0 h-14 border backdrop-blur-sm bg-background/70 w-full border-b">
			<div className="h-full flex items-center justify-between mx-auto px-3 max-w-5xl border-x">
				<Logo />
				<nav className="hidden md:flex items-center gap-6">
					<a
						href="#about"
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
					>
						About
					</a>
					<a
						href="#projects"
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
					>
						Projects
					</a>
					<a
						href="#contact"
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
					>
						Contact
					</a>
				</nav>
				<div className="flex items-center gap-2">
					<ThemeToggle />
				</div>
			</div>
		</nav>
	);
};
