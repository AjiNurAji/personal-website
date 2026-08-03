import { Head } from "@inertiajs/react";
import ClientLayout from "@/Layouts/ClientLayout";
import ExperienceSection from "@/Components/Sections/experience";

interface Props {
    settings: Record<string, any>;
    work_experiences: any[];
    education_experiences: any[];
}

export default function Experience({ settings, work_experiences, education_experiences }: Props) {
    const name = settings.hero_title?.replace(/<[^>]+>/g, "") || "Aji Nur Aji";

    return (
        <ClientLayout
            active="Experience"
            name={name}
            role={settings.role || "Fullstack Developer"}
            tagline={settings.hero_subtitle || "Crafting modern, high-performance web applications."}
            contactEmail={settings.contact_email}
            settings={settings}
            title="Experience"
            description="A concise overview of my professional experience and education journey."
        >
            <Head title={`Experience — ${name}`} />
            <ExperienceSection
                workExperiences={work_experiences}
                educationExperiences={education_experiences}
            />
        </ClientLayout>
    );
}

