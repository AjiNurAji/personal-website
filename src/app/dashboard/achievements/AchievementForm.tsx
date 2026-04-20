"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
	Field,
	FieldLabel,
	FieldContent,
	FieldError,
} from "~/components/ui/field";
import { createAchievement, updateAchievement } from "./actions";
import { useState } from "react";
import { toast } from "sonner";

const AchievementSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	organization: z.string().optional(),
	year: z.string().optional(),
});

interface AchievementFormProps {
	initialData?: any;
	onSuccess: () => void;
}

export function AchievementForm({ initialData, onSuccess }: AchievementFormProps) {
	const [loading, setLoading] = useState(false);

	const { control, handleSubmit } = useForm<z.infer<typeof AchievementSchema>>({
		resolver: zodResolver(AchievementSchema),
		defaultValues: {
			title: initialData?.title || "",
			description: initialData?.description || "",
			organization: initialData?.organization || "",
			year: initialData?.year || "",
		},
	});

	async function onSubmit(values: z.infer<typeof AchievementSchema>) {
		setLoading(true);
		try {
			if (initialData) {
				await updateAchievement(initialData.id, values);
				toast.success("Achievement updated successfully");
			} else {
				await createAchievement(values);
				toast.success("Achievement created successfully");
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
							<Input placeholder="Achievement Title" {...field} />
							<FieldError errors={[fieldState.error]} />
						</FieldContent>
					</Field>
				)}
			/>
			<div className="grid grid-cols-2 gap-4">
				<Controller
					control={control}
					name="organization"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Organization</FieldLabel>
							<FieldContent>
								<Input placeholder="e.g. GitHub" {...field} />
								<FieldError errors={[fieldState.error]} />
							</FieldContent>
						</Field>
					)}
				/>
				<Controller
					control={control}
					name="year"
					render={({ field, fieldState }) => (
						<Field>
							<FieldLabel>Year</FieldLabel>
							<FieldContent>
								<Input placeholder="e.g. 2024" {...field} />
								<FieldError errors={[fieldState.error]} />
							</FieldContent>
						</Field>
					)}
				/>
			</div>
			<Controller
				control={control}
				name="description"
				render={({ field, fieldState }) => (
					<Field>
						<FieldLabel>Description</FieldLabel>
						<FieldContent>
							<Textarea 
								placeholder="Describe your achievement..." 
								className="min-h-[100px]"
								{...field} 
							/>
							<FieldError errors={[fieldState.error]} />
						</FieldContent>
					</Field>
				)}
			/>
			<Button type="submit" className="w-full" disabled={loading}>
				{loading ? "Saving..." : initialData ? "Update Achievement" : "Create Achievement"}
			</Button>
		</form>
	);
}

