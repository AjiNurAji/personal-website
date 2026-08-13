import { useMemo } from "react";
import { Link } from "@inertiajs/react";
import { RiGithubFill, RiTimeLine, RiArrowRightLine } from "@remixicon/react";

interface Props {
    settings: Record<string, any>;
}

function extractUsernameFromUrl(url: string) {
    if (!url) return null;
    const match = url.match(/github\.com\/([^/]+)/i);
    return match ? match[1] : null;
}

function extractShareId(url: string) {
    if (!url) return null;
    const match = url.match(/\/share\/(?:embed\/)?@[^/]+\/([^/?#]+)/i);
    return match ? match[1] : null;
}

export default function StatsHighlights({ settings }: Props) {
    const githubUrl = String(settings.github_url || "").trim();
    const githubUsername = extractUsernameFromUrl(githubUrl);
    const wakatimeUsername = String(settings.wakatime_username || "").trim() || null;
    const wakatimeShares = useMemo(() => {
        const raw = settings.wakatime_share_ids;
        if (Array.isArray(raw)) {
            return raw
                .map((item) => ({
                    label: String(item.label || item.url || "").trim(),
                    url: String(item.url || "").trim(),
                }))
                .filter((item) => item.url);
        }
        if (typeof raw === "string") {
            try {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    return parsed
                        .map((item) => ({
                            label: String(item.label || item.url || "").trim(),
                            url: String(item.url || "").trim(),
                        }))
                        .filter((item) => item.url);
                }
            } catch {
                // ignore invalid JSON
            }
        }
        return [];
    }, [settings.wakatime_share_ids]);

    const hasGithub = Boolean(githubUsername);
    const hasWaka = Boolean(wakatimeUsername && wakatimeShares.length > 0);
    if (!hasGithub && !hasWaka) return null;

    const firstShare = wakatimeShares[0] || null;
    const firstShareId = firstShare ? extractShareId(firstShare.url) : null;

    return (
        <section className="border-t border-border/70 py-10 sm:py-14">
            <div className="mb-6 flex items-center gap-2 text-primary">
                <RiTimeLine className="size-5" />
                <h2 className="text-2xl font-bold tracking-tight text-foreground">Developer Stats</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                {hasGithub && (
                    <Link
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-muted/70">
                                <RiGithubFill className="size-5" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground group-hover:text-primary">GitHub</p>
                                <p className="text-xs text-muted-foreground">@{githubUsername}</p>
                            </div>
                        </div>
                        <RiArrowRightLine className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </Link>
                )}

                {hasWaka && (
                    <Link
                        href={firstShare ? `/api/wakatime/${encodeURIComponent(wakatimeUsername)}/${encodeURIComponent(firstShareId || "")}` : "/stats"}
                        className="group flex items-center justify-between rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-muted/70">
                                <RiTimeLine className="size-5" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground group-hover:text-primary">WakaTime</p>
                                <p className="text-xs text-muted-foreground">{firstShare?.label || wakatimeUsername}</p>
                            </div>
                        </div>
                        <RiArrowRightLine className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </Link>
                )}
            </div>
        </section>
    );
}
