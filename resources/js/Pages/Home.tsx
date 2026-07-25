import { useEffect, useState } from "react";
import { Link, Head } from "@inertiajs/react";
import { Sidebar } from "@/Components/Elements/sidebar";
import About from "@/Components/Sections/about";
import Experience from "@/Components/Sections/experience";
import ProjectsSection from "@/Components/Sections/projects";
import GithubStats from "@/Components/Sections/github-stats";
import WakaTimeStats from "@/Components/Sections/wakatime-stats";
import { RiTrophyLine, RiMedalLine, RiStarLine, RiArrowRightUpLine } from "@remixicon/react";

interface Props {
    projects: any[];
    skills: any[];
    achievements: any[];
    work_experiences: any[];
    education_experiences: any[];
    settings: Record<string, any>;
}

function parseJson<T>(val: unknown): T | null {
    if (!val) return null;
    if (typeof val === "string") {
        try { return JSON.parse(val) as T; } catch { return null; }
    }
    return val as T;
}

// Skills Section
const SkillsSection = ({ skills = [] }: { skills: any[] }) => {
    return (
        <section id="skills" className="mb-16 scroll-mt-16 md:mb-24 lg:scroll-mt-24">
            <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-0 lg:px-0 lg:py-0 lg:bg-transparent lg:backdrop-blur-none lg:mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">02 . core tech stack</span>
                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Skills</h2>
            </div>
            
            <div className="space-y-6">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Here are some of the tools, frameworks, and technologies I work with to build scalable and optimized applications.
                </p>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill: any) => {
                        let finalSlug = "";
                        if (skill.icon && skill.icon.startsWith("Si")) {
                            finalSlug = skill.icon.substring(2).toLowerCase();
                        } else {
                            finalSlug = skill.name.toLowerCase()
                                .replace(/\.js$/, "dotjs")
                                .replace(/ /g, "")
                                .replace(/\+/g, "plus")
                                .replace(/#/g, "sharp");
                            const slugMap: Record<string, string> = {
                                "next.js": "nextdotjs",
                                "node.js": "nodedotjs",
                                "framer motion": "framer",
                                "express.js": "express",
                                "tailwind css": "tailwindcss",
                            };
                            finalSlug = slugMap[skill.name.toLowerCase()] || finalSlug;
                        }
                        const iconUrl = `https://cdn.simpleicons.org/${finalSlug}`;
                        return (
                            <div key={skill.id} className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent/40 transition-colors">
                                <img 
                                    src={iconUrl} 
                                    alt={skill.name} 
                                    className="size-3.5 object-contain animate-fade-in"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                />
                                <span>{skill.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

// Achievements Section
const AchievementsSection = ({ achievements = [] }: { achievements: any[] }) => {
    return (
        <section id="achievements" className="mb-16 scroll-mt-16 md:mb-24 lg:scroll-mt-24">
            <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-0 lg:px-0 lg:py-0 lg:bg-transparent lg:backdrop-blur-none lg:mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">05 . awards & recognition</span>
                <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Achievement</h2>
            </div>
            
            <div className="space-y-8">
                {achievements.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {achievements.map((item: any) => {
                            const Icon = item.category === 'award' ? RiTrophyLine : (item.category === 'certification' ? RiMedalLine : RiStarLine);
                            const getImageUrl = (image: string) => {
                                if (!image) return "";
                                if (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("/")) {
                                    return image;
                                }
                                return `/storage/${image}`;
                            };
                            return (
                                <a
                                    key={item.id}
                                    href={`/achievements/${item.id}`}
                                    className="group relative grid gap-4 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 hover:bg-accent/30 -mx-4 p-4 rounded-lg"
                                >
                                    {/* Kiri: Preview Image/Icon */}
                                    <div className="z-10 sm:col-span-2">
                                        {item.preview_image ? (
                                            <div className="w-full aspect-video sm:aspect-auto sm:h-16 rounded border border-border bg-muted/30 overflow-hidden">
                                                <img
                                                    src={getImageUrl(item.preview_image)}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-full aspect-video sm:aspect-auto sm:h-16 rounded border border-dashed border-border bg-muted/10 flex items-center justify-center">
                                                <Icon className="size-6 text-muted-foreground/45" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Kanan: Details */}
                                    <div className="z-10 sm:col-span-6 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-semibold leading-tight text-foreground text-sm sm:text-base group-hover:text-primary transition-colors flex items-center gap-1.5">
                                                {item.title}
                                                <RiArrowRightUpLine className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                            </h3>
                                            <p className="text-xs text-muted-foreground/80 mt-1">
                                                {item.organization} · {item.year}
                                            </p>
                                            {item.description && (
                                                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground/60 italic">Achievements coming soon.</p>
                )}
                
                <Link
                    href="/achievements"
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group"
                >
                    View All Achievements
                    <RiArrowRightUpLine className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
            </div>
        </section>
    );
};

export default function Home({ projects, skills, achievements, work_experiences, education_experiences, settings }: Props) {
    // ── All from DB, never hardcoded ──
    const name = (typeof settings.hero_title === "string" ? settings.hero_title.replace(/<[^>]+>/g, "") : null)
        || "Aji Nur Aji";
    const role = (settings.role as string) || "Fullstack Developer";
    const tagline = (typeof settings.hero_subtitle === "string" ? settings.hero_subtitle.replace(/<[^>]+>/g, "") : null)
        || "Crafting modern, high-performance web applications.";

    // Navigation: use custom nav_links from DB
    const rawNav = parseJson<Array<{ label: string; href: string }>>(settings.nav_links) ?? [];
    const customNav = rawNav
        .filter((n) => !/^home$/i.test(n.label) && n.href !== "/" && n.href !== "")
        .map((n) => ({ ...n, href: n.href.replace(/^\/+/, "") }));
    
    const builtInSections = [
        { label: "About", href: "#about" },
        { label: "Skills", href: "#skills" },
        { label: "Projects", href: "#projects" },
        { label: "Experience", href: "#experience" },
        { label: "Achievement", href: "#achievements" },
    ];
    const navSections = customNav?.length ? customNav : builtInSections;

    // Social links from DB
    const dbSocialLinks = parseJson<Array<{ platform: string; url: string }>>(settings.social_links) ?? [];
    const socialLinks = dbSocialLinks.length > 0
        ? dbSocialLinks
        : settings.github_url
            ? [{ platform: "github", url: settings.github_url as string }]
            : [];

    const githubUrl = (settings.github_url as string) || "https://github.com/ajinuraji";
    const contactEmail = settings.contact_email as string | undefined;
    const aboutImage = settings.about_image as string | undefined;

    // WakaTime
    const wakatimeUsername = settings.wakatime_username as string | undefined;
    const wakatimeShareIds = parseJson<Array<{ label: string; url: string }>>(settings.wakatime_share_ids) ?? [];

    // Scroll-Spy logic to track which section is currently active
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        // Collect all IDs to observe (including github and wakatime if enabled)
        const idsToObserve = navSections.map((n) => n.href.replace("#", "")).filter(Boolean);
        if (settings.github_token) idsToObserve.push("github");
        if (wakatimeUsername) idsToObserve.push("wakatime");

        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(`#${entry.target.id}`);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        idsToObserve.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => {
            idsToObserve.forEach((id) => {
                const el = document.getElementById(id);
                if (el) observer.unobserve(el);
            });
        };
    }, [navSections, settings.github_token, wakatimeUsername]);

    return (
        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0 bg-background text-muted-foreground antialiased transition-colors duration-300">
            <Head title={settings.site_title || name} />

            <div className="lg:flex lg:gap-16">
                <Sidebar
                    name={name}
                    role={role}
                    tagline={tagline}
                    githubUrl={githubUrl}
                    socialLinks={socialLinks}
                    navSections={navSections}
                    activeSection={activeSection}
                />

                <main className="pt-12 lg:py-24 lg:w-[52%]">
                    <About
                        title={settings.about_title as string}
                        description={settings.about_description as string}
                        githubUrl={githubUrl}
                        contactEmail={contactEmail}
                        image={aboutImage}
                    />
                    
                    <SkillsSection skills={skills} />
                    
                    <ProjectsSection initialProjects={projects} />
                    
                    <Experience
                        workExperiences={work_experiences}
                        educationExperiences={education_experiences}
                    />
                    
                    <AchievementsSection achievements={achievements} />
                    
                    {settings.github_token && (
                        <GithubStats githubUrl={githubUrl} />
                    )}
                    
                    {wakatimeUsername && (
                        <WakaTimeStats
                            wakatimeUsername={wakatimeUsername}
                            wakatimeShareIds={wakatimeShareIds}
                        />
                    )}

                    <footer className="mt-24 pb-8">
                        <p className="text-xs text-muted-foreground/50 leading-relaxed">
                            Built with Laravel, Inertia.js & React. &copy; {new Date().getFullYear()} {name}.
                        </p>
                    </footer>
                </main>
            </div>
        </div>
    );
}
