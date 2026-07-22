"use client";

import { useTheme } from "@/hooks/use-theme";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { Badge } from "@/Components/UI/badge";
import {
  RiGithubFill,
  RiStarFill,
  RiGitForkFill,
  RiArrowRightUpLine,
} from "@remixicon/react";
import { useEffect, useState } from "react";

interface PinnedRepo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  languageColor: string | null;
}

interface ContributionDay {
  contributionCount: number;
  date: string;
  weekday: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubData {
  followers: number;
  following: number;
  repositories: number;
  totalContributions: number;
  contributionCalendar: {
    totalContributions: number;
    weeks: ContributionWeek[];
  };
  pinnedRepos: PinnedRepo[];
}

interface GithubStatsProps {
  githubUrl?: string;
}

// GitHub's 5 green levels
function getContributionColor(count: number, isDark: boolean): string {
  if (count === 0) {
    return isDark ? "#1e293b" : "#ebedf0";
  }
  if (count <= 3) return "#0e4429";
  if (count <= 6) return "#006d32";
  if (count <= 9) return "#26a641";
  return "#39d353";
}

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAY_LABELS = ["Mon", "", "Wed", "", "Fri", "", ""];

// Compute month label positions from the weeks data
function getMonthLabels(weeks: ContributionWeek[]) {
  const labels: { x: number; label: string }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, weekIndex) => {
    // Find the first day of the week that has a date
    const firstDay = week.contributionDays.find(d => d.date);
    if (!firstDay) return;

    const month = parseInt(firstDay.date.substring(5, 7), 10) - 1; // 0-indexed
    if (month !== lastMonth) {
      labels.push({ x: weekIndex, label: MONTH_LABELS[month] });
      lastMonth = month;
    }
  });

  return labels;
}

