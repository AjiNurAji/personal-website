import { LetterAnimation } from "~/components/elements/LetterAnimation";
import { AnimateIn } from "~/components/elements/AnimateIn";
import { Badge } from "~/components/ui/badge";
import {
  RiReactjsLine,
  RiBracesLine,
  RiDatabase2Line,
  RiTerminalLine,
} from "@remixicon/react";
import { PatternStripes } from "~/components/PatternStipes";
import prisma from "~/lib/prisma";

const Skills = async () => {
  const dbSkills = await prisma.skill.findMany({
    orderBy: { priority: "desc" },
  });

  return (
    <section
      className="relative z-3 bg-transparent px-4 sm:px-0 border-b overflow-hidden"
      id="skills"
    >
        <div className="absolute bottom-10 left-10 text-8xl md:text-9xl font-black text-zinc-500/5 dark:text-zinc-400/5 pointer-events-none select-none -z-10">
          SKILLS
        </div>
        <div className="max-w-5xl mx-auto border-x py-20 px-6 bg-background/80 backdrop-blur-sm relative z-10">
          <div className="flex flex-col items-center text-center space-y-6">
            <AnimateIn variant="blur-fade">
              <Badge variant="secondary">My Skills</Badge>
            </AnimateIn>

            <LetterAnimation
              isHeading
              inView
              className="text-4xl font-bold tracking-tight justify-center"
            >
              Technologies I work with
            </LetterAnimation>

            <AnimateIn variant="blur-fade" delay={0.1} className="max-w-2xl">
              <p className="text-muted-foreground text-center">
                I love exploring new technologies and building efficient,
                scalable solutions. Here are some of the tools and frameworks I
                use on a daily basis to bring ideas to life.
              </p>
            </AnimateIn>

            <div className="flex flex-wrap justify-center gap-3 pt-8 max-w-3xl">
              {dbSkills.map((skill, index) => {
                const iconSlug = skill.name.toLowerCase()
                  .replace(/\.js$/, "dotjs")
                  .replace(/ /g, "")
                  .replace(/\+/g, "plus")
                  .replace(/#/g, "sharp");
                
                // Manual overrides for specific slugs
                const slugMap: Record<string, string> = {
                  "next.js": "nextdotjs",
                  "node.js": "nodedotjs",
                  "framer motion": "framer",
                  "express.js": "express",
                  "tailwind css": "tailwindcss",
                };
                
                const finalSlug = slugMap[skill.name.toLowerCase()] || iconSlug;
                const iconUrl = `https://cdn.simpleicons.org/${finalSlug}`;

                return (
                  <AnimateIn
                    key={skill.id}
                    variant="blur-fade"
                    delay={0.1 + index * 0.05}
                    className="flex"
                  >
                    <div className="flex items-center px-4 py-2 bg-background/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-border/50 rounded-full transition-all duration-300 transform hover:scale-105 cursor-default hover:shadow-md group">
                      <div className="size-5 mr-2 flex items-center justify-center">
                        <img 
                          src={iconUrl} 
                          alt={skill.name} 
                          className="size-full object-contain grayscale group-hover:grayscale-0 transition-all"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://cdn.simpleicons.org/codeigniter`; // generic fallback
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                  </AnimateIn>
                );
              })}
              {dbSkills.length === 0 && (
                <div className="col-span-full py-10 text-center text-muted-foreground italic">
                  Skills data is coming soon!
                </div>
              )}
            </div>
          </div>
        </div>
    </section>
  );
};

export default Skills;
