"use client";

import { Badge } from "~/components/ui/badge";
import { LetterAnimation } from "~/components/elements/LetterAnimation";
import { AnimateIn } from "~/components/elements/AnimateIn";
import { ExperienceCard } from "~/components/elements/ExperienceCard";
import { PatternStripes } from "~/components/PatternStipes";

const experiences = [
  {
    logo: "/assets/images/company/logo-bps.webp",
    company: "TechCorp Solutions",
    role: "Senior Full Stack Developer",
    period: "2021 - Present",
    description:
      "Led the development of enterprise-scale web applications, mentored junior developers, and implemented best practices for code quality and performance optimization.",
    skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative z-4 bg-transparent border-t overflow-hidden px-4 sm:px-0"
    >
        <div className="absolute top-10 right-10 text-8xl md:text-9xl font-black text-zinc-500/5 dark:text-zinc-400/5 pointer-events-none select-none -z-10">
          JOURNEY
        </div>
        <div className="max-w-5xl mx-auto border-x px-6 py-20 bg-background/80 backdrop-blur-sm relative z-10">
          {/* Section header */}
          <div className="flex flex-col items-center justify-center gap-3 text-center mb-12">
            <AnimateIn variant="blur-fade">
              <Badge variant="secondary">Experience</Badge>
            </AnimateIn>
            <LetterAnimation
              isHeading
              inView
              className="text-4xl sm:text-5xl font-bold tracking-tight"
            >
              Professional Journey
            </LetterAnimation>
            <AnimateIn variant="blur-fade" delay={0.1}>
              <p className="text-muted-foreground">
                A timeline of my professional growth and key achievements
              </p>
            </AnimateIn>
          </div>

          {/* Timeline */}
          <div className="relative">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} {...exp} delay={index * 0.1} />
            ))}
          </div>
        </div>
    </section>
  );
};

export default Experience;
