import AdminLayout from "@/Layouts/AdminLayout";
import { ExperienceForm } from "@/Components/Dashboard/ExperienceForm";

interface Experience {
  id: number;
  title: string;
  company: string;
  location?: string;
  type: 'work' | 'education';
  description?: string;
  start_date: string;
  end_date?: string;
  logo?: string;
  url?: string;
  priority: number;
}

interface Props {
  experience: Experience;
}

export default function ExperienceEdit({ experience }: Props) {
  return (
    <AdminLayout title="Edit Experience">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Journey Entry</h1>
          <p className="text-muted-foreground">
            Update your professional or educational history.
          </p>
        </div>

        <ExperienceForm initialData={experience} />
      </div>
    </AdminLayout>
  );
}
