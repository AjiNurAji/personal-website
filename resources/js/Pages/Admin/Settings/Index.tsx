"use client";

import { cn } from "@/lib/utils";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/UI/button";
import { Input } from "@/Components/UI/input";
import { Textarea } from "@/Components/UI/textarea";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/Components/UI/field";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/UI/select";
import { FormEvent, useState } from "react";
import { RiAddLine, RiDeleteBinLine, RiUserLine, RiLayoutLine, RiSettings4Line, RiGlobalLine } from "@remixicon/react";
import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "@/hooks/use-theme";
import { Checkbox } from "@/Components/UI/checkbox";
import { IconPicker } from "@/Components/Dashboard/IconPicker";

interface Props {
  settings: Record<string, any>;
}

interface BilingualFieldProps {
  label: string;
  en: string;
  id: string;
  multiline?: boolean;
  onChange: (locale: 'en' | 'id', value: string) => void;
}

function BilingualField({ label, en, id, multiline = false, onChange }: BilingualFieldProps) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <FieldContent>
        <div className="grid gap-3 md:grid-cols-2">
          {(['en', 'id'] as const).map((locale) => (
            <div key={locale} className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {locale === 'en' ? 'English' : 'Indonesia'}
              </span>
              {multiline ? (
                <Textarea
                  rows={4}
                  value={locale === 'en' ? en : id}
                  onChange={(event) => onChange(locale, event.target.value)}
                />
              ) : (
                <Input
                  value={locale === 'en' ? en : id}
                  onChange={(event) => onChange(locale, event.target.value)}
                />
              )}
            </div>
          ))}
        </div>
      </FieldContent>
    </Field>
  );
}

function bilingualValue(settings: Record<string, any>, key: string, englishFallback: string, indonesianFallback: string) {
  return {
    en: settings[`${key}_en`] || settings[key] || englishFallback,
    id: settings[`${key}_id`] || indonesianFallback,
  };
}

