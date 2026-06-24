"use client";

import { useState } from "react";
import { Badge } from "@/Components/UI/badge";
import { LetterAnimation } from "@/Components/Elements/LetterAnimation";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { ExperienceCard } from "@/Components/Elements/ExperienceCard";
import { cn } from "@/lib/utils";

interface ExperienceProps {
  workExperiences: any[];
  educationExperiences: any[];
}

const Experience = ({ workExperiences, educationExperiences }: ExperienceProps) => {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const getPeriod = (exp: any) => {
    const start = formatDate(exp.start_date);
    const end = exp.end_date ? formatDate(exp.end_date) : "Present";
    return `${start} — ${end}`;
  };

  const activeData = activeTab === 'work' ? workExperiences : educationExperiences;

  return (
    <section
      id="experience"
      className="relative z-4 bg-transparent border-t overflow-hidden px-4 sm:px-0"
    >
        <div className="absolute top-10 right-10 text-8xl md:text-9xl font-black text-zinc-500/5 dark:text-zinc-400/5 pointer-events-none select-none -z-10">
          JOURNEY
        </div>
        <div className="max-w-5xl mx-auto border-x px-6 py-20 bg-background/80 backdrop-blur-sm relative z-10 min-h-[800px]">
          {/* Section header */}
          <div className="flex flex-col items-center justify-center gap-3 text-center mb-10">
            <AnimateIn variant="blur-fade">
              <Badge variant="secondary">My Journey</Badge>
            </AnimateIn>
            <LetterAnimation
              isHeading
              inView
              className="text-4xl sm:text-5xl font-bold tracking-tight"
            >
              Experience & Education
            </LetterAnimation>
            <AnimateIn variant="blur-fade" delay={0.1}>
              <p className="text-muted-foreground">
                A timeline of my professional growth and educational background
              </p>
            </AnimateIn>
          </div>

          {/* Custom Animated Tabs */}
          <AnimateIn variant="blur-fade" delay={0.2} className="flex justify-center mb-16">
            <div className="inline-flex relative items-center p-1 bg-zinc-100 dark:bg-zinc-900/50 rounded-full border border-zinc-200 dark:border-zinc-800 backdrop-blur-md">
                <div 
                    className={cn(
                        "absolute top-1 bottom-1 w-1/2 bg-white dark:bg-zinc-800 rounded-full shadow-sm transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)",
                        activeTab === 'work' ? "left-1 translate-x-0" : "translate-x-[calc(100%-0.25rem)]"
                    )}
                />
                <button
                    onClick={() => setActiveTab('work')}
                    className={cn(
                        "relative z-10 px-8 py-2.5 text-sm font-medium transition-colors rounded-full",
                        activeTab === 'work' ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    Work Experience
                </button>
                <button
                    onClick={() => setActiveTab('education')}
                    className={cn(
                        "relative z-10 px-8 py-2.5 text-sm font-medium transition-colors rounded-full",
                        activeTab === 'education' ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    Education
                </button>
            </div>
          </AnimateIn>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {activeData.length > 0 ? (
                activeData.map((exp: any, index: number) => (
                <ExperienceCard 
                    key={`${activeTab}-${exp.id || index}`} 
                    logo={exp.logo}
                    company={exp.company}
                    role={exp.title}
                    period={getPeriod(exp)}
                    description={exp.description}
                    skills={[]}
                    delay={index * 0.1} 
                />
                ))
            ) : (
                <div className="col-span-full text-center py-20 text-muted-foreground italic border rounded-3xl border-dashed border-zinc-200 dark:border-zinc-800">
                {activeTab === 'work' ? 'Work experience coming soon.' : 'Education details coming soon.'}
                </div>
            )}
          </div>
        </div>
    </section>
  );
};

export default Experience;
