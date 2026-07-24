import { Navbar } from "@/Components/Elements/navbar";
import { Footer } from "@/Components/Elements/footer";
import Hero from "@/Components/Sections/hero";
import About from "@/Components/Sections/about";
import Skills from "@/Components/Sections/skills";
import Experience from "@/Components/Sections/experience";
import GithubStats from "@/Components/Sections/github-stats";
import ProjectsSection from "@/Components/Sections/projects";
import AchievementsSection from "@/Components/Sections/achievements";
import WakaTimeStats from "@/Components/Sections/wakatime-stats";
import { InteractiveCursor } from "@/Components/Elements/InteractiveCursor";
import { Head } from "@inertiajs/react";

interface Props {
    projects: any[];
    skills: any[];
    achievements: any[];
    work_experiences: any[];
    education_experiences: any[];
    settings: Record<string, any>;
}

export default function Home({ projects, skills, achievements, work_experiences, education_experiences, settings }: Props) {
    const navLinks = settings.nav_links ? (typeof settings.nav_links === 'string' ? JSON.parse(settings.nav_links) : settings.nav_links) : null;
    const isAvailable = settings.is_available === '1' || settings.is_available === true || settings.is_available === 'true';

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "name": "Aji Nur Aji — Fullstack Developer",
                "url": "https://ajinuraji.my.id",
                "description": "Portfolio of Aji Nur Aji, a passionate Fullstack Developer specializing in building modern web applications.",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://ajinuraji.my.id/projects?search={search_term_string}",
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "Person",
                "name": "Aji Nur Aji",
                "jobTitle": "Fullstack Developer",
                "url": "https://ajinuraji.my.id",
                "sameAs": settings.social_links
                    ? (typeof settings.social_links === 'string' ? JSON.parse(settings.social_links) : settings.social_links)
                        .filter((l: any) => l.url)
                        .map((l: any) => l.url)
                    : []
            }
        ]
    };

    return (
        <div className="font-sans bg-background text-foreground selection:bg-primary/10 selection:text-primary">
            <Head>
                <title>Aji Nur Aji — Fullstack Developer Portfolio</title>
                <meta name="description" content={settings.site_description || "Portfolio of Aji Nur Aji, a passionate Fullstack Developer specializing in building modern web applications with Laravel, React, and Node.js."} />
                <link rel="canonical" href="https://ajinuraji.my.id" />
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            </Head>
            <InteractiveCursor />
            <Navbar customLinks={navLinks} isAvailable={isAvailable} />
            <main className="min-h-screen w-full">
                <Hero 
                    title={settings.hero_title} 
                    subtitle={settings.hero_subtitle} 
                    isAvailable={isAvailable}
                />
                <About 
                    title={settings.about_title} 
                    description={settings.about_description} 
                    githubUrl={settings.github_url}
                    contactEmail={settings.contact_email}
                    image={settings.about_image}
                />
                <Skills initialSkills={skills} />
                <Experience 
                    workExperiences={work_experiences} 
                    educationExperiences={education_experiences} 
                />
                <GithubStats githubUrl={settings.github_url} />
                <WakaTimeStats wakatimeUsername={settings.wakatime_username} wakatimeShareIds={settings.wakatime_share_ids ? (typeof settings.wakatime_share_ids === 'string' ? JSON.parse(settings.wakatime_share_ids) : settings.wakatime_share_ids) : null} />
                <ProjectsSection initialProjects={projects} />
                <AchievementsSection initialAchievements={achievements} />
            </main>
            <Footer 
                customLinks={navLinks} 
                socialLinks={settings.social_links ? (typeof settings.social_links === 'string' ? JSON.parse(settings.social_links) : settings.social_links) : null}
            />
        </div>
    );
}
