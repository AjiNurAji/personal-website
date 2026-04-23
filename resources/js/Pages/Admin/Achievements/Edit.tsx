import AdminLayout from "@/Layouts/AdminLayout";
import { AchievementForm } from "@/Components/Dashboard/AchievementForm";

interface Achievement {
  id: number;
  title: string;
  description: string;
  organization: string | null;
  year: string | null;
}

interface Props {
  achievement: Achievement;
}

export default function AchievementEdit({ achievement }: Props) {
  return (
    <AdminLayout title="Edit Achievement">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Achievement</h1>
          <p className="text-muted-foreground">
            Update your milestone details.
          </p>
        </div>

        <AchievementForm initialData={achievement} />
      </div>
    </AdminLayout>
  );
}
