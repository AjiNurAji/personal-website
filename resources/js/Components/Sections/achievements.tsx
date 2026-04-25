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
                  <Card className="h-full border bg-card hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    {item.preview_image && (
                      <div className="aspect-video w-full overflow-hidden border-b bg-muted">
                        <img 
                          src={`/storage/${item.preview_image}`} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <CardContent className="p-6 flex flex-col gap-4 h-full relative">
                      <div className="flex justify-between items-start">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center bg-primary/10 text-primary",
                          )}
                        >
                          <Icon className="size-5" />
                        </div>
                        <Badge variant="outline" className="capitalize text-[10px] font-bold tracking-widest">
                          {item.category}
                        </Badge>
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <h4 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-muted-foreground font-medium">
                          {item.organization} · {item.year}
                        </p>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>

                      <div className="pt-2">
                         <Link 
                           href={`/achievements/${item.id}`}
                           className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1 hover:gap-2 transition-all"
                         >
                            View Details <RiArrowRightLine className="size-3" />
                         </Link>
                      </div>
                    </CardContent>
                  </Card>
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
