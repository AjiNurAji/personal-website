import { Navbar } from "@/Components/Elements/navbar";
import { Footer } from "@/Components/Elements/footer";
import { ProjectCard } from "@/Components/Elements/ProjectCard";
import { Head } from "@inertiajs/react";
import { InteractiveCursor } from "@/Components/Elements/InteractiveCursor";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { Badge } from "@/Components/UI/badge";
import { LetterAnimation } from "@/Components/Elements/LetterAnimation";
import { RiFolderOpenLine } from "@remixicon/react";

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    link?: string | null;
    github?: string | null;
    demo?: string | null;
    badges: string;
    featured: boolean;
}

interface Props {
    projects: Project[];
}

export default function ProjectsIndex({ projects }: Props) {
    const featuredProjects = projects.filter(p => p.featured);
    const otherProjects = projects.filter(p => !p.featured);

    return (
        <div className="font-sans bg-background text-foreground selection:bg-primary/10 selection:text-primary">
            <Head title="All Projects" />
            <InteractiveCursor />
            <Navbar />
            <main className="min-h-screen w-full pt-24 pb-16">
                <div className="max-w-5xl mx-auto px-6">
                    {/* Header */}
                    <AnimateIn variant="blur-fade">
                        <div className="text-center mb-16">
                            <Badge variant="secondary" className="px-4 py-1.5 text-sm mb-4">
                                Portfolio
                            </Badge>
                            <LetterAnimation
                                isHeading
                                inView
                                className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tighter"
                            >
                                All Projects
                            </LetterAnimation>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                                A collection of projects I've built, ranging from web applications to experiments and open-source contributions.
                            </p>
                        </div>
                    </AnimateIn>

                    {projects.length === 0 ? (
                        <div className="text-center py-32">
                            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                                <RiFolderOpenLine className="w-8 h-8 text-muted-foreground/50" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">No Projects Yet</h3>
                            <p className="text-muted-foreground">Projects will appear here once they're added.</p>
                        </div>
                    ) : (
                        <>
                            {/* Featured Projects */}
                            {featuredProjects.length > 0 && (
                                <div className="mb-16">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                                        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Featured</span>
                                        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {featuredProjects.map((project, index) => (
                                            <AnimateIn 
                                                key={project.id} 
                                                variant="blur-fade" 
                                                delay={index * 0.1}
                                            >
                                                <ProjectCard {...project} isFeatured={true} />
                                            </AnimateIn>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Other Projects */}
                            {otherProjects.length > 0 && (
                                <div>
                                    {featuredProjects.length > 0 && (
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                                            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">More Projects</span>
                                            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {otherProjects.map((project, index) => (
                                            <AnimateIn 
                                                key={project.id} 
                                                variant="blur-fade" 
                                                delay={index * 0.1}
                                            >
                                                <ProjectCard {...project} />
                                            </AnimateIn>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
