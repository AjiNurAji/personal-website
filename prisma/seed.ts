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
    const isFeatured = projectsData.featured.some(
      (f) => f.title === project.title,
    );
    const slug = project.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    
    console.log(`Creating project: ${project.title}`);
    
    // Using raw SQL to bypass client sync issues
    await prisma.$executeRawUnsafe(
      `INSERT INTO "Project" (id, title, slug, description, content, image, link, github, demo, badges, featured, "createdAt", "updatedAt") 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())`,
      `${Math.random().toString(36).substr(2, 9)}`,
      project.title,
      slug,
      project.description,
      `# ${project.title}\n\nThis is a detailed description of ${project.title}. it supports **markdown**!`,
      project.image,
      project.link,
      project.github,
      project.demo,
      project.badges,
      isFeatured
    );
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
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
