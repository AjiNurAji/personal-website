"use client";

import ClientLayout from "@/Layouts/ClientLayout";
import { Head, Link } from "@inertiajs/react";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { Badge } from "@/Components/UI/badge";
import { buttonVariants } from "@/Components/UI/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/Components/UI/dialog";
import { RiArrowLeftSLine, RiDownloadLine, RiExternalLinkLine } from "@remixicon/react";
import MDEditor from "@uiw/react-md-editor";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

const RawHtml = ({ html }: { html: string }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        const updateTheme = () => setIsDark(root.classList.contains("dark"));
        updateTheme();

        const observer = new MutationObserver(updateTheme);
        observer.observe(root, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!divRef.current) return;
        const theme = isDark ? "dark" : "light";
        const themedHtml = html.replace(
            /(data-share-badge-theme=["'])[^"']*(["'])/gi,
            `$1${theme}$2`,
        );
        const fragment = document.createRange().createContextualFragment(themedHtml);
        divRef.current.innerHTML = '';
        divRef.current.appendChild(fragment);
    }, [html, isDark]);

    return <div ref={divRef} className="credential-embed flex w-full justify-center" />;
};

const MarkdownImage = ({ node, ...props }: any) => (
  <Dialog>
    <DialogTrigger asChild>
      <img {...props} className="cursor-zoom-in" />
    </DialogTrigger>
    <DialogContent className="sm:max-w-5xl md:max-w-7xl w-[95vw] h-fit max-h-[95vh] p-0 overflow-hidden bg-transparent border-0 ring-0 flex items-center justify-center">
      <DialogTitle className="sr-only">Image View</DialogTitle>
      <img 
        {...props} 
        className="w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl bg-zinc-50/10 backdrop-blur-md" 
      />
    </DialogContent>
  </Dialog>
);

interface Props {
  achievement: any;
  settings?: Record<string, any>;
}

