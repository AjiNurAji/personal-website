import AdminLayout from "@/Layouts/AdminLayout";
import { ProjectForm } from "@/Components/Dashboard/ProjectForm";

export default function ProjectCreate() {
  return (
    <AdminLayout title="Add Project">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Project</h1>
          <p className="text-muted-foreground">
            Create a new showcase for your portfolio.
          </p>
        </div>

        <ProjectForm />
      </div>
    </AdminLayout>
  );
}
