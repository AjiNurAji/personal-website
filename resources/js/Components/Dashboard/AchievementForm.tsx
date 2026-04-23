import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/UI/button";
import { Input } from "@/Components/UI/input";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/Components/UI/field";
import { Textarea } from "@/Components/UI/textarea";
import { toast } from "sonner";
import { FormEvent } from "react";

interface Achievement {
  id?: number;
  title: string;
  description: string;
  organization: string | null;
  year: string | null;
}

interface AchievementFormProps {
  initialData?: Achievement;
  onSuccess: () => void;
}

export function AchievementForm({ initialData, onSuccess }: AchievementFormProps) {
  const { data, setData, post, put, processing, errors } = useForm({
    title: initialData?.title || "",
    description: initialData?.description || "",
    organization: initialData?.organization || "",
    year: initialData?.year || "",
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (initialData?.id) {
      put(route('admin.achievements.update', initialData.id), {
        onSuccess: () => {
          toast.success("Achievement updated successfully");
          onSuccess();
        },
      });
    } else {
      post(route('admin.achievements.store'), {
        onSuccess: () => {
          toast.success("Achievement created successfully");
          onSuccess();
        },
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Field>
        <FieldLabel>Title</FieldLabel>
        <FieldContent>
          <Input 
            placeholder="Achievement Title" 
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
          />
          {errors.title && <FieldError errors={[errors.title]} />}
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Description</FieldLabel>
        <FieldContent>
          <Textarea 
            placeholder="Detailed description..." 
            value={data.description}
            onChange={(e) => setData('description', e.target.value)} 
            rows={4}
          />
          {errors.description && <FieldError errors={[errors.description]} />}
        </FieldContent>
      </Field>

      <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel>Organization (Optional)</FieldLabel>
            <FieldContent>
              <Input 
                placeholder="Google, Microsoft, etc." 
                value={data.organization || ''}
                onChange={(e) => setData('organization', e.target.value)} 
              />
              {errors.organization && <FieldError errors={[errors.organization]} />}
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Year (Optional)</FieldLabel>
            <FieldContent>
              <Input 
                placeholder="2026" 
                value={data.year || ''}
                onChange={(e) => setData('year', e.target.value)} 
              />
              {errors.year && <FieldError errors={[errors.year]} />}
            </FieldContent>
          </Field>
      </div>

      <Button type="submit" className="w-full" disabled={processing}>
        {processing ? "Saving..." : initialData ? "Update Achievement" : "Create Achievement"}
      </Button>
    </form>
  );
}
