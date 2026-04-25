"use client";

import { Navbar } from "@/Components/Elements/navbar";
import { Footer } from "@/Components/Elements/footer";
import { InteractiveCursor } from "@/Components/Elements/InteractiveCursor";
import { Head, Link } from "@inertiajs/react";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { Badge } from "@/Components/UI/badge";
import { Card, CardContent } from "@/Components/UI/card";
import { RiArrowRightLine, RiTrophyLine, RiMedalLine, RiStarLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

interface Props {
  achievements: any[];
}

export default function AchievementsIndex({ achievements }: Props) {
  const categories = ["event", "award", "certification"];
  
  const groupedAchievements = categories.reduce((acc, cat) => {
    acc[cat] = achievements.filter(a => a.category === cat);
    return acc;
  }, {} as Record<string, any[]>);

  const getIcon = (category: string) => {
    switch (category) {
      case 'award': return RiTrophyLine;
      case 'certification': return RiMedalLine;
      default: return RiStarLine;
    }
  };

  return (
    <div className="font-sans bg-background text-foreground selection:bg-primary/10 selection:text-primary">
      <Head title="Achievements - Portfolio" />
      <InteractiveCursor />
      <Navbar />

      <main className="min-h-screen w-full pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <AnimateIn variant="blur-fade">
              <Badge variant="secondary" className="mb-4">Achievements</Badge>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
                Recognition & <span className="text-primary">Milestones</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                A comprehensive list of my awards, certifications, and event participations throughout my journey.
              </p>
            </AnimateIn>
          </div>

          <div className="space-y-24">
            {categories.map((cat, catIdx) => {
              const items = groupedAchievements[cat];
              if (items.length === 0) return null;
              
              const Icon = getIcon(cat);

              return (
                <section key={cat} className="space-y-8">
                  <AnimateIn variant="blur-fade" delay={catIdx * 0.1}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <Icon className="size-6" />
                      </div>
                      <h2 className="text-3xl font-bold capitalize tracking-tight">{cat}s</h2>
                      <div className="flex-1 h-[1px] bg-border" />
                    </div>
                  </AnimateIn>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item, idx) => (
                      <AnimateIn key={item.id} variant="blur-fade" delay={idx * 0.05}>
                        <Link href={`/achievements/${item.id}`}>
                          <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden border-zinc-200 dark:border-zinc-800">
                             {item.preview_image && (
                                <div className="aspect-video w-full overflow-hidden bg-muted">
                                    <img 
                                        src={`/storage/${item.preview_image}`} 
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                             )}
                            <CardContent className="p-6">
                              <div className="flex justify-between items-start mb-4">
                                <Badge variant="outline" className="text-[10px] font-bold tracking-widest">{item.year}</Badge>
                              </div>
                              <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {item.description}
                              </p>
                            </CardContent>
                          </Card>
                        </Link>
                      </AnimateIn>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
