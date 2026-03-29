import { ThemeToggle } from "../ui/theme-toggle";
import { Logo } from "./logo";

export const Navbar = () => {
	return (
		<nav className="fixed z-100 top-6 inset-x-4 h-14 border backdrop-blur-sm bg-background/70 dark:border-slate-700/70 max-w-screen-md mx-auto rounded-full">
			<div className="h-full flex items-center justify-between mx-auto px-3">
        <Logo />
        <nav className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a href="#projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Projects</a>
          <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
		</nav>
	);
};
