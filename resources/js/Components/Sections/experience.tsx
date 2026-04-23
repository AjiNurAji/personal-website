import { Badge } from "@/Components/UI/badge";
import { LetterAnimation } from "@/Components/Elements/LetterAnimation";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { ExperienceCard } from "@/Components/Elements/ExperienceCard";

interface ExperienceProps {
  initialExperiences: any[];
}

const Experience = ({ initialExperiences }: ExperienceProps) => {
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

  return (
    <section
      id="experience"
      className="relative z-4 bg-transparent border-t overflow-hidden px-4 sm:px-0"
    >
        <div className="absolute top-10 right-10 text-8xl md:text-9xl font-black text-zinc-500/5 dark:text-zinc-400/5 pointer-events-none select-none -z-10">
          JOURNEY
        </div>
        <div className="max-w-5xl mx-auto border-x px-6 py-20 bg-background/80 backdrop-blur-sm relative z-10">
          {/* Section header */}
          <div className="flex flex-col items-center justify-center gap-3 text-center mb-12">
            <AnimateIn variant="blur-fade">
              <Badge variant="secondary">Experience</Badge>
            </AnimateIn>
            <LetterAnimation
              isHeading
              inView
              className="text-4xl sm:text-5xl font-bold tracking-tight"
            >
              Professional Journey
            </LetterAnimation>
            <AnimateIn variant="blur-fade" delay={0.1}>
              <p className="text-muted-foreground">
                A timeline of my professional growth and key achievements
              </p>
            </AnimateIn>
          </div>

          {/* Timeline */}
          <div className="relative">
            {initialExperiences.length > 0 ? (
              initialExperiences.map((exp: any, index: number) => (
                <ExperienceCard 
                  key={exp.id || index} 
                  logo={exp.logo}
                  company={exp.company}
                  role={exp.title}
                  period={getPeriod(exp)}
                  description={exp.description}
                  skills={[]} // Skills might need to be fetched separately or added to the model
                  delay={index * 0.1} 
                />
              ))
            ) : (
              <div className="text-center py-10 text-muted-foreground italic">
                Experience details coming soon.
              </div>
            )}
          </div>
        </div>
    </section>
  );
};

export default Experience;
