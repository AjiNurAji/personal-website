import { ProjectCard } from "~/components/elements/ProjectCard"
import { Badge } from "~/components/ui/badge"

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative px-6 py-20">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col items-center justify-center gap-3 text-center mb-12">
          <Badge variant="secondary">Projects</Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            My Work
          </h2>
          <p className="text-muted-foreground">
            Some of the projects I've worked on
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection;