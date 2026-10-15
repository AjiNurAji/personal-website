import ClientLayout from "@/Layouts/ClientLayout";
import { Head, Link } from "@inertiajs/react";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import {
    RiArrowLeftLine,
    RiExternalLinkLine,
    RiGithubFill,
    RiFileTextLine,
    RiCodeSSlashLine,
    RiSparklingLine,
    RiImageLine,
    RiBookOpenLine
} from "@remixicon/react";
import { Button, buttonVariants } from "@/Components/UI/button";
import { Badge } from "@/Components/UI/badge";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/Components/UI/dialog";
import { cn } from "@/lib/utils";
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from "react";
import axios from "axios";

import { SafeImage } from "@/Components/Elements/SafeImage";
import { useTheme } from "@/hooks/use-theme";

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    content?: string;
    image: string;
    link?: string | null;
    github?: string | null;
    demo?: string | null;
    badges: string | string[];
    documentation_images?: string[] | null;
}

interface Props {
    project: Project;
    settings?: Record<string, any>;
}

/** Normalize badges — Eloquent casts JSON to array, but we also handle raw JSON string for edge cases */
const parseBadges = (badges: string | string[]): string[] => {
    if (Array.isArray(badges)) return badges;
    if (typeof badges === 'string' && badges.trim()) {
        try {
            const parsed = JSON.parse(badges);
            return Array.isArray(parsed) ? parsed : [];
        } catch { return []; }
    }
    return [];
};

const MarkdownImage = ({ node, ...props }: any) => (
  <Dialog>
    <DialogTrigger asChild>
      <div className="relative group cursor-zoom-in overflow-hidden rounded-xl my-4 inline-block max-w-full">
        <img {...props} className="rounded-xl transition-transform duration-300 group-hover:scale-[1.02]" />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
            <span className="text-xs font-medium text-white bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5">
                <RiSparklingLine className="size-3.5" /> Click to enlarge
            </span>
        </div>
      </div>
    </DialogTrigger>
    <DialogContent className="sm:max-w-5xl md:max-w-7xl w-[95vw] h-fit max-h-[95vh] p-0 overflow-hidden bg-transparent border-0 ring-0 flex items-center justify-center">
      <DialogTitle className="sr-only">Image View</DialogTitle>
      <img
        {...props}
        className="w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl bg-zinc-950/40 backdrop-blur-xl border border-white/10"
      />
    </DialogContent>
  </Dialog>
);

