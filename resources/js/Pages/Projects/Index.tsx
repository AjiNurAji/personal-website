import { Navbar } from "@/Components/Elements/navbar";
import { Footer } from "@/Components/Elements/footer";
import { ProjectCard } from "@/Components/Elements/ProjectCard";
import { Head } from "@inertiajs/react";
import { InteractiveCursor } from "@/Components/Elements/InteractiveCursor";
import { AnimateIn } from "@/Components/Elements/AnimateIn";

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
}

interface Props {
    projects: Project[];
}

export default function ProjectsIndex({ projects }: Props) {
    return (
        <div className="font-sans bg-background text-foreground selection:bg-primary/10 selection:text-primary">
            <Head title="All Projects" />
            <InteractiveCursor />
            <Navbar />
            <main className="min-h-screen w-full pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimateIn variant="blur-fade">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">All Projects</h1>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                A collection of projects I've built, ranging from web applications to experiments.
                            </p>
                        </div>
                    </AnimateIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <AnimateIn 
                                key={project.id} 
                                variant="blur-fade" 
                                delay={index * 0.1}
                            >
                                <ProjectCard {...project} />
                            </AnimateIn>
                        ))}
                    </div>

                    {projects.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground">No projects found.</p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
