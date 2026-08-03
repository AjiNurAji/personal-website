import { Head } from "@inertiajs/react";
import ClientLayout from "@/Layouts/ClientLayout";

interface Props { skills: any[]; settings?: Record<string, any> }

export default function Skills({ skills, settings = {} }: Props) {
    return (
        <ClientLayout active="Skills" name={settings.hero_title?.replace(/<[^>]+>/g, "")} role={settings.role} tagline={settings.hero_subtitle} contactEmail={settings.contact_email} settings={settings} title="Skills" description="The tools, frameworks, and technologies I use to turn ideas into reliable products.">
            <Head title="Skills — Aji Nur Aji" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {skills.map((skill) => (
                    <article key={skill.id} className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-accent/40">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="font-semibold">{skill.name}</h2>
                            <span className="text-xs text-muted-foreground">{skill.category || "Core"}</span>
                        </div>
                        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-muted">
                            <div className="h-full rounded-full bg-primary transition-all duration-500 group-hover:w-full" style={{ width: `${Math.min(Number(skill.level) || 70, 100)}%` }} />
                        </div>
                    </article>
                ))}
            </div>
        </ClientLayout>
    );
}
