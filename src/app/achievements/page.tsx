import { Navbar } from "~/components/elements/navbar";
import { Footer } from "~/components/elements/footer";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import prisma from "~/lib/prisma";
import { RiTrophyLine } from "@remixicon/react";

export default async function AchievementsPage() {
  const achievements = await prisma.achievement.findMany({
    orderBy: { year: "desc" },
  });

  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full pt-24 pb-20 bg-background px-4 sm:px-0">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center gap-3 text-center mb-12">
            <Badge variant="secondary">All Achievements</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Recognition & Milestones
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              A complete list of competitions, awards, and community contributions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((item, index) => {
              const Icon = RiTrophyLine;
              return (
                <Card key={item.id} className="h-full border bg-card hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6 flex flex-col gap-4 h-full">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-100 dark:bg-zinc-800")}>
                      <Icon className={cn("size-5 text-zinc-900 dark:text-zinc-100")} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-semibold leading-snug">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.organization} · {item.year}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
            {achievements.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground italic">
                Achievements will be listed here soon.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

