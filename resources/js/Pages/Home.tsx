import { Head } from "@inertiajs/react";
import ClientLayout from "@/Layouts/ClientLayout";
import { Badge } from "@/Components/UI/badge";
import { Button } from "@/Components/UI/button";
import { RiArrowRightLine, RiCodeSSlashLine, RiMailLine } from "@remixicon/react";
import { useTranslation } from "@/lib/i18n";

interface Props {
    skills: any[];
    settings: Record<string, any>;
}

function cleanText(value: unknown, fallback: string) {
    return typeof value === "string" && value.trim()
        ? value.replace(/<[^>]+>/g, "")
        : fallback;
}

function cleanName(value: string) {
    return value.replace(/^\s*(hi\s*,?\s*i['’]?m|hai\s*,?\s*(saya|aku))\s+/i, "").trim() || "Aji Nur Aji";
}

function getSkillSlug(skill: any) {
    const icon = String(skill.icon || "");
    if (icon.startsWith("Si")) return icon.substring(2).toLowerCase();
    return String(skill.name || "")
        .toLowerCase()
        .replace(/\.js$/, "dotjs")
        .replace(/ /g, "")
        .replace(/\+/g, "plus")
        .replace(/#/g, "sharp");
}

const skillCategories = ["All", "Frontend", "Backend", "Mobile", "Database", "Tools"];

function SkillsSection({ skills = [], settings }: { skills: any[]; settings: Record<string, any> }) {
    const { t } = useTranslation();

    return (
        <section id="skills" className="border-t border-border/70 py-14 sm:py-20">
            <div className="mb-7 flex items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-primary">
                        <RiCodeSSlashLine className="size-5" />
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">{t(cleanText(settings.skills_title, "Skills"))}</h2>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{t(cleanText(settings.skills_subtitle, "My professional skills."))}</p>
                </div>
                <Badge variant="secondary" className="rounded-full">{skills.length} {t("skills")}</Badge>
            </div>

            <div className="mb-8 flex flex-wrap gap-2" aria-label="Skill categories">
                {skillCategories.map((category, index) => (
                    <Button
                        key={category}
                        type="button"
                        size="sm"
                        variant={index === 0 ? "default" : "outline"}
                        className="rounded-full"
                    >
                        {t(category)}
                        <span className="ml-1 rounded-full bg-background/20 px-1.5 text-[10px]">{index === 0 ? skills.length : "—"}</span>
                    </Button>
                ))}
            </div>

            <div className="flex flex-wrap gap-2.5">
                {skills.map((skill: any) => {
                    const name = String(skill.name || "");
                    const slug = getSkillSlug(skill);
                    return (
                        <Badge
                            key={skill.id || name}
                            variant="outline"
                            className="h-9 gap-2 rounded-full border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
                        >
                            {slug && (
                                <img
                                    src={`https://cdn.simpleicons.org/${slug}`}
                                    alt=""
                                    loading="lazy"
                                    className="size-4 object-contain"
                                    onError={(event) => { event.currentTarget.style.display = "none"; }}
                                />
                            )}
                            {name}
                        </Badge>
                    );
                })}
                {skills.length === 0 && <p className="text-sm italic text-muted-foreground">{t("Skills data is coming soon.")}</p>}
            </div>
        </section>
    );
}

export default function Home({ skills, settings }: Props) {
    const name = cleanName(cleanText(settings.hero_title, "Aji Nur Aji"));
    const role = cleanText(settings.role, "Fullstack Developer");
    const contactEmail = settings.contact_email as string | undefined;
    const eyebrow = cleanText(settings.home_eyebrow, "Welcome / portfolio");
    const location = cleanText(settings.home_location, "Based in Indonesia");
    const status = cleanText(settings.home_status, "Open to collaboration");
    const description = cleanText(settings.home_intro, "I am passionate about building digital products that are clean, fast, and meaningful—from intuitive web interfaces to backend systems ready to scale.");
    const focus = cleanText(settings.home_focus, "I enjoy turning ideas into experiences that are simple, measurable, and delightful to use.");
    const ctaLabel = cleanText(settings.home_cta_label, "Let's build together");
    const { t } = useTranslation();

    return (
        <ClientLayout
            active="Home"
            name={name}
            role={role}
            tagline={cleanText(settings.hero_subtitle, "Crafting modern, high-performance web applications.")}
            contactEmail={contactEmail}
            settings={settings}
            showPageHeader={false}
        >
            <Head title={settings.site_title || name} />
            <main className="min-w-0">
                <section id="about" className="pb-14 pt-4 sm:pb-20 sm:pt-8">
                    <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">{t(eyebrow)}</p>
                    <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">
                        Hi, <span className="text-primary">I&apos;m</span> {name}
                    </h1>
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                        <span><i className="mr-2 inline-block size-2 rounded-full bg-primary" />{t(location)}</span>
                        <span><i className="mr-2 inline-block size-2 rounded-full bg-primary/60" />{t(status)}</span>
                    </div>
                    <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
                        <p>{t(description)}</p>
                        <p>{t(focus)}</p>
                    </div>
                    {contactEmail && (
                        <Button asChild size="lg" className="group mt-8 rounded-full px-5">
                            <a href={`mailto:${contactEmail}`}>
                                <RiMailLine />
                                {t(ctaLabel)}
                                <RiArrowRightLine className="transition-transform group-hover:translate-x-1" />
                            </a>
                        </Button>
                    )}
                </section>
                <SkillsSection skills={skills} settings={settings} />
            </main>
        </ClientLayout>
    );
}

