import { useEffect, useMemo, useState } from "react";
import { Head } from "@inertiajs/react";
import ClientLayout from "@/Layouts/ClientLayout";
import { Button } from "@/Components/UI/button";
import { RiArrowRightLine, RiCodeSSlashLine, RiMailLine } from "@remixicon/react";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { useTranslation } from "@/lib/i18n";
import { getIconComponent } from "@/Components/Dashboard/IconRegistry";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import StatsHighlights from "@/Components/Sections/stats-highlights";

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

const skillIconSlugs: Record<string, string> = {
    html: "html5",
    css: "css3",
    javascript: "javascript",
    js: "javascript",
    typescript: "typescript",
    ts: "typescript",
    "next.js": "nextdotjs",
    nextjs: "nextdotjs",
    "shadcn ui": "shadcnui",
    "tailwind css": "tailwindcss",
    "express.js": "express",
};

const skillIconColors: Record<string, string> = {
    html5: "e34f26", css3: "1572b6", javascript: "f7df1e", typescript: "3178c6",
    nextdotjs: "ffffff", react: "61dafb", laravel: "ff2d20", php: "777bb4",
    tailwindcss: "06b6d4", shadcnui: "ffffff", express: "ffffff",
    postgresql: "4169e1", mysql: "4479a1", supabase: "3ecf8e",
};

function getSkillNameKey(skill: any) {
    return String(skill.name || "").trim().toLowerCase();
}

