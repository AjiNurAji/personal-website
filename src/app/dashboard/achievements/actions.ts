"use server";

import { revalidatePath } from "next/cache";
import prisma from "~/lib/prisma";
import { z } from "zod";

const AchievementSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	organization: z.string().optional(),
	year: z.string().optional(),
});

export async function createAchievement(data: z.infer<typeof AchievementSchema>) {
	const validated = AchievementSchema.parse(data);
	const achievement = await prisma.achievement.create({
		data: validated,
	});
	revalidatePath("/dashboard/achievements");
	revalidatePath("/achievements");
	return achievement;
}

export async function updateAchievement(id: string, data: z.infer<typeof AchievementSchema>) {
	const validated = AchievementSchema.parse(data);
	const achievement = await prisma.achievement.update({
		where: { id },
		data: validated,
	});
	revalidatePath("/dashboard/achievements");
	revalidatePath("/achievements");
	return achievement;
}

export async function deleteAchievement(id: string) {
	await prisma.achievement.delete({
		where: { id },
	});
	revalidatePath("/dashboard/achievements");
	revalidatePath("/achievements");
}
