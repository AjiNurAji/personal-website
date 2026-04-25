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
      className="relative z-3 bg-transparent px-4 sm:px-0 border-y overflow-hidden"
      id="about"
    >
        <div className="absolute top-10 right-10 text-8xl md:text-9xl font-black text-zinc-500/5 dark:text-zinc-400/5 pointer-events-none select-none -z-10">
          ABOUT
        </div>
        <div className="max-w-5xl mx-auto border-x py-20 px-6 bg-background/80 backdrop-blur-sm relative z-10">
          <div className="flex flex-col md:flex-row-reverse gap-12">
            {/* Profile image */}
            <AnimateIn
              variant="blur-fade"
              className="mt-10 w-48 h-48 md:w-64 md:h-64 flex justify-center mx-auto md:mx-0"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-accent">
                <img
                  src={image || "https://github.com/ajinuraji.png"}
                  alt="Profile"
                  loading="lazy"
                />
              </div>
            </AnimateIn>

            {/* Text content */}
            <div className="flex-1 md:text-left space-y-4">
              <AnimateIn variant="blur-fade">
                <Badge variant="secondary">About Me</Badge>
              </AnimateIn>

              <LetterAnimation
                isHeading
                inView
                className="text-4xl font-bold mb-4 tracking-tight justify-start"
              >
                {title || "Passionate about creating impactful web experiences"}
              </LetterAnimation>

              <AnimateIn variant="blur-fade" delay={0.1}>
                <div className="text-muted-foreground">
                  <div data-color-mode="light" className="dark:hidden">
                    <MDEditor.Markdown 
                      source={description?.trim() || defaultDesc} 
                      style={{ backgroundColor: 'transparent', color: 'inherit' }}
                    />
                  </div>
                  <div data-color-mode="dark" className="hidden dark:block">
                    <MDEditor.Markdown 
                      source={description?.trim() || defaultDesc} 
                      style={{ backgroundColor: 'transparent', color: 'inherit' }}
                    />
                  </div>
                </div>
              </AnimateIn>

              <AnimateIn variant="blur-fade" delay={0.2}>
                <div className="flex flex-wrap gap-4 justify-start">
                  <a
                    href={githubUrl || "https://github.com/ajinuraji"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "rounded-full",
                    )}
                  >
                    <RiGithubFill /> View GitHub
                  </a>
                  <a
                    href={`mailto:${contactEmail || "contact@example.com"}`}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "rounded-full",
                    )}
                  >
                    <RiMailSendLine className="mr-2 h-4 w-4" /> Hire Me
                  </a>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
    </section>
  );
};

export default About;
