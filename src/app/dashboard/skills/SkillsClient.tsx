"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "~/components/ui/dialog";
import { SkillForm } from "./SkillForm";
import { RiAddLine, RiEditLine, RiDeleteBinLine } from "@remixicon/react";
import { deleteSkill } from "./actions";
import { Badge } from "~/components/ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SkillsClientProps {
	initialSkills: any[];
}

export function SkillsClient({ initialSkills }: SkillsClientProps) {
	const router = useRouter();
	const [isCreateOpen, setIsCreateOpen] = useState(false);

	async function onDelete(id: string) {
		if (confirm("Are you sure you want to delete this skill?")) {
			try {
				await deleteSkill(id);
				toast.success("Skill deleted");
				router.refresh();
			} catch (error) {
				toast.error("Failed to delete skill");
			}
		}
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Skills</h1>
					<p className="text-muted-foreground">
						Manage your technical skills and categories.
					</p>
				</div>
				<Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
					<DialogTrigger asChild>
						<Button>
							<RiAddLine className="mr-2 h-4 w-4" />
							New Skill
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Add New Skill</DialogTitle>
						</DialogHeader>
						<SkillForm onSuccess={() => {
							setIsCreateOpen(false);
							router.refresh();
						}} />
					</DialogContent>
				</Dialog>
			</div>

			<div className="rounded-md border bg-white dark:bg-zinc-950 shadow-sm">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Priority</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{initialSkills.length === 0 ? (
							<TableRow>
								<TableCell colSpan={4} className="h-24 text-center">
									No skills found.
								</TableCell>
							</TableRow>
						) : (
							initialSkills.map((skill) => (
								<TableRow key={skill.id}>
									<TableCell className="font-medium">{skill.name}</TableCell>
									<TableCell>
										<Badge variant="secondary">
											{skill.category}
										</Badge>
									</TableCell>
									<TableCell>{skill.priority}</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end gap-2">
											<Dialog>
												<DialogTrigger asChild>
													<Button variant="ghost" size="icon">
														<RiEditLine className="h-4 w-4" />
													</Button>
												</DialogTrigger>
												<DialogContent className="sm:max-w-[425px]">
													<DialogHeader>
														<DialogTitle>Edit Skill</DialogTitle>
													</DialogHeader>
													<SkillForm
														initialData={skill}
														onSuccess={() => {
															router.refresh();
														}}
													/>
												</DialogContent>
											</Dialog>
											<Button
												variant="ghost"
												size="icon"
												onClick={() => onDelete(skill.id)}
												className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
											>
												<RiDeleteBinLine className="h-4 w-4" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
