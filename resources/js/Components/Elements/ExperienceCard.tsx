"use client";

import { Badge } from "@/Components/UI/badge";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { SafeImage } from "./SafeImage";
import MDEditor from '@uiw/react-md-editor';
import { useTheme } from "@/hooks/use-theme";

interface ExperienceCardProps {
  logo: string;
  company: string;
  role: string;
  period: string;
  description: string;
  skills: string[];
  delay?: number;
}

export const ExperienceCard = ({
  logo,
  company,
  role,
  period,
  description,
  skills,
  delay = 0,
}: ExperienceCardProps) => {
  const { theme } = useTheme();
  const logoUrl = logo ? (logo.startsWith('http') || logo.startsWith('/') ? logo : `/storage/${logo}`) : '';

  return (
    <AnimateIn
      variant="fade-left"
      delay={delay}
      className="relative pl-8 not-last:pb-12"
    >
      {/* Timeline line + dot */}
      <div className="absolute left-0 top-2.5 h-full w-[2px] bg-muted">
        <div className="absolute h-3 w-3 -left-[5px] top-0 rounded-full border-2 border-primary bg-background" />
      </div>

      <div className="space-y-3">
        {/* Company row */}
        <AnimateIn variant="fade-left" delay={delay + 0.05}>
          <div className="flex items-center gap-3">
            <div className="relative shrink-0 size-10 rounded-lg bg-accent overflow-hidden flex justify-center items-center p-1.5">
              <SafeImage
                src={logoUrl}
                alt={company}
                className="w-full h-full object-contain"
                containerClassName="w-full h-full"
              />
            </div>
            <span className="text-lg font-semibold">{company}</span>
          </div>
        </AnimateIn>

        {/* Role + date */}
        <AnimateIn variant="fade-left" delay={delay + 0.1}>
          <div>
            <h3 className="text-xl font-medium">{role}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
              </svg>
              <span>{period}</span>
            </div>
          </div>
        </AnimateIn>

        {/* Description (Markdown) */}
        <AnimateIn variant="fade-left" delay={delay + 0.15}>
          <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none">
            <div data-color-mode={theme}>
              <MDEditor.Markdown 
                source={description} 
                style={{ backgroundColor: 'transparent', color: 'inherit' }}
              />
            </div>
          </div>
        </AnimateIn>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <AnimateIn variant="fade-left" delay={delay + 0.2}>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </AnimateIn>
        )}
      </div>
    </AnimateIn>
  );
};
