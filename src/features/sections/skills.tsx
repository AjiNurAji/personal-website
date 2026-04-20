import { LetterAnimation } from "~/components/elements/LetterAnimation";
import { AnimateIn } from "~/components/elements/AnimateIn";
import { Badge } from "~/components/ui/badge";
import {
  RiReactjsLine,
  RiBracesLine,
  RiDatabase2Line,
  RiTerminalLine
} from "@remixicon/react";
import { PatternStripes } from "~/components/PatternStipes";
import prisma from "~/lib/prisma";

const Skills = async () => {
  const dbSkills = await prisma.skill.findMany({
    orderBy: { priority: "desc" }
  });

  return (
    <section className="relative z-3 bg-background px-4 sm:px-0 border-b overflow-hidden" id="skills">
      <PatternStripes order="reverse">
        <div className="max-w-5xl mx-auto border-x py-20 px-6 bg-background relative z-10">
          <div className="flex flex-col items-center text-center space-y-6">
            <AnimateIn variant="blur-fade">
              <Badge variant="secondary">My Skills</Badge>
            </AnimateIn>

            <LetterAnimation isHeading inView className="text-4xl font-bold tracking-tight justify-center">
              Technologies I work with
            </LetterAnimation>

            <AnimateIn variant="blur-fade" delay={0.1} className="max-w-2xl">
              <p className="text-muted-foreground text-center">
                I love exploring new technologies and building efficient, scalable solutions. 
                Here are some of the tools and frameworks I use on a daily basis to bring ideas to life.
              </p>
            </AnimateIn>

            <div className="flex flex-wrap justify-center gap-3 pt-8 max-w-3xl">
              {dbSkills.map((skill, index) => {
                let Icon = RiBracesLine;
                if (skill.category === "Frontend") Icon = RiReactjsLine;
                if (skill.category === "Backend") Icon = RiDatabase2Line;
                if (skill.category === "Tools") Icon = RiTerminalLine;

                return (
                  <AnimateIn key={skill.id} variant="blur-fade" delay={0.1 + index * 0.05} className="flex">
                    <div className="flex items-center px-4 py-2 bg-secondary/30 hover:bg-secondary/80 border border-border/50 rounded-full transition-all duration-300 transform hover:scale-105 cursor-default hover:shadow-md">
                      <div className="text-primary group-hover:text-primary transition-colors flex items-center">
                        <Icon className="w-4 h-4 mr-2" />
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
      </PatternStripes>
    </section>
  );
};

export default Skills;

