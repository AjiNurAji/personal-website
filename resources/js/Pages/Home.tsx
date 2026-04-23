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
    experiences: any[];
}

export default function Home({ projects, skills, achievements, experiences }: Props) {
    return (
        <div className="font-sans bg-background text-foreground selection:bg-primary/10 selection:text-primary">
            <Head title="Portfolio" />
            <InteractiveCursor />
            <Navbar />
            <main className="min-h-screen w-full">
                <Hero />
                <About />
                <Skills initialSkills={skills} />
                <Experience initialExperiences={experiences} />
                <ProjectsSection initialProjects={projects} />
                <AchievementsSection initialAchievements={achievements} />
            </main>
            <Footer />
        </div>
    );
}
