"use client";

import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/use-theme";

interface AboutProps {
  title?: string;
  description?: string;
  githubUrl?: string;
  contactEmail?: string;
  image?: string;
}

export default function About({ title, description, githubUrl, contactEmail, image }: AboutProps) {
  const { theme } = useTheme();
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const username = githubUrl?.replace(/\/$/, "").split("/").pop() || "ajinuraji";

  // Fetch GitHub README for bio content
  useEffect(() => {
    // If admin has provided a custom description, use that instead of fetching README
    if (description?.trim()) {
      setReadmeContent(null); // will use description prop
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch(`/api/github/${username}/readme`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        if (!cancelled && data.content) {
          setReadmeContent(data.content);
        }
      })
      .catch(() => {
        if (!cancelled) setReadmeContent(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [username, description]);

  const defaultDesc = "I have hands-on experience in developing responsive interfaces and managing backend systems. Beyond coding, I also possess fundamental knowledge of computer networking, giving me a broader perspective on technical architecture.";

  const bioText = description?.trim() || readmeContent || defaultDesc;

  return (
    <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:relative lg:top-auto lg:mx-0 lg:px-0 lg:py-0 lg:bg-transparent lg:backdrop-blur-none lg:mb-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary block mb-1">01 . profile & bio</span>
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">About</h2>
      </div>

      <div className="space-y-6">
        <div className="leading-relaxed text-muted-foreground">
          {loading ? (
            <span className="text-muted-foreground/60 italic">Loading bio from GitHub...</span>
          ) : (
            <span data-color-mode={theme}>
              <MDEditor.Markdown
                source={bioText}
                style={{
                  backgroundColor: "transparent",
                  color: "inherit",
                  fontSize: "1rem",
                  lineHeight: "1.75",
                }}
              />
            </span>
          )}
        </div>

        {contactEmail && (
          <a
            href={`mailto:${contactEmail}`}
            className="group inline-flex items-center gap-2.5 mt-6 px-5 py-2.5 rounded-full border border-border bg-card text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:border-primary/60 hover:bg-primary/5 hover:shadow-[0_0_18px_0px_rgba(255,0,13,0.18)] hover:text-primary active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Get in Touch
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-3.5 shrink-0 opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
        )}
      </div>
    </section>
  );
}
