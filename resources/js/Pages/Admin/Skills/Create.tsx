import AdminLayout from "@/Layouts/AdminLayout";
import { SkillForm } from "@/Components/Dashboard/SkillForm";

export default function SkillCreate() {
  return (
    <AdminLayout title="Add Skill">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Skill</h1>
          <p className="text-muted-foreground">
            Add a new technical skill to your portfolio.
          </p>
        </div>

        <SkillForm />
      </div>
    </AdminLayout>
  );
}
