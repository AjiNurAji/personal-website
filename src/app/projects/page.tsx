import { Navbar } from "~/components/elements/navbar";
import { Footer } from "~/components/elements/footer";
import { ProjectCard } from "~/components/elements/ProjectCard";
import { Badge } from "~/components/ui/badge";

export default function ProjectsPage() {
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <ProjectCard key={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
