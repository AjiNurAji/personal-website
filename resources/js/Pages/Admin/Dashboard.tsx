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
  RiArrowRightUpLine,
  RiGithubFill,
  RiSettings4Line,
} from "@remixicon/react";
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/UI/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";

interface DashboardProps {
  stats: {
    projects: number;
    skills: number;
    achievements: number;
  };
  githubCommits?: {
    message: string;
    url: string;
    date: string;
    sha: string;
  }[];
}

export default function Dashboard({ stats, githubCommits = [] }: DashboardProps) {
  const { t } = useTranslation();
  const statCards = [
    {
      title: t("Projects"),
      value: stats.projects,
      description: t("Active portfolio items"),
      icon: RiFolder2Line,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    {
      title: t("Technical Skills"),
      value: stats.skills,
      description: t("Expertise categories"),
      icon: RiToolsLine,
      color: "text-foreground",
      bg: "bg-muted",
      border: "border-border",
    },
    {
      title: t("Achievements"),
      value: stats.achievements,
      description: t("Awards and certifications"),
      icon: RiAwardLine,
      color: "text-foreground",
      bg: "bg-muted",
      border: "border-border",
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
              {t("Dashboard")}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t("Welcome back! Track and manage your digital presence.")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="/" target="_blank" rel="noopener noreferrer">
                {t("View Site")}
              </a>
            </Button>
            <Button size="sm" asChild>
              <Link href="/admin/projects">{t("Manage Projects")}</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-6">
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
                <div className="text-4xl font-extrabold tracking-tight">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          <Card className="lg:col-span-4 border shadow-none overflow-hidden group">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <RiGithubFill className="size-5" />
                {t("Recent Commits")}
              </CardTitle>
              <CardDescription>
                {t("Latest updates from AjiNurAji/personal-website")}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {githubCommits.length > 0 ? (
                  githubCommits.map((commit, i) => (
                    <a
                      key={commit.sha}
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors group/item block"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium group-hover/item:text-primary transition-colors">{commit.message}</span>
                        <span className="text-xs text-muted-foreground">{commit.date}</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                        {commit.sha}
                      </span>
                    </a>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground text-sm">
                    {t("No recent commits found or unable to connect to GitHub.")}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 border shadow-none overflow-hidden">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle>{t("System Actions")}</CardTitle>
              <CardDescription>{t("Quick management shortcuts")}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid grid-cols-1 gap-4">
              <Link href="/admin/projects" className="block">
                <div className="flex cursor-pointer items-center justify-between rounded-xl border border-border p-4 transition-all hover:border-primary/50 hover:bg-muted/40 group">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <RiFolder2Line className="size-5" />
                    </div>
                    <span className="font-bold">{t("Manage Projects")}</span>
                  </div>
                  <RiArrowRightUpLine className="size-5 text-muted-foreground" />
                </div>
              </Link>
              <Link href="/admin/skills" className="block">
                <div className="flex cursor-pointer items-center justify-between rounded-xl border border-border p-4 transition-all hover:border-primary/50 hover:bg-muted/40 group">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <RiToolsLine className="size-5" />
                    </div>
                    <span className="font-bold">{t("Update Skills")}</span>
                  </div>
                  <RiArrowRightUpLine className="size-5 text-muted-foreground" />
                </div>
              </Link>
              <Link href="/admin/settings" className="block">
                <div className="flex cursor-pointer items-center justify-between rounded-xl border border-border p-4 transition-all hover:border-primary/50 hover:bg-muted/40 group">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <RiSettings4Line className="size-5" />
                    </div>
                    <span className="font-bold">{t("Site Settings")}</span>
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
