"use client";

import MDEditor from "@uiw/react-md-editor";
import { useTranslation } from "@/lib/i18n";
import { useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine, RiExternalLinkLine } from "@remixicon/react";

interface ExperienceProps {
  workExperiences: any[];
  educationExperiences: any[];
}

const formatDate = (dateString: string, locale: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", { month: "short", year: "numeric" });
};

const getPeriod = (exp: any, locale: string) => `${formatDate(exp.start_date, locale)} — ${exp.end_date ? formatDate(exp.end_date, locale) : locale === "id" ? "Sekarang" : "Present"}`;
const localized = (exp: any, field: string, locale: string) => exp[`${field}_${locale}`] || exp[field] || "";

function DocumentationGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  if (!images.length) return null;
  const imageUrl = `/storage/${images[index]}`;

  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-border/70 bg-muted/20">
      <div className="relative aspect-[16/9] bg-muted/30">
        <img src={imageUrl} alt={`Documentation ${index + 1}`} className="h-full w-full object-cover" />
        {images.length > 1 && <>
          <button type="button" aria-label="Previous documentation" onClick={() => setIndex((index - 1 + images.length) % images.length)} className="absolute left-3 top-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"><RiArrowLeftSLine className="size-4" /></button>
          <button type="button" aria-label="Next documentation" onClick={() => setIndex((index + 1) % images.length)} className="absolute right-3 top-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"><RiArrowRightSLine className="size-4" /></button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">{index + 1} / {images.length}</div>
        </>}
      </div>
      {images.length > 1 && <div className="flex gap-2 overflow-x-auto p-2">
        {images.map((image, itemIndex) => <button type="button" key={image} onClick={() => setIndex(itemIndex)} className={`size-14 shrink-0 overflow-hidden rounded-md border-2 ${itemIndex === index ? "border-primary" : "border-transparent"}`}><img src={`/storage/${image}`} alt="" className="h-full w-full object-cover" /></button>)}
      </div>}
    </div>
  );
}

function ExperienceItem({ exp, locale }: { exp: any; locale: string }) {
  const title = localized(exp, "title", locale);
  const company = localized(exp, "company", locale);
  const description = localized(exp, "description", locale);
  const images = Array.isArray(exp.documentation_images) ? exp.documentation_images : [];

  return <div className="group relative grid grid-cols-1 gap-1 pb-4 sm:grid-cols-8 sm:gap-4">
    <header className="z-10 mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:col-span-2">{getPeriod(exp, locale)}</header>
    <div className="z-10 space-y-2 sm:col-span-6">
      <div className="flex items-start gap-3">
        {exp.logo && <img src={`/storage/${exp.logo}`} alt="" className="mt-0.5 size-9 rounded-lg border border-border/70 bg-card object-contain p-1" />}
        <div><h3 className="font-medium leading-snug text-foreground">{title}{company ? " · " : ""}<span className="text-muted-foreground">{company}</span></h3>{exp.location && <p className="text-xs text-muted-foreground">{exp.location}</p>}</div>
      </div>
      {description && <div className="prose prose-sm max-w-none text-muted-foreground dark:prose-invert" data-color-mode={locale === "id" ? "light" : "dark"}><MDEditor.Markdown source={description} style={{ backgroundColor: "transparent", color: "inherit" }} /></div>}
      <DocumentationGallery images={images} />
      {exp.url && <a href={exp.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">View institution <RiExternalLinkLine className="size-3" /></a>}
    </div>
  </div>;
}

export default function Experience({ workExperiences, educationExperiences }: ExperienceProps) {
  const { locale } = useTranslation();
  const groups = [{ label: locale === "id" ? "Pengalaman" : "Experience", items: workExperiences || [] }, { label: locale === "id" ? "Pendidikan" : "Education", items: educationExperiences || [] }];

  return <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:scroll-mt-24">
    {groups.map((group) => <div key={group.label} className="mb-16 last:mb-0">
      <div className="sticky top-0 z-20 -mx-6 mb-6 bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-0 lg:px-0 lg:py-0 lg:bg-transparent lg:backdrop-blur-none"><h2 className="text-sm font-bold uppercase tracking-widest text-foreground">{group.label}</h2></div>
      {group.items.length ? <div className="space-y-12">{group.items.map((exp) => <ExperienceItem key={exp.id} exp={exp} locale={locale} />)}</div> : <p className="text-sm italic text-muted-foreground/60">{locale === "id" ? "Belum ada pengalaman kerja." : "No work experience listed yet."}</p>}
    </div>)}
  </section>;
}

export { DocumentationGallery };
