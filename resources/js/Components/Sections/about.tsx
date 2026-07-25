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
            className="inline-block mt-6 text-sm font-bold uppercase tracking-widest text-foreground hover:text-muted-foreground transition-colors"
          >
            Get in Touch
          </a>
        )}
      </div>
    </section>
  );
}
