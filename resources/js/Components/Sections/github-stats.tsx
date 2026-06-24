"use client";

import { useTheme } from "@/hooks/use-theme";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { Badge } from "@/Components/UI/badge";
import { RiGithubFill } from "@remixicon/react";

interface GithubStatsProps {
    githubUrl?: string;
}

export default function GithubStats({ githubUrl }: GithubStatsProps) {
    const { theme } = useTheme();

    if (!githubUrl) return null;

    // Extract username from URL (e.g. https://github.com/AjiNurAji -> AjiNurAji)
    const urlParts = githubUrl.replace(/\/$/, '').split('/');
    const username = urlParts[urlParts.length - 1];

    if (!username) return null;

    // We use a transparent bg and transparent border so it blends perfectly with our UI
    // If the app is in dark mode, we request the 'radical' or 'tokyonight' theme, else 'default'
    const statsTheme = theme === 'dark' ? 'tokyonight' : 'default';

    // Disable caching for real-time (or rely on vercel cache)
    const statsUrl = `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${statsTheme}&hide_border=true&bg_color=00000000`;
    const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${statsTheme}&hide_border=true&bg_color=00000000`;

    return (
        <section className="py-20 relative bg-background/95 backdrop-blur-md border-y border-zinc-200 dark:border-zinc-800 overflow-hidden z-10" id="code-metrics">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-10 pointer-events-none">
                <RiGithubFill className="size-96" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
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
                            A real-time overview of my open-source contributions, repositories, and the programming languages I use the most.
                        </p>
                    </div>
                </AnimateIn>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    <AnimateIn variant="blur-fade" delay={0.1} className="h-full">
                        <div className="p-6 md:p-8 rounded-3xl bg-background border shadow-sm h-full flex flex-col justify-center items-center hover:shadow-lg transition-shadow">
                            <h3 className="font-bold mb-6 self-start text-xl w-full border-b pb-4">Contribution Stats</h3>
                            <img 
                                src={statsUrl} 
                                alt={`${username}'s GitHub Stats`} 
                                className="w-full max-w-md mix-blend-multiply dark:mix-blend-normal object-contain"
                                loading="lazy"
                            />
                        </div>
                    </AnimateIn>

                    <AnimateIn variant="blur-fade" delay={0.2} className="h-full">
                        <div className="p-6 md:p-8 rounded-3xl bg-background border shadow-sm h-full flex flex-col justify-center items-center hover:shadow-lg transition-shadow">
                            <h3 className="font-bold mb-6 self-start text-xl w-full border-b pb-4">Top Languages</h3>
                            <img 
                                src={langsUrl} 
                                alt={`${username}'s Top Languages`} 
                                className="w-full max-w-md mix-blend-multiply dark:mix-blend-normal object-contain"
                                loading="lazy"
                            />
                        </div>
                    </AnimateIn>
                </div>

                <AnimateIn variant="blur-fade" delay={0.3} className="mt-8">
                    <div className="p-6 md:p-8 rounded-3xl bg-background border shadow-sm flex flex-col justify-center items-center hover:shadow-lg transition-shadow overflow-x-auto">
                        <h3 className="font-bold mb-6 self-start text-xl w-full border-b pb-4">Contribution Calendar</h3>
                        <div className="w-full max-w-4xl flex justify-center py-4">
                            <img 
                                src={`https://ghchart.rshah.org/${theme === 'dark' ? '40c463' : '40c463'}/${username}`} 
                                alt={`${username}'s Github chart`} 
                                className="w-full max-w-[800px] mix-blend-multiply dark:mix-blend-normal object-contain"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </AnimateIn>
            </div>
        </section>
    );
}
