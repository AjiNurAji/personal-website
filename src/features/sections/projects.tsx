"use client";

import { ProjectCard } from "~/components/elements/ProjectCard";
import { LetterAnimation } from "~/components/elements/LetterAnimation";
import { AnimateIn } from "~/components/elements/AnimateIn";
import { Badge } from "~/components/ui/badge";

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative px-6 py-20 overflow-hidden">
      <div className="max-w-screen-lg mx-auto">

        {/* Section header */}
        <div className="flex flex-col items-center justify-center gap-3 text-center mb-12">
          <AnimateIn variant="blur-fade">
            <Badge variant="secondary">Projects</Badge>
          </AnimateIn>
          <LetterAnimation isHeading inView className="text-4xl sm:text-5xl font-bold tracking-tight">
            My Work
          </LetterAnimation>
          <AnimateIn variant="blur-fade" delay={0.1}>
            <p className="text-muted-foreground">
              Some of the projects I&apos;ve worked on
            </p>
          </AnimateIn>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i, index) => (
            <AnimateIn key={i} variant="blur-fade" delay={index * 0.08}>
              <ProjectCard />
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;