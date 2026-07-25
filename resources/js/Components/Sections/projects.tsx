"use client";

import { Link } from "@inertiajs/react";
import { RiArrowRightUpLine } from "@remixicon/react";
import { SafeImage } from "@/Components/Elements/SafeImage";

const ProjectsSection = ({ initialProjects = [] }: { initialProjects?: any[] }) => {
    const featuredProjects = initialProjects.slice(0, 6);

    const getImageUrl = (image: string) => {
        if (!image) return "";
        if (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("/")) {
            return image;
        }
        return `/storage/${image}`;
    };

    const getProjectLink = (project: any) => {
        return project.demo || project.github || project.link || `/projects/${project.slug}`;
    };

    const isExternalLink = (url: string) => {
        return url.startsWith("http://") || url.startsWith("https://");
    };

    return (
        <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:scroll-mt-24">
            <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-0 lg:px-0 lg:py-0 lg:bg-transparent lg:backdrop-blur-none lg:mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">03 . selected works</span>
                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Projects</h2>
            </div>

            <div className="space-y-12">
                {featuredProjects.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 gap-4">
                            {featuredProjects.map((project: any) => {
                                const projectUrl = getProjectLink(project);
                                const isExt = isExternalLink(projectUrl);
                                const badgeList = Array.isArray(project.badges)
                                    ? project.badges
                                    : typeof project.badges === "string"
                                    ? JSON.parse(project.badges)
                                    : [];

                                const ContentCard = (
                                    <div className="group relative grid gap-4 transition-all sm:grid-cols-8 sm:gap-6 md:gap-4 hover:bg-accent/30 -mx-4 p-4 rounded-lg border border-transparent hover:border-border/50 bg-card/10">
                                        {/* Left Column: Thumbnail Image */}
                                        <div className="z-10 sm:col-span-2">
                                            {project.image ? (
                                                <div className="w-full aspect-video sm:aspect-auto sm:h-20 rounded border border-border/80 bg-muted/20 overflow-hidden shadow-sm">
                                                    <SafeImage
                                                        src={getImageUrl(project.image)}
                                                        alt={project.title}
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-full aspect-video sm:aspect-auto sm:h-20 rounded border border-dashed border-border/80 bg-muted/10 flex flex-col items-center justify-center p-2 text-center">
                                                    <span className="text-[10px] text-muted-foreground/40 uppercase tracking-wider font-semibold">No Preview</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Column: Text Content */}
                                        <div className="z-10 sm:col-span-6 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-semibold leading-snug text-foreground text-sm sm:text-base group-hover:text-primary transition-colors flex items-center gap-1.5">
                                                    {project.title}
                                                    <RiArrowRightUpLine className="size-4 shrink-0 opacity-70 group-hover:opacity-100 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                                </h3>
                                                {project.description && (
                                                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                                        {project.description}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Badge Tags (placed directly below description) */}
                                            {badgeList.length > 0 && (
                                                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies used">
                                                    {badgeList.map((tag: string, index: number) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium leading-5 text-primary"
                                                        >
                                                            {tag}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                );

                                return (
                                    <div key={project.id}>
                                        {isExt ? (
                                            <a
                                                href={projectUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block focus:outline-none"
                                            >
                                                {ContentCard}
                                            </a>
                                        ) : (
                                            <Link
                                                href={projectUrl}
                                                className="block focus:outline-none"
                                            >
                                                {ContentCard}
                                            </Link>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group"
                        >
                            View Full Project Archive
                            <RiArrowRightUpLine className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </>
                ) : (
                    <p className="text-sm text-muted-foreground/60 italic">Projects coming soon.</p>
                )}
            </div>
        </section>
    );
};

export default ProjectsSection;
