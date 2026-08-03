"use client";

import React, { useRef, useState } from "react";
import { Badge } from "../UI/badge";
import { cn } from "@/lib/utils";
import { Button } from "../UI/button";
import { RiExternalLinkLine, RiGithubFill, RiArrowRightLine } from "@remixicon/react";
import { Link } from "@inertiajs/react";
import { SafeImage } from "./SafeImage";

interface ProjectCardProps {
  title: string;
  slug: string;
  description: string;
  image: string;
  link?: string | null;
  github?: string | null;
  demo?: string | null;
  badges: string | string[];
  className?: string;
  isFeatured?: boolean;
}

export const ProjectCard = ({
  title,
  slug,
  description,
  image,
  github,
  demo,
  badges,
  className,
  isFeatured = false,
}: ProjectCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const badgeList: string[] = React.useMemo(() => {
    try {
      if (Array.isArray(badges)) return badges;
      if (typeof badges === 'string') {
        const parsed = JSON.parse(badges);
        return Array.isArray(parsed) ? parsed : [parsed];
      }
      return [];
    } catch (e) {
      return typeof badges === 'string' ? badges.split(',').map(s => s.trim()) : [];
    }
  }, [badges]);

  const imageUrl = image 
    ? (image.startsWith('http') ? image : `/storage/${image}`) 
    : undefined;

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        className
      )}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0 mix-blend-overlay"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.15), transparent 40%)`,
        }}
      />

      {/* Image Header */}
      <div className={cn(
        "relative z-10 w-full overflow-hidden border-b border-border/70 bg-muted",
        isFeatured ? "h-72 sm:h-96" : "h-56 sm:h-64"
      )}>
        <SafeImage
          src={imageUrl}
          alt={title}
          className="object-cover object-top w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          containerClassName="w-full h-full"
        />
        
        {/* Subtle dark gradient just at the very bottom edge of image to blend with border */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        {/* Floating "View Project" Pill on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Link 
                href={`/projects/${slug}`}
                className="bg-black/40 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-full font-bold text-sm shadow-2xl flex items-center gap-2 hover:bg-black/60 hover:scale-105 transition-all"
            >
                View Project <RiArrowRightLine className="w-4 h-4" />
            </Link>
        </div>

        {/* Source indicator pill */}
        {github && (
          <div className="absolute top-4 right-4 z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold bg-black/50 backdrop-blur-md text-white border border-white/20 shadow-lg">
              <RiGithubFill className="size-3" />
              GitHub
            </span>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="relative z-10 flex flex-1 flex-col bg-card/90 p-6 sm:p-8">
        <Link href={`/projects/${slug}`}>
          <h3 className={cn(
              "font-black tracking-tight mb-3 hover:text-primary transition-colors cursor-pointer text-foreground",
              isFeatured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl line-clamp-1"
          )}>
            {title}
          </h3>
        </Link>
        
        <p className={cn(
            "text-muted-foreground font-medium",
            isFeatured ? "text-base sm:text-lg mb-6 line-clamp-3" : "text-sm sm:text-base mb-5 line-clamp-2"
        )}>
            {description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {badgeList.slice(0, isFeatured ? 6 : 4).map((badge) => (
            <Badge key={badge} variant="secondary" className="text-[10px] sm:text-xs py-1 px-3 bg-zinc-200/50 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors border-transparent text-foreground">
              {badge}
            </Badge>
          ))}
          {badgeList.length > (isFeatured ? 6 : 4) && (
            <Badge variant="secondary" className="text-[10px] sm:text-xs py-1 px-2 bg-zinc-200/50 dark:bg-zinc-800/50 text-muted-foreground border-transparent">
              +{badgeList.length - (isFeatured ? 6 : 4)}
            </Badge>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-5">
          <Link
            href={`/projects/${slug}`}
            className="text-sm font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1 group/link"
          >
            Read Case Study <RiArrowRightLine className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>

          {(demo || github) && (
            <div className="flex gap-2">
              {demo && (
                <a href={demo} target="_blank" rel="noopener noreferrer" title="Live Demo">
                  <Button variant="ghost" size="icon" aria-label="Live Demo">
                    <RiExternalLinkLine className="size-5" />
                  </Button>
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" title="Source Code">
                  <Button variant="ghost" size="icon" aria-label="Source Code">
                    <RiGithubFill className="size-5" />
                  </Button>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
