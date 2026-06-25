"use client";

import { Navbar } from "@/Components/Elements/navbar";
import { Footer } from "@/Components/Elements/footer";
import { InteractiveCursor } from "@/Components/Elements/InteractiveCursor";
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

    useEffect(() => {
        if (!divRef.current) return;
        const fragment = document.createRange().createContextualFragment(html);
        divRef.current.innerHTML = '';
        divRef.current.appendChild(fragment);
    }, [html]);

    return <div ref={divRef} className="flex justify-center" />;
};

interface Props {
  achievement: any;
}

export default function AchievementShow({ achievement }: Props) {
  const [backUrl, setBackUrl] = useState("/#achievements");
  const [backLabel, setBackLabel] = useState("Back to Home");

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
      <Head title={`${achievement.title} - Achievement`} />
      <InteractiveCursor />
      <Navbar />

      <main className="min-h-screen w-full pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
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
                <div className="rounded-3xl overflow-hidden border shadow-2xl bg-muted aspect-video relative group">
                  <img
                    src={achievement.preview_image ? `/storage/${achievement.preview_image}` : "/api/placeholder/800/450"}
                    alt={achievement.title}
                    className="w-full h-full object-cover"
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

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <AnimateIn variant="blur-fade" delay={0.3}>
                   <div className="prose prose-zinc dark:prose-invert max-w-none">
                      <h3 className="text-2xl font-bold mb-4">Description</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                        {achievement.description}
                      </p>
                      
                      {achievement.content && (
                        <>
                          <h3 className="text-2xl font-bold mb-4">Details</h3>
                          <div data-color-mode="light" className="dark:hidden">
                            <MDEditor.Markdown 
                              source={achievement.content} 
                              style={{ backgroundColor: 'transparent', color: 'inherit' }}
                            />
                          </div>
                          <div data-color-mode="dark" className="hidden dark:block">
                            <MDEditor.Markdown 
                              source={achievement.content} 
                              style={{ backgroundColor: 'transparent', color: 'inherit' }}
                            />
                          </div>
                        </>
                      )}
                   </div>
                   
                   {achievement.embed_code && (
                        <div className="mt-12 flex flex-col items-start gap-4">
                            <h3 className="text-2xl font-bold">Credential Badge</h3>
                            <div className="p-6 bg-muted/30 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-transform hover:scale-[1.02] duration-300">
                                <RawHtml html={achievement.embed_code} />
                            </div>
                        </div>
                    )}
                </AnimateIn>
              </div>

              <div className="space-y-8">
                <AnimateIn variant="blur-fade" delay={0.4}>
                  <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm sticky top-28">
                    <h3 className="font-bold mb-4">At a glance</h3>
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

      <Footer />
    </div>
  );
}
