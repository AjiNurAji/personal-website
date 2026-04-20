"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import {
	Field,
	FieldLabel,
	FieldContent,
	FieldError,
	FieldDescription,
} from "~/components/ui/field";
import { createProject, updateProject } from "./actions";
import { useState } from "react";
import { toast } from "sonner";

const ProjectSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	image: z.string().min(1, "Image URL is required"),
	link: z.string().min(1, "Link is required"),
	github: z.string().optional(),
	demo: z.string().optional(),
	badges: z.string().transform((val) => val.split(",").map((s) => s.trim()).filter(Boolean)),
	featured: z.boolean().default(false),
});

interface ProjectFormProps {
	initialData?: any;
	onSuccess: () => void;
}

export function ProjectForm({ initialData, onSuccess }: ProjectFormProps) {
	const [loading, setLoading] = useState(false);

	const { control, handleSubmit } = useForm<z.infer<typeof ProjectSchema>>({
		resolver: zodResolver(ProjectSchema),
		defaultValues: {
			title: initialData?.title || "",
			description: initialData?.description || "",
			image: initialData?.image || "",
			link: initialData?.link || "",
			github: initialData?.github || "",
			demo: initialData?.demo || "",
			badges: initialData?.badges?.join(", ") || "",
			featured: initialData?.featured || false,
		},
	});

	async function onSubmit(values: any) {
		setLoading(true);
		try {
			if (initialData) {
				await updateProject(initialData.id, values);
				toast.success("Project updated successfully");
			} else {
				await createProject(values);
				toast.success("Project created successfully");
			}
			onSuccess();
		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<Controller
				control={control}
				name="title"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Title</FieldLabel>
						<FieldContent>
							<Input placeholder="Project Title" {...field} />
							<FieldError errors={[fieldState.error]} />
						</FieldContent>
					</Field>
				)}
			/>
			<Controller
				control={control}
				name="description"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Description</FieldLabel>
						<FieldContent>
							<Input placeholder="Short description" {...field} />
							<FieldError errors={[fieldState.error]} />
						</FieldContent>
					</Field>
				)}
			/>
			<div className="grid grid-cols-2 gap-4">
				<Controller
					control={control}
					name="image"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Image URL</FieldLabel>
							<FieldContent>
								<Input placeholder="/images/proj.jpg" {...field} />
								<FieldError errors={[fieldState.error]} />
							</FieldContent>
						</Field>
					)}
				/>
				<Controller
					control={control}
					name="link"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Link</FieldLabel>
							<FieldContent>
								<Input placeholder="/projects/slug" {...field} />
								<FieldError errors={[fieldState.error]} />
							</FieldContent>
						</Field>
					)}
				/>
			</div>
			<div className="grid grid-cols-2 gap-4">
				<Controller
					control={control}
					name="github"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Github Link (Optional)</FieldLabel>
							<FieldContent>
								<Input placeholder="https://github.com/..." {...field} />
								<FieldError errors={[fieldState.error]} />
							</FieldContent>
						</Field>
					)}
				/>
				<Controller
					control={control}
					name="demo"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Demo Link (Optional)</FieldLabel>
							<FieldContent>
								<Input placeholder="https://demo.com" {...field} />
								<FieldError errors={[fieldState.error]} />
							</FieldContent>
						</Field>
					)}
				/>
			</div>
			<Controller
				control={control}
				name="badges"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Badges (Comma separated)</FieldLabel>
						<FieldContent>
							<Input placeholder="React, TypeScript, Tailwind" {...field} />
							<FieldDescription>
								List technologies used, separated by commas.
							</FieldDescription>
							<FieldError errors={[fieldState.error]} />
						</FieldContent>
					</Field>
				)}
			/>
			<Controller
				control={control}
				name="featured"
				render={({ field }) => (
					<Field orientation="horizontal" className="items-start space-x-3 rounded-md border p-4">
						<Checkbox
							id="featured"
							checked={field.value}
							onCheckedChange={field.onChange}
						/>
						<div className="flex flex-col gap-1 leading-none">
							<FieldLabel htmlFor="featured">Featured Project</FieldLabel>
							<FieldDescription>
								This project will appear in the "Featured" section.
							</FieldDescription>
						</div>
					</Field>
				)}
			/>
			<Button type="submit" className="w-full" disabled={loading}>
				{loading ? "Saving..." : initialData ? "Update Project" : "Create Project"}
			</Button>
		</form>
	);
}

