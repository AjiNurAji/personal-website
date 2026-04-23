import AdminLayout from "@/Layouts/AdminLayout";
import { AchievementForm } from "@/Components/Dashboard/AchievementForm";

export default function AchievementCreate() {
  return (
    <AdminLayout title="Add Achievement">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Achievement</h1>
          <p className="text-muted-foreground">
            Record a new milestone or recognition.
          </p>
        </div>

        <AchievementForm />
      </div>
    </AdminLayout>
  );
}
