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

export default function Stats({ settings }: Props) {
    const { t } = useTranslation();
    const [wakaData, setWakaData] = useState<any>(null);
    const [wakaError, setWakaError] = useState<string | null>(null);
    const [wakaKind, setWakaKind] = useState<ChartKind>("time-series");
    const [githubData, setGithubData] = useState<any>(null);
    const [githubError, setGithubError] = useState<string | null>(null);

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
    const activeWakaShare = wakatimeShares[0] || null;
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

        fetchGithub();
        fetchWaka();

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
            { title: "Contributions", value: githubData.totalContributions ?? 0 },
        ];
    }, [githubData]);

    return (
        <ClientLayout active="Stats" settings={settings} title="Stats" description="Developer activity and account summaries">
            <Head title={t("Stats") + " — Aji Nur Aji"} />

            <div className="mx-auto max-w-5xl space-y-10">
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

                    {githubCards.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {githubCards.map((item) => (
                                <div key={item.title} className="rounded-xl border border-border/70 bg-card p-4 text-center shadow-sm">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t(item.title)}</p>
                                    <p className="mt-2 text-3xl font-extrabold text-foreground">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {githubData?.pinnedRepos?.length > 0 && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-foreground">
                                <RiGithubFill className="size-5" />
                                <h3 className="text-lg font-semibold">{t("Pinned Repositories")}</h3>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {githubData.pinnedRepos.map((repo: any) => (
                                    <a
                                        key={repo.url}
                                        href={repo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block rounded-xl border border-border/70 bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
                                    >
                                        <p className="text-sm font-semibold text-foreground group-hover:text-primary">{repo.name}</p>
                                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{repo.description || "—"}</p>
                                        <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
                                            {repo.language ? <span>{repo.language}</span> : null}
                                            <span>★ {repo.stars ?? 0}</span>
                                            <span>⑂ {repo.forks ?? 0}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
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
                                                setWakaKind("time-series");
                                                window.location.href = `/api/wakatime/${encodeURIComponent(wakatimeUsername || "")}/${encodeURIComponent(shareId)}`;
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

                    {wakaData && activeShareId && (
                        <div className="space-y-3">
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
                    )}

                    {!wakaError && !wakaData && (
                        <p className="text-sm text-muted-foreground">{t("No WakaTime share configured yet.")}</p>
                    )}
                </div>
            </div>
        </ClientLayout>
    );
}
