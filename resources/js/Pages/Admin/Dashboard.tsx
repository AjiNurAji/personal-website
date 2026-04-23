import AdminLayout from "@/Layouts/AdminLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/Components/UI/card";
import {
  RiFolder2Line,
  RiToolsLine,
  RiAwardLine,
  RiUserLine,
  RiArrowRightUpLine,
  RiGithubFill,
} from "@remixicon/react";
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/UI/button";
import { cn } from "@/lib/utils";

interface DashboardProps {
  stats: {
    projects: number;
    skills: number;
    achievements: number;
  };
}

export default function Dashboard({ stats }: DashboardProps) {
  const statCards = [
    {
      title: "Projects",
      value: stats.projects,
      description: "Active portfolio items",
      icon: RiFolder2Line,
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/10",
      border: "border-blue-100 dark:border-blue-900/20",
    },
    {
      title: "Technical Skills",
      value: stats.skills,
      description: "Expertise categories",
      icon: RiToolsLine,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-900/10",
      border: "border-amber-100 dark:border-amber-900/20",
    },
    {
      title: "Achievements",
      value: stats.achievements,
      description: "Awards and certifications",
      icon: RiAwardLine,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-900/10",
      border: "border-purple-100 dark:border-purple-900/20",
    },
    {
      title: "Admin Sessions",
      value: 1, // Example static value or get from sessions
      description: "Currently active",
      icon: RiUserLine,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-900/10",
      border: "border-emerald-100 dark:border-emerald-900/20",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-zinc-100 dark:to-zinc-500">
              Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Welcome back! Track and manage your digital presence.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="/" target="_blank" rel="noopener noreferrer">
                View Site
              </a>
            </Button>
            <Button size="sm" asChild>
              <Link href="/admin/projects">Manage Projects</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Card
              key={stat.title}
              className={cn(
                "overflow-hidden border shadow-none hover:shadow-md transition-all duration-300 group",
                stat.border
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {stat.description}
                  </CardDescription>
                </div>
                <div
                  className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className="size-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-extrabold tracking-tighter">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          <Card className="lg:col-span-4 border shadow-none overflow-hidden group">
            <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b">
              <CardTitle className="flex items-center gap-2">
                <RiGithubFill className="size-5" />
                Recent Integration
              </CardTitle>
              <CardDescription>
                Connected to Supabase PostgreSQL & Laravel 11
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {[
                  "Database migrated to Laravel & Supabase",
                  "Vite & Tailwind v4 integration",
                  "Auth session types migrated to Breeze",
                ].map((item, i) => (
                  <div
                    key={item}
                    className="p-4 flex items-center justify-between hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors"
                  >
                    <span className="text-sm font-medium">{item}</span>
                    <span className="text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      Success
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 border shadow-none overflow-hidden">
            <CardHeader className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b">
              <CardTitle>System Actions</CardTitle>
              <CardDescription>Quick management shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 gap-4">
              <Link href="/admin/projects" className="block">
                <div className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-950 dark:hover:border-zinc-200 cursor-pointer transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-950 group-hover:text-white dark:group-hover:bg-zinc-200 dark:group-hover:text-zinc-950 transition-colors">
                      <RiFolder2Line className="size-5" />
                    </div>
                    <span className="font-bold">Manage Projects</span>
                  </div>
                  <RiArrowRightUpLine className="size-5 text-muted-foreground" />
                </div>
              </Link>
              <Link href="/admin/skills" className="block">
                <div className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-zinc-950 dark:hover:border-zinc-200 cursor-pointer transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-950 group-hover:text-white dark:group-hover:bg-zinc-200 dark:group-hover:text-zinc-950 transition-colors">
                      <RiToolsLine className="size-5" />
                    </div>
                    <span className="font-bold">Update Skills</span>
                  </div>
                  <RiArrowRightUpLine className="size-5 text-muted-foreground" />
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
