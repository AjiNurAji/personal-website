"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
  FieldDescription,
} from "~/components/ui/field";
import { createProject, updateProject } from "./actions";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "~/components/ui/textarea";

const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  image: z.string().min(1, "Image URL is required"),
  link: z.string().optional().nullable(),
  github: z.string().optional().nullable(),
  demo: z.string().optional().nullable(),
  badges: z.string().transform((val) =>
    val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  ),
  featured: z.boolean().default(false),
});

interface ProjectFormProps {
  initialData?: any;
  onSuccess: () => void;
}

export function ProjectForm({ initialData, onSuccess }: ProjectFormProps) {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, setValue } = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema as any),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      content: initialData?.content || "",
      image: initialData?.image || "",
      link: initialData?.link || "",
      github: initialData?.github || "",
      demo: initialData?.demo || "",
      badges: initialData?.badges?.join(", ") || "",
      featured: initialData?.featured || false,
    },
  });

  async function onSubmit(values: any) {
    setLoading(true);
    try {
      if (initialData) {
        await updateProject(initialData.id, values);
        toast.success("Project updated successfully");
      } else {
        await createProject(values);
        toast.success("Project created successfully");
      }
      onSuccess();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Title</FieldLabel>
            <FieldContent>
              <Input 
                placeholder="Project Title" 
                {...field} 
                onChange={(e) => {
                  field.onChange(e);
                  if (!initialData) {
                    setValue("slug", e.target.value.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""));
                  }
                }}
              />
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />
      <Controller
        control={control}
        name="slug"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Slug</FieldLabel>
            <FieldContent>
              <Input placeholder="project-slug" {...field} value={field.value ?? ""} />
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Short Description</FieldLabel>
            <FieldContent>
              <Input placeholder="Short description" {...field} value={field.value ?? ""} />
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />
      <Controller
        control={control}
        name="content"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Full Content (Markdown)</FieldLabel>
            <FieldContent>
              <Textarea 
                placeholder="Markdown content..." 
                rows={10}
                {...field} 
                value={field.value ?? ""}
              />
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="image"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Image URL</FieldLabel>
              <FieldContent>
                <Input placeholder="/images/proj.jpg" {...field} value={field.value ?? ""} />
                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="link"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Link</FieldLabel>
              <FieldContent>
                <Input placeholder="External link" {...field} value={field.value ?? ""} />
                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="github"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Github Link (Optional)</FieldLabel>
              <FieldContent>
                <Input placeholder="https://github.com/..." {...field} value={field.value ?? ""} />
                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="demo"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Demo Link (Optional)</FieldLabel>
              <FieldContent>
                <Input placeholder="https://demo.com" {...field} value={field.value ?? ""} />
                <FieldError errors={[fieldState.error]} />
              </FieldContent>
            </Field>
          )}
        />
      </div>
      <Controller
        control={control}
        name="badges"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Badges (Comma separated)</FieldLabel>
            <FieldContent>
              <Input placeholder="React, TypeScript, Tailwind" {...field} value={field.value ?? ""} />
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />
      <Controller
        control={control}
        name="featured"
        render={({ field }) => (
          <Field
            orientation="horizontal"
            className="items-start space-x-3 rounded-md border p-4"
          >
            <Checkbox
              id="featured"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <div className="flex flex-col gap-1 leading-none">
              <FieldLabel htmlFor="featured">Featured Project</FieldLabel>
              <FieldDescription>
                Show on homepage.
              </FieldDescription>
            </div>
          </Field>
        )}
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Saving..." : initialData ? "Update Project" : "Create Project"}
      </Button>
    </form>
  );
}
