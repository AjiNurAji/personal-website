import AdminLayout from "@/Layouts/AdminLayout";
import { SkillForm } from "@/Components/Dashboard/SkillForm";

interface Skill {
  id: number;
  name: string;
  icon: string;
  category: string;
  priority: number;
}

interface Props {
  skill: Skill;
}

export default function SkillEdit({ skill }: Props) {
  return (
    <AdminLayout title="Edit Skill">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Skill</h1>
          <p className="text-muted-foreground">
            Update your technical skill details.
          </p>
        </div>

        <SkillForm initialData={skill} />
      </div>
    </AdminLayout>
  );
}
