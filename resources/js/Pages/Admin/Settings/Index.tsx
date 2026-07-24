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

interface Props {
  settings: Record<string, any>;
}

export default function SettingsIndex({ settings }: Props) {
  const { theme } = useTheme();
  // Parse nav_links if it's a string
  const initialNavLinks = settings.nav_links ? (typeof settings.nav_links === 'string' ? JSON.parse(settings.nav_links) : settings.nav_links) : [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Achievement", href: "#achievement" },
  ];

  const initialSocialLinks = settings.social_links ? (typeof settings.social_links === 'string' ? JSON.parse(settings.social_links) : settings.social_links) : [
    { platform: "github", url: "https://github.com/ajinuraji" },
    { platform: "instagram", url: "#" },
    { platform: "tiktok", url: "#" },
    { platform: "coffee", url: "#" },
  ];

  const parseWakaShares = () => {
    if (!settings.wakatime_share_ids) return [];
    const raw = typeof settings.wakatime_share_ids === 'string' ? JSON.parse(settings.wakatime_share_ids) : settings.wakatime_share_ids;
    return Array.isArray(raw) ? raw : [];
  };

  const { data, setData, post, processing, errors } = useForm({
    about_title: settings.about_title || "Passionate about creating impactful web experiences",
    about_description: settings.about_description || "I have hands-on experience in developing responsive interfaces and managing backend systems...",
    hero_title: settings.hero_title || "Hi, I'm Aji Nur Aji",
    hero_subtitle: settings.hero_subtitle || "Fullstack Developer & Networking Enthusiast",
    nav_links: initialNavLinks,
    contact_email: settings.contact_email || "contact@example.com",
    github_url: settings.github_url || "https://github.com/ajinuraji",
    github_token: settings.github_token || "",
    wakatime_username: settings.wakatime_username || "",
    wakatime_share_ids: parseWakaShares(),
    about_image: settings.about_image || "https://github.com/ajinuraji.png",
    is_available: settings.is_available === '1' || settings.is_available === true || settings.is_available === 'true',
    social_links: initialSocialLinks,
    site_title: settings.site_title || "",
    site_description: settings.site_description || "",
    google_site_verification: settings.google_site_verification || "",
  });

  function addNavLink() {
    setData('nav_links', [...data.nav_links, { label: "", href: "" }]);
  }

  function removeNavLink(index: number) {
    const newLinks = [...data.nav_links];
    newLinks.splice(index, 1);
    setData('nav_links', newLinks);
  }

  function updateNavLink(index: number, field: 'label' | 'href', value: string) {
    const newLinks = [...data.nav_links];
    newLinks[index][field] = value;
    setData('nav_links', newLinks);
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
    setData('wakatime_share_ids', [...data.wakatime_share_ids, { label: "", url: "" }]);
  }

  function removeWakaShare(index: number) {
    const newShares = [...data.wakatime_share_ids];
    newShares.splice(index, 1);
    setData('wakatime_share_ids', newShares);
  }

  function updateWakaShare(index: number, field: 'label' | 'url', value: string) {
    const newShares = [...data.wakatime_share_ids];
    newShares[index][field] = value;
    setData('wakatime_share_ids', newShares);
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

        <div className="flex flex-col lg:flex-row gap-8">
            {/* Tabs Sidebar */}
            <div className="w-full lg:w-64 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all whitespace-nowrap",
                            activeTab === tab.id 
                                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md" 
                                : "text-muted-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        )}
                    >
                        <tab.icon className="size-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="flex-1">
                <form onSubmit={onSubmit} className="space-y-8 border p-6 rounded-xl bg-white dark:bg-zinc-950 shadow-sm min-h-[500px]">
                    {/* General Tab */}
                    {activeTab === 'general' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h2 className="text-xl font-semibold border-b pb-2">Hero Section</h2>
                            <div className="grid grid-cols-1 gap-6">
                                <Field>
                                    <FieldLabel>Hero Title</FieldLabel>
                                    <FieldContent>
                                        <Input 
                                            value={data.hero_title}
                                            onChange={(e) => setData('hero_title', e.target.value)}
                                        />
                                        {errors.hero_title && <FieldError errors={[errors.hero_title]} />}
                                    </FieldContent>
                                </Field>
                                <Field>
                                    <FieldLabel>Hero Subtitle</FieldLabel>
                                    <FieldContent>
                                        <Input 
                                            value={data.hero_subtitle}
                                            onChange={(e) => setData('hero_subtitle', e.target.value)}
                                        />
                                        {errors.hero_subtitle && <FieldError errors={[errors.hero_subtitle]} />}
                                    </FieldContent>
                                </Field>
                            </div>
                        </div>
                    )}

                    {/* About Tab */}
                    {activeTab === 'about' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h2 className="text-xl font-semibold border-b pb-2">About Section</h2>
                            <Field>
                                <FieldLabel>About Title</FieldLabel>
                                <FieldContent>
                                    <Input 
                                        value={data.about_title}
                                        onChange={(e) => setData('about_title', e.target.value)}
                                    />
                                    {errors.about_title && <FieldError errors={[errors.about_title]} />}
                                </FieldContent>
                            </Field>

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

                            <Field>
                                <FieldLabel>About Description (Markdown)</FieldLabel>
                                <FieldContent className="min-h-[350px]">
                                    <div data-color-mode={theme} className="w-full">
                                        <MDEditor
                                            value={data.about_description}
                                            onChange={(val) => setData("about_description", val || "")}
                                            preview="edit"
                                            height={350}
                                        />
                                    </div>
                                    {errors.about_description && <FieldError errors={[errors.about_description]} />}
                                </FieldContent>
                            </Field>
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
                                        {data.wakatime_share_ids.map((share: any, index: number) => (
                                            <div key={index} className="flex gap-4 items-end border p-4 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/50">
                                                <Field className="flex-1">
                                                    <FieldLabel>Label</FieldLabel>
                                                    <Input 
                                                        value={share.label}
                                                        onChange={(e) => updateWakaShare(index, 'label', e.target.value)}
                                                        placeholder="Languages"
                                                    />
                                                </Field>
                                                <Field className="flex-[2]">
                                                    <FieldLabel>Embed URL</FieldLabel>
                                                    <Input 
                                                        value={share.url}
                                                        onChange={(e) => updateWakaShare(index, 'url', e.target.value)}
                                                        placeholder="https://wakatime.com/share/..."
                                                    />
                                                </Field>
                                                <Button 
                                                    type="button" 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="text-red-500 mb-0.5"
                                                    onClick={() => removeWakaShare(index)}
                                                >
                                                    <RiDeleteBinLine className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        {data.wakatime_share_ids.length === 0 && (
                                            <p className="text-sm text-muted-foreground text-center py-4">
                                                No chart embeds yet. Click "Add Chart" to start.
                                            </p>
                                        )}
                                    </div>
                                </div>
                                
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
                                                        <SelectItem value="instagram">Instagram</SelectItem>
                                                        <SelectItem value="tiktok">TikTok</SelectItem>
                                                        <SelectItem value="coffee">Buy Me Coffee</SelectItem>
                                                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                                                        <SelectItem value="twitter">Twitter / X</SelectItem>
                                                        <SelectItem value="facebook">Facebook</SelectItem>
                                                        <SelectItem value="youtube">YouTube</SelectItem>
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

                            <Field>
                                <FieldLabel>Site Title</FieldLabel>
                                <FieldContent>
                                    <Input 
                                        value={data.site_title}
                                        onChange={(e) => setData('site_title', e.target.value)}
                                        placeholder="Aji Nur Aji — Fullstack Developer Portfolio"
                                        maxLength={120}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">Appears in browser tab and search results (max 120 chars).</p>
                                </FieldContent>
                            </Field>

                            <Field>
                                <FieldLabel>Site Description</FieldLabel>
                                <FieldContent>
                                    <Textarea 
                                        value={data.site_description}
                                        onChange={(e) => setData('site_description', e.target.value)}
                                        placeholder="Portfolio of Aji Nur Aji, a passionate Fullstack Developer..."
                                        maxLength={300}
                                        rows={3}
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">Appears in search result snippets (max 300 chars).</p>
                                </FieldContent>
                            </Field>

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
                                {data.nav_links.map((link: any, index: number) => (
                                    <div key={index} className="flex gap-4 items-end border p-4 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/50">
                                        <Field className="flex-1">
                                            <FieldLabel>Label</FieldLabel>
                                            <Input 
                                                value={link.label}
                                                onChange={(e) => updateNavLink(index, 'label', e.target.value)}
                                                placeholder="Home"
                                            />
                                        </Field>
                                        <Field className="flex-1">
                                            <FieldLabel>Href</FieldLabel>
                                            <Input 
                                                value={link.href}
                                                onChange={(e) => updateNavLink(index, 'href', e.target.value)}
                                                placeholder="#about"
                                            />
                                        </Field>
                                        <Button 
                                            type="button" 
                                            variant="ghost" 
                                            size="icon" 
                                            className="text-red-500"
                                            onClick={() => removeNavLink(index)}
                                        >
                                            <RiDeleteBinLine className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="pt-6 border-t mt-auto">
                        <Button type="submit" className="w-full lg:w-auto px-10" disabled={processing}>
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
