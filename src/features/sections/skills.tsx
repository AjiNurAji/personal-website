"use client";

import { LetterAnimation } from "~/components/elements/LetterAnimation";
import { AnimateIn } from "~/components/elements/AnimateIn";
import { Badge } from "~/components/ui/badge";
import {
  RiReactjsLine,
  RiNodejsLine,
  RiTailwindCssFill,
  RiDatabase2Line,
  RiJavascriptLine,
  RiHtml5Line,
  RiCss3Line,
  RiGithubFill,
  RiBracesLine,
  RiServerLine
} from "@remixicon/react";

const skills = [
  { name: "React / Next.js", icon: <RiReactjsLine className="w-4 h-4 mr-2" /> },
  { name: "TypeScript", icon: <RiJavascriptLine className="w-4 h-4 mr-2" /> },
  { name: "Node.js", icon: <RiNodejsLine className="w-4 h-4 mr-2" /> },
  { name: "Tailwind CSS", icon: <RiTailwindCssFill className="w-4 h-4 mr-2" /> },
  { name: "Databases (SQL/NoSQL)", icon: <RiDatabase2Line className="w-4 h-4 mr-2" /> },
  { name: "HTML5", icon: <RiHtml5Line className="w-4 h-4 mr-2" /> },
  { name: "CSS3", icon: <RiCss3Line className="w-4 h-4 mr-2" /> },
  { name: "Git & GitHub", icon: <RiGithubFill className="w-4 h-4 mr-2" /> },
  { name: "REST APIs", icon: <RiBracesLine className="w-4 h-4 mr-2" /> },
  { name: "Docker / CI/CD", icon: <RiServerLine className="w-4 h-4 mr-2" /> },
];

const Skills = () => {
  return (
    <section className="relative z-3 bg-background px-4 sm:px-0 border-b overflow-hidden" id="skills">
      <div className="max-w-5xl mx-auto border-x py-20 px-6">
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
            {skills.map((skill, index) => (
              <AnimateIn key={skill.name} variant="blur-fade" delay={0.1 + index * 0.05} className="flex">
                <div className="flex items-center px-4 py-2 bg-secondary/30 hover:bg-secondary/80 border border-border/50 rounded-full transition-all duration-300 transform hover:scale-105 cursor-default hover:shadow-md">
                  <div className="text-primary group-hover:text-primary transition-colors">
                    {skill.icon}
                  </div>
                  <span className="text-sm font-medium">{skill.name}</span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
