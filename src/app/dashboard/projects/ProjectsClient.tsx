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
import { ProjectForm } from "./ProjectForm";
import { RiAddLine, RiEditLine, RiDeleteBinLine } from "@remixicon/react";
import { deleteProject } from "./actions";
import { Badge } from "~/components/ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProjectsClientProps {
	initialProjects: any[];
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
	const router = useRouter();
	const [isCreateOpen, setIsCreateOpen] = useState(false);

	async function onDelete(id: string) {
		if (confirm("Are you sure you want to delete this project?")) {
			try {
				await deleteProject(id);
				toast.success("Project deleted");
				router.refresh();
			} catch (error) {
				toast.error("Failed to delete project");
			}
		}
	}

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Projects</h1>
					<p className="text-muted-foreground">
						Manage your portfolio projects.
					</p>
				</div>
				<Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
					<DialogTrigger asChild>
						<Button>
							<RiAddLine className="mr-2 h-4 w-4" />
							New Project
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[600px]">
						<DialogHeader>
							<DialogTitle>Add New Project</DialogTitle>
						</DialogHeader>
						<ProjectForm onSuccess={() => {
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
							<TableHead>Title</TableHead>
							<TableHead>Featured</TableHead>
							<TableHead>Badges</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{initialProjects.length === 0 ? (
							<TableRow>
								<TableCell colSpan={4} className="h-24 text-center">
									No projects found.
								</TableCell>
							</TableRow>
						) : (
							initialProjects.map((project) => (
								<TableRow key={project.id}>
									<TableCell className="font-medium">{project.title}</TableCell>
									<TableCell>
										{project.featured ? (
											<Badge className="bg-emerald-500 text-white border-0">
												Yes
											</Badge>
										) : (
											<Badge variant="outline">No</Badge>
										)}
									</TableCell>
									<TableCell>
										<div className="flex flex-wrap gap-1">
											{project.badges.slice(0, 3).map((badge: string) => (
												<span
													key={badge}
													className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded"
												>
													{badge}
												</span>
											))}
											{project.badges.length > 3 && (
												<span className="text-[10px] text-muted-foreground">
													+{project.badges.length - 3} more
												</span>
											)}
										</div>
									</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end gap-2">
											<Dialog>
												<DialogTrigger asChild>
													<Button variant="ghost" size="icon">
														<RiEditLine className="h-4 w-4" />
													</Button>
												</DialogTrigger>
												<DialogContent className="sm:max-w-[600px]">
													<DialogHeader>
														<DialogTitle>Edit Project</DialogTitle>
													</DialogHeader>
													<ProjectForm
														initialData={project}
														onSuccess={() => {
															// In a real app we'd close this specific dialog
															router.refresh();
														}}
													/>
												</DialogContent>
											</Dialog>
											<Button
												variant="ghost"
												size="icon"
												onClick={() => onDelete(project.id)}
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
