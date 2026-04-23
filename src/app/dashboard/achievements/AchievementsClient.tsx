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
import { AchievementForm } from "./AchievementForm";
import { RiAddLine, RiEditLine, RiDeleteBinLine } from "@remixicon/react";
import { deleteAchievement } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { type Achievement } from "@prisma/client";

interface AchievementsClientProps {
  initialAchievements: Achievement[];
}

export function AchievementsClient({
  initialAchievements,
}: AchievementsClientProps) {
  const router = useRouter();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  async function onDelete(id: string) {
    if (confirm("Are you sure you want to delete this achievement?")) {
      try {
        await deleteAchievement(id);
        toast.success("Achievement deleted");
        router.refresh();
      } catch (error) {
        toast.error("Failed to delete achievement");
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
          <p className="text-muted-foreground">
            Manage your recognition and milestones.
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <RiAddLine className="mr-2 h-4 w-4" />
              New Achievement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Achievement</DialogTitle>
            </DialogHeader>
            <AchievementForm
              onSuccess={() => {
                setIsCreateOpen(false);
                router.refresh();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-white dark:bg-zinc-950 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialAchievements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No achievements found.
                </TableCell>
              </TableRow>
            ) : (
              initialAchievements.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.organization}</TableCell>
                  <TableCell>{item.year}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <RiEditLine className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Edit Achievement</DialogTitle>
                          </DialogHeader>
                          <AchievementForm
                            initialData={item}
                            onSuccess={() => {
                              router.refresh();
                            }}
                          />
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(item.id)}
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
