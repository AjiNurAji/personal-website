import { Head } from "@inertiajs/react";
import { RiCodeBoxLine, RiFlaskLine, RiLightbulbLine } from "@remixicon/react";
import ClientLayout from "@/Layouts/ClientLayout";

interface Props {
    settings?: Record<string, any>;
}

const experiments = [
    {
        title: "Interface Experiments",
        description: "Menguji pola interaksi, micro-interactions, dan komponen antarmuka yang membuat produk terasa lebih jelas dan menyenangkan digunakan.",
        icon: RiLightbulbLine,
        tag: "UI / UX",
    },
    {
        title: "Backend Prototypes",
        description: "Prototipe kecil untuk mengeksplorasi API, automation, caching, dan pendekatan arsitektur sebelum diterapkan ke project utama.",
        icon: RiFlaskLine,
        tag: "Engineering",
    },
    {
        title: "Open Source & Tools",
        description: "Eksperimen dengan tooling, developer experience, dan solusi open-source yang membantu proses development menjadi lebih cepat.",
        icon: RiCodeBoxLine,
        tag: "Open source",
    },
];

export default function Experiments({ settings = {} }: Props) {
    const name = settings.hero_title?.replace(/<[^>]+>/g, "") || "Aji Nur Aji";
    const role = settings.role || "Fullstack Developer";

    return (
        <>
            <Head title={`Experiments — ${name}`} />
            <ClientLayout
                active="Experiments"
                name={name}
                role={role}
                tagline={settings.hero_subtitle || "Crafting modern, high-performance web applications."}
                contactEmail={settings.contact_email}
                settings={settings}
                title="Experiments"
                description="Ruang untuk mencoba ide, teknologi, dan pendekatan baru tanpa kehilangan fokus pada hasil yang berguna."
            >
                <section className="space-y-5">
                    <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                        Tidak semua ide langsung menjadi produk. Halaman ini berisi eksplorasi singkat yang membantu saya belajar, menguji asumsi, dan menemukan cara kerja yang lebih baik.
                    </p>

                    <div className="grid gap-4 md:grid-cols-3">
                        {experiments.map((experiment) => {
                            const Icon = experiment.icon;
                            return (
                                <article key={experiment.title} className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-accent/40">
                                    <div className="flex items-center justify-between gap-3">
                                        <Icon className="size-5 text-primary" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{experiment.tag}</span>
                                    </div>
                                    <h2 className="mt-8 font-semibold text-foreground">{experiment.title}</h2>
                                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{experiment.description}</p>
                                </article>
                            );
                        })}
                    </div>
                </section>
            </ClientLayout>
        </>
    );
}
