import { Card, CardContent, CardHeader } from "../UI/card";
import { Badge } from "../UI/badge";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../UI/button";
import { RiExternalLinkLine, RiGithubFill } from "@remixicon/react";
import { Link } from "@inertiajs/react";

interface ProjectCardProps {
  title: string;
  slug: string;
  description: string;
  image: string;
  link?: string | null;
  github?: string | null;
  demo?: string | null;
  badges: string[];
}

export const ProjectCard = ({
  title,
  slug,
  description,
  image,
  github,
  demo,
  badges,
}: ProjectCardProps) => {
  // Normalize badges — always produce a string[]
  const badgeList: string[] = Array.isArray(badges)
    ? badges
    : typeof badges === "string"
    ? (badges as string).split(",").map((b) => b.trim()).filter(Boolean)
    : [];

  return (
    <Card className="pt-0 group overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col border-zinc-200 dark:border-zinc-800">
      <CardHeader className="bg-accent h-48 w-full relative">
        <img
          src={image || "https://shadcn-portfolio-template.vercel.app/placeholder.svg"}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          alt={title}
        />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-6">
        <Link href={`/projects/${slug}`}>
          <h3 className="text-xl font-semibold mb-2 line-clamp-1 hover:text-primary transition-colors cursor-pointer">
            {title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {badgeList.map((badge) => (
            <Badge key={badge} variant="secondary" className="text-[10px] py-0">
              {badge}
            </Badge>
          ))}
        </div>

        <div className="mt-auto pt-6 flex flex-wrap gap-2">
          <Link
            href={`/projects/${slug}`}
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "rounded-full px-4 py-2 flex items-center gap-2 text-xs"
            )}
          >
            View Details
          </Link>

          {(demo || github) && (
            <div className="flex gap-2">
              {demo && (
                <Link
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "rounded-full px-4 py-2 flex items-center gap-2 text-xs"
                  )}
                >
                  <RiExternalLinkLine className="w-3.5 h-3.5" />
                  Live
                </Link>
              )}
              {github && (
                <Link
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "rounded-full px-4 py-2 flex items-center gap-2 text-xs"
                  )}
                >
                  <RiGithubFill className="w-3.5 h-3.5" />
                  Code
                </Link>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
