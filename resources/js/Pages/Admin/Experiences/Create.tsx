import AdminLayout from "@/Layouts/AdminLayout";
import { ExperienceForm } from "@/Components/Dashboard/ExperienceForm";

export default function ExperienceCreate() {
  return (
    <AdminLayout title="Add Experience">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Journey Entry</h1>
          <p className="text-muted-foreground">
            Create a new work or education record.
          </p>
        </div>

        <ExperienceForm />
      </div>
    </AdminLayout>
  );
}
