"use client";

import { useEffect, useMemo, useState } from "react";
import { SafeImage } from "@/Components/Elements/SafeImage";
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

function detectChartKind(raw: any, jsonData: DailyData[] | null): ChartKind | null {
    if (raw && raw.days && Array.isArray(raw.days)) return "heatmap";
    if (!jsonData || !jsonData.length) return null;
    return /^\d{4}-\d{2}-\d{2}/.test(jsonData[0].date) ? "time-series" : "category";
}

function ShareContent({ username, share, format }: { username: string; share: WakaTimeShare; format: string }) {
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
                if (raw.days && Array.isArray(raw.days)) {
                    const activity = parseActivityTable(raw);
                    setActivityDays(activity.days);
                    setChartKind("heatmap");
                    setJsonData(null);
                    return;
                }
                let normalized: DailyData[] | null = null;
                if (Array.isArray(raw)) normalized = normalizeWakaData(raw);
                else if (raw.data && Array.isArray(raw.data)) normalized = normalizeWakaData(raw.data);
                else throw new Error("Unexpected response format");
                setJsonData(normalized);
                setChartKind(detectChartKind(raw, normalized));
                setActivityDays(null);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [format, share.url, username]);

    const isSvg = format === "svg";
    const separator = share.url.includes("?") ? "&" : "?";
    const chartUrl = isSvg ? `${share.url}${separator}theme=${theme === "dark" ? "dark" : "light"}` : share.url;

    return (
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm transition-all hover:border-border/80">
            <h3 className="text-sm font-semibold text-foreground mb-4 pb-3 border-b border-border">
                {share.label}
            </h3>
            <div className="min-h-[140px] w-full flex flex-col items-center justify-center">
                {format === "json" ? (
                    loading ? (
                        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground/60 py-6">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                            <span>Loading stats...</span>
                        </div>
                    ) : error ? (
                        <span className="text-sm text-destructive/70">{error}</span>
                    ) : chartKind === "heatmap" && activityDays ? (
                        <WakaTimeChart data={activityDays} label={share.label} kind="heatmap" />
                    ) : jsonData && jsonData.length > 0 && chartKind ? (
                        <WakaTimeChart data={jsonData} label={share.label} kind={chartKind} />
                    ) : (
                        <span className="text-sm text-muted-foreground/60">No data available</span>
                    )
                ) : isSvg ? (
                    <img src={chartUrl} alt={`WakaTime ${share.label}`} className="w-full h-auto rounded" loading="lazy" />
                ) : (
                    <SafeImage src={chartUrl} alt={`WakaTime ${share.label}`} className="w-full h-auto rounded" loading="lazy" />
                )}
            </div>
        </div>
    );
}

export default function WakaTimeStats({ wakatimeUsername, wakatimeShareIds }: WakaTimeStatsProps) {
    if (!wakatimeUsername) return null;
    const shares: WakaTimeShare[] = wakatimeShareIds?.length ? wakatimeShareIds : [];

    const classified = useMemo(() => {
        return shares.map((share) => {
            const url = share.url.toLowerCase();
            let format: string;
            if (url.endsWith(".json")) format = "json";
            else if (url.endsWith(".svg")) format = "svg";
            else if (url.endsWith(".png")) format = "png";
            else format = url.includes("/share/") ? "svg" : "unknown";
            return { share, format };
        });
    }, [shares]);

    return (
        <section id="wakatime" className="mb-16 scroll-mt-16 md:mb-24 lg:scroll-mt-24">
            <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-0 lg:px-0 lg:py-0 lg:bg-transparent lg:backdrop-blur-none lg:mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">07 . coding activity</span>
                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
                    WakaTime Stats
                </h2>
            </div>

            {classified.length > 0 ? (
                <div className="space-y-6">
                    {classified.map(({ share, format }) => (
                        <ShareContent key={share.url} username={wakatimeUsername} share={share} format={format} />
                    ))}
                </div>
            ) : (
                <div className="rounded-lg border border-border bg-card p-8 text-center">
                    <p className="text-sm text-muted-foreground/60">
                        Configure WakaTime chart embeds in{" "}
                        <a href="/admin/settings" className="underline text-primary hover:text-primary/80">
                            Admin Settings
                        </a>{" "}
                        to display coding stats.
                    </p>
                </div>
            )}

            <div className="mt-6 text-center">
                <a
                    href={`https://wakatime.com/@${wakatimeUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors underline underline-offset-2"
                >
                    View full profile on WakaTime →
                </a>
            </div>
        </section>
    );
}
