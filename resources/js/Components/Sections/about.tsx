"use client";

import { RiMailSendLine, RiGithubFill } from "@remixicon/react";
import { LetterAnimation } from "@/Components/Elements/LetterAnimation";
import { AnimateIn } from "@/Components/Elements/AnimateIn";
import { Badge } from "@/Components/UI/badge";
import { buttonVariants } from "@/Components/UI/button";
import { cn } from "@/lib/utils";
import MDEditor from "@uiw/react-md-editor";

interface AboutProps {
  title?: string;
  description?: string;
  githubUrl?: string;
  contactEmail?: string;
  image?: string;
}

const About = ({ title, description, githubUrl, contactEmail, image }: AboutProps) => {
  const defaultDesc = "I have hands-on experience in developing responsive interfaces and managing backend systems. Beyond coding, I also possess fundamental knowledge of computer networking, giving me a broader perspective on technical architecture. I am eager to learn, grow, and contribute to a dynamic and collaborative work environment.";
  
  return (
    <section
      className="relative z-3 bg-transparent px-4 sm:px-0 border-t border-b overflow-hidden"
      id="about"
    >
        <div className="absolute top-10 right-10 text-8xl md:text-9xl font-black text-zinc-500/5 dark:text-zinc-400/5 pointer-events-none select-none -z-10">
          ABOUT
        </div>
        <div className="max-w-5xl mx-auto border-x pt-24 pb-32 px-6 bg-background/80 backdrop-blur-sm relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start relative">
            {/* Left Column: Sticky Profile Card */}
            <div className="lg:sticky lg:top-24 space-y-6">
              <AnimateIn variant="blur-fade">
                <div className="relative w-full aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border shadow-sm group">
                  <img
                    src={image ? (image.startsWith('http') || image.startsWith('/') ? image : `/storage/${image}`) : "https://github.com/ajinuraji.png"}
                    alt="Profile"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Premium overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  {/* Overlay content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-white">
                    <p className="font-bold text-xl tracking-tight">Aji Nur Aji</p>
                    <p className="text-white/80 text-sm">Fullstack Developer</p>
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* Right Column: Text Content Bento Card */}
            <AnimateIn variant="blur-fade" delay={0.1} className="flex">
              <div className="flex-1 space-y-6 bg-zinc-50 dark:bg-zinc-900/40 border shadow-sm rounded-3xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="relative z-10 space-y-6">
                  <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">About Me</Badge>

                  <LetterAnimation
                    isHeading
                    inView
                    className="text-4xl md:text-5xl font-black tracking-tighter justify-start leading-tight"
                  >
                    {title || "Passionate about creating impactful web experiences"}
                  </LetterAnimation>

                  <div className="text-muted-foreground leading-relaxed text-lg">
                    <div data-color-mode="light" className="dark:hidden">
                      <MDEditor.Markdown 
                        source={description?.trim() || defaultDesc} 
                        style={{ backgroundColor: 'transparent', color: 'inherit', fontSize: 'inherit', lineHeight: 'inherit' }}
                      />
                    </div>
                    <div data-color-mode="dark" className="hidden dark:block">
                      <MDEditor.Markdown 
                        source={description?.trim() || defaultDesc} 
                        style={{ backgroundColor: 'transparent', color: 'inherit', fontSize: 'inherit', lineHeight: 'inherit' }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <a
                      href={githubUrl || "https://github.com/ajinuraji"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "rounded-full px-6 transition-all active:scale-95",
                      )}
                    >
                      <RiGithubFill className="mr-2" /> View GitHub
                    </a>
                    <a
                      href={`mailto:${contactEmail || "contact@example.com"}`}
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "rounded-full px-6 transition-all active:scale-95 bg-background/50 backdrop-blur-sm",
                      )}
                    >
                      <RiMailSendLine className="mr-2 h-4 w-4" /> Hire Me
                    </a>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
    </section>
  );
};

export default About;
