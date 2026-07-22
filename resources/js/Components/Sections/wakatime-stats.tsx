"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { Badge } from "@/Components/UI/badge";
import { SafeImage } from "@/Components/Elements/SafeImage";
import { RiTimeLine } from "@remixicon/react";
import { useTheme } from "@/hooks/use-theme";
import WakaTimeChart, { ActivityDay, ChartKind, DailyData, normalizeWakaData, parseActivityTable } from "./wakatime-chart";

interface WakaTimeShare {
    label: string;
    url: string;
}

interface WakaTimeStatsProps {
    wakatimeUsername?: string;
    wakatimeShareIds?: WakaTimeShare[];
}

function extractShareId(url: string): string | null {
    const match = url.match(/wakatime\.com\/share\/(?:@[\w-]+\/)?(\w{8}-[\w-]+)/);
    return match ? match[1] : null;
}

/** Auto-detect chart kind from normalized data */
function detectChartKind(raw: any, jsonData: DailyData[] | null): ChartKind | null {
    // Activity table: raw is { days: [...], range: "..." }
    if (raw && raw.days && Array.isArray(raw.days)) return "heatmap";
    if (!jsonData || !jsonData.length) return null;
    const isoDateRe = /^\d{4}-\d{2}-\d{2}/;
    return isoDateRe.test(jsonData[0].date) ? "time-series" : "category";
}

function StatCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-0.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 px-4 py-3">
            <span className="text-xs font-medium text-muted-foreground">{label}</span>
            <span className="text-sm font-semibold">{value}</span>
        </div>
    );
}

