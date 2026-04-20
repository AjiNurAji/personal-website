import prisma from "~/lib/prisma";
import { SkillsClient } from "./SkillsClient";

export default async function SkillsDashboardPage() {
	const skills = await prisma.skill.findMany({
		orderBy: [
			{ category: "asc" },
			{ priority: "desc" }
		],
	});

	return <SkillsClient initialSkills={skills} />;
}
