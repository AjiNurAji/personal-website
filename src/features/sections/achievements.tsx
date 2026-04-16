"use client";

import Link from "next/link";
import { RiArrowRightLine, RiTrophyLine, RiMedalLine, RiStarLine } from "@remixicon/react";
import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { LetterAnimation } from "~/components/elements/LetterAnimation";
import { AnimateIn } from "~/components/elements/AnimateIn";
import { cn } from "~/lib/utils";

const achievements = [
	{
		icon: RiTrophyLine,
		title: "1st Place – National Web Development Competition",
		organization: "Ministry of Education & Culture",
		year: "2024",
		description:
			"Won first place in the national-level web development competition among 200+ participants across Indonesia.",
		color: "text-yellow-500",
		bg: "bg-yellow-500/10",
	},
	{
		icon: RiMedalLine,
		title: "Best Capstone Project Award",
		organization: "Bangkit Academy 2023",
		year: "2023",
		description:
			"Recognized as the best capstone project in the Bangkit Academy cohort for building an AI-powered web application.",
		color: "text-blue-500",
		bg: "bg-blue-500/10",
	},
	{
		icon: RiStarLine,
		title: "Open Source Contributor – 500+ Stars",
		organization: "GitHub",
		year: "2023",
		description:
			"Contributed to multiple open source repositories and maintained a personal project that gained 500+ GitHub stars.",
		color: "text-purple-500",
		bg: "bg-purple-500/10",
	},
];

const AchievementsSection = () => {
	return (
		<section id="achievements" className="relative z-5 bg-background border-t overflow-hidden">
			<div className="max-w-5xl mx-auto border-x py-20 px-6">

				{/* Section header */}
				<div className="flex flex-col items-center justify-center gap-3 text-center mb-12">
					<AnimateIn variant="blur-fade">
						<Badge variant="secondary">Achievements</Badge>
					</AnimateIn>
					<LetterAnimation isHeading inView className="text-4xl sm:text-5xl font-bold tracking-tight">
						Recognition & Milestones
					</LetterAnimation>
					<AnimateIn variant="blur-fade" delay={0.1}>
						<p className="text-muted-foreground max-w-md">
							A few highlights from my journey — competitions, awards, and community contributions.
						</p>
					</AnimateIn>
				</div>

				{/* Achievement cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
					{achievements.map((item, index) => {
						const Icon = item.icon;
						return (
							<AnimateIn key={index} variant="blur-fade" delay={index * 0.1}>
								<Card className="h-full border bg-card hover:shadow-md transition-shadow duration-300">
									<CardContent className="p-6 flex flex-col gap-4 h-full">
										<div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", item.bg)}>
											<Icon className={cn("size-5", item.color)} />
										</div>
										<div className="flex-1 space-y-1">
											<p className="font-semibold leading-snug">{item.title}</p>
											<p className="text-xs text-muted-foreground">
												{item.organization} · {item.year}
											</p>
										</div>
										<p className="text-sm text-muted-foreground">{item.description}</p>
									</CardContent>
								</Card>
							</AnimateIn>
						);
					})}
				</div>

				{/* CTA */}
				<AnimateIn variant="blur-fade" delay={0.3} className="flex justify-center">
					<Link
						href="/achievements"
						className={cn(buttonVariants({ variant: "outline" }), "rounded-full gap-2")}
					>
						View All Achievements
						<RiArrowRightLine className="size-4" />
					</Link>
				</AnimateIn>

			</div>
		</section>
	);
};

export default AchievementsSection;
