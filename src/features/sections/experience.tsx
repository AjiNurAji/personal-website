"use client";

import { Badge } from "~/components/ui/badge";
import { LetterAnimation } from "~/components/elements/LetterAnimation";
import { AnimateIn } from "~/components/elements/AnimateIn";
import { ExperienceCard } from "~/components/elements/ExperienceCard";

const experiences = [
	{
		logo: "/assets/images/company/logo-bps.webp",
		company: "TechCorp Solutions",
		role: "Senior Full Stack Developer",
		period: "2021 - Present",
		description:
			"Led the development of enterprise-scale web applications, mentored junior developers, and implemented best practices for code quality and performance optimization.",
		skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
	},
];

const Experience = () => {
	return (
		<section id="experience" className="relative overflow-hidden px-4 sm:px-0">
			<div className="max-w-5xl mx-auto border-x px-6 py-20">
				{/* Section header */}
				<div className="flex flex-col items-center justify-center gap-3 text-center mb-12">
					<AnimateIn variant="blur-fade">
						<Badge variant="secondary">Experience</Badge>
					</AnimateIn>
					<LetterAnimation isHeading inView className="text-4xl sm:text-5xl font-bold tracking-tight">
						Professional Journey
					</LetterAnimation>
					<AnimateIn variant="blur-fade" delay={0.1}>
						<p className="text-muted-foreground">
							A timeline of my professional growth and key achievements
						</p>
					</AnimateIn>
				</div>

				{/* Timeline */}
				<div className="relative">
					{experiences.map((exp, index) => (
						<ExperienceCard key={index} {...exp} delay={index * 0.1} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Experience;