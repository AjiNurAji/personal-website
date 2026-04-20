import prisma from "~/lib/prisma";
import { AchievementsClient } from "./AchievementsClient";

export default async function AchievementsDashboardPage() {
	const achievements = await prisma.achievement.findMany({
		orderBy: { year: "desc" },
	});

	return <AchievementsClient initialAchievements={achievements} />;
}
