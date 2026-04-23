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
import { Badge } from "@/Components/UI/badge";

interface Experience {
  id: number;
  title: string;
  company: string;
  location?: string;
  type: 'work' | 'education';
  description?: string;
  start_date: string;
  end_date?: string;
  logo?: string;
  url?: string;
  priority: number;
}

interface ExperiencesIndexProps {
  experiences: Experience[];
}

export default function ExperiencesIndex({ experiences }: ExperiencesIndexProps) {
  function onDelete(id: number) {
    if (confirm("Are you sure you want to delete this experience?")) {
      router.delete(route('admin.experiences.destroy', id), {
        onSuccess: () => {
          toast.success("Experience deleted");
        },
      });
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <AdminLayout title="Experience Management">
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold tracking-tight">Journey</h1>
            <p className="text-muted-foreground">
                Manage your work and education timeline.
            </p>
            </div>
            <Link 
              href={route('admin.experiences.create')} 
              className={buttonVariants()}
            >
              <RiAddLine className="mr-2 h-4 w-4" />
              New Entry
            </Link>
        </div>

        <div className="rounded-md border bg-white dark:bg-zinc-950 shadow-sm">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[80px]">Priority</TableHead>
                <TableHead>Company / Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {experiences.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                    No entries found.
                    </TableCell>
                </TableRow>
                ) : (
                experiences.map((exp) => (
                    <TableRow key={exp.id}>
                    <TableCell className="font-mono text-sm text-muted-foreground">{exp.priority}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {exp.logo ? (
                          <div className="h-8 w-8 rounded border overflow-hidden bg-white shrink-0">
                            <img src={`/storage/${exp.logo}`} alt="" className="h-full w-full object-contain" />
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded border bg-zinc-50 dark:bg-zinc-900 shrink-0" />
                        )}
                        <div>
                          <div className="font-medium">{exp.company}</div>
                          <div className="text-xs text-muted-foreground">{exp.title}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={exp.type === 'work' ? 'default' : 'secondary'} className="capitalize">
                        {exp.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDate(exp.start_date)} — {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                    </TableCell>
                    <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                        <Link
                            href={route('admin.experiences.edit', exp.id)}
                            className={buttonVariants({ variant: "ghost", size: "icon" })}
                        >
                            <RiEditLine className="h-4 w-4" />
                        </Link>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(exp.id)}
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