function getSkillSlug(skill: any) {
    const nameKey = getSkillNameKey(skill);
    return skillIconSlugs[nameKey] || nameKey
        .replace(/\.js$/i, "dotjs")
        .replace(/\s+/g, "")
        .replace(/\+/g, "plus")
        .replace(/#/g, "sharp")
        .replace(/[^a-z0-9]/g, "");
}

function getSkillIconUrl(skill: any) {
    const slug = getSkillSlug(skill);
    return slug ? `https://cdn.simpleicons.org/${slug}/${skillIconColors[slug] || "a1a1aa"}` : null;
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

function getSkillIconClass(skill: any) {
    const value = `${skill.name || ""} ${skill.icon || ""}`.toLowerCase();
    if (value.includes("laravel")) return "text-red-500";
    if (value.includes("html")) return "text-orange-500";
    if (value.includes("css")) return "text-blue-500";
    if (value.includes("javascript") || value.includes("js")) return "text-yellow-400";
    if (value.includes("typescript") || value.includes("ts")) return "text-blue-400";
    if (value.includes("react")) return "text-cyan-400";
    if (value.includes("tailwind")) return "text-cyan-300";
    if (value.includes("next")) return "text-foreground";
    if (value.includes("php")) return "text-indigo-400";
    if (value.includes("postgres")) return "text-sky-400";
    if (value.includes("mysql")) return "text-blue-300";
    if (value.includes("supabase")) return "text-emerald-400";
    return "text-primary";
}

function normalizeCategory(value: unknown) {
    return String(value || "").trim().toLocaleLowerCase();
}

function getSkillCategories(skills: any[]) {
    const categories = new Map<string, string>();
    skills.forEach((skill) => String(skill.category || "").split(",").forEach((category) => {
        const label = category.trim();
        const key = normalizeCategory(label);
        if (key && !categories.has(key)) categories.set(key, label);
    }));
    return Array.from(categories.values()).sort((a, b) => a.localeCompare(b));
}

function HeroIllustration() {
    const { theme } = useTheme();
    const [activeLayer, setActiveLayer] = useState<"code" | "system" | "scale">("code");
    const isDark = theme === "dark";
    const layerCopy = {
        code: "Clean interfaces, thoughtfully composed.",
        system: "Reliable systems built to stay ready.",
        scale: "Flexible foundations that grow with you.",
    };
    const layers: Array<"code" | "system" | "scale"> = ["code", "system", "scale"];

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveLayer((current) => layers[(layers.indexOf(current) + 1) % layers.length]);
        }, 4200);
        return () => window.clearInterval(timer);
    }, []);

    return (
        <div className="relative mt-10 min-h-[260px] sm:mt-0 sm:min-h-0" aria-label="Interactive abstract technology illustration">
            <motion.button type="button" aria-label="Show code layer" onClick={() => setActiveLayer("code")} whileHover={{ scale: 1.02, rotate: -2 }} whileTap={{ scale: 0.98 }} className={`absolute left-[14%] top-[16%] h-36 w-[72%] -rotate-3 rounded-2xl border p-4 text-left shadow-[0_18px_40px_-24px_rgba(15,23,42,0.5)] transition-colors ${isDark ? "bg-zinc-900/95" : "bg-zinc-50"} ${activeLayer === "code" ? "border-primary/40 ring-2 ring-primary/10" : isDark ? "border-zinc-700" : "border-zinc-200"}`}>
                <div className="flex gap-1.5"><i className="size-2 rounded-full bg-primary" /><i className="size-2 rounded-full bg-zinc-300" /><i className="size-2 rounded-full bg-zinc-300" /></div>
                <div className={`mt-5 space-y-2 font-mono text-[10px] ${isDark ? "text-zinc-500" : "text-zinc-400"}`}><p><span className="text-primary">const</span> product = <span className={isDark ? "text-zinc-200" : "text-zinc-700"}>build</span>();</p><p className="pl-4"><span className={isDark ? "text-zinc-200" : "text-zinc-700"}>return</span> product.ready</p></div>
            </motion.button>
            <motion.button type="button" aria-label="Show system layer" onClick={() => setActiveLayer("system")} whileHover={{ y: -5 }} whileTap={{ scale: 0.96 }} className={`absolute bottom-[10%] left-[4%] flex h-24 w-28 items-center justify-center rounded-xl border shadow-[0_16px_32px_-22px_rgba(15,23,42,0.6)] transition-colors ${isDark ? "bg-zinc-900" : "bg-white"} ${activeLayer === "system" ? "border-primary/40 ring-2 ring-primary/10" : isDark ? "border-zinc-700" : "border-zinc-200"}`}><span className="h-10 w-14 rounded-md border-2 border-zinc-300"><span className="mx-auto mt-2 block h-1 w-7 rounded bg-primary/70" /><span className="mx-auto mt-2 block h-1 w-10 rounded bg-zinc-200" /></span></motion.button>
            <motion.button type="button" aria-label="Show scale layer" onClick={() => setActiveLayer("scale")} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} className={`absolute right-[6%] top-[8%] flex size-24 items-center justify-center rounded-full border bg-primary/[0.06] text-primary transition-colors ${activeLayer === "scale" ? "border-primary/50 ring-2 ring-primary/10" : "border-primary/20"}`}><RiCodeSSlashLine className="size-9" /></motion.button>
            <motion.button type="button" aria-label="Show scalability layer" onClick={() => setActiveLayer("scale")} whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }} className={`absolute bottom-[8%] right-[10%] rounded-lg border px-3 py-2 font-mono text-[10px] shadow-sm transition-colors ${isDark ? "bg-zinc-900 text-zinc-400" : "bg-white text-zinc-500"} ${activeLayer === "scale" ? "border-primary/40" : isDark ? "border-zinc-700" : "border-zinc-200"}`}><span className="text-primary">01</span> / scalable</motion.button>
            <motion.p key={activeLayer} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full whitespace-nowrap pt-2 text-[11px] text-zinc-400 mb-2 sm:mb-0">{layerCopy[activeLayer]}</motion.p>
        </div>
    );
}