function WakaStatsSummary({ days }: { days: ActivityDay[] }) {
    const stats = useMemo(() => {
        if (!days.length) return null;
        const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
        const startDate = new Date(sorted[0].date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
        const endDate = new Date(sorted[sorted.length - 1].date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

        const active = sorted.filter((d) => d.total > 0);
        const totalSecs = active.reduce((s, d) => s + d.total, 0);
        const avgSecs = active.length > 0 ? totalSecs / active.length : 0;
        const best = active.reduce((max, d) => (d.total > max.total ? d : max), { date: "", total: 0 });
        const bestDate = best.date ? new Date(best.date).toLocaleDateString("en-US", { month: "long", day: "numeric" }) : "";

        const fmt = (s: number) => {
            const h = Math.floor(s / 3600);
            const m = Math.floor((s % 3600) / 60);
            return h > 0 ? `${h}h ${m}m` : `${m}m`;
        };

        return {
            startDate,
            endDate,
            avgDaily: active.length > 0 ? fmt(avgSecs) : "0m",
            totalThisWeek: fmt(totalSecs),
            bestDay: best.total > 0 ? `${bestDate} (${fmt(best.total)})` : "—",
            activeDays: active.length,
        };
    }, [days]);

    if (!stats) return null;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            <StatCard label="Start Date" value={stats.startDate} />
            <StatCard label="End Date" value={stats.endDate} />
            <StatCard label="Avg Daily" value={stats.avgDaily} />
            <StatCard label="Total" value={stats.totalThisWeek} />
            <StatCard label="Best Day" value={stats.bestDay} />
            <StatCard label="Active Days" value={`${stats.activeDays}`} />
        </div>
    );
}

function ShareContent({
    username,
    share,
    format,
}: {
    username: string;
    share: WakaTimeShare;
    format: string;
}) {
    const { theme } = useTheme();
    const [jsonData, setJsonData] = useState<DailyData[] | null>(null);
    const [activityDays, setActivityDays] = useState<ActivityDay[] | null>(null);
    const [chartKind, setChartKind] = useState<ChartKind | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (format !== "json") return;

        const shareId = extractShareId(share.url);
        if (!shareId) {
            setError("Invalid share URL");
            return;
        }

        setLoading(true);
        setError(null);

        fetch(`/api/wakatime/${username}/${shareId}`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((raw: any) => {
                // Activity table format: { days: [...], range: "..." }
                if (raw.days && Array.isArray(raw.days)) {
                    const activity = parseActivityTable(raw);
                    setActivityDays(activity.days);
                    setChartKind("heatmap");
                    setJsonData(null);
                    return;
                }

                // Normal array format (Coding Activity or Languages/Editors)
                let normalized: DailyData[] | null = null;
                if (Array.isArray(raw)) {
                    normalized = normalizeWakaData(raw);
                } else if (raw.data && Array.isArray(raw.data)) {
                    normalized = normalizeWakaData(raw.data);
                } else {
                    throw new Error("Unexpected response format");
                }

                setJsonData(normalized);
                setChartKind(detectChartKind(raw, normalized));
                setActivityDays(null);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [format, share.url, username]);

    const isSvg = format === "svg";
    const separator = share.url.includes("?") ? "&" : "?";
    const chartUrl = isSvg ? `${share.url}${separator}theme=${theme === "dark" ? "dark" : "light"}` : share.url;

    return (
        <AnimateIn variant="blur-fade" delay={0.1}>
            <div className="w-full p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden group h-full flex flex-col">
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none translate-y-1/2 translate-x-1/2"></div>
                <h3 className="font-semibold text-lg mb-4 relative z-10 border-b pb-3 border-zinc-200 dark:border-zinc-800">
                    {share.label}
                </h3>
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-[160px]">
                    {format === "json" ? (
                        loading ? (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <div className="size-4 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                                Loading data...
                            </div>
                        ) : error ? (
                            <p className="text-sm text-red-500">{error}</p>
                        ) : chartKind === "heatmap" && activityDays ? (
                            <>
                                <WakaStatsSummary days={activityDays} />
                                <div className="mt-4 w-full">
                                    <WakaTimeChart data={activityDays} label={share.label} kind="heatmap" />
                                </div>
                            </>
                        ) : jsonData && jsonData.length > 0 && chartKind ? (
                            <WakaTimeChart data={jsonData} label={share.label} kind={chartKind} />
                        ) : (
                            <p className="text-sm text-muted-foreground">No data available</p>
                        )
                    ) : isSvg ? (
                        <img
                            src={chartUrl}
                            alt={`WakaTime ${share.label}`}
                            className="w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                            loading="lazy"
                        />
                    ) : (
                        <SafeImage
                            src={chartUrl}
                            alt={`WakaTime ${share.label}`}
                            className="w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                            loading="lazy"
                        />
                    )}
                </div>
            </div>
        </AnimateIn>
    );
}

export default function WakaTimeStats({ wakatimeUsername, wakatimeShareIds }: WakaTimeStatsProps) {
    if (!wakatimeUsername) return null;

    const shares: WakaTimeShare[] = wakatimeShareIds && wakatimeShareIds.length > 0 ? wakatimeShareIds : [];

    const classified = useMemo(() => {
        return shares.map((share) => {
            const url = share.url.toLowerCase();
            let format: string;
            if (url.endsWith(".json")) {
                format = "json";
            } else if (url.endsWith(".svg")) {
                format = "svg";
            } else if (url.endsWith(".png")) {
                format = "png";
            } else {
                format = url.includes("/share/") ? "svg" : "unknown";
            }
            return { share, format };
        });
    }, [shares]);

    return (
        <section
            id="wakatime"
            className="relative z-10 bg-transparent border-t border-b border-zinc-200 dark:border-zinc-800 overflow-hidden px-4 sm:px-0"
        >
            <div className="absolute top-10 left-10 text-8xl md:text-9xl font-black text-zinc-500/5 dark:text-zinc-400/5 pointer-events-none select-none -z-10">
                CODE
            </div>
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-5 pointer-events-none">
                <RiTimeLine className="size-96" />
            </div>

            <div className="max-w-5xl mx-auto border-x px-6 py-24 bg-background/80 backdrop-blur-sm relative z-10">
                <AnimateIn variant="blur-fade">
                    <div className="text-center mb-16">
                        <Badge variant="secondary" className="mb-4">
                            <RiTimeLine className="size-3 inline mr-1" />
                            Coding Activity
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
                            Waka<span className="text-primary">Time</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Real-time coding metrics tracked by WakaTime — languages, editors, and time spent coding.
                        </p>
                    </div>
                </AnimateIn>

                {classified.length > 0 ? (
                    <div
                        className={`grid gap-6 ${
                            classified.length === 1
                                ? "grid-cols-1"
                                : "grid-cols-1 md:grid-cols-2"
                        }`}
                    >
                        {classified.map(({ share, format }) => (
                            <ShareContent
                                key={share.url}
                                username={wakatimeUsername}
                                share={share}
                                format={format}
                            />
                        ))}
                    </div>
                ) : (
                    <AnimateIn variant="blur-fade" delay={0.1}>
                        <div className="w-full p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border shadow-sm text-center">
                            <p className="text-muted-foreground">
                                Configure WakaTime chart embeds in{" "}
                                <a href="/admin/settings" className="underline text-primary">
                                    Admin Settings
                                </a>{" "}
                                to display coding stats.
                            </p>
                        </div>
                    </AnimateIn>
                )}

                <div className="relative z-10 text-center mt-8">
                    <a
                        href={`https://wakatime.com/@${wakatimeUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-2"
                    >
                        View full profile on WakaTime →
                    </a>
                </div>
            </div>
        </section>
    );
}
