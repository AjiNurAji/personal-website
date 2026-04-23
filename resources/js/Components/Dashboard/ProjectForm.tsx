"use client";

import React, { FormEvent, useState } from "react";
import { useForm, Link } from "@inertiajs/react";
import { Button } from "@/Components/UI/button";
import { Input } from "@/Components/UI/input";
import { Checkbox } from "@/Components/UI/checkbox";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
  FieldDescription,
} from "@/Components/UI/field";
import { toast } from "sonner";
import { Project } from "@/types";
import MDEditor from '@uiw/react-md-editor';
import { RiArrowLeftLine } from "@remixicon/react";
import { useTheme } from "@/hooks/use-theme";

interface ProjectFormProps {
  initialData?: Project;
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const { theme } = useTheme();
  const { data, setData, post, processing, errors } = useForm({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    image: null as File | null,
    link: initialData?.link || "",
    github: initialData?.github || "",
    demo: initialData?.demo || "",
    badges: initialData?.badges || "",
    featured: initialData?.featured || false,
    _method: initialData ? 'PUT' : 'POST',
  });

  const [preview, setPreview] = useState<string | null>(
    initialData?.image 
      ? (initialData.image.startsWith('http') ? initialData.image : `/storage/${initialData.image}`) 
      : null
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    
    const url = initialData 
      ? route('admin.projects.update', initialData.id) 
      : route('admin.projects.store');

    // Always use post with _method PUT for updates with files
    post(url, {
      onSuccess: () => {
        toast.success(initialData ? "Project updated successfully" : "Project created successfully");
      },
    });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('image', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
            href={route('admin.projects.index')}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
            <RiArrowLeftLine className="mr-2 h-4 w-4" />
            Back to List
        </Link>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 max-w-4xl border p-6 rounded-xl bg-white dark:bg-zinc-950 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel>Title</FieldLabel>
            <FieldContent>
              <Input 
                placeholder="Project Title" 
                value={data.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setData((prev) => ({
                    ...prev,
                    title,
                    slug: !initialData ? title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") : prev.slug
                  }));
                }}
              />
              {errors.title && <FieldError errors={[errors.title]} />}
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Slug</FieldLabel>
            <FieldContent>
              <Input 
                placeholder="project-slug" 
                value={data.slug}
                onChange={(e) => setData('slug', e.target.value)} 
              />
              {errors.slug && <FieldError errors={[errors.slug]} />}
            </FieldContent>
          </Field>
        </div>

        <Field>
          <FieldLabel>Short Description</FieldLabel>
          <FieldContent>
            <Input 
              placeholder="A brief overview of the project"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)} 
            />
            {errors.description && <FieldError errors={[errors.description]} />}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Full Content (Markdown)</FieldLabel>
          <FieldContent className="min-h-[400px]">
            <div data-color-mode={theme} className="w-full">
              <MDEditor
                value={data.content || ''}
                onChange={(val) => setData('content', val || '')}
                preview="edit"
                height={400}
              />
            </div>
            {errors.content && <FieldError errors={[errors.content]} />}
          </FieldContent>
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field>
            <FieldLabel>Cover Image</FieldLabel>
            <FieldContent>
              <div className="space-y-2">
                {preview && (
                  <div className="aspect-video w-full rounded-lg border overflow-hidden bg-zinc-50 dark:bg-zinc-900">
                    <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
                <Input 
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <p className="text-[10px] text-muted-foreground">Max size: 2MB. Recommended ratio: 16:9</p>
              </div>
              {errors.image && <FieldError errors={[errors.image]} />}
            </FieldContent>
          </Field>

          <div className="space-y-4">
            <Field>
              <FieldLabel>Live URL</FieldLabel>
              <FieldContent>
                <Input 
                    placeholder="https://..." 
                    value={data.link || ''}
                    onChange={(e) => setData('link', e.target.value)} 
                />
                {errors.link && <FieldError errors={[errors.link]} />}
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Github Repository</FieldLabel>
              <FieldContent>
                <Input 
                    placeholder="https://github.com/..." 
                    value={data.github || ''}
                    onChange={(e) => setData('github', e.target.value)} 
                />
                {errors.github && <FieldError errors={[errors.github]} />}
              </FieldContent>
            </Field>
          </div>
        </div>

        <Field>
          <FieldLabel>Badges (Comma separated)</FieldLabel>
          <FieldContent>
            <Input 
              placeholder="React, TypeScript, Tailwind" 
              value={data.badges}
              onChange={(e) => setData('badges', e.target.value)} 
            />
            {errors.badges && <FieldError errors={[errors.badges]} />}
          </FieldContent>
        </Field>

        <Field
          orientation="horizontal"
          className="items-start space-x-3 rounded-md border p-4"
        >
          <Checkbox
            id="featured"
            checked={data.featured}
            onCheckedChange={(checked) => setData('featured', checked as boolean)}
          />
          <div className="flex flex-col gap-1 leading-none">
            <FieldLabel htmlFor="featured">Featured Project</FieldLabel>
            <FieldDescription>
              Show prominently on the homepage.
            </FieldDescription>
          </div>
        </Field>

        <Button type="submit" className="w-full" disabled={processing}>
          {processing ? "Saving..." : initialData ? "Update Project" : "Create Project"}
        </Button>
      </form>
    </div>
  );
}
