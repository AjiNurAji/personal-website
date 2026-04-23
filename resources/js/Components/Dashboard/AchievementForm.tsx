"use client";

import { useForm, Link } from "@inertiajs/react";
import { Button } from "@/Components/UI/button";
import { Input } from "@/Components/UI/input";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/Components/UI/field";
import { toast } from "sonner";
import { FormEvent } from "react";
import MDEditor from '@uiw/react-md-editor';
import { RiArrowLeftLine } from "@remixicon/react";
import { useTheme } from "@/hooks/use-theme";

interface Achievement {
  id?: number;
  title: string;
  description: string;
  organization: string | null;
  year: string | null;
}

interface AchievementFormProps {
  initialData?: Achievement;
}

export function AchievementForm({ initialData }: AchievementFormProps) {
  const { theme } = useTheme();
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
        },
      });
    } else {
      post(route('admin.achievements.store'), {
        onSuccess: () => {
          toast.success("Achievement created successfully");
        },
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
            href={route('admin.achievements.index')}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
            <RiArrowLeftLine className="mr-2 h-4 w-4" />
            Back to List
        </Link>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 max-w-4xl border p-6 rounded-xl bg-white dark:bg-zinc-950 shadow-sm">
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
          <FieldLabel>Description (Markdown)</FieldLabel>
          <FieldContent className="min-h-[300px]">
            <div data-color-mode={theme} className="w-full">
              <MDEditor
                value={data.description}
                onChange={(val) => setData('description', val || '')}
                preview="edit"
                height={300}
              />
            </div>
            {errors.description && <FieldError errors={[errors.description]} />}
          </FieldContent>
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </div>
  );
}
