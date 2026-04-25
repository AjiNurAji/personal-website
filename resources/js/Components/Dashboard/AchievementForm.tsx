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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/UI/select";

export interface Achievement {
  id?: number;
  title: string;
  description: string;
  content: string | null;
  organization: string | null;
  year: string | null;
  category: "event" | "award" | "certification";
  certificate_path: string | null;
  preview_image: string | null;
}

interface AchievementFormProps {
  initialData?: Achievement;
}

export function AchievementForm({ initialData }: AchievementFormProps) {
  const { theme } = useTheme();
  const { data, setData, post, processing, errors } = useForm({
    title: initialData?.title || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    organization: initialData?.organization || "",
    year: initialData?.year || "",
    category: initialData?.category || "event",
    certificate: null as File | null,
    preview: null as File | null,
    _method: initialData?.id ? 'PUT' : 'POST',
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (initialData?.id) {
      post(route('admin.achievements.update', initialData.id), {
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

            <Field>
              <FieldLabel>Category</FieldLabel>
              <FieldContent>
                <Select
                  value={data.category}
                  onValueChange={(val: any) => setData('category', val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="award">Award</SelectItem>
                    <SelectItem value="certification">Certification</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <FieldError errors={[errors.category]} />}
              </FieldContent>
            </Field>
        </div>

        <Field>
          <FieldLabel>Details / Content (Markdown - Optional)</FieldLabel>
          <FieldContent className="min-h-[300px]">
            <div data-color-mode={theme} className="w-full">
              <MDEditor
                value={data.content || ''}
                onChange={(val) => setData('content', val || '')}
                preview="edit"
                height={300}
              />
            </div>
            {errors.content && <FieldError errors={[errors.content]} />}
          </FieldContent>
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Certificate (PDF/PNG)</FieldLabel>
              <FieldContent>
                <Input 
                  type="file"
                  onChange={(e) => setData('certificate', e.target.files?.[0] || null)} 
                />
                {errors.certificate && <FieldError errors={[errors.certificate]} />}
                {initialData?.certificate_path && (
                    <p className="text-xs text-muted-foreground mt-1">Existing: {initialData.certificate_path}</p>
                )}
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel>Preview Image (Card Preview)</FieldLabel>
              <FieldContent>
                <Input 
                  type="file"
                  onChange={(e) => setData('preview', e.target.files?.[0] || null)} 
                />
                {errors.preview && <FieldError errors={[errors.preview]} />}
                {initialData?.preview_image && (
                    <p className="text-xs text-muted-foreground mt-1">Existing: {initialData.preview_image}</p>
                )}
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
