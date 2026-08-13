import { Link } from "@inertiajs/react";
import { Sidebar } from "@/Components/Elements/sidebar";
import { useTranslation } from "@/lib/i18n";

interface ClientLink {
    label: string;
    href: string;
    icon?: string;
}

interface ClientLayoutProps {
    children: React.ReactNode;
    active?: string;
    title?: string;
    description?: string;
    name?: string;
    role?: string;
    tagline?: string;
    contactEmail?: string;
    settings?: Record<string, any>;
    showPageHeader?: boolean;
}

export const CLIENT_NAVIGATION: ClientLink[] = [
    { label: "Home", href: "/", icon: "Ri:RiHomeLine" },
    { label: "About", href: "/about", icon: "Ri:RiUserLine" },
    { label: "Projects", href: "/projects", icon: "Ri:RiCodeBoxLine" },
    { label: "Achievements", href: "/achievements", icon: "Ri:RiMedalLine" },
    { label: "Stats", href: "/stats", icon: "Ri:RiBarChart2Line" },
];

function cleanName(value: string) {
    return value.replace(/^\s*hi\s*,?\s*i['’]?m\s+/i, "").trim() || "Aji Nur Aji";
}

function getGithubAvatar(settings: Record<string, any>) {
    const configuredImage = String(settings.about_image || "").trim();
    if (configuredImage) {
        return configuredImage.startsWith("http") || configuredImage.startsWith("/")
            ? configuredImage
            : `/storage/${configuredImage}`;
    }

    const username = String(settings.github_url || "").replace(/\/$/, "").split("/").pop();
    return username ? `https://github.com/${username}.png?size=160` : undefined;
}

function parseSettingArray(value: unknown, fallback: string[]) {
    try {
        const parsed = typeof value === "string" ? JSON.parse(value) : value;
        return Array.isArray(parsed) && parsed.length > 0 ? parsed.map(String) : fallback;
    } catch {
        return fallback;
    }
}

function normalizeNavigationHref(href: unknown) {
    const value = String(href || "/").trim();
    const sectionRoutes: Record<string, string> = {
        about: "/about",
        skills: "/#skills",
        projects: "/projects",
        experience: "/about#experience",
        achievement: "/achievements",
        achievements: "/achievements",
    };

    if (value === "#") return "/";
    if (value.startsWith("/#") || value.startsWith("http://") || value.startsWith("https://")) return value;
    if (value.startsWith("#")) return sectionRoutes[value.slice(1).toLowerCase()] || `/${value}`;
    if (value.startsWith("/")) return value;

    return `/${value}`;
}

function getNavigation(settings: Record<string, any>) {
    try {
        const parsed = typeof settings.nav_links === "string" ? JSON.parse(settings.nav_links) : settings.nav_links;
        if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map((link) => ({
                ...link,
                href: normalizeNavigationHref(link?.href),
                icon: link?.icon || CLIENT_NAVIGATION[parsed.indexOf(link)]?.icon,
            }));
        }
    } catch {
        // Fall back to the application navigation.
    }
    return CLIENT_NAVIGATION;
}

function getSocialLinks(settings: Record<string, any>) {
    try {
        const parsed =
            typeof settings.social_links === "string"
                ? JSON.parse(settings.social_links)
                : settings.social_links;
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
        // Fall back to the configured GitHub link.
    }

    return settings.github_url
        ? [{ platform: "github", url: settings.github_url }]
        : [];
}

export default function ClientLayout({
    children,
    active,
    title = "",
    description = "",
    name = "Aji Nur Aji",
    role = "Fullstack Developer",
    tagline = "Crafting modern, high-performance web applications.",
    contactEmail,
    settings = {},
    showPageHeader = true,
}: ClientLayoutProps) {
    const { t } = useTranslation();
    const displayName = cleanName(name);

    return (
        <div className="min-h-screen bg-background text-foreground antialiased">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <div className="w-full shrink-0 px-6 pt-10 sm:px-10 lg:w-[320px] lg:px-10 lg:pt-0">
                    <Sidebar
                        name={displayName}
                        role={t(role)}
                        tagline={t(tagline)}
                        socialLinks={getSocialLinks(settings)}
                        navSections={getNavigation(settings)}
                        activeSection={active}
                        contactEmail={contactEmail}
                        avatarUrl={getGithubAvatar(settings)}
                        availabilityMessages={parseSettingArray(settings.availability_messages, ["Open to work", "Let's build together", "Available for projects"])}
                    />
                </div>

                <main id="main-content" tabIndex={-1} className="min-w-0 flex-1 border-border/70 px-5 py-12 outline-none sm:px-8 lg:border-l lg:px-16 lg:py-16">
                    <div className="w-full">
                        {showPageHeader && title && (
                            <div className="mb-10 max-w-3xl">
                                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                                    portfolio / {t(title).toLowerCase()}
                                </p>
                                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                                    {t(title)}
                                </h1>
                                {description && (
                                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                                        {t(description)}
                                    </p>
                                )}
                            </div>
                        )}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
