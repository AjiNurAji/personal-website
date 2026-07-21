"use client";

import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { Badge } from "@/Components/UI/badge";
import { SafeImage } from "@/Components/Elements/SafeImage";
import { RiTimeLine } from "@remixicon/react";

interface WakaTimeStatsProps {
    wakatimeUsername?: string;
}

export default function WakaTimeStats({ wakatimeUsername }: WakaTimeStatsProps) {
    if (!wakatimeUsername) return null;

    const chartUrl = `https://github-readme-stats.vercel.app/api/wakatime?username=${wakatimeUsername}&layout=compact&theme=transparent&hide_border=true&bg_color=00000000&custom_title=Coding%20Activity%20(Last%207%20Days)`;

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

                <AnimateIn variant="blur-fade" delay={0.1}>
                    <div className="w-full p-6 md:p-10 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden group">
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10 w-full flex justify-center">
                            <SafeImage
                                src={chartUrl}
                                alt="WakaTime Coding Activity"
                                className="w-full min-h-[120px] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                                loading="lazy"
                            />
                        </div>
                        <div className="relative z-10 text-center mt-6">
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
                </AnimateIn>
            </div>
        </section>
    );
}
