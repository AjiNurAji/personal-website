import ClientLayout from "@/Layouts/ClientLayout";
import { ProjectCard } from "@/Components/Elements/ProjectCard";
import { Head } from "@inertiajs/react";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { Badge } from "@/Components/UI/badge";
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
    settings?: Record<string, any>;
}

export default function ProjectsIndex({ projects, settings = {} }: Props) {
    const featuredProjects = projects.filter(p => p.featured);
    const otherProjects = projects.filter(p => !p.featured);

    return (
        <div className="font-sans bg-background text-foreground selection:bg-primary/10 selection:text-primary">
            <Head>
                <title>Projects — Aji Nur Aji</title>
                <meta name="description" content="Browse all projects by Aji Nur Aji — web applications, experiments, and open-source contributions built with modern technologies." />
                <link rel="canonical" href="https://ajinuraji.my.id/projects" />
            </Head>
            <ClientLayout
                active="Projects"
                title="Projects"
                description="A collection of web applications, experiments, and open-source work built with care."
                name={settings.hero_title?.replace(/<[^>]+>/g, "")}
                role={settings.role}
                tagline={settings.hero_subtitle}
                contactEmail={settings.contact_email}
                settings={settings}
            >
                <div className="mb-10 flex items-center gap-3 border-y border-dashed border-border py-4">
                    <Badge variant="secondary">{projects.length} projects</Badge>
                    <span className="text-sm text-muted-foreground">Selected work and experiments</span>
                </div>

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
            </ClientLayout>
        </div>
    );
}
