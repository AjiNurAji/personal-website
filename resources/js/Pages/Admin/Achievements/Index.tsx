import AdminLayout from "@/Layouts/AdminLayout";
import { Button, buttonVariants } from "@/Components/UI/button";
import { Input } from "@/Components/UI/input";
import { RiAddLine, RiEditLine, RiDeleteBinLine, RiImageLine, RiSearchLine, RiLoader4Line } from "@remixicon/react";
import { router, Link } from "@inertiajs/react";
import { toast } from "sonner";
import { Achievement } from "@/Components/Dashboard/AchievementForm";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface PaginatedData<T> {
  data: T[];
  links: any[];
  current_page: number;
  last_page: number;
  total: number;
}

interface AchievementsIndexProps {
  achievements: PaginatedData<Achievement>;
  filters: {
    search?: string;
  };
}

export default function AchievementsIndex({ achievements, filters }: AchievementsIndexProps) {
  const initialSearch = filters?.search || "";
  const [search, setSearch] = useState(initialSearch);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Only trigger a new search if the user actually typed something different from the current URL's search param
      if (search !== (filters?.search || "")) {
        setIsSearching(true);
        router.get(
          route('admin.achievements.index'),
          { search },
          { preserveState: true, preserveScroll: true, onFinish: () => setIsSearching(false) }
        );
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [search, filters?.search]);

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <AdminLayout title="Achievements Management">
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your awards, certifications, and events.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            type="text" 
                            placeholder="Search achievements..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 w-full bg-white dark:bg-zinc-950"
                        />
                        {isSearching && <RiLoader4Line className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />}
                    </div>
                    <Link 
                      href={route('admin.achievements.create')} 
                      className={buttonVariants({ className: "shadow-lg shadow-primary/20 shrink-0 w-full sm:w-auto" })}
                    >
                      <RiAddLine className="mr-2 h-4 w-4" />
                      New Achievement
                    </Link>
                </div>
            </div>

            {achievements.data.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                        {search ? <RiSearchLine className="h-6 w-6" /> : <RiImageLine className="h-6 w-6" />}
                    </div>
                    <h3 className="text-lg font-medium">{search ? 'No results found' : 'No achievements yet'}</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-4">
                        {search ? `We couldn't find anything matching "${search}".` : "You haven't added any achievements. Create your first one to showcase your milestones."}
                    </p>
                    {!search && (
                        <Link href={route('admin.achievements.create')} className={buttonVariants({ variant: "outline" })}>
                            Create Achievement
                        </Link>
                    )}
                </div>
            ) : (
                <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col gap-4"
                >
                    {achievements.data.map((achievement) => (
                        <motion.div 
                            variants={item}
                            key={achievement.id} 
                            className="group relative flex flex-col sm:flex-row items-stretch rounded-xl overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
                        >
                            <div className="w-full sm:w-64 shrink-0 aspect-[4/3] sm:aspect-video bg-zinc-100 dark:bg-zinc-900 relative overflow-hidden border-b sm:border-b-0 sm:border-r border-zinc-100 dark:border-zinc-800">
                                {achievement.preview_image ? (
                                    <img 
                                        src={`/storage/${achievement.preview_image}`} 
                                        alt={achievement.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600">
                                        <RiImageLine className="h-10 w-10 mb-2 opacity-50" />
                                        <span className="text-xs font-medium uppercase tracking-wider">No Preview</span>
                                    </div>
                                )}
                                <div className="absolute top-3 left-3 flex gap-2">
                                    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold bg-white/90 dark:bg-black/90 text-zinc-800 dark:text-zinc-200 backdrop-blur-md shadow-sm capitalize tracking-wide">
                                        {achievement.category}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="p-5 flex flex-col flex-1 justify-center">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <div>
                                        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">{achievement.title}</h3>
                                        {achievement.organization && (
                                            <p className="text-sm text-muted-foreground font-medium">{achievement.organization}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {achievement.year && (
                                            <span className="text-sm font-semibold px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 whitespace-nowrap">{achievement.year}</span>
                                        )}
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link
                                                href={route('admin.achievements.edit', achievement.id!)}
                                                className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8 text-zinc-500 hover:text-primary hover:bg-primary/10" })}
                                            >
                                                <RiEditLine className="h-4 w-4" />
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onDelete(achievement.id!)}
                                                className="h-8 w-8 text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                                            >
                                                <RiDeleteBinLine className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2 max-w-3xl">
                                    {achievement.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {achievements.links && achievements.links.length > 3 && (
                <div className="flex justify-center pt-6 pb-2">
                    <div className="flex flex-wrap items-center gap-1 bg-white dark:bg-zinc-950 p-1 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl shadow-sm">
                        {achievements.links.map((link, k) => (
                            <Link
                                key={k}
                                href={link.url || '#'}
                                className={buttonVariants({ 
                                    variant: link.active ? 'default' : 'ghost',
                                    size: 'sm',
                                    className: `min-w-9 ${!link.url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`
                                })}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                preserveScroll
                                preserveState
                                onClick={(e) => !link.url && e.preventDefault()}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    </AdminLayout>
  );
}
