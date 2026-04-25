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
import { RiAddLine, RiDeleteBinLine, RiUserLine, RiLayoutLine, RiSettings4Line } from "@remixicon/react";
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

  const { data, setData, post, processing, errors } = useForm({
    about_title: settings.about_title || "Passionate about creating impactful web experiences",
    about_description: settings.about_description || "I have hands-on experience in developing responsive interfaces and managing backend systems...",
    hero_title: settings.hero_title || "Hi, I'm Aji Nur Aji",
    hero_subtitle: settings.hero_subtitle || "Fullstack Developer & Networking Enthusiast",
    nav_links: initialNavLinks,
    contact_email: settings.contact_email || "contact@example.com",
    github_url: settings.github_url || "https://github.com/ajinuraji",
    about_image: settings.about_image || "https://github.com/ajinuraji.png",
    is_available: settings.is_available === '1' || settings.is_available === true || settings.is_available === 'true',
    social_links: settings.social_links ? (typeof settings.social_links === 'string' ? JSON.parse(settings.social_links) : settings.social_links) : [
      { platform: "github", url: "https://github.com/ajinuraji" },
      { platform: "instagram", url: "#" },
      { platform: "tiktok", url: "#" },
      { platform: "coffee", url: "#" },
    ],
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

  const [activeTab, setActiveTab] = useState<'general' | 'about' | 'socials' | 'navigation'>('general');

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
                                <FieldLabel>Profile Image URL</FieldLabel>
                                <FieldContent>
                                    <Input 
                                        value={data.about_image}
                                        onChange={(e) => setData('about_image', e.target.value)}
                                        placeholder="https://..."
                                    />
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
