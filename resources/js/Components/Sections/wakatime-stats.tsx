"use client";

import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { Badge } from "@/Components/UI/badge";
import { SafeImage } from "@/Components/Elements/SafeImage";
import { RiTimeLine } from "@remixicon/react";
import { useTheme } from "@/hooks/use-theme";

interface WakaTimeShare {
    label: string;
    url: string;
}

interface WakaTimeStatsProps {
    wakatimeUsername?: string;
    wakatimeShareIds?: WakaTimeShare[];
}

export default function WakaTimeStats({ wakatimeUsername, wakatimeShareIds }: WakaTimeStatsProps) {
    const { theme } = useTheme();

    if (!wakatimeUsername) return null;

    const shares: WakaTimeShare[] = wakatimeShareIds && wakatimeShareIds.length > 0
        ? wakatimeShareIds
        : [];

    return (
        <section
            id="wakatime"
            className="relative z-10 bg-transparent border-t border-b border-zinc-200 dark:border-zinc-800 overflow-hidden px-4 sm:px-0"
        >
            {/* Background Decorations */}
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

                {shares.length > 0 ? (
                    <div className={`grid gap-6 ${shares.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                        {shares.map((share, index) => {
                            const isSvg = share.url.endsWith('.svg');
                            const separator = share.url.includes('?') ? '&' : '?';
                            const chartUrl = isSvg
                                ? `${share.url}${separator}theme=${theme === 'dark' ? 'dark' : 'light'}`
                                : share.url;
                            return (
                                <AnimateIn key={share.url} variant="blur-fade" delay={index * 0.1}>
                                    <div className="w-full p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden group h-full flex flex-col">
                                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none translate-y-1/2 translate-x-1/2"></div>
                                        <h3 className="font-semibold text-lg mb-4 relative z-10 border-b pb-3 border-zinc-200 dark:border-zinc-800">
                                            {share.label}
                                        </h3>
                                        <div className="relative z-10 flex-1 flex items-center justify-center min-h-[160px]">
                                            {isSvg ? (
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
                        })}
                    </div>
                ) : (
                    <AnimateIn variant="blur-fade" delay={0.1}>
                        <div className="w-full p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border shadow-sm text-center">
                            <p className="text-muted-foreground">
                                Configure WakaTime chart embeds in{" "}
                                <a href="/admin/settings" className="underline text-primary">Admin Settings</a>
                                {" "}to display coding stats.
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
