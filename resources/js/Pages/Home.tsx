import { Navbar } from "@/Components/Elements/navbar";
import { Footer } from "@/Components/Elements/footer";
import Hero from "@/Components/Sections/hero";
import About from "@/Components/Sections/about";
import Skills from "@/Components/Sections/skills";
import Experience from "@/Components/Sections/experience";
import ProjectsSection from "@/Components/Sections/projects";
import AchievementsSection from "@/Components/Sections/achievements";
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

    return (
        <div className="font-sans bg-background text-foreground selection:bg-primary/10 selection:text-primary">
            <Head title="Portfolio" />
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
