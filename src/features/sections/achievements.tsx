import Link from "next/link";
import {
  RiArrowRightLine,
  RiTrophyLine,
  RiMedalLine,
  RiStarLine,
} from "@remixicon/react";
import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { LetterAnimation } from "~/components/elements/LetterAnimation";
import { AnimateIn } from "~/components/elements/AnimateIn";
import { cn } from "~/lib/utils";
import { PatternStripes } from "~/components/PatternStipes";
import prisma from "~/lib/prisma";

const iconMap: Record<string, any> = {
  RiTrophyLine: RiTrophyLine,
  RiMedalLine: RiMedalLine,
  RiStarLine: RiStarLine,
};

const AchievementsSection = async () => {
  const dbAchievements = await prisma.achievement.findMany({
    orderBy: { year: "desc" },
    take: 6,
  });

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {dbAchievements.map((item, index) => {
              // For now, if no icon specified, default to Trophy
              const Icon = RiTrophyLine;
              return (
                <AnimateIn
                  key={item.id}
                  variant="blur-fade"
                  delay={index * 0.1}
                >
                  <Card className="h-full border bg-card hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-6 flex flex-col gap-4 h-full">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-100 dark:bg-zinc-800",
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-5 text-zinc-900 dark:text-zinc-100",
                          )}
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-semibold leading-snug">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.organization} · {item.year}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
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
