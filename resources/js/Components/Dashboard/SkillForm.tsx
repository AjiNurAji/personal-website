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
import { RiArrowLeftLine } from "@remixicon/react";

interface Skill {
  id?: number;
  name: string;
  icon: string;
  category: string;
  priority: number;
}

interface SkillFormProps {
  initialData?: Skill;
}

export function SkillForm({ initialData }: SkillFormProps) {
  const { data, setData, post, put, processing, errors } = useForm({
    name: initialData?.name || "",
    icon: initialData?.icon || "",
    category: initialData?.category || "Frontend",
    priority: initialData?.priority || 0,
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (initialData?.id) {
      put(route('admin.skills.update', initialData.id), {
        onSuccess: () => {
          toast.success("Skill updated successfully");
        },
      });
    } else {
      post(route('admin.skills.store'), {
        onSuccess: () => {
          toast.success("Skill created successfully");
        },
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link 
            href={route('admin.skills.index')}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
            <RiArrowLeftLine className="mr-2 h-4 w-4" />
            Back to List
        </Link>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 max-w-2xl border p-6 rounded-xl bg-white dark:bg-zinc-950 shadow-sm">
        <Field>
          <FieldLabel>Name</FieldLabel>
          <FieldContent>
            <Input 
              placeholder="Skill Name (e.g. React)" 
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
            />
            {errors.name && <FieldError errors={[errors.name]} />}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Icon Key (Remix Icon format)</FieldLabel>
          <FieldContent>
            <Input 
              placeholder="RiReactjsLine" 
              value={data.icon}
              onChange={(e) => setData('icon', e.target.value)} 
            />
            {errors.icon && <FieldError errors={[errors.icon]} />}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Category</FieldLabel>
          <FieldContent>
            <Input 
              placeholder="Frontend" 
              value={data.category}
              onChange={(e) => setData('category', e.target.value)} 
            />
            {errors.category && <FieldError errors={[errors.category]} />}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>Priority (lower = higher up)</FieldLabel>
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

        <Button type="submit" className="w-full" disabled={processing}>
          {processing ? "Saving..." : initialData ? "Update Skill" : "Create Skill"}
        </Button>
      </form>
    </div>
  );
}
