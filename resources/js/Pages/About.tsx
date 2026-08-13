import ClientLayout from "@/Layouts/ClientLayout";
import { Head } from "@inertiajs/react";
import Experience from "@/Components/Sections/experience";
import AboutSection from "@/Components/Sections/about";
import { useTranslation } from "@/lib/i18n";
import StatsHighlights from "@/Components/Sections/stats-highlights";

interface Props {
    settings: Record<string, any>;
    work_experiences: any[];
    education_experiences: any[];
}

export default function About({ settings, work_experiences, education_experiences }: Props) {
    const { t } = useTranslation();
    const githubUrl = settings.github_url || "";
    return (
        <ClientLayout active="About" name={settings.hero_title?.replace(/<[^>]+>/g, "") || "Aji Nur Aji"} role={settings.role || "Fullstack Developer"} tagline={settings.hero_subtitle || "Crafting modern, high-performance web applications."} contactEmail={settings.contact_email} settings={settings} title={t("About")} description={settings.about_page_intro || t("A closer look at my background, working style, and professional journey.")}>
            <Head title="About — Aji Nur Aji" />
            <AboutSection
                title={settings.about_title}
                description={settings.about_description}
                githubUrl={githubUrl}
                contactEmail={settings.contact_email}
                image={settings.about_image}
            />
            <Experience workExperiences={work_experiences} educationExperiences={education_experiences} />
            <StatsHighlights settings={settings} />
        </ClientLayout>
    );
}
