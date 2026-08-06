import React, { FormEvent, useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/Components/UI/button";
import { Input } from "@/Components/UI/input";
import { Field, FieldContent, FieldError, FieldLabel } from "@/Components/UI/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/UI/select";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { RiArrowLeftLine } from "@remixicon/react";
import { useTheme } from "@/hooks/use-theme";

interface Experience {
  id?: number; title?: string; title_en?: string; title_id?: string;
  company?: string; company_en?: string; company_id?: string;
  location?: string; type?: "work" | "education";
  description?: string; description_en?: string; description_id?: string;
  start_date?: string; end_date?: string; logo?: string; priority?: number;
}

export function ExperienceForm({ initialData }: { initialData?: Experience }) {
  const { theme } = useTheme();
  const { data, setData, post, processing, errors } = useForm({
    title: initialData?.title || "", title_en: initialData?.title_en || "", title_id: initialData?.title_id || "",
    company: initialData?.company || "", company_en: initialData?.company_en || "", company_id: initialData?.company_id || "",
    location: initialData?.location || "", type: initialData?.type || "work",
    description: initialData?.description || "", description_en: initialData?.description_en || "", description_id: initialData?.description_id || "",
    start_date: initialData?.start_date || "", end_date: initialData?.end_date || "",
    logo: null as File | null, documentation_images: [] as File[], url: "", priority: initialData?.priority || 0,
    _method: initialData ? "PUT" : "POST",
  });
  const [preview, setPreview] = useState(initialData?.logo ? `/storage/${initialData.logo}` : null);
  const set = (key: keyof typeof data, value: any) => setData(key as any, value);

  function submit(event: FormEvent) {
    event.preventDefault();
    const endpoint = initialData ? route("admin.experiences.update", initialData.id) : route("admin.experiences.store");
    post(endpoint, { onSuccess: () => toast.success(initialData ? "Experience updated successfully" : "Experience created successfully") });
  }

  return <div className="space-y-6">
    <Link href={route("admin.experiences.index")} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"><RiArrowLeftLine className="mr-2 size-4" />Back to List</Link>
    <form onSubmit={submit} className="max-w-6xl space-y-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field><FieldLabel>Title / Degree</FieldLabel><FieldContent><Input value={data.title} onChange={(e) => set("title", e.target.value)} />{errors.title && <FieldError errors={[errors.title]} />}</FieldContent></Field>
        <Field><FieldLabel>Company / Institution</FieldLabel><FieldContent><Input value={data.company} onChange={(e) => set("company", e.target.value)} />{errors.company && <FieldError errors={[errors.company]} />}</FieldContent></Field>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field><FieldLabel>Title (English)</FieldLabel><FieldContent><Input value={data.title_en} onChange={(e) => set("title_en", e.target.value)} placeholder="Software and Game Development" /></FieldContent></Field>
        <Field><FieldLabel>Title (Indonesian)</FieldLabel><FieldContent><Input value={data.title_id} onChange={(e) => set("title_id", e.target.value)} placeholder="Pengembangan Perangkat Lunak dan Gim" /></FieldContent></Field>
        <Field><FieldLabel>Institution (English)</FieldLabel><FieldContent><Input value={data.company_en} onChange={(e) => set("company_en", e.target.value)} /></FieldContent></Field>
        <Field><FieldLabel>Institution (Indonesian)</FieldLabel><FieldContent><Input value={data.company_id} onChange={(e) => set("company_id", e.target.value)} /></FieldContent></Field>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field><FieldLabel>Location</FieldLabel><FieldContent><Input value={data.location} onChange={(e) => set("location", e.target.value)} /></FieldContent></Field>
        <Field><FieldLabel>Type</FieldLabel><FieldContent><Select value={data.type} onValueChange={(value) => set("type", value)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="work">Work Experience</SelectItem><SelectItem value="education">Education</SelectItem></SelectContent></Select></FieldContent></Field>
        <Field><FieldLabel>Start Date</FieldLabel><FieldContent><Input type="date" value={data.start_date} onChange={(e) => set("start_date", e.target.value)} /></FieldContent></Field>
        <Field><FieldLabel>End Date</FieldLabel><FieldContent><Input type="date" value={data.end_date} onChange={(e) => set("end_date", e.target.value)} /></FieldContent></Field>
      </div>
      <Field><FieldLabel>Legacy Description (fallback Markdown)</FieldLabel><FieldContent><div data-color-mode={theme}><MDEditor value={data.description} onChange={(value) => set("description", value || "")} height={220} /></div></FieldContent></Field>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Field><FieldLabel>Description (English Markdown)</FieldLabel><FieldContent><div data-color-mode={theme}><MDEditor value={data.description_en} onChange={(value) => set("description_en", value || "")} height={280} /></div></FieldContent></Field>
        <Field><FieldLabel>Description (Indonesian Markdown)</FieldLabel><FieldContent><div data-color-mode={theme}><MDEditor value={data.description_id} onChange={(value) => set("description_id", value || "")} height={280} /></div></FieldContent></Field>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Field><FieldLabel>Logo</FieldLabel><FieldContent><div className="flex items-center gap-3">{preview && <img src={preview} alt="Logo preview" className="size-12 rounded border bg-background object-contain p-1" />}<Input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) { set("logo", file); setPreview(URL.createObjectURL(file)); } }} /></div></FieldContent></Field>
        <Field><FieldLabel>Documentation Photos</FieldLabel><FieldContent><Input type="file" accept="image/*" multiple onChange={(e) => set("documentation_images", Array.from(e.target.files || []))} /><p className="mt-1 text-xs text-muted-foreground">Multiple images become a slideshow.</p></FieldContent></Field>
        <Field><FieldLabel>Priority</FieldLabel><FieldContent><Input type="number" value={data.priority} onChange={(e) => set("priority", Number(e.target.value) || 0)} /></FieldContent></Field>
      </div>
      <Button type="submit" className="h-11 w-full" disabled={processing}>{processing ? "Saving..." : initialData ? "Update Experience" : "Create Experience"}</Button>
    </form>
  </div>;
}
