import Link from "next/link";
import { Separator } from "../ui/separator";
import { Logo } from "./logo";
import { RiDrinks2Fill, RiGithubFill, RiInstagramLine, RiTiktokFill } from "@remixicon/react";

export const Footer = () => {
	return (
		<footer className="mt-20">
			<div className="max-w-screen-lg mx-auto">
				<div className="py-12 flex flex-col justify-start gap-3 items-center">
					<Logo />
					<nav className="flex items-center gap-6">
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
				</div>
				<Separator orientation="horizontal" />
				<div className="flex sm:flex-row flex-col-reverse gap-4 justify-between items-center py-4 text-muted-foreground">
					<p className="text-sm">
						&copy; {new Date().getFullYear()} Aji Nur Aji. All rights reserved.
					</p>
					{/* social media icons */}
					<div className="flex gap-4">
						<Link href="#" target="_blank" rel="noopener noreferrer">
							<RiGithubFill className="w-6 h-6" />
						</Link>
						<Link href="#" target="_blank" rel="noopener noreferrer">
							<RiInstagramLine className="w-6 h-6" />
						</Link>
						<Link href="#" target="_blank" rel="noopener noreferrer">
							<RiDrinks2Fill className="w-6 h-6" />
						</Link>
						<Link href="#" target="_blank" rel="noopener noreferrer">
							<RiTiktokFill className="w-6 h-6" />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};
