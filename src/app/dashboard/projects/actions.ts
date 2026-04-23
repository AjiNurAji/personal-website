"use server";

import { revalidatePath } from "next/cache";
import prisma from "~/lib/prisma";
import { z } from "zod";

const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  image: z.string().min(1, "Image URL is required"),
  link: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
  demo: z.string().optional().nullable(),
  badges: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export async function createProject(data: z.infer<typeof ProjectSchema>) {
  const validated = ProjectSchema.parse(data);
  const project = await prisma.project.create({
    data: validated,
  });
  revalidatePath("/dashboard/projects");
  revalidatePath("/");
  return project;
}

export async function updateProject(
  id: string,
  data: z.infer<typeof ProjectSchema>,
) {
  const validated = ProjectSchema.parse(data);
  const project = await prisma.project.update({
    where: { id },
    data: validated,
  });
  revalidatePath("/dashboard/projects");
  revalidatePath("/");
  return project;
}

export async function deleteProject(id: string) {
  await prisma.project.delete({
    where: { id },
  });
  revalidatePath("/dashboard/projects");
  revalidatePath("/");
}