function parseArray(value: unknown, fallback: any[]) {
  try {
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function localizedArrayValue(settings: Record<string, any>, key: string, englishFallback: any[], indonesianFallback: any[]) {
  return {
    en: parseArray(settings[`${key}_en`] || settings[key], englishFallback),
    id: parseArray(settings[`${key}_id`], indonesianFallback),
  };
}

export default function SettingsIndex({ settings }: Props) {
  const { theme } = useTheme();
  // Parse nav_links if it's a string
  const initialNavLinks = settings.nav_links ? (typeof settings.nav_links === 'string' ? JSON.parse(settings.nav_links) : settings.nav_links) : [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Achievement", href: "#achievement" },
    { label: "Stats", href: "/stats", icon: "Ri:RiBarChart2Line" },
  ];

  const initialSocialLinks = settings.social_links ? (typeof settings.social_links === 'string' ? JSON.parse(settings.social_links) : settings.social_links) : [
    { platform: "github", url: "https://github.com/ajinuraji" },
    { platform: "instagram", url: "#" },
    { platform: "tiktok", url: "#" },
    { platform: "coffee", url: "#" },
  ];

  const parseWakaShares = (key = 'wakatime_share_ids') => {
    if (!settings[key]) return [];
    const raw = typeof settings[key] === 'string' ? JSON.parse(settings[key]) : settings[key];
    return Array.isArray(raw) ? raw : [];
  };

  const aboutTitle = bilingualValue(settings, 'about_title', "Passionate about creating impactful web experiences", "Bersemangat menciptakan pengalaman web yang berdampak");
  const aboutDescription = bilingualValue(settings, 'about_description', "I have hands-on experience in developing responsive interfaces and managing backend systems...", "Saya berpengalaman mengembangkan antarmuka responsif dan mengelola sistem backend...");
  const aboutPageIntro = bilingualValue(settings, 'about_page_intro', "A closer look at my background, working style, and professional journey.", "Kenali lebih dekat latar belakang, gaya kerja, dan perjalanan profesional saya.");
  const heroTitle = bilingualValue(settings, 'hero_title', "Hi, I'm Aji Nur Aji", "Hai, saya Aji Nur Aji");
  const heroSubtitle = bilingualValue(settings, 'hero_subtitle', "Fullstack Developer & Networking Enthusiast", "Fullstack Developer & Penggemar Networking");
  const homeEyebrow = bilingualValue(settings, 'home_eyebrow', "Welcome / portfolio", "Selamat datang / portofolio");
  const homeLocation = bilingualValue(settings, 'home_location', "Based in Indonesia", "Berbasis di Indonesia");
  const homeStatus = bilingualValue(settings, 'home_status', "Open to collaboration", "Terbuka untuk kolaborasi");
  const homeIntro = bilingualValue(settings, 'home_intro', "I am passionate about building digital products that are clean, fast, and meaningful—from intuitive web interfaces to backend systems ready to scale.", "Saya antusias membangun produk digital yang rapi, cepat, dan berdampak—dari antarmuka web yang intuitif hingga sistem backend yang siap berkembang.");
  const homeFocus = bilingualValue(settings, 'home_focus', "I enjoy turning ideas into experiences that are simple, measurable, and delightful to use.", "Saya menikmati proses mengubah ide menjadi pengalaman yang sederhana, terukur, dan menyenangkan digunakan.");
  const homeCta = bilingualValue(settings, 'home_cta_label', "Let's build together", "Mari membangun bersama");
  const skillsTitle = bilingualValue(settings, 'skills_title', "Skills", "Keahlian");
  const skillsSubtitle = bilingualValue(settings, 'skills_subtitle', "My professional skills.", "Keahlian profesional saya.");
  const siteTitle = bilingualValue(settings, 'site_title', "Aji Nur Aji — Fullstack Developer Portfolio", "Aji Nur Aji — Portofolio Fullstack Developer");
  const siteDescription = bilingualValue(settings, 'site_description', "Portfolio of Aji Nur Aji, a passionate Fullstack Developer.", "Portofolio Aji Nur Aji, seorang Fullstack Developer.");
  const availabilityMessages = localizedArrayValue(settings, 'availability_messages', ["Open to work", "Let's build together", "Available for projects"], ["Terbuka untuk pekerjaan", "Mari membangun bersama", "Tersedia untuk proyek"]);
  const defaultNavLinks = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Achievement", href: "#achievement" },
    { label: "Stats", href: "/stats", icon: "Ri:RiBarChart2Line" },
  ];
  const defaultNavLinksId = [
    { label: "Beranda", href: "#" },
    { label: "Tentang Saya", href: "#about" },
    { label: "Proyek", href: "#projects" },
    { label: "Pengalaman", href: "#experience" },
    { label: "Pencapaian", href: "#achievement" },
    { label: "Statistik", href: "/stats", icon: "Ri:RiBarChart2Line" },
  ];
  const ensureStatsNavLink = (links: any[], label: string) => links.some((link) => String(link?.href || '').split('?')[0] === '/stats')
    ? links
    : [...links, { label, href: '/stats', icon: 'Ri:RiBarChart2Line' }];
  const navLinksEn = ensureStatsNavLink(parseArray(settings.nav_links_en || settings.nav_links, defaultNavLinks), 'Stats');
  const navLinksId = ensureStatsNavLink(parseArray(settings.nav_links_id, defaultNavLinksId), 'Statistik');

  const { data, setData, post, processing, errors } = useForm({
    about_title: aboutTitle.en,
    about_title_en: aboutTitle.en,
    about_title_id: aboutTitle.id,
    about_description: aboutDescription.en,
    about_description_en: aboutDescription.en,
    about_description_id: aboutDescription.id,
    about_page_intro: aboutPageIntro.en,
    about_page_intro_en: aboutPageIntro.en,
    about_page_intro_id: aboutPageIntro.id,
    hero_subtitle: heroSubtitle.en,
    hero_subtitle_en: heroSubtitle.en,
    hero_subtitle_id: heroSubtitle.id,
    hero_title: heroTitle.en,
    hero_title_en: heroTitle.en,
    hero_title_id: heroTitle.id,
    role: settings.role || "Fullstack Developer",
    role_en: settings.role_en || settings.role || "Fullstack Developer",
    role_id: settings.role_id || "Fullstack Developer",
    home_eyebrow: homeEyebrow.en,
    home_eyebrow_en: homeEyebrow.en,
    home_eyebrow_id: homeEyebrow.id,
    home_location: homeLocation.en,
    home_location_en: homeLocation.en,
    home_location_id: homeLocation.id,
    home_status: homeStatus.en,
    home_status_en: homeStatus.en,
    home_status_id: homeStatus.id,
    home_intro: homeIntro.en,
    home_intro_en: homeIntro.en,
    home_intro_id: homeIntro.id,
    home_focus: homeFocus.en,
    home_focus_en: homeFocus.en,
    home_focus_id: homeFocus.id,
    home_cta_label: homeCta.en,
    home_cta_label_en: homeCta.en,
    home_cta_label_id: homeCta.id,
    skills_title: skillsTitle.en,
    skills_title_en: skillsTitle.en,
    skills_title_id: skillsTitle.id,
    skills_subtitle: skillsSubtitle.en,
    skills_subtitle_en: skillsSubtitle.en,
    skills_subtitle_id: skillsSubtitle.id,
    availability_messages: availabilityMessages.en,
    availability_messages_en: availabilityMessages.en,
    availability_messages_id: availabilityMessages.id,
    nav_links: initialNavLinks,
    nav_links_en: navLinksEn,
    nav_links_id: navLinksId,
    contact_email: settings.contact_email || "contact@example.com",
    github_url: settings.github_url || "https://github.com/ajinuraji",
    github_token: settings.github_token || "",
    wakatime_username: settings.wakatime_username || "",
    wakatime_share_ids: parseWakaShares('wakatime_share_ids_en'),
    wakatime_share_ids_en: parseWakaShares('wakatime_share_ids_en').length ? parseWakaShares('wakatime_share_ids_en') : parseWakaShares(),
    wakatime_share_ids_id: parseWakaShares('wakatime_share_ids_id').length ? parseWakaShares('wakatime_share_ids_id') : parseWakaShares(),
    about_image: settings.about_image || "https://github.com/ajinuraji.png",
    is_available: settings.is_available === '1' || settings.is_available === true || settings.is_available === 'true',
    social_links: initialSocialLinks,
    site_title: siteTitle.en,
    site_title_en: siteTitle.en,
    site_title_id: siteTitle.id,
    site_description: siteDescription.en,
    site_description_en: siteDescription.en,
    site_description_id: siteDescription.id,
    google_site_verification: settings.google_site_verification || "",
  });

  function setLocalizedData(key: string, locale: 'en' | 'id', value: string) {
    setData(`${key}_${locale}` as any, value);
  }

  function addNavLink() {
    const link = { label: "", href: "#", icon: "Ri:RiHomeLine" };
    setData('nav_links', [...data.nav_links, link]);
    setData('nav_links_en', [...data.nav_links_en, link]);
    setData('nav_links_id', [...data.nav_links_id, link]);
  }

  function removeNavLink(index: number) {
    setData('nav_links', data.nav_links.filter((_: any, itemIndex: number) => itemIndex !== index));
    setData('nav_links_en', data.nav_links_en.filter((_: any, itemIndex: number) => itemIndex !== index));
    setData('nav_links_id', data.nav_links_id.filter((_: any, itemIndex: number) => itemIndex !== index));
  }

  function updateNavLink(index: number, field: 'label' | 'href', value: string) {
    const newLinks = [...data.nav_links];
    newLinks[index][field] = value;
    setData('nav_links', newLinks);
  }

  function updateLocalizedNavLink(locale: 'en' | 'id', index: number, field: 'label' | 'href' | 'icon', value: string) {
    const key = locale === 'en' ? 'nav_links_en' : 'nav_links_id';
    const links = [...data[key]];
    links[index] = { ...links[index], [field]: value };
    setData(key, links);
    if (field === 'icon' || field === 'href') {
      const baseLinks = [...data.nav_links];
      baseLinks[index] = { ...baseLinks[index], [field]: value };
      setData('nav_links', baseLinks);
    }
  }

  function updateNavDestination(index: number, value: string) {
    const update = (links: any[]) => links.map((link, itemIndex) => itemIndex === index ? { ...link, href: value } : link);
    setData('nav_links_en', update(data.nav_links_en));
    setData('nav_links_id', update(data.nav_links_id));
    setData('nav_links', update(data.nav_links));
  }

  function updateNavIcon(index: number, value: string) {
    const update = (links: any[]) => links.map((link, itemIndex) => itemIndex === index ? { ...link, icon: value } : link);
    setData('nav_links_en', update(data.nav_links_en));
    setData('nav_links_id', update(data.nav_links_id));
    setData('nav_links', update(data.nav_links));
  }

  function addSocialLink() {
    setData('social_links', [...data.social_links, { platform: "github", url: "" }]);
  }

  function removeSocialLink(index: number) {
    const newLinks = [...data.social_links];
    newLinks.splice(index, 1);
    setData('social_links', newLinks);
  }

  function updateSocialLink(index: number, field: 'platform' | 'url', value: string) {
    const newLinks = [...data.social_links];
    newLinks[index][field] = value;
    setData('social_links', newLinks);
  }

  function addWakaShare() {
    const share = { label: "", url: "" };
    setData('wakatime_share_ids_en', [...data.wakatime_share_ids_en, share]);
    setData('wakatime_share_ids_id', [...data.wakatime_share_ids_id, share]);
    setData('wakatime_share_ids', [...data.wakatime_share_ids_en, share]);
  }

  function removeWakaShare(index: number) {
    setData('wakatime_share_ids_en', data.wakatime_share_ids_en.filter((_: any, itemIndex: number) => itemIndex !== index));
    setData('wakatime_share_ids_id', data.wakatime_share_ids_id.filter((_: any, itemIndex: number) => itemIndex !== index));
    setData('wakatime_share_ids', data.wakatime_share_ids.filter((_: any, itemIndex: number) => itemIndex !== index));
  }

  function updateWakaShare(locale: 'en' | 'id', index: number, field: 'label' | 'url', value: string) {
    const key = locale === 'en' ? 'wakatime_share_ids_en' : 'wakatime_share_ids_id';
    const shares = [...data[key]];
    shares[index] = { ...shares[index], [field]: value };
    setData(key, shares);
    if (field === 'url') setData('wakatime_share_ids', shares);
  }

  const [activeTab, setActiveTab] = useState<'general' | 'about' | 'socials' | 'navigation' | 'seo'>('general');

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    post(route('admin.settings.update'), {
      onSuccess: () => {
        toast.success("Settings updated successfully");
      },
    });
  }

  const tabs = [
    { id: 'general', label: 'Hero Section', icon: RiLayoutLine },
    { id: 'about', label: 'About Me', icon: RiUserLine },
    { id: 'socials', label: 'Socials & Status', icon: RiSettings4Line },
    { id: 'seo', label: 'SEO', icon: RiGlobalLine },
    { id: 'navigation', label: 'Navigation', icon: RiAddLine },
  ];

  return (
    <AdminLayout title="Site Settings">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
          <p className="text-muted-foreground">
            Control your landing page content and navigation.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            {/* Tabs Sidebar */}
            <div className="w-full shrink-0 lg:sticky lg:top-6 lg:w-60">
              <div className="flex flex-row gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                {tabs.map((tab) => (
                    <Button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as any)}
                        variant={activeTab === tab.id ? "default" : "ghost"}
                        className="justify-start gap-3 whitespace-nowrap"
                    >
                        <tab.icon className="size-4" />
                        {tab.label}
                    </Button>
                ))}
              </div>
            </div>

            <div className="min-w-0 flex-1">
                <form onSubmit={onSubmit} className="relative min-h-[500px] space-y-8 rounded-xl border bg-card p-4 text-card-foreground shadow-sm sm:p-6">
                    {/* General Tab */}
                    {activeTab === 'general' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h2 className="text-xl font-semibold border-b pb-2">Hero Section</h2>
                            <div className="grid grid-cols-1 gap-6">
                                <BilingualField label="Hero Title" en={data.hero_title_en} id={data.hero_title_id} onChange={(locale, value) => setLocalizedData('hero_title', locale, value)} />
                                <BilingualField label="Role / Sidebar Label" en={data.role_en} id={data.role_id} onChange={(locale, value) => setLocalizedData('role', locale, value)} />
                                <BilingualField label="Hero Subtitle" en={data.hero_subtitle_en} id={data.hero_subtitle_id} onChange={(locale, value) => setLocalizedData('hero_subtitle', locale, value)} />
                                <BilingualField label="Home Eyebrow" en={data.home_eyebrow_en} id={data.home_eyebrow_id} onChange={(locale, value) => setLocalizedData('home_eyebrow', locale, value)} />
                                <BilingualField label="Home CTA Label" en={data.home_cta_label_en} id={data.home_cta_label_id} onChange={(locale, value) => setLocalizedData('home_cta_label', locale, value)} />
                                <BilingualField label="Home Location" en={data.home_location_en} id={data.home_location_id} onChange={(locale, value) => setLocalizedData('home_location', locale, value)} />
                                <BilingualField label="Home Status" en={data.home_status_en} id={data.home_status_id} onChange={(locale, value) => setLocalizedData('home_status', locale, value)} />
                                <BilingualField label="Home Intro" multiline en={data.home_intro_en} id={data.home_intro_id} onChange={(locale, value) => setLocalizedData('home_intro', locale, value)} />
                                <BilingualField label="Home Focus" multiline en={data.home_focus_en} id={data.home_focus_id} onChange={(locale, value) => setLocalizedData('home_focus', locale, value)} />
                            </div>
                        </div>
                    )}

                    {/* About Tab */}
                    {activeTab === 'about' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h2 className="text-xl font-semibold border-b pb-2">About Section</h2>
                            <BilingualField label="About Title" en={data.about_title_en} id={data.about_title_id} onChange={(locale, value) => setData(`about_title_${locale}`, value)} />

                            <Field>
                                <FieldLabel>Profile Image</FieldLabel>
                                <FieldContent>
                                    <div className="flex items-center gap-4">
                                        <div className="size-16 rounded-xl border overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                                            {typeof data.about_image === 'string' && data.about_image ? (
                                                <img 
                                                    src={data.about_image.startsWith('http') || data.about_image.startsWith('/') ? data.about_image : `/storage/${data.about_image}`} 
                                                    alt="Preview" 
                                                    className="w-full h-full object-cover" 
                                                />
                                            ) : data.about_image instanceof File ? (
                                                <img 
                                                    src={URL.createObjectURL(data.about_image)} 
                                                    alt="Preview" 
                                                    className="w-full h-full object-cover" 
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No img</div>
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <Input 
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setData('about_image', e.target.files?.[0] || data.about_image)}
                                                className="cursor-pointer"
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Select a new image to replace the current one. Leave empty to keep existing.
                                            </p>
                                        </div>
                                    </div>
                                    {errors.about_image && <FieldError errors={[errors.about_image]} />}
                                </FieldContent>
                            </Field>

                            <BilingualField label="About Page Intro" multiline en={data.about_page_intro_en} id={data.about_page_intro_id} onChange={(locale, value) => setData(`about_page_intro_${locale}`, value)} />

                            <div className="space-y-3">
                                <span className="text-sm font-medium">About Description (Markdown)</span>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {(['en', 'id'] as const).map((locale) => (
                                        <div key={locale} className="space-y-2">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{locale === 'en' ? 'English' : 'Indonesia'}</span>
                                            <div data-color-mode={theme} className="w-full overflow-hidden rounded-md border">
                                                <MDEditor
                                                    value={locale === 'en' ? data.about_description_en : data.about_description_id}
                                                    onChange={(value) => setData(`about_description_${locale}`, value || '')}
                                                    preview="edit"
                                                    height={300}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <BilingualField label="Skills Title" en={data.skills_title_en} id={data.skills_title_id} onChange={(locale, value) => setLocalizedData('skills_title', locale, value)} />
                            <BilingualField label="Skills Subtitle" en={data.skills_subtitle_en} id={data.skills_subtitle_id} onChange={(locale, value) => setLocalizedData('skills_subtitle', locale, value)} />
                        </div>
                    )}

                    {/* Socials Tab */}
                    {activeTab === 'socials' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold border-b pb-2">Basic Info & Status</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel>Contact Email</FieldLabel>
                                        <FieldContent>
                                            <Input 
                                                type="email"
                                                value={data.contact_email}
                                                onChange={(e) => setData('contact_email', e.target.value)}
                                                placeholder="contact@example.com"
                                            />
                                            {errors.contact_email && <FieldError errors={[errors.contact_email]} />}
                                        </FieldContent>
                                    </Field>
                                    <Field>
                                        <FieldLabel>GitHub URL</FieldLabel>
                                        <FieldContent>
                                            <Input 
                                                value={data.github_url}
                                                onChange={(e) => setData('github_url', e.target.value)}
                                                placeholder="https://github.com/..."
                                            />
                                            {errors.github_url && <FieldError errors={[errors.github_url]} />}
                                        </FieldContent>
                                    </Field>
                                </div>
                                
                                <Field>
                                    <FieldLabel className="flex items-center gap-2">
                                        GitHub Personal Access Token
                                        <span className="text-xs text-muted-foreground font-normal">(for private repos)</span>
                                    </FieldLabel>
                                    <FieldContent>
                                        <Input 
                                            type="text"
                                            value={data.github_token}
                                            onChange={(e) => setData('github_token', e.target.value)}
                                            placeholder="ghp_..."
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Create at <a href="https://github.com/settings/tokens" target="_blank" className="underline">github.com/settings/tokens</a> with <code>repo</code> scope.
                                        </p>
                                        {errors.github_token && <FieldError errors={[errors.github_token]} />}
                                    </FieldContent>
                                </Field>
                                
                                <Field>
                                    <FieldLabel className="flex items-center gap-2">
                                        WakaTime Username
                                        <span className="text-xs text-muted-foreground font-normal">(coding stats)</span>
                                    </FieldLabel>
                                    <FieldContent>
                                        <Input 
                                            value={data.wakatime_username}
                                            onChange={(e) => setData('wakatime_username', e.target.value)}
                                            placeholder="your-wakatime-username"
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Shows coding activity chart on the landing page. Leave empty to hide.
                                        </p>
                                    </FieldContent>
                                </Field>

                                {/* WakaTime Share Embeds */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b pb-2">
                                        <div>
                                            <h3 className="text-lg font-semibold">WakaTime Chart Embeds</h3>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                Get embed URLs at <a href="https://wakatime.com/share/embed" target="_blank" className="underline">WakaTime → Share → Embed</a>. Choose chart type, click "Get Embeddable Code", copy the URL.
                                            </p>
                                        </div>
                                        <Button type="button" variant="outline" size="sm" onClick={addWakaShare}>
                                            <RiAddLine className="mr-2 h-4 w-4" /> Add Chart
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        {data.wakatime_share_ids_en.map((share: any, index: number) => (
                                            <div key={index} className="rounded-lg border bg-zinc-50/50 p-4 dark:bg-zinc-900/50">
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <Field>
                                                        <FieldLabel>English Label</FieldLabel>
                                                        <Input value={data.wakatime_share_ids_en[index]?.label || ''} onChange={(e) => updateWakaShare('en', index, 'label', e.target.value)} placeholder="Languages" />
                                                    </Field>
                                                    <Field>
                                                        <FieldLabel>Indonesia Label</FieldLabel>
                                                        <Input value={data.wakatime_share_ids_id[index]?.label || ''} onChange={(e) => updateWakaShare('id', index, 'label', e.target.value)} placeholder="Bahasa" />
                                                    </Field>
                                                </div>
                                                <div className="mt-4 flex items-end gap-4">
                                                    <Field className="flex-1">
                                                        <FieldLabel>Embed URL</FieldLabel>
                                                        <Input value={data.wakatime_share_ids_en[index]?.url || ''} onChange={(e) => updateWakaShare('en', index, 'url', e.target.value)} placeholder="https://wakatime.com/share/..." />
                                                    </Field>
                                                    <Button type="button" variant="ghost" size="icon" className="text-red-500 mb-0.5" onClick={() => removeWakaShare(index)}>
                                                        <RiDeleteBinLine className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        {data.wakatime_share_ids.length === 0 && (
                                            <p className="text-sm text-muted-foreground text-center py-4">
                                                No chart embeds yet. Click "Add Chart" to start.
                                            </p>
                                        )}
                                    </div>
                                </div>
                                
                                <Field>
                                    <FieldLabel>Availability Badge Messages</FieldLabel>
                                    <FieldContent>
                                        <div className="grid gap-3 md:grid-cols-2">
                                            {(['en', 'id'] as const).map((locale) => {
                                                const key = locale === 'en' ? 'availability_messages_en' : 'availability_messages_id';
                                                return (
                                                    <div key={locale} className="space-y-1.5">
                                                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{locale === 'en' ? 'English' : 'Indonesia'}</span>
                                                        <Textarea
                                                            rows={3}
                                                            value={data[key].join("\n")}
                                                            onChange={(e) => setData(key, e.target.value.split("\n").map((message) => message.trim()).filter(Boolean))}
                                                            placeholder={locale === 'en' ? "Open to work\nLet's build together\nAvailable for projects" : "Terbuka untuk pekerjaan\nMari membangun bersama\nTersedia untuk proyek"}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <p className="text-xs text-muted-foreground">One message per line. The sidebar rotates messages using the active language.</p>
                                    </FieldContent>
                                </Field>

                                <Field className="flex flex-row items-center justify-between rounded-lg border p-4 space-y-0">
                                    <div className="space-y-0.5">
                                        <FieldLabel className="text-base">Available for Hire</FieldLabel>
                                        <p className="text-sm text-muted-foreground">
                                            Show availability badge on landing page.
                                        </p>
                                    </div>
                                    <FieldContent>
                                        <Checkbox 
                                            checked={data.is_available}
                                            onCheckedChange={(checked) => setData('is_available', !!checked)}
                                        />
                                    </FieldContent>
                                </Field>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between border-b pb-2">
                                    <h2 className="text-xl font-semibold">Social Links (Footer)</h2>
                                    <Button type="button" variant="outline" size="sm" onClick={addSocialLink}>
                                        <RiAddLine className="mr-2 h-4 w-4" /> Add Social
                                    </Button>
                                </div>
                                <div className="space-y-4">
                                    {data.social_links.map((link: any, index: number) => (
                                        <div key={index} className="flex gap-4 items-end border p-4 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/50">
                                            <Field className="w-48">
                                                <FieldLabel>Platform</FieldLabel>
                                                <Select 
                                                    value={link.platform} 
                                                    onValueChange={(val) => updateSocialLink(index, 'platform', val)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Platform" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="github">GitHub</SelectItem>
                                                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                                                        <SelectItem value="instagram">Instagram</SelectItem>
                                                        <SelectItem value="twitter">Twitter / X</SelectItem>
                                                        <SelectItem value="tiktok">TikTok</SelectItem>
                                                        <SelectItem value="facebook">Facebook</SelectItem>
                                                        <SelectItem value="youtube">YouTube</SelectItem>
                                                        <SelectItem value="telegram">Telegram</SelectItem>
                                                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                                        <SelectItem value="coffee">Buy Me Coffee</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </Field>
                                            <Field className="flex-1">
                                                <FieldLabel>URL</FieldLabel>
                                                <Input 
                                                    value={link.url}
                                                    onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
                                                    placeholder="https://..."
                                                />
                                            </Field>
                                            <Button 
                                                type="button" 
                                                variant="ghost" 
                                                size="icon" 
                                                className="text-red-500"
                                                onClick={() => removeSocialLink(index)}
                                            >
                                                <RiDeleteBinLine className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SEO Tab */}
                    {activeTab === 'seo' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h2 className="text-xl font-semibold border-b pb-2">Search Engine & Meta</h2>

                            <BilingualField label="Site Title" en={data.site_title_en} id={data.site_title_id} onChange={(locale, value) => setLocalizedData('site_title', locale, value)} />
                            <p className="-mt-4 text-xs text-muted-foreground">Appears in browser tab and search results (max 120 chars).</p>

                            <BilingualField label="Site Description" multiline en={data.site_description_en} id={data.site_description_id} onChange={(locale, value) => setLocalizedData('site_description', locale, value)} />
                            <p className="-mt-4 text-xs text-muted-foreground">Appears in search result snippets (max 300 chars).</p>

                            <Field>
                                <FieldLabel className="flex items-center gap-2">
                                    Google Search Console Verification
                                </FieldLabel>
                                <FieldContent>
                                    <Input 
                                        value={data.google_site_verification}
                                        onChange={(e) => setData('google_site_verification', e.target.value)}
                                        placeholder="Paste the code from google-site-verification meta tag"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        From GSC → HTML tag → copy only the <code>content="..."</code> value. Saves into your site's <code>&lt;meta name="google-site-verification"&gt;</code> tag.
                                    </p>
                                </FieldContent>
                            </Field>
                        </div>
                    )}

                    {/* Navigation Tab */}
                    {activeTab === 'navigation' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex items-center justify-between border-b pb-2">
                                <h2 className="text-xl font-semibold">Navigation Links</h2>
                                <Button type="button" variant="outline" size="sm" onClick={addNavLink}>
                                    <RiAddLine className="mr-2 h-4 w-4" /> Add Link
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {data.nav_links_en.map((link: any, index: number) => (
                                    <div key={index} className="rounded-lg border bg-zinc-50/50 p-4 dark:bg-zinc-900/50">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {(['en', 'id'] as const).map((locale) => {
                                                const localizedLink = locale === 'en' ? data.nav_links_en[index] : data.nav_links_id[index];
                                                return (
                                                    <Field key={locale}>
                                                        <FieldLabel>{locale === 'en' ? 'English Label' : 'Indonesia Label'}</FieldLabel>
                                                        <Input
                                                            value={localizedLink?.label || ''}
                                                            onChange={(e) => updateLocalizedNavLink(locale, index, 'label', e.target.value)}
                                                            placeholder={locale === 'en' ? 'Home' : 'Beranda'}
                                                        />
                                                    </Field>
                                                );
                                            })}
                                        </div>
                                        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
                                            <Field>
                                                <FieldLabel>Icon</FieldLabel>
                                                <IconPicker
                                                    value={data.nav_links_en[index]?.icon || ''}
                                                    onChange={(value) => updateNavIcon(index, value)}
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel>Href</FieldLabel>
                                                <Input
                                                    value={data.nav_links_en[index]?.href || ''}
                                                    onChange={(e) => updateNavDestination(index, e.target.value)}
                                                    placeholder="#about"
                                                />
                                            </Field>
                                            <Button type="button" variant="ghost" size="icon" className="text-red-500" onClick={() => removeNavLink(index)}>
                                                <RiDeleteBinLine className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="sticky bottom-0 -mx-4 mt-auto flex justify-end border-t bg-card/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
                        <Button type="submit" className="w-full px-10 sm:w-auto" disabled={processing}>
                            {processing ? "Saving..." : "Save All Settings"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
}
