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

interface Achievement {
  id: number;
  title: string;
  description: string;
  organization: string | null;
  year: string | null;
  category: "event" | "award" | "certification";
}

interface AchievementsIndexProps {
  achievements: Achievement[];
}

export default function AchievementsIndex({ achievements }: AchievementsIndexProps) {
  function onDelete(id: number) {
    if (confirm("Are you sure you want to delete this achievement?")) {
      router.delete(route('admin.achievements.destroy', id), {
        onSuccess: () => {
          toast.success("Achievement deleted");
        },
        onError: () => {
          toast.error("Failed to delete achievement");
        }
      });
    }
  }

  return (
    <AdminLayout title="Achievements Management">
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
            <p className="text-muted-foreground">
                Manage your awards and certifications.
            </p>
            </div>
            <Link 
              href={route('admin.achievements.create')} 
              className={buttonVariants()}
            >
              <RiAddLine className="mr-2 h-4 w-4" />
              New Achievement
            </Link>
        </div>

        <div className="rounded-md border bg-white dark:bg-zinc-950 shadow-sm">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Year</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {achievements.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                    No achievements found.
                    </TableCell>
                </TableRow>
                ) : (
                achievements.map((achievement) => (
                    <TableRow key={achievement.id}>
                    <TableCell className="font-medium">{achievement.year || '-'}</TableCell>
                    <TableCell>
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary capitalize">
                            {achievement.category}
                        </span>
                    </TableCell>
                    <TableCell>{achievement.title}</TableCell>
                    <TableCell>{achievement.organization || '-'}</TableCell>
                    <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                        <Link
                            href={route('admin.achievements.edit', achievement.id)}
                            className={buttonVariants({ variant: "ghost", size: "icon" })}
                        >
                            <RiEditLine className="h-4 w-4" />
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(achievement.id)}
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
