import AdminLayout from "@/Layouts/AdminLayout";
import { Button, buttonVariants } from "@/Components/UI/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/UI/table";
import { RiAddLine, RiEditLine, RiDeleteBinLine } from "@remixicon/react";
import { Badge } from "@/Components/UI/badge";
import { Project } from "@/types";
import { router, Link } from "@inertiajs/react";
import { toast } from "sonner";

interface ProjectsIndexProps {
  projects: Project[];
}

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
  function onDelete(id: number) {
    if (confirm("Are you sure you want to delete this project?")) {
      router.delete(route('admin.projects.destroy', id), {
        onSuccess: () => {
          toast.success("Project deleted");
        },
        onError: () => {
          toast.error("Failed to delete project");
        }
      });
    }
  }

  return (
    <AdminLayout title="Projects Management">
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground">
                Manage your portfolio projects.
            </p>
            </div>
            <Link href={route('admin.projects.create')} className={buttonVariants()}>
              <RiAddLine className="mr-2 h-4 w-4" />
              New Project
            </Link>
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
                {projects.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                    No projects found.
                    </TableCell>
                </TableRow>
                ) : (
                projects.map((project) => (
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
                        {project.badges ? (
                                (() => {
                                    try {
                                        const parsed = typeof project.badges === 'string' ? JSON.parse(project.badges) : project.badges;
                                        const badgesArray = Array.isArray(parsed) ? parsed : Object.values(parsed);

                                        return (
                                            <>
                                            {badgesArray.slice(0, 3).map((badge: string) => (
                                                <span
                                                    key={badge}
                                                    className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded"
                                                >
                                                    {badge}
                                                </span>
                                                ))}
                                                {badgesArray.length > 3 && (
                                                <span className="text-[10px] text-muted-foreground">
                                                    +{badgesArray.length - 3} more
                                                </span>
                                            )}
                                            </>
                                        )
                                    } catch (e) {
                                        return <span className="text-[10px]">{project.badges}</span>;
                                    }
                                })()
                        ) : null}
                        </div>
                    </TableCell>
                    <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                        <Link
                            href={route('admin.projects.edit', project.id)}
                            className={buttonVariants({ variant: "ghost", size: "icon" })}
                        >
                            <RiEditLine className="h-4 w-4" />
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(project.id as number)}
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
    </AdminLayout>
  );
}