export default function AchievementShow({ achievement, settings = {} }: Props) {
  const [backUrl, setBackUrl] = useState("/#achievements");
  const [backLabel, setBackLabel] = useState("Back to Home");
  const [activeDocumentation, setActiveDocumentation] = useState(0);
  const documentation = achievement.documentation_images || [];

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('from') === 'gallery') {
            setBackUrl('/achievements');
            setBackLabel('Back to Gallery');
        }
    }
  }, []);
  return (
    <div className="font-sans bg-background text-foreground selection:bg-primary/10 selection:text-primary">
      <Head>
        <title>{`${achievement.title} — Aji Nur Aji`}</title>
        <meta name="description" content={achievement.description || `${achievement.title} — ${achievement.organization} (${achievement.year})`} />
        <link rel="canonical" href={`https://ajinuraji.my.id/achievements/${achievement.id}`} />
      </Head>
      <ClientLayout
        active="Achievements"
        title={achievement.title}
        description={achievement.description || "Achievement details and recognition."}
        name={settings.hero_title?.replace(/<[^>]+>/g, "")}
        role={settings.role}
        tagline={settings.hero_subtitle}
        contactEmail={settings.contact_email}
        settings={settings}
        showPageHeader={false}
      >
      <main className="min-h-screen w-full pb-20">
        <div className="mx-auto max-w-6xl">
          <AnimateIn variant="blur-fade">
            <Link
              href={backUrl}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <RiArrowLeftSLine className="mr-1 h-4 w-4" />
              {backLabel}
            </Link>
          </AnimateIn>

          <article className="space-y-10">
            {/* Header */}
            <div className="space-y-6">
              <AnimateIn variant="blur-fade" delay={0.1}>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="capitalize">
                    {achievement.category}
                  </Badge>
                  <Badge variant="outline">
                    {achievement.year}
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                  {achievement.title}
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium border-l-4 border-primary pl-6 py-2 mt-6">
                  {achievement.organization}
                </p>
              </AnimateIn>
            </div>

            {/* Preview Image / Certificate */}
            {(achievement.preview_image || achievement.certificate_path) && (
              <AnimateIn variant="blur-fade" delay={0.2}>
                <div className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card/60 shadow-2xl shadow-black/10">
                  <img
                    src={achievement.preview_image ? `/storage/${achievement.preview_image}` : "/api/placeholder/800/450"}
                    alt={achievement.title}
                    className="max-h-[min(68vh,720px)] w-full object-contain bg-muted/30"
                  />
                  {achievement.certificate_path && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <Dialog>
                            <DialogTrigger className={cn(buttonVariants({ variant: "default" }), "rounded-full gap-2 cursor-pointer")}>
                                <RiExternalLinkLine className="size-4" /> View Certificate
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-4xl md:max-w-5xl w-[95vw] sm:w-[90vw] h-fit max-h-[95vh] p-0 overflow-hidden bg-transparent border-0 ring-0 flex items-center justify-center">
                                <DialogTitle className="sr-only">Certificate View</DialogTitle>
                                {achievement.certificate_path.toLowerCase().endsWith('.pdf') ? (
                                    <iframe 
                                        src={`/storage/${achievement.certificate_path}`} 
                                        className="w-full h-[85vh] rounded-2xl bg-white dark:bg-zinc-950 shadow-2xl" 
                                        title="Certificate Viewer"
                                    />
                                ) : (
                                    <img 
                                        src={`/storage/${achievement.certificate_path}`} 
                                        alt="Certificate"
                                        className="w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                                    />
                                )}
                            </DialogContent>
                        </Dialog>
                    </div>
                  )}
                </div>
              </AnimateIn>
            )}

            {documentation.length > 0 && (
              <AnimateIn variant="blur-fade" delay={0.25}>
                <div className="space-y-3 rounded-2xl border border-border/70 bg-card/60 p-3 shadow-sm">
                  <h3 className="px-2 pt-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Documentation</h3>
                  <div className="aspect-video overflow-hidden rounded-xl bg-muted">
                    <img src={`/storage/${documentation[activeDocumentation]}`} alt={`${achievement.title} documentation ${activeDocumentation + 1}`} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex gap-2 overflow-x-auto">
                    {documentation.map((image: string, index: number) => (
                      <button key={image} type="button" onClick={() => setActiveDocumentation(index)} className={cn("h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2", activeDocumentation === index ? "border-primary" : "border-transparent")}>
                        <img src={`/storage/${image}`} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            )}

            {/* Content */}
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
              <div className="space-y-8">
                <AnimateIn variant="blur-fade" delay={0.3}>
                   <div className="prose prose-zinc dark:prose-invert max-w-none">
                      <h3 className="text-2xl font-bold mb-4">Description</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                        <MDEditor.Markdown 
                          source={achievement.description || "No description provided."} 
                          style={{ backgroundColor: 'transparent', color: 'inherit' }}
                          components={{ img: MarkdownImage }}
                        />
                      </p>
                      
                      {achievement.content && (
                        <>
                          <h3 className="text-2xl font-bold mb-4">Details</h3>
                          <div data-color-mode="light" className="dark:hidden">
                            <MDEditor.Markdown 
                              source={achievement.content} 
                              style={{ backgroundColor: 'transparent', color: 'inherit' }}
                              components={{ img: MarkdownImage }}
                            />
                          </div>
                          <div data-color-mode="dark" className="hidden dark:block">
                            <MDEditor.Markdown 
                              source={achievement.content} 
                              style={{ backgroundColor: 'transparent', color: 'inherit' }}
                              components={{ img: MarkdownImage }}
                            />
                          </div>
                        </>
                      )}
                   </div>
                   
                   {achievement.embed_code && (
                        <div className="mt-12 flex flex-col gap-4">
                            <h3 className="text-2xl font-bold">Credential Badge</h3>
                            <div className="credential-card w-full overflow-hidden rounded-2xl border border-border/70 bg-card p-3 shadow-sm transition-colors duration-300 sm:p-6">
                                <RawHtml html={achievement.embed_code} />
                            </div>
                        </div>
                    )}
                </AnimateIn>
              </div>

              <div className="space-y-8">
                <AnimateIn variant="blur-fade" delay={0.4}>
                  <div className="sticky top-28 rounded-2xl border border-border/70 bg-card/60 p-6 shadow-sm backdrop-blur-sm">
                    <h3 className="mb-5 text-lg font-bold">At a glance</h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between items-start gap-4 border-b pb-2">
                        <span className="text-muted-foreground shrink-0">Category</span>
                        <span className="font-medium text-right capitalize">{achievement.category}</span>
                      </div>
                      <div className="flex justify-between items-start gap-4 border-b pb-2">
                        <span className="text-muted-foreground shrink-0">Year</span>
                        <span className="font-medium text-right">{achievement.year}</span>
                      </div>
                      <div className="flex justify-between items-start gap-4 border-b pb-2">
                        <span className="text-muted-foreground shrink-0">Organization</span>
                        <span className="font-medium text-right">{achievement.organization}</span>
                      </div>
                    </div>

                    {achievement.certificate_path && (
                        <a 
                            href={`/storage/${achievement.certificate_path}`} 
                            download
                            className={cn(buttonVariants({ variant: "outline" }), "w-full mt-6 rounded-xl gap-2")}
                        >
                            <RiDownloadLine className="size-4" /> Download Certificate
                        </a>
                    )}
                  </div>
                </AnimateIn>
              </div>
            </div>
          </article>
        </div>
      </main>
      </ClientLayout>
    </div>
  );
}
