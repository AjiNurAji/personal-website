import { Link } from "@inertiajs/react";
import { RiArrowRightLine } from "@remixicon/react";
import { ProjectCard } from "@/Components/Elements/ProjectCard";
import { LetterAnimation } from "@/Components/Elements/LetterAnimation";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { Badge } from "@/Components/UI/badge";
import { buttonVariants } from "@/Components/UI/button";
import { cn } from "@/lib/utils";

const ProjectsSection = ({ initialProjects = [] }: { initialProjects?: any[] }) => {
  const featuredProjects = initialProjects;

  return (
    <section
      id="projects"
      className="relative z-4 bg-transparent border-t overflow-hidden px-4 sm:px-0"
    >
        {/* Background Depth Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-10 left-10 text-[10rem] md:text-[16rem] font-black text-zinc-500/5 dark:text-zinc-400/5 select-none leading-none">
              WORK
            </div>
            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] mix-blend-screen" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[150px] mix-blend-screen" />
        </div>

        <div className="max-w-5xl mx-auto border-x py-24 px-6 relative z-10">
          {/* Section header */}
          <div className="flex flex-col items-center justify-center gap-4 text-center mb-16">
            <AnimateIn variant="blur-fade">
              <Badge variant="secondary" className="px-4 py-1.5 text-sm">Selected Projects</Badge>
            </AnimateIn>
            <LetterAnimation
              isHeading
              inView
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter"
            >
              Featured Work
            </LetterAnimation>
            <AnimateIn variant="blur-fade" delay={0.1}>
              <p className="text-xl text-muted-foreground max-w-2xl mt-4">
                A showcase of my recent projects, highlighting problem-solving, clean architecture, and premium user experiences.
              </p>
            </AnimateIn>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project: any, index: number) => {
              return (
                <AnimateIn
                  key={project.id}
                  variant="blur-fade"
                  delay={index * 0.1}
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
              );
            })}
            
            {featuredProjects.length === 0 && (
              <div className="col-span-full py-32 text-center">
                 <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                    <RiArrowRightLine className="w-8 h-8 text-muted-foreground/50" />
                 </div>
                 <h3 className="text-2xl font-bold mb-2">Work in Progress</h3>
                 <p className="text-muted-foreground">Awesome things are being built. Check back soon!</p>
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
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full gap-2 group px-8 bg-background/50 backdrop-blur-sm",
              )}
            >
              Explore All Projects
              <RiArrowRightLine className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </AnimateIn>
        </div>
    </section>
  );
};

export default ProjectsSection;
