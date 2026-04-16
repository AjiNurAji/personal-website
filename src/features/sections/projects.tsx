"use client";

import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";
import { ProjectCard } from "~/components/elements/ProjectCard";
import { LetterAnimation } from "~/components/elements/LetterAnimation";
import { AnimateIn } from "~/components/elements/AnimateIn";
import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative z-[4] bg-background border-t overflow-hidden">
      <div className="max-w-5xl mx-auto border-x py-20 px-6">

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {[1, 2, 3, 4, 5, 6].map((i, index) => (
            <AnimateIn key={i} variant="blur-fade" delay={index * 0.08}>
              <ProjectCard />
            </AnimateIn>
          ))}
        </div>

        {/* CTA */}
        <AnimateIn variant="blur-fade" delay={0.3} className="flex justify-center">
          <Link
            href="/projects"
            className={cn(buttonVariants({ variant: "outline" }), "rounded-full gap-2")}
          >
            View All Projects
            <RiArrowRightLine className="size-4" />
          </Link>
        </AnimateIn>

      </div>
    </section>
  );
};

export default ProjectsSection;