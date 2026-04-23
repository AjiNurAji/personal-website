import { useForm } from "@inertiajs/react";
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
import { Textarea } from "@/Components/UI/textarea";
import { toast } from "sonner";
import { FormEvent } from "react";
import { Project } from "@/types";

interface ProjectFormProps {
  initialData?: Project;
  onSuccess: () => void;
}

export function ProjectForm({ initialData, onSuccess }: ProjectFormProps) {
  const { data, setData, post, put, processing, errors } = useForm({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    image: initialData?.image || "",
    link: initialData?.link || "",
    github: initialData?.github || "",
    demo: initialData?.demo || "",
    badges: initialData?.badges || "", // This is already comma separated string from Controller
    featured: initialData?.featured || false,
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (initialData) {
      put(route('admin.projects.update', initialData.id), {
        onSuccess: () => {
          toast.success("Project updated successfully");
          onSuccess();
        },
      });
    } else {
      post(route('admin.projects.store'), {
        onSuccess: () => {
          toast.success("Project created successfully");
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
            placeholder="Project Title" 
            value={data.title}
            onChange={(e) => {
              setData((prev) => {
                const title = e.target.value;
                return {
                    ...prev,
                    title,
                    slug: !initialData ? title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") : prev.slug
                }
              });
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

      <Field>
        <FieldLabel>Short Description</FieldLabel>
        <FieldContent>
          <Input 
            placeholder="Short description"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)} 
          />
          {errors.description && <FieldError errors={[errors.description]} />}
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Full Content (Markdown)</FieldLabel>
        <FieldContent>
          <Textarea 
            placeholder="Markdown content..." 
            rows={10}
            value={data.content || ''}
            onChange={(e) => setData('content', e.target.value)} 
          />
          {errors.content && <FieldError errors={[errors.content]} />}
        </FieldContent>
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Image URL</FieldLabel>
          <FieldContent>
            <Input 
                placeholder="/images/proj.jpg" 
                value={data.image}
                onChange={(e) => setData('image', e.target.value)} 
            />
            {errors.image && <FieldError errors={[errors.image]} />}
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Link</FieldLabel>
          <FieldContent>
            <Input 
                placeholder="External link" 
                value={data.link || ''}
                onChange={(e) => setData('link', e.target.value)} 
            />
            {errors.link && <FieldError errors={[errors.link]} />}
          </FieldContent>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>Github Link (Optional)</FieldLabel>
          <FieldContent>
            <Input 
                placeholder="https://github.com/..." 
                value={data.github || ''}
                onChange={(e) => setData('github', e.target.value)} 
            />
            {errors.github && <FieldError errors={[errors.github]} />}
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel>Demo Link (Optional)</FieldLabel>
          <FieldContent>
            <Input 
                placeholder="https://demo.com" 
                value={data.demo || ''}
                onChange={(e) => setData('demo', e.target.value)} 
            />
            {errors.demo && <FieldError errors={[errors.demo]} />}
          </FieldContent>
        </Field>
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
            Show on homepage.
          </FieldDescription>
        </div>
      </Field>

      <Button type="submit" className="w-full" disabled={processing}>
        {processing ? "Saving..." : initialData ? "Update Project" : "Create Project"}
      </Button>
    </form>
  );
}
