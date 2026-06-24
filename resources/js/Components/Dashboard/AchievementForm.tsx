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
import { FormEvent, useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import { RiArrowLeftLine } from "@remixicon/react";
import { useTheme } from "@/hooks/use-theme";
import { motion } from "framer-motion";
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
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const { data, setData, post, processing, errors } = useForm({
    title: initialData?.title || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    organization: initialData?.organization || "",
    year: initialData?.year || "",
    category: initialData?.category || "event",
    certificate: null as File | null,
    preview_image_file: null as File | null,
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

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        onSubmit={onSubmit} 
        className="max-w-6xl p-6 md:p-8 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-zinc-950/70 border border-zinc-200/50 dark:border-zinc-800/50 shadow-xl shadow-zinc-200/40 dark:shadow-black/40 ring-1 ring-zinc-900/5 dark:ring-white/5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Basic Info */}
            <div className="space-y-6">
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

                <Field>
                <FieldLabel>Certificate Document (PDF/Image)</FieldLabel>
                <FieldContent>
                    <Input 
                    type="file"
                    className="cursor-pointer h-10 py-1.5 text-muted-foreground file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 file:text-xs file:font-semibold hover:file:bg-primary/20"
                    onChange={async (e) => {
                        const file = e.target.files?.[0] || null;
                        setData('certificate', file);
                        
                        if (file) {
                            if (file.type.startsWith('image/')) {
                                setLocalPreview(URL.createObjectURL(file));
                                setData('preview_image_file', null);
                            } else if (file.type === 'application/pdf') {
                                try {
                                    // Load PDF.js from CDN dynamically to avoid NPM conflicts
                                    const loadPdfJs = async (): Promise<any> => {
                                        if ((window as any).pdfjsLib) return (window as any).pdfjsLib;
                                        return new Promise((resolve, reject) => {
                                            const script = document.createElement('script');
                                            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
                                            script.onload = () => {
                                                const pdfjsLib = (window as any)['pdfjs-dist/build/pdf'];
                                                pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                                                (window as any).pdfjsLib = pdfjsLib;
                                                resolve(pdfjsLib);
                                            };
                                            script.onerror = reject;
                                            document.head.appendChild(script);
                                        });
                                    };

                                    const pdfjsLib = await loadPdfJs();
                                    
                                    const arrayBuffer = await file.arrayBuffer();
                                    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                                    const page = await pdf.getPage(1);
                                    
                                    const viewport = page.getViewport({ scale: 1.5 });
                                    const canvas = document.createElement('canvas');
                                    const context = canvas.getContext('2d');
                                    
                                    if (context) {
                                        canvas.height = viewport.height;
                                        canvas.width = viewport.width;
                                        await page.render({ canvasContext: context, viewport }).promise;
                                        
                                        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                                        setLocalPreview(dataUrl);
                                        
                                        const res = await fetch(dataUrl);
                                        const blob = await res.blob();
                                        const previewFile = new File([blob], 'preview.jpg', { type: 'image/jpeg' });
                                        setData('preview_image_file', previewFile);
                                    }
                                } catch (error) {
                                    console.error('Error generating PDF preview:', error);
                                    setLocalPreview(null);
                                    setData('preview_image_file', null);
                                }
                            } else {
                                setLocalPreview(null);
                                setData('preview_image_file', null);
                            }
                        } else {
                            setLocalPreview(null);
                            setData('preview_image_file', null);
                        }
                    }} 
                    />
                    {errors.certificate && <FieldError errors={[errors.certificate]} />}
                    {(localPreview || initialData?.preview_image) && (
                        <div className="mt-4 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-muted aspect-video relative group">
                            <img 
                                src={localPreview || `/storage/${initialData?.preview_image}`} 
                                alt="Preview" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    )}
                    {initialData?.certificate_path && !initialData?.preview_image && !localPreview && (
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Current file: {initialData.certificate_path.split('/').pop()}
                        </p>
                    )}
                </FieldContent>
                </Field>
            </div>

            {/* Right Column: Markdown Editors */}
            <div className="space-y-6">
                <Field>
                <FieldLabel>Description (Markdown)</FieldLabel>
                <FieldContent className="min-h-[200px]">
                    <div data-color-mode={theme} className="w-full">
                    <MDEditor
                        value={data.description}
                        onChange={(val) => setData('description', val || '')}
                        preview="edit"
                        height={200}
                    />
                    </div>
                    {errors.description && <FieldError errors={[errors.description]} />}
                </FieldContent>
                </Field>

                <Field>
                <FieldLabel>Details / Content (Markdown - Optional)</FieldLabel>
                <FieldContent className="min-h-[200px]">
                    <div data-color-mode={theme} className="w-full">
                    <MDEditor
                        value={data.content || ''}
                        onChange={(val) => setData('content', val || '')}
                        preview="edit"
                        height={200}
                    />
                    </div>
                    {errors.content && <FieldError errors={[errors.content]} />}
                </FieldContent>
                </Field>
            </div>
        </div>

        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 mt-8 flex justify-end">
          <Button type="submit" className="w-full md:w-auto min-w-[200px]" disabled={processing}>
            {processing ? "Saving..." : initialData ? "Update Achievement" : "Create Achievement"}
          </Button>
        </div>
      </motion.form>
    </div>
  );
}
