import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Button } from "@/Components/UI/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/UI/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/UI/dialog";
import { RiAddLine, RiEditLine, RiDeleteBinLine } from "@remixicon/react";
import { AchievementForm } from "@/Components/Dashboard/AchievementForm";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

interface Achievement {
  id: number;
  title: string;
  description: string;
  organization: string | null;
  year: string | null;
}

interface AchievementsIndexProps {
  achievements: Achievement[];
}

export default function AchievementsIndex({ achievements }: AchievementsIndexProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);

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
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
                <Button>
                <RiAddLine className="mr-2 h-4 w-4" />
                New Achievement
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                <DialogTitle>Add New Achievement</DialogTitle>
                </DialogHeader>
                <AchievementForm
                onSuccess={() => {
                    setIsCreateOpen(false);
                }}
                />
            </DialogContent>
            </Dialog>
        </div>

        <div className="rounded-md border bg-white dark:bg-zinc-950 shadow-sm">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Year</TableHead>
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
                    <TableCell>{achievement.title}</TableCell>
                    <TableCell>{achievement.organization || '-'}</TableCell>
                    <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                        <Dialog open={editingAchievement?.id === achievement.id} onOpenChange={(open: boolean) => !open && setEditingAchievement(null)}>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => setEditingAchievement(achievement)}>
                                    <RiEditLine className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[400px]">
                            <DialogHeader>
                                <DialogTitle>Edit Achievement</DialogTitle>
                            </DialogHeader>
                            {editingAchievement?.id === achievement.id && (
                                <AchievementForm
                                    initialData={editingAchievement}
                                    onSuccess={() => {
                                        setEditingAchievement(null);
                                    }}
                                />
                            )}
                            </DialogContent>
                        </Dialog>
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
