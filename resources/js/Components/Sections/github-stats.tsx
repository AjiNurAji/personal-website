"use client";

import {
  RiGithubFill,
  RiStarFill,
  RiGitForkFill,
  RiArrowRightUpLine,
} from "@remixicon/react";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

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

function getContributionColorDark(count: number): string {
  if (count === 0) return "#27272a";
  if (count <= 3) return "#0e4429";
  if (count <= 6) return "#006d32";
  if (count <= 9) return "#26a641";
  return "#39d353";
}

function getContributionColorLight(count: number): string {
  if (count === 0) return "#ebedf0";
  if (count <= 3) return "#9be9a8";
  if (count <= 6) return "#40c463";
  if (count <= 9) return "#30a14e";
  return "#216e39";
}

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function getMonthLabels(weeks: ContributionWeek[]) {
  const labels: { x: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, weekIndex) => {
    const firstDay = week.contributionDays.find(d => d.date);
    if (!firstDay) return;
    const month = parseInt(firstDay.date.substring(5, 7), 10) - 1;
    if (month !== lastMonth) {
      labels.push({ x: weekIndex, label: MONTH_LABELS[month] });
      lastMonth = month;
    }
  });
  return labels;
}

export default function GithubStats({ githubUrl }: GithubStatsProps) {
  const { theme } = useTheme();
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!githubUrl) return null;
  const username = githubUrl.replace(/\/$/, "").split("/").pop();
  if (!username) return null;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`/api/github/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [username]);

  const weeks = data?.contributionCalendar?.weeks ?? [];
  const allDays = weeks.flatMap((w) => w.contributionDays);

  const todayStr = new Date().toISOString().substring(0, 10);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const sevenDaysAgoStr = sevenDaysAgo.toISOString().substring(0, 10);

  const thisWeekContributions = allDays
    .filter((d) => d.date >= sevenDaysAgoStr && d.date <= todayStr)
    .reduce((sum, d) => sum + d.contributionCount, 0);

  const bestDay = allDays.reduce(
    (max, d) => (d.contributionCount > max.count ? { count: d.contributionCount, date: d.date } : max),
    { count: 0, date: "" }
  );

  const totalDays = allDays.length || 1;
  const dailyAvg = allDays.reduce((sum, d) => sum + d.contributionCount, 0) / totalDays;

  return (
    <section id="github" className="mb-16 scroll-mt-16 md:mb-24 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-0 lg:px-0 lg:py-0 lg:bg-transparent lg:backdrop-blur-none lg:mb-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">06 . code metrics</span>
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
          GitHub Stats
        </h2>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 py-12 text-muted-foreground/60">
          <RiGithubFill className="size-5 animate-pulse" />
          <span className="text-sm">Loading GitHub data...</span>
        </div>
      ) : error ? (
        <div className="py-12 text-sm text-muted-foreground/60">
          <p>{error}</p>
          <p className="mt-1 text-xs text-muted-foreground/40">
            Configure a GitHub token in admin settings to display stats.
          </p>
        </div>
      ) : data ? (
        <div className="space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard label="Followers" value={data.followers.toLocaleString()} />
            <StatCard label="Following" value={data.following.toLocaleString()} />
            <StatCard label="Repos" value={data.repositories.toLocaleString()} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard label="Contributions" value={data.totalContributions.toLocaleString()} />
            <StatCard label="This Week" value={thisWeekContributions.toLocaleString()} />
            <StatCard label="Best Day" value={bestDay.count.toLocaleString()} />
            <StatCard label="Avg/Day" value={dailyAvg.toFixed(1)} />
          </div>

          {/* Contribution heatmap */}
          {weeks.length > 0 && (
            <div className="overflow-x-auto">
              <ContributionHeatmap weeks={weeks} theme={theme} />
            </div>
          )}

          {/* Pinned repos */}
          {data.pinnedRepos?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Pinned Repositories
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.pinnedRepos.map((repo, i) => (
                  <a
                    key={i}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col p-4 rounded-lg border border-border hover:border-ring/30 transition-colors bg-card"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <RiGithubFill className="size-4 text-muted-foreground shrink-0" />
                      <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
                        {repo.name}
                      </span>
                      <RiArrowRightUpLine className="size-3 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                    {repo.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-auto text-xs text-muted-foreground">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
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
          )}
        </div>
      ) : null}
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3 text-center">
      <span className="block text-xs text-muted-foreground">{label}</span>
      <span className="text-xl font-bold text-foreground">{value}</span>
    </div>
  );
}

function ContributionHeatmap({ weeks, theme }: { weeks: ContributionWeek[]; theme: "light" | "dark" }) {
  const CELL_SIZE = 12;
  const CELL_GAP = 3;
  const CELL_STEP = CELL_SIZE + CELL_GAP;
  const months = getMonthLabels(weeks);

  const svgW = 36 + weeks.length * CELL_STEP + 12;
  const svgH = 24 + 7 * CELL_STEP + 24;

  const getColor = theme === "dark" ? getContributionColorDark : getContributionColorLight;
  const labelFill = theme === "dark" ? "#71717a" : "#76797f";
  const dayFill = theme === "dark" ? "#52525b" : "#76797f";
  const legendFill = theme === "dark" ? "#52525b" : "#76797f";

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="w-full"
        style={{ maxWidth: svgW }}
        role="img"
        aria-label="GitHub contribution heatmap"
      >
        {months.map((m, i) => (
          <text
            key={i}
            x={36 + m.x * CELL_STEP}
            y={14}
            fontSize={10}
            fill={labelFill}
            fontFamily="system-ui, sans-serif"
          >
            {m.label}
          </text>
        ))}
        {DAY_LABELS.map((label, i) =>
          label ? (
            <text
              key={i}
              x={30}
              y={24 + i * CELL_STEP + CELL_SIZE / 2}
              textAnchor="end"
              dominantBaseline="central"
              fontSize={9}
              fill={dayFill}
              fontFamily="system-ui, sans-serif"
            >
              {label}
            </text>
          ) : null
        )}
        {weeks.map((week, wi) =>
          week.contributionDays.map((day, di) => (
            <rect
              key={`${wi}-${di}`}
              x={36 + wi * CELL_STEP}
              y={20 + day.weekday * CELL_STEP}
              width={CELL_SIZE}
              height={CELL_SIZE}
              rx={2}
              fill={getColor(day.contributionCount)}
            >
              <title>{`${day.contributionCount} contributions on ${day.date}`}</title>
            </rect>
          ))
        )}
        <g transform={`translate(36, ${24 + 7 * CELL_STEP + 6})`}>
          <text fontSize={9} fill={legendFill} fontFamily="system-ui, sans-serif" dominantBaseline="central">
            Less
          </text>
          {[0, 1, 4, 7, 10].map((level, i) => (
            <rect
              key={i}
              x={28 + i * (CELL_SIZE + 3)}
              y={-CELL_SIZE / 2}
              width={CELL_SIZE}
              height={CELL_SIZE}
              rx={2}
              fill={getColor(level)}
            />
          ))}
          <text
            x={28 + 5 * CELL_SIZE + 15}
            y={0}
            fontSize={9}
            fill={legendFill}
            fontFamily="system-ui, sans-serif"
            dominantBaseline="central"
          >
            More
          </text>
        </g>
      </svg>
    </div>
  );
}
