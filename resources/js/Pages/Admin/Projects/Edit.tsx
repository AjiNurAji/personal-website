import AdminLayout from "@/Layouts/AdminLayout";
import { ProjectForm } from "@/Components/Dashboard/ProjectForm";
import { Project } from "@/types";

interface Props {
  project: Project;
}

export default function ProjectEdit({ project }: Props) {
  return (
    <AdminLayout title="Edit Project">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
          <p className="text-muted-foreground">
            Update your project details and content.
          </p>
        </div>

        <ProjectForm initialData={project} />
      </div>
    </AdminLayout>
  );
}
