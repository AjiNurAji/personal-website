import { PrismaClient } from "@prisma/client";
import { projectsData } from "../src/config/projects";
import { achievements } from "../src/config/achievements";

const prisma = new PrismaClient();

async function main() {
	console.log("Seeding data...");

	// Clear existing data
	await prisma.project.deleteMany();
	await prisma.achievement.deleteMany();

	// Seed Projects
	for (const project of projectsData.all) {
		const isFeatured = projectsData.featured.some((f) => f.title === project.title);
		await prisma.project.create({
			data: {
				title: project.title,
				description: project.description,
				image: project.image,
				link: project.link,
				github: project.github,
				demo: project.demo,
				badges: project.badges,
				featured: isFeatured,
			},
		});
	}

	// Seed Achievements
	for (const achievement of achievements) {
		await prisma.achievement.create({
			data: {
				title: achievement.title,
				description: achievement.description,
				organization: achievement.organization,
				year: achievement.year,
			},
		});
	}

	// Seed Admin User
	await prisma.user.upsert({
		where: { email: process.env.ADMIN_EMAIL || "admin@local.com" },
		update: {},
		create: {
			email: process.env.ADMIN_EMAIL || "admin@local.com",
			password: process.env.ADMIN_PASSWORD || "admin123",
			name: "Admin",
		},
	});

	console.log("Seeding complete!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
