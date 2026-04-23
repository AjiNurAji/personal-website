import React, { FormEvent, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/Components/UI/button";
import { Input } from "@/Components/UI/input";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/Components/UI/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/UI/select";
import { toast } from "sonner";
import MDEditor from '@uiw/react-md-editor';
import { RiArrowLeftLine } from "@remixicon/react";
import { Link } from "@inertiajs/react";
import { useTheme } from "@/hooks/use-theme";

interface Experience {
  id?: number;
  title: string;
  company: string;
  location?: string;
  type: 'work' | 'education';
  description?: string;
  start_date: string;
  end_date?: string;
  logo?: string | File;
  url?: string;
  priority: number;
}

interface ExperienceFormProps {
  initialData?: Experience;
}

export function ExperienceForm({ initialData }: ExperienceFormProps) {
  const { theme } = useTheme();
  const { data, setData, post, put, processing, errors } = useForm({
    title: initialData?.title || "",
    company: initialData?.company || "",
    location: initialData?.location || "",
    type: initialData?.type || 'work',
    description: initialData?.description || "",
    start_date: initialData?.start_date || "",
    end_date: initialData?.end_date || "",
    logo: null as File | null,
    url: initialData?.url || "",
    priority: initialData?.priority || 0,
    _method: initialData ? 'PUT' : 'POST',
  });

  const [preview, setPreview] = useState<string | null>(
    initialData?.logo 
      ? (typeof initialData.logo === 'string' && initialData.logo.startsWith('http') ? initialData.logo : `/storage/${initialData.logo}`) 
      : null
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    
    const url = initialData 
      ? route('admin.experiences.update', initialData.id) 
      : route('admin.experiences.store');

    post(url, {
      onSuccess: () => {
        toast.success(initialData ? "Experience updated successfully" : "Experience created successfully");
      },
    });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('logo', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
            href={route('admin.experiences.index')}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
            <RiArrowLeftLine className="mr-2 h-4 w-4" />
            Back to List
        </Link>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 max-w-4xl border p-6 rounded-xl bg-white dark:bg-zinc-950 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel>Company Name</FieldLabel>
            <FieldContent>
              <Input 
                placeholder="Tech Corp" 
                value={data.company}
                onChange={(e) => setData('company', e.target.value)}
              />
              {errors.company && <FieldError errors={[errors.company]} />}
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Job Title / Degree</FieldLabel>
            <FieldContent>
              <Input 
                placeholder="Senior Developer" 
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
              />
              {errors.title && <FieldError errors={[errors.title]} />}
            </FieldContent>
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
                <FieldLabel>Location</FieldLabel>
                <FieldContent>
                    <Input 
                        placeholder="Jakarta, ID / Remote" 
                        value={data.location}
                        onChange={(e) => setData('location', e.target.value)}
                    />
                    {errors.location && <FieldError errors={[errors.location]} />}
                </FieldContent>
            </Field>

            <Field>
                <FieldLabel>Type</FieldLabel>
                <FieldContent>
                    <Select 
                        value={data.type} 
                        onValueChange={(val: any) => setData('type', val)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="work">Work Experience</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.type && <FieldError errors={[errors.type]} />}
                </FieldContent>
            </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel>Start Date</FieldLabel>
            <FieldContent>
              <Input 
                type="date"
                value={data.start_date}
                onChange={(e) => setData('start_date', e.target.value)}
              />
              {errors.start_date && <FieldError errors={[errors.start_date]} />}
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>End Date (Empty for Present)</FieldLabel>
            <FieldContent>
              <Input 
                type="date"
                value={data.end_date || ''}
                onChange={(e) => setData('end_date', e.target.value)}
              />
              {errors.end_date && <FieldError errors={[errors.end_date]} />}
            </FieldContent>
          </Field>
        </div>

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
            <FieldLabel>Logo</FieldLabel>
            <FieldContent>
              <div className="flex items-center gap-4">
                {preview && (
                  <div className="h-12 w-12 rounded border overflow-hidden shrink-0 bg-white">
                    <img src={preview} alt="Logo preview" className="h-full w-full object-contain" />
                  </div>
                )}
                <Input 
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              {errors.logo && <FieldError errors={[errors.logo]} />}
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Priority</FieldLabel>
            <FieldContent>
              <Input 
                type="number"
                placeholder="0" 
                value={data.priority}
                onChange={(e) => setData('priority', parseInt(e.target.value) || 0)} 
              />
              {errors.priority && <FieldError errors={[errors.priority]} />}
            </FieldContent>
          </Field>
        </div>

        <Field>
          <FieldLabel>URL (Company/Institution Website)</FieldLabel>
          <FieldContent>
            <Input 
              placeholder="https://..." 
              value={data.url}
              onChange={(e) => setData('url', e.target.value)}
            />
            {errors.url && <FieldError errors={[errors.url]} />}
          </FieldContent>
        </Field>

        <Button type="submit" className="w-full h-11" disabled={processing}>
          {processing ? "Saving..." : initialData ? "Update Experience" : "Create Experience"}
        </Button>
      </form>
    </div>
  );
}
