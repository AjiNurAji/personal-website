import ClientLayout from "@/Layouts/ClientLayout";
import { Head } from "@inertiajs/react";
import { useTranslation } from "@/lib/i18n";
import { useEffect, useMemo, useState } from "react";
import WakaTimeChart from "@/Components/Sections/wakatime-chart";
import { RiGithubFill, RiBarChartBoxLine, RiTimeLine } from "@remixicon/react";

interface Props {
    settings: Record<string, any>;
}

type ChartKind = "time-series" | "category" | "heatmap";

interface ShareItem {
    label: string;
    url: string;
}

function extractShareId(url: string) {
    if (!url) return null;
    const match = url.match(/\/share\/(?:embed\/)?@[^/]+\/([^/?#]+)/i);
    return match ? match[1] : null;
}

function extractUsernameFromUrl(url: string) {
    if (!url) return null;
    const match = url.match(/github\.com\/([^/]+)/i);
    return match ? match[1] : null;
}

function formatDuration(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function getContributionDays(data: any) {
    return data?.contributionCalendar?.weeks?.flatMap((week: any) => week.contributionDays || []) || [];
}

function getWakaDays(data: any) {
    if (!Array.isArray(data)) return [];
    return data
        .map((item: any) => ({
            date: item.date || item.name || "",
            seconds: Number(item.grand_total?.total_seconds ?? item.total_seconds ?? 0),
        }))
        .filter((item: any) => item.date);
}

function formatWakaMetric(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
}

export default function Stats({ settings }: Props) {
    const { t } = useTranslation();
    const [wakaData, setWakaData] = useState<any>(null);
    const [wakaError, setWakaError] = useState<string | null>(null);
    const [wakaKind, setWakaKind] = useState<ChartKind>("time-series");
    const [activeWakaIndex, setActiveWakaIndex] = useState(0);
    const [githubData, setGithubData] = useState<any>(null);
    const [githubError, setGithubError] = useState<string | null>(null);
    const [wakaApiData, setWakaApiData] = useState<any>(null);
    const [wakaApiError, setWakaApiError] = useState<string | null>(null);

    const wakatimeUsername = String(settings.wakatime_username || "").trim() || null;
    const wakatimeShares: ShareItem[] = useMemo(() => {
        const raw = settings.wakatime_share_ids;
        if (Array.isArray(raw)) {
            return raw
                .map((item) => ({
                    label: String(item.label || item.url || ""),
                    url: String(item.url || ""),
                }))
                .filter((item) => item.url);
        }
        if (typeof raw === "string") {
            try {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    return parsed
                        .map((item) => ({
                            label: String(item.label || item.url || ""),
                            url: String(item.url || ""),
                        }))
                        .filter((item) => item.url);
                }
            } catch {
                // ignore invalid JSON
            }
        }
        return [];
    }, [settings.wakatime_share_ids]);

    const githubUsername = extractUsernameFromUrl(String(settings.github_url || ""));
    const activeWakaShare = wakatimeShares[activeWakaIndex] || wakatimeShares[0] || null;
    const activeShareId = activeWakaShare ? extractShareId(activeWakaShare.url) : null;

    useEffect(() => {
        let cancelled = false;

        async function fetchGithub() {
            if (!githubUsername) {
                setGithubError(null);
                setGithubData(null);
                return;
            }

            setGithubError(null);
            try {
                const res = await fetch(`/api/github/${encodeURIComponent(githubUsername)}`);
                const json = await res.json();
                if (!res.ok || json.error) {
                    throw new Error(json.error || "GitHub request failed");
                }
                if (!cancelled) setGithubData(json);
            } catch (err) {
                if (!cancelled) setGithubError(err instanceof Error ? err.message : "GitHub request failed");
            }
        }

        async function fetchWaka() {
            if (!wakatimeUsername || !activeShareId) {
                setWakaError(null);
                setWakaData(null);
                return;
            }

            setWakaError(null);
            try {
                const res = await fetch(`/api/wakatime/${encodeURIComponent(wakatimeUsername)}/${encodeURIComponent(activeShareId)}`);
                const json = await res.json();
                if (!res.ok || json.error) {
                    throw new Error(json.error || "WakaTime request failed");
                }
                if (!cancelled) setWakaData(json);
            } catch (err) {
                if (!cancelled) setWakaError(err instanceof Error ? err.message : "WakaTime request failed");
            }
        }

        async function fetchWakaApi() {
            try {
                const res = await fetch('/api/wakatime/stats');
                const json = await res.json();
                if (!res.ok || json.error) throw new Error(json.error || 'WakaTime API request failed');
                if (!cancelled) setWakaApiData(json);
            } catch (err) {
                if (!cancelled) setWakaApiError(err instanceof Error ? err.message : 'WakaTime API request failed');
            }
        }

        fetchGithub();
        fetchWaka();
        fetchWakaApi();

        return () => {
            cancelled = true;
        };
    }, [githubUsername, wakatimeUsername, activeShareId]);

    const githubCards = useMemo(() => {
        if (!githubData) return [];
        return [
            { title: "Repositories", value: githubData.repositories ?? 0 },
            { title: "Followers", value: githubData.followers ?? 0 },
            { title: "Following", value: githubData.following ?? 0 },
            { title: "Contributions", value: githubData.totalContributions ?? "—" },
        ];
    }, [githubData]);
    const contributionDays = getContributionDays(githubData);
    const wakaDays = getWakaDays(wakaData);
    const wakaTotalSeconds = wakaDays.reduce((total: number, day: any) => total + day.seconds, 0);
    const wakaLanguages = Array.isArray(wakaApiData?.languages) ? wakaApiData.languages.slice(0, 6) : [];

    return (
        <ClientLayout active="Stats" settings={settings} title="Stats" description="Developer activity and account summaries">
            <Head title={t("Stats") + " — Aji Nur Aji"} />

            <div className="w-full max-w-none space-y-10">
                <div className="grid gap-6">
                    <div className="flex items-center gap-2 text-primary">
                        <RiBarChartBoxLine className="size-5" />
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">{t("Developer Stats")}</h2>
                    </div>

                    {githubError && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
                            {t("GitHub data unavailable")}: {githubError}
                        </div>
                    )}

                    {wakaError && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
                            {t("WakaTime data unavailable")}: {wakaError}
                        </div>
                    )}

                    {githubData === null && !githubError && (
                        <p className="text-sm text-muted-foreground">{t("Loading GitHub stats…")}</p>
                    )}

                    {githubCards.length > 0 && (
                        <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-muted/70"><RiGithubFill className="size-5" /></div>
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground">{t("GitHub Activity")}</h3>
                                        <p className="text-xs text-muted-foreground">@{githubUsername}</p>
                                    </div>
                                </div>
                                <a href={String(settings.github_url || "#")} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary hover:underline">View profile</a>
                            </div>
                            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {githubCards.map((item) => <div key={item.title} className="rounded-xl border border-border/60 bg-background p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t(item.title)}</p><p className="mt-1 text-xl font-extrabold text-foreground">{item.value}</p></div>)}
                            </div>
                            {contributionDays.length > 0 && (
                                <div className="mt-6 overflow-x-auto rounded-xl border border-border/60 bg-background p-4">
                                    <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground"><span>{githubData.totalContributions ?? 0} contributions</span><span>Less&nbsp;&nbsp; <span className="text-emerald-500">■ ■ ■ ■ ■</span> &nbsp;&nbsp;More</span></div>
                                    <div className="grid min-w-[560px] grid-flow-col grid-cols-[repeat(53,minmax(10px,1fr))] grid-rows-7 gap-1">
                                        {contributionDays.map((day: any, index: number) => <span key={`${day.date}-${index}`} title={`${day.date}: ${day.contributionCount} contributions`} className={`aspect-square rounded-[3px] ${day.contributionCount === 0 ? "bg-muted" : day.contributionCount < 3 ? "bg-emerald-200 dark:bg-emerald-950" : day.contributionCount < 7 ? "bg-emerald-400" : day.contributionCount < 12 ? "bg-emerald-600" : "bg-emerald-800 dark:bg-emerald-400"}`} />)}
                                    </div>
                                </div>
                            )}
                            {githubData?.pinnedRepos?.length > 0 && <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{githubData.pinnedRepos.slice(0, 3).map((repo: any) => <a key={repo.url} href={repo.url} target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-border/60 bg-background p-4 hover:border-primary/40"><p className="text-sm font-semibold group-hover:text-primary">{repo.name}</p><p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{repo.description || "—"}</p><p className="mt-3 text-[11px] text-muted-foreground">{repo.language || "Repository"} · ★ {repo.stars ?? 0}</p></a>)}</div>}
                        </section>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2 text-primary">
                            <RiTimeLine className="size-5" />
                            <h2 className="text-2xl font-bold tracking-tight text-foreground">{t("Coding Activity")}</h2>
                        </div>
                        {wakatimeShares.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {wakatimeShares.map((share) => {
                                    const shareId = extractShareId(share.url);
                                    if (!shareId) return null;
                                    const isActive = activeShareId === shareId;
                                    return (
                                        <button
                                            key={share.url}
                                            type="button"
                                            onClick={() => {
                                                setActiveWakaIndex(wakatimeShares.findIndex((item) => item.url === share.url));
                                                setWakaKind("time-series");
                                            }}
                                            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                                                isActive ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"
                                            }`}
                                        >
                                            {share.label}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {wakaError && (
                        <p className="text-sm text-muted-foreground">{wakaError}</p>
                    )}

                    {wakaApiError && wakaApiError !== 'WakaTime API key is not configured' && !wakaData && (
                        <p className="text-sm text-muted-foreground">{wakaApiError}</p>
                    )}

                    {wakaApiData && (
                        <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-lg font-bold text-foreground">{t("WakaTime Stats")}</h3>
                                    <p className="text-xs text-muted-foreground">{wakaApiData.human_readable_range || t("Coding activity over the past 7 days.")}</p>
                                </div>
                                <span className="text-xs font-semibold text-muted-foreground">{wakaApiData.human_readable_total || formatWakaMetric(wakaApiData.total_seconds || 0)}</span>
                            </div>
                            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {[
                                    ["Total time", wakaApiData.human_readable_total || formatWakaMetric(wakaApiData.total_seconds || 0)],
                                    ["Daily average", wakaApiData.human_readable_daily_average || formatWakaMetric(wakaApiData.daily_average || 0)],
                                    ["Languages", wakaLanguages.length],
                                    ["Projects", Array.isArray(wakaApiData.projects) ? wakaApiData.projects.length : 0],
                                ].map(([label, value]) => <div key={String(label)} className="rounded-xl border border-border/60 bg-background p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t(String(label))}</p><p className="mt-1 text-xl font-extrabold text-foreground">{value}</p></div>)}
                            </div>
                            {wakaLanguages.length > 0 && <div className="mt-6 space-y-3"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("Languages")}</p>{wakaLanguages.map((language: any) => <div key={language.name}><div className="mb-1 flex justify-between text-xs"><span>{language.name}</span><span className="text-muted-foreground">{language.percent ?? 0}%</span></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(Number(language.percent) || 0, 100)}%` }} /></div></div>)}</div>}
                        </section>
                    )}

                    {wakaData && activeShareId && (
                        <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm sm:p-6">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-muted/70"><RiTimeLine className="size-5" /></div>
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground">{t("WakaTime Stats")}</h3>
                                        <p className="text-xs text-muted-foreground">{t("Coding activity over the past 7 days.")}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold text-muted-foreground">{formatDuration(wakaTotalSeconds)}</span>
                            </div>
                            <div className="mt-5 rounded-xl border border-border/60 bg-background p-3">
                                <div className="flex h-24 items-end gap-1.5">
                                    {wakaDays.slice(-7).map((day: any) => {
                                        const max = Math.max(...wakaDays.map((item: any) => item.seconds), 1);
                                        return <span key={day.date} title={`${day.date}: ${formatDuration(day.seconds)}`} className="flex-1 rounded-t-sm bg-primary/80" style={{ height: `${Math.max((day.seconds / max) * 100, 4)}%` }} />;
                                    })}
                                </div>
                                <div className="mt-2 flex justify-between text-[10px] text-muted-foreground"><span>{wakaDays.slice(-7)[0]?.date || "—"}</span><span>{wakaDays.slice(-1)[0]?.date || "—"}</span></div>
                            </div>
                            <div className="mt-4 space-y-3">
                                <WakaTimeChart data={wakaData} label={activeWakaShare?.label || t("Coding Activity")} kind={wakaKind} />
                            <div className="flex flex-wrap gap-2">
                                {(["time-series", "category", "heatmap"] as ChartKind[]).map((kind) => (
                                    <button
                                        key={kind}
                                        type="button"
                                        onClick={() => setWakaKind(kind)}
                                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                                            wakaKind === kind ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground"
                                        }`}
                                    >
                                        {kind}
                                    </button>
                                ))}
                            </div>
                            </div>
                        </section>
                    )}

                    {!wakaError && !wakaData && !wakaApiData && wakatimeShares.length === 0 && (
                        <p className="text-sm text-muted-foreground">{t("No WakaTime share configured yet.")}</p>
                    )}
                    {!wakaError && !wakaData && wakatimeShares.length > 0 && (
                        <p className="text-sm text-muted-foreground">{t("Loading WakaTime activity…")}</p>
                    )}
                </div>
            </div>
        </ClientLayout>
    );
}
