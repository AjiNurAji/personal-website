import { Link } from "@inertiajs/react";
import {
  RiArrowRightLine,
  RiTrophyLine,
  RiMedalLine,
  RiStarLine,
} from "@remixicon/react";
import { Badge } from "@/Components/UI/badge";
import { buttonVariants } from "@/Components/UI/button";
import { Card, CardContent } from "@/Components/UI/card";
import { LetterAnimation } from "@/Components/Elements/LetterAnimation";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
  RiTrophyLine: RiTrophyLine,
  RiMedalLine: RiMedalLine,
  RiStarLine: RiStarLine,
};

const AchievementsSection = ({ initialAchievements = [] }: { initialAchievements?: any[] }) => {
  const dbAchievements = initialAchievements;

  return (
    <section
      id="achievements"
      className="relative z-5 bg-transparent border-t overflow-hidden px-4 sm:px-0"
    >
        <div className="absolute top-10 right-10 text-8xl md:text-9xl font-black text-zinc-500/5 dark:text-zinc-400/5 pointer-events-none select-none -z-10">
          AWARDS
        </div>
        <div className="max-w-5xl mx-auto border-x py-20 px-6 bg-background/80 backdrop-blur-sm relative z-10">
          {/* Section header */}
          <div className="flex flex-col items-center justify-center gap-3 text-center mb-12">
            <AnimateIn variant="blur-fade">
              <Badge variant="secondary">Achievements</Badge>
            </AnimateIn>
            <LetterAnimation
              isHeading
              inView
              className="text-4xl sm:text-5xl font-bold tracking-tight"
            >
              Recognition & Milestones
            </LetterAnimation>
            <AnimateIn variant="blur-fade" delay={0.1}>
              <p className="text-muted-foreground max-w-md">
                A few highlights from my journey — competitions, awards, and
                community contributions.
              </p>
            </AnimateIn>
          </div>

          {/* Achievement cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {dbAchievements.map((item: any, index: number) => {
              const Icon = item.category === 'award' ? RiTrophyLine : (item.category === 'certification' ? RiMedalLine : RiStarLine);
              return (
                <AnimateIn
                  key={item.id}
                  variant="blur-fade"
                  delay={index * 0.1}
                >
                  <Link href={`/achievements/${item.id}`} className="block h-[280px] relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-zinc-200/50 dark:border-zinc-800/50">
                    {/* Image Background */}
                    {item.preview_image ? (
                        <img 
                          src={`/storage/${item.preview_image}`} 
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                    ) : (
                        <div className="absolute inset-0 w-full h-full bg-muted flex items-center justify-center">
                            <Icon className="size-16 text-muted-foreground/20" />
                        </div>
                    )}
                    
                    {/* Default Overlay (slight gradient for always-visible bottom shadow if needed, but we'll use full overlay on hover) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm" />

                    {/* Hover Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-white">
                        <div className="flex justify-between items-start">
                            <Badge variant="outline" className="text-white border-white/20 bg-black/20 backdrop-blur-md capitalize text-xs font-bold tracking-widest">
                                {item.category}
                            </Badge>
                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center">
                                <Icon className="size-5 text-white" />
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold text-xl leading-tight mb-2">
                                {item.title}
                            </h4>
                            <p className="text-xs text-white/80 font-medium mb-3">
                                {item.organization} · {item.year}
                            </p>
                            <p className="text-sm text-white/70 line-clamp-2 mb-4">
                                {item.description}
                            </p>
                            
                            <div className="text-xs font-bold uppercase tracking-widest text-white/90 flex items-center gap-1 group/btn">
                                View Details <RiArrowRightLine className="size-4 transform group-hover/btn:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                  </Link>
                </AnimateIn>
              );
            })}
            {dbAchievements.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground italic">
                Achievements will be listed here soon.
              </div>
            )}
          </div>

          {/* CTA */}
          <AnimateIn
            variant="blur-fade"
            delay={0.3}
            className="flex justify-center"
          >
            <Link
              href="/achievements"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full gap-2",
              )}
            >
              View All Achievements
              <RiArrowRightLine className="size-4" />
            </Link>
          </AnimateIn>
        </div>
    </section>
  );
};

export default AchievementsSection;
