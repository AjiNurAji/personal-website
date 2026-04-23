"use server";

import { revalidatePath } from "next/cache";
import prisma from "~/lib/prisma";
import { z } from "zod";

const SkillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  icon: z.string().optional(),
  priority: z.coerce.number().default(0),
});

export async function createSkill(data: z.infer<typeof SkillSchema>) {
  const validated = SkillSchema.parse(data);
  const skill = await prisma.skill.create({
    data: validated,
  });
  revalidatePath("/dashboard/skills");
  revalidatePath("/");
  return skill;
}

export async function updateSkill(
  id: string,
  data: z.infer<typeof SkillSchema>,
) {
  const validated = SkillSchema.parse(data);
  const skill = await prisma.skill.update({
    where: { id },
    data: validated,
  });
  revalidatePath("/dashboard/skills");
  revalidatePath("/");
  return skill;
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({
    where: { id },
  });
  revalidatePath("/dashboard/skills");
  revalidatePath("/");
}