export default function ProjectShow({ project, settings = {} }: Props) {
    const { theme } = useTheme();
    const badgesArray = parseBadges(project.badges);
    const imageUrl = project.image?.startsWith('http') ? project.image : `/storage/${project.image}`;

    const [readmeContent, setReadmeContent] = useState<string | null>(null);
    const [isLoadingReadme, setIsLoadingReadme] = useState<boolean>(!!project.github);
    const [readmeError, setReadmeError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'content' | 'readme'>('content');
    const [activeDocumentation, setActiveDocumentation] = useState(0);
    const documentation = project.documentation_images || [];

    useEffect(() => {
        if (project.github) {
            fetchReadme();
        } else {
            setIsLoadingReadme(false);
        }
    }, [project.slug, project.github]);

    const fetchReadme = () => {
        setIsLoadingReadme(true);
        setReadmeError(null);
        axios.get(`/projects/${project.slug}/readme`)
            .then(res => {
                if (res.data.readme_content) {
                    setReadmeContent(res.data.readme_content);
                    if (!project.content) {
                        setActiveTab('readme');
                    }
                } else {
                    setReadmeError(res.data.error || "README not available for this repository.");
                }
            })
            .catch(err => {
                setReadmeError("Failed to load README from GitHub.");
                console.error("Failed to fetch readme:", err);
            })
            .finally(() => {
                setIsLoadingReadme(false);
            });
    };

    const hasContent = !!project.content;
    const hasReadme = !!readmeContent;
    const showTabs = hasContent && hasReadme;

    return (
        <div className="font-sans bg-background text-foreground selection:bg-primary/10 selection:text-primary relative overflow-hidden">
            <Head>
                <title>{`${project.title} — Aji Nur Aji`}</title>
                <meta name="description" content={project.description || ''} />
            </Head>

            <ClientLayout
                active="Projects"
                title={project.title}
                description={project.description || "Project details and implementation notes."}
                name={settings.hero_title?.replace(/<[^>]+>/g, "")}
                role={settings.role}
                tagline={settings.hero_subtitle}
                contactEmail={settings.contact_email}
                settings={settings}
            >
            {/* Ambient Background Gradient Glows */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-tr from-primary/10 via-purple-500/10 to-blue-500/10 blur-[120px] pointer-events-none rounded-full -z-10 opacity-70 dark:opacity-40" />

            <main className="min-h-screen pb-20">
                {/* Navigation & Header */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 pt-4">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/50 backdrop-blur-sm group w-fit"
                    >
                        <RiArrowLeftLine className="size-4 group-hover:-translate-x-1 transition-transform" />
                        Back to All Projects
                    </Link>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-[1fr_320px] gap-10">
                        {/* Main Content Area */}
                        <div className="space-y-10">
                            {/* Hero Card / Featured Image */}
                            <AnimateIn variant="blur-fade" delay={0.1}>
                                <div className="space-y-6">
                                    {project.image && (
                                        <div className="relative group rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-900/5 dark:bg-zinc-900/40 backdrop-blur-md shadow-xl shadow-zinc-950/5">
                                            <div className="aspect-video w-full overflow-hidden">
                                                <SafeImage
                                                    src={imageUrl}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Gallery / Documentation Carousel preview */}
                                    {documentation.length > 0 && (
                                        <div className="space-y-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-background/60 dark:bg-zinc-900/40 backdrop-blur-md p-4 shadow-sm">
                                            <div className="flex items-center justify-between px-1 mb-1">
                                                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                                    <RiImageLine className="size-4 text-primary" /> Screenshots & Documentation
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {activeDocumentation + 1} of {documentation.length}
                                                </span>
                                            </div>

                                            <div className="aspect-video overflow-hidden rounded-xl bg-zinc-950/5 border border-zinc-200/50 dark:border-zinc-800/50">
                                                <SafeImage
                                                    src={`/storage/${documentation[activeDocumentation]}`}
                                                    alt={`${project.title} documentation ${activeDocumentation + 1}`}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            <div className="flex gap-2.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
                                                {documentation.map((image, index) => (
                                                    <button
                                                        key={image}
                                                        type="button"
                                                        onClick={() => setActiveDocumentation(index)}
                                                        className={cn(
                                                            "h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all relative group/thumb",
                                                            activeDocumentation === index
                                                                ? "border-primary ring-2 ring-primary/20 scale-[1.02]"
                                                                : "border-transparent opacity-70 hover:opacity-100"
                                                        )}
                                                    >
                                                        <img src={`/storage/${image}`} alt="" className="h-full w-full object-cover" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Title & Description Header */}
                                    <div className="space-y-3 pt-2">
                                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                                            {project.title}
                                        </h1>
                                        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Mobile Quick Links Bar */}
                                    <div className="lg:hidden flex flex-col sm:flex-row gap-3 pt-2">
                                        {(project.demo || project.link) && (
                                            <a
                                                href={project.demo || project.link || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={cn(buttonVariants({ variant: "default" }), "w-full justify-center gap-2 font-medium shadow-md shadow-primary/10")}
                                            >
                                                <RiExternalLinkLine className="h-4 w-4" />
                                                Live Preview
                                            </a>
                                        )}
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center gap-2 font-medium bg-background/50 backdrop-blur-sm")}
                                            >
                                                <RiGithubFill className="h-4 w-4" />
                                                Source Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </AnimateIn>

                            {/* Detailed Article / Markdown Section */}
                            <AnimateIn variant="blur-fade" delay={0.2}>
                                <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-background/60 dark:bg-zinc-900/40 backdrop-blur-md p-6 sm:p-8 shadow-sm">
                                    {/* Custom Tab Bar */}
                                    {showTabs && (
                                        <div className="mb-8 flex gap-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 p-1.5 border border-zinc-200/50 dark:border-zinc-700/50">
                                            <button
                                                type="button"
                                                className={cn(
                                                    "flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2",
                                                    activeTab === 'content'
                                                        ? "bg-background text-foreground shadow-sm border border-zinc-200/60 dark:border-zinc-700/60"
                                                        : "text-muted-foreground hover:text-foreground"
                                                )}
                                                onClick={() => setActiveTab('content')}
                                            >
                                                <RiBookOpenLine className="size-4 text-primary" /> Project Overview
                                            </button>
                                            <button
                                                type="button"
                                                className={cn(
                                                    "flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2",
                                                    activeTab === 'readme'
                                                        ? "bg-background text-foreground shadow-sm border border-zinc-200/60 dark:border-zinc-700/60"
                                                        : "text-muted-foreground hover:text-foreground"
                                                )}
                                                onClick={() => setActiveTab('readme')}
                                            >
                                                <RiGithubFill className="size-4" /> GitHub README
                                            </button>
                                        </div>
                                    )}

                                    {/* Content Tab */}
                                    {activeTab === 'content' && hasContent && (
                                        <div data-color-mode={theme} className="prose prose-zinc dark:prose-invert max-w-none bg-transparent">
                                            <MDEditor.Markdown
                                                source={project.content || ''}
                                                style={{ backgroundColor: 'transparent' }}
                                                components={{ img: MarkdownImage }}
                                            />
                                        </div>
                                    )}

                                    {/* GitHub README Tab */}
                                    {(activeTab === 'readme' || (!hasContent && hasReadme)) && (
                                        <>
                                            {hasReadme ? (
                                                <div className="space-y-6">
                                                    <div className="flex items-center justify-between border-b border-zinc-200/60 dark:border-zinc-800/60 pb-3">
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                                            <RiGithubFill className="size-4" /> Repository README
                                                        </span>
                                                        <a
                                                            href={project.github || '#'}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                                                        >
                                                            View on GitHub <RiExternalLinkLine className="size-3" />
                                                        </a>
                                                    </div>
                                                    <div data-color-mode={theme} className="prose prose-zinc dark:prose-invert max-w-none bg-transparent">
                                                        <MDEditor.Markdown
                                                          source={readmeContent}
                                                          style={{ backgroundColor: 'transparent' }}
                                                          components={{ img: MarkdownImage }}
                                                        />
                                                    </div>
                                                </div>
                                            ) : readmeError ? (
                                                <div className="text-center py-16 px-4">
                                                    <div className="size-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                                                        <RiGithubFill className="size-8" />
                                                    </div>
                                                    <h3 className="font-semibold text-base mb-1">Could not fetch README</h3>
                                                    <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">{readmeError}</p>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={fetchReadme}
                                                        disabled={isLoadingReadme}
                                                        className="gap-2"
                                                    >
                                                        <RiSparklingLine className="size-4" /> Try Reloading
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="text-center py-16 px-4">
                                                    <RiFileTextLine className="size-12 mx-auto text-muted-foreground/30 mb-4" />
                                                    <p className="text-sm text-muted-foreground italic">No README content available for this project.</p>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* Shimmer Loading Skeleton */}
                                    {!showTabs && !hasContent && isLoadingReadme && (
                                        <div className="space-y-5 animate-pulse py-2">
                                            <div className="h-6 bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 rounded-lg w-2/5"></div>
                                            <div className="space-y-3 pt-2">
                                                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full"></div>
                                                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-11/12"></div>
                                                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-4/5"></div>
                                            </div>
                                            <div className="h-56 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-2xl w-full my-6 border border-zinc-200 dark:border-zinc-700"></div>
                                            <div className="space-y-3">
                                                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full"></div>
                                                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4"></div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Empty Fallback State */}
                                    {!showTabs && !hasContent && !hasReadme && !isLoadingReadme && (
                                        <div className="text-center py-16 px-4">
                                            <RiFileTextLine className="size-12 mx-auto text-muted-foreground/30 mb-4" />
                                            <p className="text-sm text-muted-foreground italic max-w-md mx-auto">
                                                {readmeError || "No detailed content or GitHub README available for this project."}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </AnimateIn>
                        </div>

                        {/* Desktop Sticky Sidebar */}
                        <div className="space-y-6">
                            <AnimateIn variant="blur-fade" delay={0.3}>
                                <div className="p-6 rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-background/60 dark:bg-zinc-900/40 backdrop-blur-md sticky top-24 shadow-sm space-y-6">
                                    <div>
                                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <RiSparklingLine className="size-4 text-primary" /> Project Actions
                                        </h3>
                                        <div className="space-y-3">
                                            {(project.demo || project.link) && (
                                                <a
                                                    href={project.demo || project.link || '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={cn(buttonVariants({ variant: "default" }), "w-full justify-center gap-2.5 font-medium shadow-md shadow-primary/10 group")}
                                                >
                                                    <RiExternalLinkLine className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                                                    Live Demo
                                                </a>
                                            )}
                                            {project.github && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center gap-2.5 font-medium bg-background/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800")}
                                                >
                                                    <RiGithubFill className="h-4 w-4" />
                                                    Source Code
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Tech Stack Badges */}
                                    {badgesArray.length > 0 && (
                                        <div className="pt-5 border-t border-zinc-200/60 dark:border-zinc-800/60">
                                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <RiCodeSSlashLine className="size-4 text-primary" /> Technologies Used
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {badgesArray.map((badge: string) => (
                                                    <Badge
                                                        key={badge}
                                                        variant="secondary"
                                                        className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-foreground/90 border border-zinc-200/50 dark:border-zinc-700/50 hover:border-primary/40 transition-colors"
                                                    >
                                                        {badge}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </AnimateIn>
                        </div>
                    </div>
                </div>
            </main>
            </ClientLayout>
        </div>
    );
}
