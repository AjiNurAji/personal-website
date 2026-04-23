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
import { router, Link } from "@inertiajs/react";
import { toast } from "sonner";

interface Skill {
  id: number;
  name: string;
  icon: string;
  category: string;
  priority: number;
}

interface SkillsIndexProps {
  skills: Skill[];
}

export default function SkillsIndex({ skills }: SkillsIndexProps) {
  function onDelete(id: number) {
    if (confirm("Are you sure you want to delete this skill?")) {
      router.delete(route('admin.skills.destroy', id), {
        onSuccess: () => {
          toast.success("Skill deleted");
        },
        onError: () => {
          toast.error("Failed to delete skill");
        }
      });
    }
  }

  return (
    <AdminLayout title="Skills Management">
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
            <p className="text-muted-foreground">
                Manage your technical skills.
            </p>
            </div>
            <Link 
              href={route('admin.skills.create')} 
              className={buttonVariants()}
            >
              <RiAddLine className="mr-2 h-4 w-4" />
              New Skill
            </Link>
        </div>

        <div className="rounded-md border bg-white dark:bg-zinc-950 shadow-sm">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Priority</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {skills.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                    No skills found.
                    </TableCell>
                </TableRow>
                ) : (
                skills.map((skill) => (
                    <TableRow key={skill.id}>
                    <TableCell className="font-mono text-sm text-muted-foreground">{skill.priority}</TableCell>
                    <TableCell>{skill.name}</TableCell>
                    <TableCell>{skill.category}</TableCell>
                    <TableCell className="text-muted-foreground font-mono text-xs">{skill.icon}</TableCell>
                    <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                        <Link
                            href={route('admin.skills.edit', skill.id)}
                            className={buttonVariants({ variant: "ghost", size: "icon" })}
                        >
                            <RiEditLine className="h-4 w-4" />
                        </Link>
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
    </AdminLayout>
  );
}