function SkillsSection({ skills = [], settings }: { skills: any[]; settings: Record<string, any> }) {
    const { t } = useTranslation();
    const [activeCategory, setActiveCategory] = useState("all");
    const sourceSkills = useMemo(() => skills.length > 0 ? skills : [
        { name: "React", icon: "Ri:RiReactjsLine", category: "Frontend" },
        { name: "Node.js", icon: "Ri:RiNodejsLine", category: "Backend" },
        { name: "Tailwind CSS", icon: "Ri:RiTailwindCssLine", category: "Frontend" },
        { name: "TypeScript", icon: "Ri:RiCodeSLine", category: "Frontend" },
        { name: "PostgreSQL", icon: "Ri:RiDatabase2Line", category: "Database" },
        { name: "Figma", icon: "Ri:RiFigmaLine", category: "Design" },
    ], [skills]);
    const categories = useMemo(() => ["all", ...getSkillCategories(sourceSkills)], [sourceSkills]);
    const visibleSkills = useMemo(() => activeCategory === "all"
        ? sourceSkills
        : sourceSkills.filter((skill) => String(skill.category || "").split(",").some((category) => normalizeCategory(category) === normalizeCategory(activeCategory))),
        [activeCategory, sourceSkills]);

    return (
        <section id="skills" className="border-t border-border/70 py-14 sm:py-20">
            <AnimateIn className="mb-8">
                <div className="flex items-center gap-2 text-primary">
                    <RiCodeSSlashLine className="size-5" />
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">{t(cleanText(settings.skills_title, "Skills"))}</h2>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t(cleanText(settings.skills_subtitle, "A selection of my primary tech stack and design tools."))}</p>
            </AnimateIn>

            <div className="mb-7 flex flex-wrap gap-2" aria-label="Filter skills by category">
                {categories.map((category) => {
                    const active = normalizeCategory(activeCategory) === normalizeCategory(category);
                    const count = category === "all" ? sourceSkills.length : sourceSkills.filter((skill) => String(skill.category || "").split(",").some((item) => normalizeCategory(item) === normalizeCategory(category))).length;
                    return <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`rounded-full border px-3.5 py-2 text-xs font-semibold capitalize transition-colors ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"}`}>{category === "all" ? t("All") : t(category)} <span className="ml-1 opacity-70">{count}</span></button>;
                })}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {visibleSkills.map((skill: any, index) => {
                    const name = String(skill.name || "");
                    const iconUrl = getSkillIconUrl(skill);
                    const SkillIcon = getIconComponent(skill.icon);
                    return (
                        <motion.div key={skill.id || name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="group rounded-2xl border border-border/70 bg-card p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-muted/70">
                                {SkillIcon ? <SkillIcon className={`size-7 ${getSkillIconClass(skill)}`} aria-hidden="true" /> : iconUrl ? <img src={iconUrl} alt="" loading="lazy" className="size-7 object-contain" /> : <span className="text-lg font-bold text-primary">&lt;/&gt;</span>}
                            </div>
                            <p className="mt-3 text-sm font-semibold text-foreground">{name}</p>
                        </motion.div>
                    );
                })}
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
                    <AnimateIn className="relative isolate grid w-full overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] sm:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] sm:p-8 lg:p-10">
                        <div className="relative z-10">
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary">{t(eyebrow)}</p>
                            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl">
                                Hi, I&apos;m <span className="text-primary">{name}</span>
                            </h1>
                            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                                <span className="rounded-full bg-muted px-3 py-1.5">🇮🇩 {t(location)}</span>
                                <span className="rounded-full bg-muted px-3 py-1.5">🤝 {t(status)}</span>
                            </div>
                            <div className="mt-7 max-w-[60%] min-w-[280px] space-y-4 text-base leading-7 text-muted-foreground sm:text-lg">
                                <p>{t(description)}</p>
                                <p>{t(focus)}</p>
                            </div>
                            {contactEmail && <Button asChild size="lg" className="group mt-7 rounded-full px-5"><a href={`mailto:${contactEmail}`}><RiMailLine />{t(ctaLabel)}<RiArrowRightLine className="transition-transform group-hover:translate-x-1" /></a></Button>}
                        </div>
                        <HeroIllustration />
                    </AnimateIn>
                </section>
                <SkillsSection skills={skills} settings={settings} />
                <StatsHighlights settings={settings} />
            </main>
        </ClientLayout>
    );
}

