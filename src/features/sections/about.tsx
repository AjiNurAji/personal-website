"use client";

import { RiMailSendLine, RiGithubFill } from "@remixicon/react";
import Image from "next/image";
import { LetterAnimation } from "~/components/elements/LetterAnimation";
import { AnimateIn } from "~/components/elements/AnimateIn";
import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { PatternStripes } from "~/components/PatternStipes";

const About = () => {
	return (
		<section
			className="relative z-3 bg-background px-4 sm:px-0 border-y overflow-hidden"
			id="about"
		>
			<PatternStripes>
				<div className="max-w-5xl mx-auto border-x py-20 px-6 bg-background relative z-10">
					<div className="flex flex-col md:flex-row-reverse gap-12">
						{/* Profile image */}
						<AnimateIn
							variant="blur-fade"
							className="mt-10 w-48 h-48 md:w-64 md:h-64 hidden md:block"
						>
							<div className="relative w-full h-full rounded-2xl overflow-hidden bg-accent">
								<Image
									src="https://github.com/ajinuraji.png"
									alt="Placeholder"
									loading="lazy"
									fill
								/>
							</div>
						</AnimateIn>

						{/* Text content */}
						<div className="flex-1 md:text-left space-y-4">
							<AnimateIn variant="blur-fade">
								<Badge variant="secondary">About Me</Badge>
							</AnimateIn>

							<LetterAnimation
								isHeading
								inView
								className="text-4xl font-bold mb-4 tracking-tight justify-start"
							>
								Passionate about creating impactful web experiences
							</LetterAnimation>

							<AnimateIn variant="blur-fade" delay={0.1}>
								<p className="text-muted-foreground text-justify">
									I have hands-on experience in developing responsive interfaces and
									managing backend systems. Beyond coding, I also possess fundamental
									knowledge of computer networking, giving me a broader perspective on
									technical architecture. I am eager to learn, grow, and contribute to a
									dynamic and collaborative work environment.
								</p>
							</AnimateIn>

							<AnimateIn variant="blur-fade" delay={0.2}>
								<div className="flex flex-wrap gap-4 justify-start">
									<a
										href="https://github.com/ajinuraji"
										target="_blank"
										rel="noopener noreferrer"
										className={cn(buttonVariants({ variant: "default" }), "rounded-full")}
									>
										<RiGithubFill /> View GitHub
									</a>
									<a
										href="mailto:contact@example.com"
										className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}
									>
										<RiMailSendLine className="mr-2 h-4 w-4" /> Hire Me
									</a>
								</div>
							</AnimateIn>
						</div>
					</div>
				</div>
			</PatternStripes>
		</section>
	);
};

export default About;
