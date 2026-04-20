import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
	RiFolder2Line,
	RiToolsLine,
	RiAwardLine,
	RiUserLine,
	RiArrowRightUpLine,
} from "@remixicon/react";
import prisma from "~/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
	// Let's count some stats (these will be 0 until we seed)
	const [projectCount, skillCount, achievementCount] = await Promise.all([
		prisma.project.count(),
		prisma.skill.count(),
		prisma.achievement.count(),
	]);

	const stats = [
		{
			title: "Total Projects",
			value: projectCount,
			icon: RiFolder2Line,
			color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
		},
		{
			title: "Skills",
			value: skillCount,
			icon: RiToolsLine,
			color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30",
		},
		{
			title: "Achievements",
			value: achievementCount,
			icon: RiAwardLine,
			color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30",
		},
		{
			title: "Admin Users",
			value: 1, // Single admin for now
			icon: RiUserLine,
			color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30",
		},
	];

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Overview</h1>
				<p className="text-muted-foreground">
					Welcome back! Here's what's happening with your portfolio.
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat) => (
					<Card key={stat.title}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								{stat.title}
							</CardTitle>
							<div className={`p-2 rounded-md ${stat.color}`}>
								<stat.icon className="h-4 w-4" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stat.value}</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4">
					<CardHeader>
						<CardTitle>Recent Activity</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							Activity logging will appear here once you start making changes.
						</p>
					</CardContent>
				</Card>
				<Card className="col-span-3">
					<CardHeader>
						<CardTitle>Quick Links</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-2">
						<p className="text-xs text-muted-foreground mb-2">
							Need to update something quickly?
						</p>
						<div className="flex flex-col gap-2">
							<Link href="/dashboard/projects">
								<Card className="p-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer transition-colors flex items-center justify-between group">
									<span className="text-sm font-medium">Add New Project</span>
									<RiArrowRightUpLine className="size-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-50 transition-colors" />
								</Card>
							</Link>
							<Link href="/dashboard/skills">
								<Card className="p-3 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer transition-colors flex items-center justify-between group">
									<span className="text-sm font-medium">Add New Skill</span>
									<RiArrowRightUpLine className="size-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-50 transition-colors" />
								</Card>
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

