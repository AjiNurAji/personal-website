import Link from "next/link";
import { Separator } from "../ui/separator";
import { Logo } from "./logo";
import { RiDrinks2Fill, RiGithubFill, RiInstagramLine, RiTiktokFill } from "@remixicon/react";
import { NAV_LINKS } from "~/config/nav";

export const Footer = () => {
	return (
		<footer className="border-t bg-background px-4 sm:px-0">
			<div className="max-w-5xl mx-auto border-x px-6">
				<div className="py-12 flex flex-col justify-start gap-3 items-center">
					<Logo />
					<nav className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
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
