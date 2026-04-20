import { Navbar } from "~/components/elements/navbar";
import { Footer } from "~/components/elements/footer";
import { ProjectCard } from "~/components/elements/ProjectCard";
import { Badge } from "~/components/ui/badge";
import prisma from "~/lib/prisma";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full pt-24 pb-20 px-4 sm:px-0">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col items-center justify-center gap-3 text-center mb-12">
            <Badge variant="secondary">All Projects</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              My Complete Portfolio
            </h1>
            <p className="text-muted-foreground">
              A comprehensive list of all projects I've worked on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                link={project.link}
                github={project.github}
                demo={project.demo}
                badges={project.badges}
              />
            ))}
            {projects.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground italic">
                No projects found.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

