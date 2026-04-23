"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "~/components/ui/field";
import { createSkill, updateSkill } from "./actions";
import { useState } from "react";
import { toast } from "sonner";

const SkillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  priority: z.coerce.number().default(0),
});

interface SkillFormProps {
  initialData?: any;
  onSuccess: () => void;
}

export function SkillForm({ initialData, onSuccess }: SkillFormProps) {
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<z.infer<typeof SkillSchema>>({
    resolver: zodResolver(SkillSchema as any),
    defaultValues: {
      name: initialData?.name || "",
      category: initialData?.category || "Frontend",
      priority: initialData?.priority || 0,
    },
  });

  async function onSubmit(values: any) {
    setLoading(true);
    try {
      if (initialData) {
        await updateSkill(initialData.id, values);
        toast.success("Skill updated successfully");
      } else {
        await createSkill(values);
        toast.success("Skill created successfully");
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
        name="name"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Name</FieldLabel>
            <FieldContent>
              <Input placeholder="e.g. React" {...field} />
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />
      <Controller
        control={control}
        name="category"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Category</FieldLabel>
            <FieldContent>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Tools">Tools</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />
      <Controller
        control={control}
        name="priority"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Priority (0-100)</FieldLabel>
            <FieldContent>
              <Input type="number" {...field} />
              <FieldError errors={[fieldState.error]} />
            </FieldContent>
          </Field>
        )}
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Saving..." : initialData ? "Update Skill" : "Create Skill"}
      </Button>
    </form>
  );
}
