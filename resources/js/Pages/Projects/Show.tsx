import { Navbar } from "@/Components/Elements/navbar";
import { Footer } from "@/Components/Elements/footer";
import { Head, Link } from "@inertiajs/react";
import { InteractiveCursor } from "@/Components/Elements/InteractiveCursor";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { RiArrowLeftLine, RiExternalLinkLine, RiGithubFill } from "@remixicon/react";
import { Button, buttonVariants } from "@/Components/UI/button";
import { Badge } from "@/Components/UI/badge";
import { cn } from "@/lib/utils";
import MDEditor from '@uiw/react-md-editor';

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

export default function ProjectShow({ project }: Props) {
    const { theme } = useTheme();
    const badgesArray = project.badges ? JSON.parse(project.badges) : [];
    const imageUrl = project.image.startsWith('http') ? project.image : `/storage/${project.image}`;

    return (
        <div className="font-sans bg-background text-foreground selection:bg-primary/10 selection:text-primary">
            <Head title={project.title} />
            <InteractiveCursor />
            <Navbar />
            <main className="min-h-screen w-full pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimateIn variant="blur-fade">
                        <Link 
                            href="/projects" 
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
                        >
                            <RiArrowLeftLine className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Back to Projects
                        </Link>

                        <div className="mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{project.title}</h1>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {badgesArray.map((badge: string) => (
                                    <Badge key={badge} variant="secondary">
                                        {badge}
                                    </Badge>
                                ))}
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {project.description}
                            </p>
                        </div>
                    </AnimateIn>

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
                        <div className="md:col-span-2">
                            <AnimateIn variant="blur-fade" delay={0.3}>
                                <div className="prose prose-zinc dark:prose-invert max-w-none">
                                    {project.content ? (
                                        <div data-color-mode={theme}>
                                            <MDEditor.Markdown source={project.content} />
                                        </div>
                                    ) : (
                                        <p className="text-muted-foreground italic">No detailed content available for this project.</p>
                                    )}
                                </div>
                            </AnimateIn>
                        </div>

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