export default function GithubStats({ githubUrl }: GithubStatsProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!githubUrl) return null;

  const urlParts = githubUrl.replace(/\/$/, "").split("/");
  const username = urlParts[urlParts.length - 1];

  if (!username) return null;

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/github/${username}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          throw new Error(errData?.error || `HTTP ${res.status}`);
        }
        const json = await res.json();
        if (!cancelled) {
          setData(json);
        }
      } catch (e: any) {
        if (!cancelled) {
          setError(e.message || "Failed to load GitHub data");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [username]);

  // Compute derived stats from contribution calendar
  const currentYear = new Date().getFullYear();
  const weeks = data?.contributionCalendar?.weeks ?? [];

  // Flatten all days
  const allDays = weeks.flatMap((w) => w.contributionDays);

  // This week contributions (last 7 days with data)
  const todayStr = new Date().toISOString().substring(0, 10);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const sevenDaysAgoStr = sevenDaysAgo.toISOString().substring(0, 10);

  const thisWeekContributions = allDays
    .filter((d) => d.date >= sevenDaysAgoStr && d.date <= todayStr)
    .reduce((sum, d) => sum + d.contributionCount, 0);

  // Best day
  const bestDay = allDays.reduce(
    (max, d) => (d.contributionCount > max.count ? { count: d.contributionCount, date: d.date } : max),
    { count: 0, date: "" }
  );

  // Daily average (total contributions / number of days with data)
  const totalDays = allDays.length || 1;
  const dailyAvg = (allDays.reduce((sum, d) => sum + d.contributionCount, 0) / totalDays);

  // Shared card class
  const statCardClass = `relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 flex flex-col p-4 text-center hover:shadow-md transition-shadow`;

  // Loading / error / empty states inside the section shell
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <RiGithubFill className="size-10 text-zinc-400 dark:text-zinc-600 animate-pulse" />
            <p className="text-muted-foreground text-sm">Loading GitHub data...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3 text-center">
            <RiGithubFill className="size-10 text-red-400/60" />
            <p className="text-muted-foreground text-sm">{error}</p>
            <p className="text-xs text-zinc-500">
              Make sure a GitHub token is configured in admin settings.
            </p>
          </div>
        </div>
      );
    }

    if (!data) return null;

    // SVG heatmap dimensions
    const CELL_SIZE = 12;
    const CELL_GAP = 3;
    const CELL_WITH_GAP = CELL_SIZE + CELL_GAP;
    const totalWeeks = weeks.length;

    // days: 0 = Sunday ... 6 = Saturday. We want Mon-Sun.
    // GitHub's API returns weekday as 0=Sunday...6=Saturday
    // We'll render rows for each day of the week (Sun=0 through Sat=6)
    const monthLabels = getMonthLabels(weeks);

    // Build a lookup: date -> contributionCount
    const contributionMap: Record<string, number> = {};
    allDays.forEach((d) => {
      if (d.date) contributionMap[d.date] = d.contributionCount;
    });

    // Build a grid: for each week index and each day index (0=Sun...6=Sat), render a cell
    // We need to figure out the offset so the first column starts at the right day of the week
    const firstDayDate = weeks[0]?.contributionDays[0]?.date;
    const firstDayOffset = firstDayDate ? new Date(firstDayDate + "T00:00:00").getDay() : 0;
    // firstDayOffset is the day of the first day in the calendar (0=Sun)

    // height: 7 rows for day labels + 7 rows of cells with gap
    const svgHeight = 7 * CELL_WITH_GAP + 20 + 10; // cells + month labels + padding
    const svgWidth = totalWeeks * CELL_WITH_GAP + 40; // + left margin for day labels

    return (
      <div className="space-y-4">
        {/* === Primary Stats Row === */}
        <div className="grid grid-cols-3 gap-3">
          <AnimateIn variant="blur-fade" delay={0.05}>
            <div className={statCardClass}>
              <span className="text-xs text-muted-foreground">Followers</span>
              <span className="text-2xl font-bold text-amber-500">{data.followers.toLocaleString()}</span>
            </div>
          </AnimateIn>
          <AnimateIn variant="blur-fade" delay={0.1}>
            <div className={statCardClass}>
              <span className="text-xs text-muted-foreground">Following</span>
              <span className="text-2xl font-bold text-amber-500">{data.following.toLocaleString()}</span>
            </div>
          </AnimateIn>
          <AnimateIn variant="blur-fade" delay={0.15}>
            <div className={statCardClass}>
              <span className="text-xs text-muted-foreground">Repositories</span>
              <span className="text-2xl font-bold text-amber-500">{data.repositories.toLocaleString()}</span>
            </div>
          </AnimateIn>
        </div>

        {/* === Secondary Stats Row === */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <AnimateIn variant="blur-fade" delay={0.2}>
            <div className={statCardClass}>
              <span className="text-xs text-muted-foreground">Contributions</span>
              <span className="text-xl font-bold text-amber-500">{data.totalContributions.toLocaleString()}</span>
            </div>
          </AnimateIn>
          <AnimateIn variant="blur-fade" delay={0.25}>
            <div className={statCardClass}>
              <span className="text-xs text-muted-foreground">This Week</span>
              <span className="text-xl font-bold text-amber-500">{thisWeekContributions.toLocaleString()}</span>
            </div>
          </AnimateIn>
          <AnimateIn variant="blur-fade" delay={0.3}>
            <div className={statCardClass}>
              <span className="text-xs text-muted-foreground">Best Day</span>
              <span className="text-xl font-bold text-amber-500">
                {bestDay.count.toLocaleString()}
              </span>
            </div>
          </AnimateIn>
          <AnimateIn variant="blur-fade" delay={0.35}>
            <div className={statCardClass}>
              <span className="text-xs text-muted-foreground">Daily Avg</span>
              <span className="text-xl font-bold text-amber-500">
                {dailyAvg.toFixed(1)}
                <span className="text-xs text-muted-foreground ml-0.5">/ day</span>
              </span>
            </div>
          </AnimateIn>
        </div>

        {/* === Custom SVG Contribution Heatmap === */}
        <AnimateIn variant="blur-fade" delay={0.4}>
          <div className="w-full p-6 md:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <h3 className="font-semibold text-sm mb-4 text-muted-foreground">
              {allDays.length} contributions in the last year
            </h3>
            <div className="overflow-x-auto">
              <svg
                width={svgWidth}
                height={svgHeight}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="min-w-full"
              >
                {/* Month labels */}
                {monthLabels.map((m, i) => (
                  <text
                    key={i}
                    x={40 + m.x * CELL_WITH_GAP}
                    y={10}
                    className="text-[10px] fill-zinc-500 dark:fill-zinc-500"
                    style={{ fontFamily: "inherit" }}
                  >
                    {m.label}
                  </text>
                ))}

                {/* Day labels on the left */}
                {DAY_LABELS.map((label, i) => (
                  <text
                    key={i}
                    x={32}
                    y={20 + i * CELL_WITH_GAP + CELL_SIZE / 2}
                    textAnchor="end"
                    dominantBaseline="central"
                    className="text-[9px] fill-zinc-400 dark:fill-zinc-600"
                    style={{ fontFamily: "inherit" }}
                  >
                    {label}
                  </text>
                ))}

                {/* Cells: iterate weeks, then days */}
                {weeks.map((week, weekIdx) =>
                  week.contributionDays.map((day, dayIdx) => {
                    const x = 40 + weekIdx * CELL_WITH_GAP;
                    const y = 16 + day.weekday * CELL_WITH_GAP; // weekday: 0=Sun, 6=Sat
                    const color = getContributionColor(day.contributionCount, isDark);

                    return (
                      <rect
                        key={`${weekIdx}-${dayIdx}`}
                        x={x}
                        y={y}
                        width={CELL_SIZE}
                        height={CELL_SIZE}
                        rx={2}
                        fill={color}
                      >
                        <title>{`${day.contributionCount} contributions on ${day.date}`}</title>
                      </rect>
                    );
                  })
                )}

                {/* Legend */}
                <g transform={`translate(40, ${svgHeight - 2})`}>
                  <text
                    x={0}
                    y={0}
                    className="text-[9px] fill-zinc-400 dark:fill-zinc-600"
                    dominantBaseline="central"
                    style={{ fontFamily: "inherit" }}
                  >
                    Less
                  </text>
                  {[0, 1, 4, 7, 10].map((level, i) => (
                    <rect
                      key={i}
                      x={30 + i * (CELL_SIZE + 3)}
                      y={-CELL_SIZE / 2}
                      width={CELL_SIZE}
                      height={CELL_SIZE}
                      rx={2}
                      fill={getContributionColor(level, isDark)}
                    />
                  ))}
                  <text
                    x={30 + 5 * CELL_SIZE + 15}
                    y={0}
                    className="text-[9px] fill-zinc-400 dark:fill-zinc-600"
                    dominantBaseline="central"
                    style={{ fontFamily: "inherit" }}
                  >
                    More
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </AnimateIn>

        {/* === Pinned Repositories === */}
        {data.pinnedRepos && data.pinnedRepos.length > 0 && (
          <AnimateIn variant="blur-fade" delay={0.45}>
            <div className="w-full p-6 md:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h3 className="font-semibold text-sm mb-4 text-muted-foreground">
                Pinned Repositories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.pinnedRepos.map((repo, i) => (
                  <a
                    key={i}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <RiGithubFill className="size-4 text-zinc-600 dark:text-zinc-400 shrink-0" />
                      <span className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                        {repo.name}
                      </span>
                      <RiArrowRightUpLine className="size-3 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                    {repo.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-auto text-xs text-muted-foreground">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span
                            className="size-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: repo.languageColor || "#6b7280" }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <RiStarFill className="size-3 text-amber-500" />
                        {repo.stars}
                      </span>
                      {repo.forks > 0 && (
                        <span className="flex items-center gap-1">
                          <RiGitForkFill className="size-3" />
                          {repo.forks}
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </AnimateIn>
        )}
      </div>
    );
  };

  return (
    <section className="relative bg-transparent border-t border-b border-zinc-200 dark:border-zinc-800 overflow-hidden z-10" id="code-metrics">
      {/* Background Decorations */}
      <div className="absolute top-10 right-10 text-8xl md:text-9xl font-black text-zinc-500/5 dark:text-zinc-400/5 pointer-events-none select-none -z-10">
        METRICS
      </div>
      <div className="absolute top-0 left-0 -translate-y-12 -translate-x-1/3 opacity-5 pointer-events-none">
        <RiGithubFill className="size-96" />
      </div>

      <div className="max-w-5xl mx-auto border-x px-6 py-24 bg-background/80 backdrop-blur-sm relative z-10">
        <AnimateIn variant="blur-fade">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <RiGithubFill className="size-3 inline mr-1" />
              GitHub Activity
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              Code <span className="text-primary">Metrics</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A real-time overview of my open-source contributions, repositories, and coding activity over the past year.
            </p>
          </div>
        </AnimateIn>

        {renderContent()}
      </div>
    </section>
  );
}
