import { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import ClientLayout from "@/Layouts/ClientLayout";
import { Badge } from "@/Components/UI/badge";
import { Button } from "@/Components/UI/button";
import { RiArrowRightLine, RiCodeSSlashLine, RiMailLine } from "@remixicon/react";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { useTranslation } from "@/lib/i18n";
import { getIconComponent } from "@/Components/Dashboard/IconRegistry";
import { AnimatePresence, motion } from "framer-motion";

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

const skillAccents = [
    "border-sky-400/30 bg-sky-400/10 hover:bg-sky-400/15",
    "border-violet-400/30 bg-violet-400/10 hover:bg-violet-400/15",
    "border-emerald-400/30 bg-emerald-400/10 hover:bg-emerald-400/15",
    "border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/15",
    "border-rose-400/30 bg-rose-400/10 hover:bg-rose-400/15",
    "border-cyan-400/30 bg-cyan-400/10 hover:bg-cyan-400/15",
];

function getSkillAccent(skill: any) {
    const value = `${skill.name || ""}:${skill.icon || ""}`;
    const hash = Array.from(value).reduce((total, char) => total + char.charCodeAt(0), 0);
    return skillAccents[hash % skillAccents.length];
}

const skillCategories = ["All", "Frontend", "Backend", "Mobile", "Database", "Tools"];

function SkillsSection({ skills = [], settings }: { skills: any[]; settings: Record<string, any> }) {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState("All");

    // Collect categories from skill data (support comma-separated values)
    const derivedCategories = useMemo(() => {
        const cats = new Set<string>();
        skills.forEach((s) => {
            const raw = String(s.category || "");
            raw.split(",").forEach((c) => {
                const trimmed = c.trim();
                if (trimmed) cats.add(trimmed);
            });
        });
        return ["All", ...Array.from(cats).sort()];
    }, [skills]);

    const displayCategories = derivedCategories.length > 1 ? derivedCategories : skillCategories;

    const filteredSkills = useMemo(() => {
        if (activeCategory === "All") return skills;
        return skills.filter((s) => {
            const raw = String(s.category || "");
            return raw.split(",").map((c) => c.trim()).includes(activeCategory);
        });
    }, [skills, activeCategory]);

    return (
        <section id="skills" className="border-t border-border/70 py-14 sm:py-20">
            <AnimateIn className="mb-7 flex items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-primary">
                        <RiCodeSSlashLine className="size-5" />
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">{t(cleanText(settings.skills_title, "Skills"))}</h2>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{t(cleanText(settings.skills_subtitle, "My professional skills."))}</p>
                </div>
                <Badge variant="secondary" className="rounded-full border-primary/20 bg-primary/5 text-primary">{skills.length} {t("skills")}</Badge>
            </AnimateIn>

            <AnimateIn variant="fade-left" delay={0.08} className="mb-8">
                <div className="flex flex-wrap gap-2" aria-label="Skill categories">
                {displayCategories.map((category) => {
                    const isActive = activeCategory === category;
                    return (
                        <Button
                            key={category}
                            type="button"
                            size="sm"
                            variant={isActive ? "default" : "outline"}
                            className="rounded-full"
                            onClick={() => setActiveCategory(category)}
                        >
                            {t(category)}
                            <span className="ml-1 rounded-full bg-background/20 px-1.5 text-[10px]">
                                {category === "All"
                                    ? skills.length
                                    : skills.filter((s) => {
                                        const raw = String(s.category || "");
                                        return raw.split(",").map((c) => c.trim()).includes(category);
                                    }).length || "—"}
                            </span>
                        </Button>
                    );
                })}
                </div>
            </AnimateIn>

            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={activeCategory}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.045 } },
                        exit: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
                    }}
                    className="flex flex-wrap gap-2.5"
                >
                    {filteredSkills.map((skill: any) => {
                        const name = String(skill.name || "");
                        const slug = getSkillSlug(skill);
                        const SkillIcon = getIconComponent(skill.icon);
                        return (
                            <motion.div
                                key={skill.id || name}
                                variants={{
                                    hidden: { opacity: 0, y: 8, scale: 0.96 },
                                    visible: { opacity: 1, y: 0, scale: 1 },
                                    exit: { opacity: 0, y: -6, scale: 0.96 },
                                }}
                                transition={{ duration: 0.24, ease: "easeOut" }}
                            >
                                <Badge
                                    variant="outline"
                                    className={`h-9 gap-2 rounded-full px-3 text-sm font-medium text-foreground transition-colors ${getSkillAccent(skill)}`}
                                >
                                    {SkillIcon ? (
                                        <SkillIcon className="size-4" aria-hidden="true" />
                                    ) : slug ? (
                                        <img
                                            src={`https://cdn.simpleicons.org/${slug}`}
                                            alt=""
                                            loading="lazy"
                                            className="size-4 object-contain"
                                            onError={(event) => { event.currentTarget.style.display = "none"; }}
                                        />
                                    ) : null}
                                    {name}
                                </Badge>
                            </motion.div>
                        );
                    })}
                    {filteredSkills.length === 0 && <p className="text-sm italic text-muted-foreground">{t("Skills data is coming soon.")}</p>}
                </motion.div>
            </AnimatePresence>
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
                    <AnimateIn className="relative isolate w-full overflow-hidden rounded-3xl border border-border/60 bg-card/70 p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl after:absolute after:-right-16 after:-top-20 after:size-48 after:rounded-full after:bg-primary/10 after:blur-3xl dark:bg-card/60 dark:shadow-black/20 sm:p-10">
                        <div className="relative z-10">
                        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-primary">{t(eyebrow)}</p>
                        <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">
                            Hi, <span className="text-primary">I&apos;m</span> {name}
                        </h1>
                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
                            <span><i className="mr-2 inline-block size-2 rounded-full bg-primary" />{t(location)}</span>
                            <span><i className="mr-2 inline-block size-2 rounded-full bg-primary/60" />{t(status)}</span>
                        </div>
                        <div className="mt-8 space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
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
                        </div>
                    </AnimateIn>
                </section>
                <SkillsSection skills={skills} settings={settings} />
            </main>
        </ClientLayout>
    );
}

