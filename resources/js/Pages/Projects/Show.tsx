import { Navbar } from "@/Components/Elements/navbar";
import { Footer } from "@/Components/Elements/footer";
import { Head, Link } from "@inertiajs/react";
import { InteractiveCursor } from "@/Components/Elements/InteractiveCursor";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { RiArrowLeftLine, RiExternalLinkLine, RiGithubFill, RiFileTextLine, RiInformationLine, RiRefreshLine } from "@remixicon/react";
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
    badges: string;
}

interface Props {
    project: Project;
}

const MarkdownImage = ({ node, ...props }: any) => (
  <Dialog>
    <DialogTrigger asChild>
      <img {...props} className="cursor-zoom-in rounded-lg" />
    </DialogTrigger>
    <DialogContent className="sm:max-w-5xl md:max-w-7xl w-[95vw] h-fit max-h-[95vh] p-0 overflow-hidden bg-transparent border-0 ring-0 flex items-center justify-center">
      <DialogTitle className="sr-only">Image View</DialogTitle>
      <img 
        {...props} 
        className="w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl bg-zinc-50/10 backdrop-blur-md" 
      />
    </DialogContent>
  </Dialog>
);

export default function ProjectShow({ project }: Props) {
    const { theme } = useTheme();
    const badgesArray = project.badges ? JSON.parse(project.badges) : [];
    const imageUrl = project.image.startsWith('http') ? project.image : `/storage/${project.image}`;

    const [readmeContent, setReadmeContent] = useState<string | null>(null);
    const [isLoadingReadme, setIsLoadingReadme] = useState<boolean>(!!project.github);
    const [readmeError, setReadmeError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'content' | 'readme'>('content');
    const [isRefreshing, setIsRefreshing] = useState(false);

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

    const handleRefreshReadme = () => {
        setIsRefreshing(true);
        setReadmeError(null);
        axios.get(`/projects/${project.slug}/refresh-readme`)
            .then(res => {
                if (res.data.readme_content) {
                    setReadmeContent(res.data.readme_content);
                } else {
                    setReadmeError(res.data.error || "README not available.");
                }
            })
            .catch(err => {
                setReadmeError("Failed to refresh README.");
            })
            .finally(() => {
                setIsRefreshing(false);
            });
    };

    const hasContent = !!project.content;
    const hasReadme = !!readmeContent;
    const showTabs = hasContent && hasReadme;

    return (
        <div className="font-sans bg-background text-foreground selection:bg-primary/10 selection:text-primary">
            <Head>
                <title>{project.title} — Aji Nur Aji</title>
                <meta name="description" content={project.description} />
                <link rel="canonical" href={`https://ajinuraji.my.id/projects/${project.slug}`} />
            </Head>
            <InteractiveCursor />
            <Navbar />
            <main className="min-h-screen w-full pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Link */}
                    <AnimateIn variant="blur-fade">
                        <Link 
                            href="/projects" 
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
                        >
                            <RiArrowLeftLine className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Projects
                        </Link>

                        {/* Header */}
                        <div className="mb-12">
                            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">{project.title}</h1>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {badgesArray.map((badge: string) => (
                                    <Badge key={badge} variant="secondary" className="px-3 py-1">
                                        {badge}
                                    </Badge>
                                ))}
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    </AnimateIn>

                    {/* Project Image */}
                    <AnimateIn variant="blur-fade" delay={0.2}>
                        <div className="aspect-video w-full rounded-2xl overflow-hidden border bg-zinc-50 dark:bg-zinc-900 mb-12">
                            <SafeImage 
                                src={imageUrl} 
                                alt={project.title} 
                                className="w-full h-full object-cover"
                                containerClassName="w-full h-full"
                            />
                        </div>
                    </AnimateIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="md:col-span-2">
                            {/* Tabs */}
                            {showTabs && (
                                <AnimateIn variant="blur-fade" delay={0.25}>
                                    <div className="flex gap-1 mb-8 p-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl">
                                        <button
                                            onClick={() => setActiveTab('content')}
                                            className={cn(
                                                "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all",
                                                activeTab === 'content'
                                                    ? "bg-white dark:bg-zinc-700 text-foreground shadow-sm"
                                                    : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            <RiInformationLine className="size-4" />
                                            Details
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('readme')}
                                            className={cn(
                                                "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all",
                                                activeTab === 'readme'
                                                    ? "bg-white dark:bg-zinc-700 text-foreground shadow-sm"
                                                    : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            <RiFileTextLine className="size-4" />
                                            README
                                        </button>
                                    </div>
                                </AnimateIn>
                            )}

                            <AnimateIn variant="blur-fade" delay={0.15}>
                                <div className="prose prose-zinc dark:prose-invert max-w-none min-h-[300px]">
                                    {/* Content Tab — always render project.content */}
                                    {(activeTab === 'content' || !showTabs) && (
                                        <>
                                            {hasContent ? (
                                                <div data-color-mode={theme} className="bg-transparent">
                                                    <MDEditor.Markdown 
                                                      source={project.content || ''} 
                                                      style={{ backgroundColor: 'transparent' }} 
                                                      components={{ img: MarkdownImage }}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="text-center py-16">
                                                    <RiInformationLine className="size-12 mx-auto text-muted-foreground/30 mb-4" />
                                                    <p className="text-muted-foreground italic">
                                                        No detailed description has been added for this project yet.
                                                    </p>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* README Tab — only when tabs are visible */}
                                    {showTabs && activeTab === 'readme' && (
                                        <>
                                            {isLoadingReadme ? (
                                                <div className="space-y-4 animate-pulse">
                                                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
                                                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                                                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
                                                    <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded w-full mt-6"></div>
                                                </div>
                                            ) : readmeContent ? (
                                                <>
                                                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                                                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                                                            <RiGithubFill className="size-4" />
                                                            README.md from GitHub
                                                        </span>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={handleRefreshReadme}
                                                            disabled={isRefreshing}
                                                            className="gap-1.5"
                                                        >
                                                            <RiRefreshLine className={cn("size-4", isRefreshing && "animate-spin")} />
                                                            {isRefreshing ? "Refreshing..." : "Refresh"}
                                                        </Button>
                                                    </div>
                                                    <div data-color-mode={theme} className="bg-transparent">
                                                        <MDEditor.Markdown 
                                                          source={readmeContent} 
                                                          style={{ backgroundColor: 'transparent' }} 
                                                          components={{ img: MarkdownImage }}
                                                        />
                                                    </div>
                                                </>
                                            ) : readmeError ? (
                                                <div className="text-center py-12">
                                                    <RiGithubFill className="size-12 mx-auto text-muted-foreground/30 mb-4" />
                                                    <p className="text-muted-foreground italic mb-4">{readmeError}</p>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={handleRefreshReadme}
                                                        disabled={isRefreshing}
                                                    >
                                                        <RiRefreshLine className="size-4 mr-1" />
                                                        Try Again
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="text-center py-12">
                                                    <RiFileTextLine className="size-12 mx-auto text-muted-foreground/30 mb-4" />
                                                    <p className="text-muted-foreground italic">No README content available.</p>
                                                </div>
                                            )}
                                        </>
                                    )}

                                    {/* No tabs, no content, loading README */}
                                    {!showTabs && !hasContent && isLoadingReadme && (
                                        <div className="space-y-4 animate-pulse">
                                            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
                                            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                                            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
                                            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                                            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3"></div>
                                            <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded w-full mt-6"></div>
                                            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                                            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-4/5"></div>
                                        </div>
                                    )}

                                    {/* No tabs, no content, README loaded → show README directly */}
                                    {!showTabs && !hasContent && hasReadme && (
                                        <div data-color-mode={theme} className="bg-transparent">
                                            <MDEditor.Markdown 
                                              source={readmeContent || ''} 
                                              style={{ backgroundColor: 'transparent' }} 
                                              components={{ img: MarkdownImage }}
                                            />
                                        </div>
                                    )}

                                    {/* No tabs, no content, no README, not loading → empty */}
                                    {!showTabs && !hasContent && !hasReadme && !isLoadingReadme && (
                                        <div className="text-center py-12">
                                            <RiFileTextLine className="size-12 mx-auto text-muted-foreground/30 mb-4" />
                                            <p className="text-muted-foreground italic">
                                                {readmeError || "No detailed content or GitHub README available for this project."}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </AnimateIn>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <AnimateIn variant="blur-fade" delay={0.4}>
                                <div className="p-6 rounded-2xl border bg-zinc-50/50 dark:bg-zinc-900/50 sticky top-24">
                                    <h3 className="text-lg font-semibold mb-6">Links</h3>
                                    <div className="space-y-3">
                                        {(project.demo || project.link) && (
                                            <a 
                                                href={project.demo || project.link || '#'} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className={cn(buttonVariants({ variant: "default" }), "w-full justify-center gap-2")}
                                            >
                                                <RiExternalLinkLine className="h-4 w-4" />
                                                Live Demo
                                            </a>
                                        )}
                                        {project.github && (
                                            <a 
                                                href={project.github} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center gap-2")}
                                            >
                                                <RiGithubFill className="h-4 w-4" />
                                                Source Code
                                            </a>
                                        )}
                                    </div>

                                    {/* Tech Stack */}
                                    {badgesArray.length > 0 && (
                                        <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                                            <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Tech Stack</h4>
                                            <div className="flex flex-wrap gap-1.5">
                                                {badgesArray.map((badge: string) => (
                                                    <Badge key={badge} variant="outline" className="text-xs">
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
            <Footer />
        </div>
    );
}
