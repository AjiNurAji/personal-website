import Link from "next/link";
import { RiArrowRightLine } from "@remixicon/react";
import { ProjectCard } from "~/components/elements/ProjectCard";
import { LetterAnimation } from "~/components/elements/LetterAnimation";
import { AnimateIn } from "~/components/elements/AnimateIn";
import { Badge } from "~/components/ui/badge";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import prisma from "~/lib/prisma";

const ProjectsSection = async () => {
  const featuredProjects = await prisma.project.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <section
      id="projects"
      className="relative z-4 bg-transparent border-t overflow-hidden px-4 sm:px-0"
    >
        <div className="absolute top-10 left-10 text-8xl md:text-9xl font-black text-zinc-500/5 dark:text-zinc-400/5 pointer-events-none select-none -z-10">
          WORK
        </div>
        <div className="max-w-5xl mx-auto border-x py-20 px-6 bg-background/80 backdrop-blur-sm relative z-10">
          {/* Section header */}
          <div className="flex flex-col items-center justify-center gap-3 text-center mb-12">
            <AnimateIn variant="blur-fade">
              <Badge variant="secondary">Projects</Badge>
            </AnimateIn>
            <LetterAnimation
              isHeading
              inView
              className="text-4xl sm:text-5xl font-bold tracking-tight"
            >
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
            {featuredProjects.map((project: any, index: number) => (
              <AnimateIn
                key={project.id}
                variant="blur-fade"
                delay={index * 0.08}
              >
                <ProjectCard
                  title={project.title}
                  slug={project.slug}
                  description={project.description}
                  image={project.image}
                  link={project.link}
                  github={project.github}
                  demo={project.demo}
                  badges={project.badges}
                />
              </AnimateIn>
            ))}
            {featuredProjects.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground italic">
                Work in progress... Check back soon!
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
              href="/projects"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-full gap-2",
              )}
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
