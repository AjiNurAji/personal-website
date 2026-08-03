"use client";

import MDEditor from "@uiw/react-md-editor";
import { useTheme } from "@/hooks/use-theme";

interface ExperienceProps {
  workExperiences: any[];
  educationExperiences: any[];
}

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const getPeriod = (exp: any) => {
  const start = formatDate(exp.start_date);
  const end = exp.end_date ? formatDate(exp.end_date) : "Present";
  return `${start} \u2014 ${end}`;
};

export default function Experience({ workExperiences, educationExperiences }: ExperienceProps) {
  const { theme } = useTheme();

  const items = (workExperiences && workExperiences.length > 0
    ? workExperiences
    : []) as any[];

  const eduItems = (educationExperiences && educationExperiences.length > 0
    ? educationExperiences
    : []) as any[];

  return (
    <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-0 lg:px-0 lg:py-0 lg:bg-transparent lg:backdrop-blur-none lg:mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">Experience</h2>
      </div>

      <div className="space-y-12">
        {items.length > 0 ? (
          items.map((exp) => (
            <div key={exp.id} className="group relative grid grid-cols-1 gap-1 pb-4 sm:grid-cols-8 sm:gap-4">
              {/* Timeline period */}
              <header className="z-10 mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:col-span-2">
                {getPeriod(exp)}
              </header>

              {/* Content */}
              <div className="z-10 sm:col-span-6 space-y-2">
                <h3 className="font-medium leading-snug text-foreground">
                  {exp.title}{exp.company ? " \u00B7 " : ""}
                  {exp.company && (
                    <span className="text-muted-foreground">{exp.company}</span>
                  )}
                </h3>
                {exp.description && (
                  <div className="text-sm leading-relaxed text-muted-foreground" data-color-mode={theme}>
                    <MDEditor.Markdown
                      source={exp.description}
                      style={{
                        backgroundColor: "transparent",
                        color: "inherit",
                        fontSize: "0.875rem",
                        lineHeight: "1.625",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground/60 italic">No work experience listed yet.</p>
        )}

        {eduItems.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
              Education
            </h3>
            <div className="space-y-12">
              {eduItems.map((exp) => (
                <div key={exp.id} className="group relative grid grid-cols-1 gap-1 pb-4 sm:grid-cols-8 sm:gap-4">
                  <header className="z-10 mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:col-span-2">
                    {getPeriod(exp)}
                  </header>
                  <div className="z-10 sm:col-span-6 space-y-2">
                    <h3 className="font-medium leading-snug text-foreground">
                      {exp.title}{exp.company ? " \u00B7 " : ""}
                      {exp.company && (
                        <span className="text-muted-foreground">{exp.company}</span>
                      )}
                    </h3>
                    {exp.description && (
                      <div className="text-sm leading-relaxed text-muted-foreground" data-color-mode={theme}>
                        <MDEditor.Markdown
                          source={exp.description}
                          style={{
                            backgroundColor: "transparent",
                            color: "inherit",
                            fontSize: "0.875rem",
                            lineHeight: "1.625",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
