"use client";

import { Navbar } from "@/Components/Elements/navbar";
import { Footer } from "@/Components/Elements/footer";
import { InteractiveCursor } from "@/Components/Elements/InteractiveCursor";
import { Head, Link } from "@inertiajs/react";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { Badge } from "@/Components/UI/badge";
import { buttonVariants } from "@/Components/UI/button";
import { RiArrowLeftSLine, RiDownloadLine, RiExternalLinkLine } from "@remixicon/react";
import MDEditor from "@uiw/react-md-editor";
import { cn } from "@/lib/utils";

interface Props {
  achievement: any;
}

export default function AchievementShow({ achievement }: Props) {
  return (
    <div className="font-sans bg-background text-foreground selection:bg-primary/10 selection:text-primary">
      <Head title={`${achievement.title} - Achievement`} />
      <InteractiveCursor />
      <Navbar />

      <main className="min-h-screen w-full pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateIn variant="blur-fade">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <RiArrowLeftSLine className="mr-1 h-4 w-4" />
              Back to Home
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
                        <a 
                            href={`/storage/${achievement.certificate_path}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={cn(buttonVariants({ variant: "default" }), "rounded-full gap-2")}
                        >
                            <RiExternalLinkLine className="size-4" /> View Certificate
                        </a>
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
                </AnimateIn>
              </div>

              <div className="space-y-8">
                <AnimateIn variant="blur-fade" delay={0.4}>
                  <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm sticky top-28">
                    <h3 className="font-bold mb-4">At a glance</h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Category</span>
                        <span className="font-medium capitalize">{achievement.category}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Year</span>
                        <span className="font-medium">{achievement.year}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Organization</span>
                        <span className="font-medium">{achievement.organization}</span>
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
