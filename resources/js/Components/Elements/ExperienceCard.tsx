"use client";

import { useRef, useState } from "react";
import { Badge } from "@/Components/UI/badge";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { SafeImage } from "./SafeImage";
import MDEditor from '@uiw/react-md-editor';
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

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
  
  // Spotlight effect state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <AnimateIn
      variant="blur-fade"
      delay={delay}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
            "group relative flex flex-col h-full rounded-3xl border border-zinc-200 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md transition-all duration-500",
            "hover:border-zinc-300 dark:hover:border-zinc-700/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
        )}
      >
        {/* Spotlight Effect */}
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)'}, transparent 40%)`,
            }}
          />
        )}

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full space-y-5">
            {/* Top Row: Logo & Period */}
            <div className="flex items-start justify-between gap-4">
                <div className="relative shrink-0 size-14 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm border border-zinc-100 dark:border-zinc-700/50 overflow-hidden flex justify-center items-center p-2 group-hover:scale-105 transition-transform duration-500">
                    {logoUrl ? (
                        <SafeImage
                            src={logoUrl}
                            alt={company}
                            className="w-full h-full object-contain"
                            containerClassName="w-full h-full"
                        />
                    ) : (
                        <div className="w-full h-full bg-primary/10 rounded-xl" />
                    )}
                </div>
                <Badge variant="secondary" className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-700 font-medium px-3 py-1">
                    {period}
                </Badge>
            </div>

            {/* Title & Company */}
            <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    {role}
                </h3>
                <p className="text-base font-medium text-muted-foreground mt-1">
                    {company}
                </p>
            </div>

            {/* Description (Markdown) */}
            <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none pt-2 flex-grow">
                <div data-color-mode={theme}>
                <MDEditor.Markdown 
                    source={description} 
                    style={{ backgroundColor: 'transparent', color: 'inherit', fontSize: '0.95rem', lineHeight: '1.6' }}
                />
                </div>
            </div>

            {/* Skills */}
            {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 mt-auto">
                {skills.map((skill) => (
                <Badge key={skill} variant="outline" className="bg-transparent">
                    {skill}
                </Badge>
                ))}
            </div>
            )}
        </div>
      </div>
    </AnimateIn>
  );
};
